import { test, expect, type Page } from "@playwright/test";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "evidence/p13/screenshots");

const CASES = [
  { slug: "licendi", es: "/es/proyectos/licendi-ecommerce-brand-experience/", en: "/en/work/licendi-ecommerce-brand-experience/" },
  { slug: "meeco", es: "/es/proyectos/meeco-renewable-energy-website/", en: "/en/work/meeco-renewable-energy-website/" },
  { slug: "pilotorb", es: "/es/proyectos/pilotorb-business-intelligence/", en: "/en/work/pilotorb-business-intelligence/" },
  { slug: "appliedxl", es: "/es/proyectos/appliedxl-ai-data-platform/", en: "/en/work/appliedxl-ai-data-platform/" },
];

const WIDTHS = [390, 768, 1440];

/**
 * P13 Correction 2 (C3): reads a PNG's IHDR chunk directly (bytes 16-19,
 * big-endian, right after the 8-byte signature + 4-byte chunk length +
 * 4-byte "IHDR" tag) so the test proves the file's actual pixel width
 * rather than trusting the viewport size Playwright was asked for.
 */
function readPngWidth(filePath: string): number {
  const buffer = readFileSync(filePath);
  if (buffer.readUInt32BE(0) !== 0x89504e47 || buffer.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error(`${filePath} does not look like a valid PNG (bad signature/IHDR)`);
  }
  return buffer.readUInt32BE(16);
}

/**
 * P13 Section 10: before a full-page capture, traverse the document,
 * expand any collapsed evidence disclosure so its lazy images enter the
 * viewport, wait for every image to report `complete && naturalWidth > 0`,
 * call `decode()` where supported, then return to the top before shooting.
 * This replaces a screenshot race where lazy-loaded evidence images are
 * still blank when the capture fires.
 */
async function captureFullyDecoded(page: Page, route: string, width: number, filePath: string) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(route);

  // Open any progressive-disclosure control so its images enter the DOM's
  // visible flow and are eligible to load (native <details> defers work
  // inside a closed panel in Chromium). Scoped to <main> so this never
  // touches the SiteHeader's own <details> (the mobile nav disclosure),
  // which is present on every page and hidden above the 768px breakpoint.
  const summaries = page.locator("main details > summary");
  const summaryCount = await summaries.count();
  for (let i = 0; i < summaryCount; i += 1) {
    const details = summaries.nth(i).locator("xpath=..");
    const isOpen = await details.evaluate((el) => el.hasAttribute("open"));
    if (!isOpen) {
      await summaries.nth(i).click();
    }
  }

  // Scroll the full document height in steps so every lazy `<img>` is
  // brought into range at least once.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });

  await page.waitForFunction(() => {
    const images = Array.from(document.images);
    return images.every((img) => img.complete && img.naturalWidth > 0);
  });

  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) => (typeof img.decode === "function" ? img.decode().catch(() => undefined) : Promise.resolve())),
    );
  });

  await page.evaluate(() => window.scrollTo(0, 0));

  mkdirSync(path.dirname(filePath), { recursive: true });
  await page.screenshot({ path: filePath, fullPage: true });

  const anyBlank = await page.evaluate(() => Array.from(document.images).some((img) => img.naturalWidth === 0));
  expect(anyBlank, `${filePath}: at least one <img> was blank (naturalWidth 0) at capture time`).toBe(false);

  const pngWidth = readPngWidth(filePath);
  expect(pngWidth, `${filePath}: PNG width ${pngWidth} does not match the requested ${width}px viewport`).toBe(width);
}

/**
 * P13 Correction 2 (C3): the recruiter-first default state — no disclosure
 * expanded, no scrolling — captured as-is, so the evidence set includes
 * what a recruiter actually sees on first load, not only the fully
 * expanded/decoded state used to prove no lazy-loaded image is blank.
 */
async function captureDefaultCollapsed(page: Page, route: string, width: number, filePath: string) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(route);
  await page.waitForLoadState("networkidle");

  // This evidence represents the literal first viewport. Do not scroll or
  // expand the disclosure, but do wait for images intersecting that viewport
  // to be fully decoded before capture. A full-page screenshot without
  // scrolling would include below-the-fold lazy images as blank placeholders
  // and would misrepresent the recruiter's first impression.
  await page.waitForFunction(() => {
    const visibleImages = Array.from(document.images).filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });
    return visibleImages.every((img) => img.complete && img.naturalWidth > 0);
  });
  await page.evaluate(async () => {
    const visibleImages = Array.from(document.images).filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });
    await Promise.all(
      visibleImages.map((img) =>
        typeof img.decode === "function" ? img.decode().catch(() => undefined) : Promise.resolve(),
      ),
    );
  });

  mkdirSync(path.dirname(filePath), { recursive: true });
  await page.screenshot({ path: filePath, fullPage: false });

  const pngWidth = readPngWidth(filePath);
  expect(pngWidth, `${filePath}: PNG width ${pngWidth} does not match the requested ${width}px viewport`).toBe(width);
}

test.describe("P13 Section 10 — 24 expanded, decode-safe case-study screenshots (Licendi, MEECO, PilotOrb, AppliedXL x ES/EN x 390/768/1440)", () => {
  for (const c of CASES) {
    for (const locale of ["es", "en"] as const) {
      for (const width of WIDTHS) {
        const route = c[locale];
        const file = `${c.slug}-${locale}-${width}-expanded-decoded.png`;
        test(`captures ${file} with no blank lazy-loaded evidence and correct PNG width`, async ({ page }) => {
          await captureFullyDecoded(page, route, width, path.join(outDir, file));
        });
      }
    }
  }
});

test.describe("P13 Correction 2 (C3) — 12 default-collapsed first-viewport screenshots (Licendi, MEECO, PilotOrb x ES/EN x 390/1440)", () => {
  const collapsedCases = CASES.filter((c) => c.slug !== "appliedxl");
  const collapsedWidths = [390, 1440];

  for (const c of collapsedCases) {
    for (const locale of ["es", "en"] as const) {
      for (const width of collapsedWidths) {
        const route = c[locale];
        const file = `${c.slug}-${locale}-${width}-default-collapsed.png`;
        test(`captures ${file} in the true first-viewport recruiter state, with correct PNG width`, async ({ page }) => {
          await captureDefaultCollapsed(page, route, width, path.join(outDir, file));
        });
      }
    }
  }
});

test.describe("P13 Section 8.2 — recruiter-first featured-evidence defaults are visible without JS interaction", () => {
  test("PilotOrb ES: 3 figures are visible before any disclosure is expanded", async ({ page }) => {
    await page.goto("/es/proyectos/pilotorb-business-intelligence/");
    expect(await page.locator("details[open]").count()).toBe(0);
    // Closed <details> content is `display: none` per the UA stylesheet, so
    // Playwright's `:visible` filter correctly excludes disclosed figures
    // without expanding anything.
    await expect(page.locator("figure:visible")).toHaveCount(3);
    await expect(page.locator("figure")).toHaveCount(6);
  });

  test("AppliedXL ES: all 4 figures are visible with no evidence-disclosure control rendered (the set is already bounded)", async ({ page }) => {
    await page.goto("/es/proyectos/appliedxl-ai-data-platform/");
    await expect(page.locator("figure")).toHaveCount(4);
    // Scoped to <main>: the SiteHeader always renders its own <details> for
    // the mobile nav disclosure, unrelated to evidence progressive disclosure.
    await expect(page.locator("main details")).toHaveCount(0);
  });
});

test.describe("P13 Section 9 — Licendi/MEECO evidence weight stays inside the approved budget", () => {
  test("Licendi public evidence totals at most 2.20 MB, no single file over 650 KB", () => {
    const dir = path.resolve(process.cwd(), "public/images/case-studies/licendi");
    const files = readdirSync(dir).filter((f: string) => f.endsWith(".webp"));
    let total = 0;
    for (const f of files) {
      const size = statSync(path.join(dir, f)).size;
      expect(size, `${f} exceeds the 650 KB single-file cap`).toBeLessThanOrEqual(650 * 1024);
      total += size;
    }
    expect(total, "Licendi total evidence weight").toBeLessThanOrEqual(2.2 * 1024 * 1024);
  });

  test("MEECO public evidence totals at most 3.00 MB, no single file over 650 KB", () => {
    const dir = path.resolve(process.cwd(), "public/images/case-studies/meeco");
    const files = readdirSync(dir).filter((f: string) => f.endsWith(".webp"));
    let total = 0;
    for (const f of files) {
      const size = statSync(path.join(dir, f)).size;
      expect(size, `${f} exceeds the 650 KB single-file cap`).toBeLessThanOrEqual(650 * 1024);
      total += size;
    }
    expect(total, "MEECO total evidence weight").toBeLessThanOrEqual(3.0 * 1024 * 1024);
  });
});

test.describe("P13 Section 11 — seven 1200x630 social preview assets exist and are referenced with absolute URLs", () => {
  test("all seven PNG cards exist on disk at 1200x630", () => {
    const dir = path.resolve(process.cwd(), "public/images/social");
    for (const slug of ["home", "vitalink", "bm-envios", "licendi", "meeco", "pilotorb", "appliedxl"]) {
      const filePath = path.join(dir, `${slug}.png`);
      expect(existsSync(filePath), `${slug}.png is missing`).toBe(true);
      expect(statSync(filePath).size).toBeGreaterThan(1000);
    }
  });

  test("every case-study route's <head> emits its own absolute og:image and twitter:card", async ({ page }) => {
    for (const c of CASES) {
      await page.goto(c.es);
      const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      expect(ogImage).toBe(`https://maestreparra.github.io/images/social/${c.slug}.png`);
      const twitterCard = await page.locator('meta[name="twitter:card"]').first().getAttribute("content");
      expect(twitterCard).toBe("summary_large_image");
    }
  });
});

test.describe("P13 Section 12 — public README lists every current route and case study", () => {
  test("README references all six case-study route pairs and no private path", () => {
    const readme = readFileSync(path.resolve(process.cwd(), "README.md"), "utf8");
    for (const slug of [
      "vitalink-digital-ecosystem",
      "bm-envios-digital-experience",
      "licendi-ecommerce-brand-experience",
      "meeco-renewable-energy-website",
      "pilotorb-business-intelligence",
      "appliedxl-ai-data-platform",
    ]) {
      expect(readme).toContain(slug);
    }
    expect(readme).not.toMatch(/\/Users\//);
    expect(readme).not.toMatch(/Portfolio Gate|Plomo al hampa/i);
  });
});

/**
 * P13 Correction Attempt 2 — C2. Sol's Amendment 1 found that the long
 * ES/EN P13 status labels clipped at 360/390px: `overflow-x: hidden` on the
 * page masked it from `scrollWidth === clientWidth` checks, so the defect
 * shipped undetected. This suite measures the label's own bounding box
 * instead, which catches clipping regardless of ancestor overflow rules.
 */
test.describe("P13 Correction 2 (C2) — StatusLabel bounding box never clips, independent of scrollWidth", () => {
  const AFFECTED_ES = "CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA";
  const AFFECTED_EN = "DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE";

  const affectedRoutes: Array<{ path: string; text: string }> = [
    { path: "/es/proyectos/licendi-ecommerce-brand-experience/", text: AFFECTED_ES },
    { path: "/en/work/licendi-ecommerce-brand-experience/", text: AFFECTED_EN },
    { path: "/es/proyectos/meeco-renewable-energy-website/", text: AFFECTED_ES },
    { path: "/en/work/meeco-renewable-energy-website/", text: AFFECTED_EN },
    { path: "/es/proyectos/appliedxl-ai-data-platform/", text: AFFECTED_ES },
    { path: "/en/work/appliedxl-ai-data-platform/", text: AFFECTED_EN },
  ];

  const NARROW_WIDTHS = [360, 390];
  const WIDER_REGRESSION_WIDTH = 1440;

  async function assertLabelInsideViewport(page: Page, width: number, text: string, scope?: import("@playwright/test").Locator) {
    const label = (scope ?? page).getByText(text, { exact: true }).first();
    await expect(label).toHaveText(text);
    const box = await label.boundingBox();
    expect(box, `no bounding box for "${text}" at ${width}px`).not.toBeNull();
    const { x, width: boxWidth, height } = box!;
    expect(boxWidth, `zero width at ${width}px`).toBeGreaterThan(0);
    expect(height, `zero height at ${width}px`).toBeGreaterThan(0);
    expect(x, `left edge negative at ${width}px`).toBeGreaterThanOrEqual(0);
    expect(x + boxWidth, `right edge exceeds ${width}px viewport (no tolerance)`).toBeLessThanOrEqual(width);
  }

  for (const width of NARROW_WIDTHS) {
    for (const { path, text } of affectedRoutes) {
      test(`${path} at ${width}px: full status-label text stays inside the viewport, uncropped`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        await assertLabelInsideViewport(page, width, text);
      });
    }
  }

  test(`wider regression width (${WIDER_REGRESSION_WIDTH}px): Licendi's label stays inside the viewport and reads as a single line`, async ({ page }) => {
    await page.setViewportSize({ width: WIDER_REGRESSION_WIDTH, height: 900 });
    await page.goto("/es/proyectos/licendi-ecommerce-brand-experience/");
    await assertLabelInsideViewport(page, WIDER_REGRESSION_WIDTH, AFFECTED_ES);
    const label = page.getByText(AFFECTED_ES, { exact: true }).first();
    const box = (await label.boundingBox())!;
    // A single-line pill at this height is well under 60px; a wrapped
    // two-line label would be roughly double. This guards the "retain the
    // compact one-line appearance where space permits" acceptance criterion.
    expect(box.height, "Licendi's label unexpectedly wrapped at 1440px").toBeLessThan(60);
  });

  test("PilotOrb (shorter, unaffected label) does not regress at 360/390/1440px", async ({ page }) => {
    for (const width of [...NARROW_WIDTHS, WIDER_REGRESSION_WIDTH]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/es/proyectos/pilotorb-business-intelligence/");
      await assertLabelInsideViewport(page, width, "CASO DOCUMENTADO · EVIDENCIA VERIFICADA");
    }
  });

  test("Work index legend badges (CASO PUBLICADO / REFINAMIENTO FINAL) do not regress at 360/390px", async ({ page }) => {
    for (const width of NARROW_WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/es/proyectos/");
      // Scoped to the legend section: "CASO PUBLICADO" also appears as plain
      // text on the VitaLink project card earlier in the DOM, which is not
      // the StatusLabel pill this correction is about.
      const legendSection = page.locator("section", { has: page.getByText("Cómo leer el estado") });
      await assertLabelInsideViewport(page, width, "CASO PUBLICADO", legendSection);
      await assertLabelInsideViewport(page, width, "REFINAMIENTO FINAL", legendSection);
    }
  });
});
