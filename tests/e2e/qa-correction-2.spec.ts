import { test, expect } from "@playwright/test";
import { readFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";

const HEIGHT_TARGETS: Record<string, number> = {
  "es-390": 4464,
  "en-390": 4460,
  "es-1440": 3430,
  "en-1440": 3430,
};
const HEIGHT_TOLERANCE = 80;

test.describe("P4-QA-01 — fonts are loaded and used", () => {
  test("Manrope and IBM Plex Mono are available and used by representative elements", async ({ page }) => {
    await page.goto("/es/");
    const result = await page.evaluate(() => {
      // The Hero eyebrow ("Product Designer & UX Engineer") is the first
      // <p> in the document and uses the mono evidence token; the H1 uses
      // the Manrope display token.
      const eyebrow = document.querySelector("main p");
      const h1 = document.querySelector("h1");
      return {
        manropeAvailable: document.fonts.check("700 40px Manrope"),
        monoAvailable: document.fonts.check("500 12px 'IBM Plex Mono'"),
        h1Font: h1 ? getComputedStyle(h1).fontFamily : null,
        eyebrowFont: eyebrow ? getComputedStyle(eyebrow).fontFamily : null,
      };
    });
    expect(result.manropeAvailable).toBe(true);
    expect(result.monoAvailable).toBe(true);
    expect(result.h1Font).toMatch(/Manrope/);
    expect(result.eyebrowFont).toMatch(/IBM Plex Mono/);
  });
});

test.describe("P4-QA-04 — CTA and project-link behavior", () => {
  test("the secondary Hero CTA links to the About route (superseded by P7's nav migration, D-029)", async ({ page }) => {
    await page.goto("/es/");
    const href = await page.getByRole("link", { name: "Conocer mi enfoque" }).getAttribute("href");
    expect(href).toBe("/es/sobre-mi/");
  });

  test("project actions are real links to the approved public repositories", async ({ page }) => {
    await page.goto("/es/");
    const vitalinkLink = page.getByRole("link", { name: /Ver caso →/ });
    await expect(vitalinkLink).toHaveAttribute("href", "https://github.com/maestreparra/vitalink-digital-ecosystem");
    await expect(vitalinkLink).toHaveAttribute("rel", /noreferrer/);
    await expect(vitalinkLink).toHaveAttribute("target", "_blank");

    const bmLink = page.getByRole("link", { name: /Ver proyecto →/ });
    await expect(bmLink).toHaveAttribute("href", "https://github.com/maestreparra/bm-envios-digital-platform");
  });
});

test.describe("P4-QA-03 — responsive method copy is rendered", () => {
  test("step 02 uses the approved compact Spanish copy at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/es/");
    await expect(page.getByText("Estrategia, flujos, arquitectura y componentes.", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Estrategia, flujos, arquitectura de información y componentes.", { exact: true }),
    ).toBeHidden();
  });

  test("step 02 preserves the full English copy at 1440px", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en/");
    await expect(
      page.getByText("Strategy, flows, information architecture, and components.", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Strategy, flows, architecture, and components.", { exact: true })).toBeHidden();
  });
});

test.describe("P4-QA-05 — no unapproved status badges", () => {
  test("project cards show no check/warning glyphs", async ({ page }) => {
    await page.goto("/es/");
    const cardsText = await page.locator("#selected-work li").allTextContents();
    for (const text of cardsText) {
      expect(text).not.toContain("✓");
      expect(text).not.toContain("⚠");
    }
  });
});

test.describe("P4-QA-06 — Closing CTA intrinsic width", () => {
  for (const width of [390, 1440]) {
    test(`the Closing CTA button is content-sized, not full-width, at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/es/");
      const button = page.getByRole("link", { name: "Iniciar una conversación" });
      const box = await button.boundingBox();
      const sectionBox = await page.locator("main > section").last().boundingBox();
      expect(box).not.toBeNull();
      expect(sectionBox).not.toBeNull();
      expect(box!.width).toBeLessThan(sectionBox!.width * 0.6);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });
  }
});

test.describe("P4-QA-07 — Footer content and height", () => {
  test("Footer includes Work, Experience, and About before the external profiles (Work/About are typed routes since P7, D-029)", async ({ page }) => {
    await page.goto("/es/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Proyectos" })).toHaveAttribute("href", "/es/proyectos/");
    await expect(footer.getByRole("link", { name: "Experiencia" })).toHaveAttribute("href", "/es/#experience");
    await expect(footer.getByRole("link", { name: "Sobre mí" })).toHaveAttribute("href", "/es/sobre-mi/");
    await expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/maestreparra/",
    );
    await expect(footer.getByRole("link", { name: "Behance" })).toHaveAttribute(
      "href",
      "https://www.behance.net/giomarmaestre/",
    );
  });

  test("Footer height is ~360px at 390px and ~280px at 1440px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/es/");
    const mobileBox = await page.locator("footer").boundingBox();
    expect(Math.abs(mobileBox!.height - 360)).toBeLessThanOrEqual(20);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/es/");
    const desktopBox = await page.locator("footer").boundingBox();
    expect(Math.abs(desktopBox!.height - 280)).toBeLessThanOrEqual(20);
  });
});

test.describe("P4-QA-02 — full-page height within tolerance of the frozen Figma frames", () => {
  for (const locale of ["es", "en"] as const) {
    for (const width of [390, 1440]) {
      test(`${locale}/ at ${width}px is within ±${HEIGHT_TOLERANCE}px of the Figma frame`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/${locale}/`);
        const height = await page.evaluate(() => document.documentElement.scrollHeight);
        const target = HEIGHT_TARGETS[`${locale}-${width}`];
        if (target === undefined) {
          throw new Error(`No height target configured for ${locale}-${width}`);
        }
        expect(Math.abs(height - target)).toBeLessThanOrEqual(HEIGHT_TOLERANCE);
      });
    }
  }
});

test.describe("P4-QA-09 — static output lang invariant", () => {
  test("out/es/index.html and out/en/index.html expose the correct <html lang>", () => {
    const esHtml = readFileSync(path.resolve(process.cwd(), "out/es/index.html"), "utf8");
    const enHtml = readFileSync(path.resolve(process.cwd(), "out/en/index.html"), "utf8");
    expect(esHtml).toMatch(/<html lang="es"/);
    expect(enHtml).toMatch(/<html lang="en"/);
    expect(enHtml).not.toMatch(/<html lang="es"/);
  });
});

test.describe("P4-QA-08 — screenshot evidence from the static export", () => {
  const outDir = path.resolve(process.cwd(), "evidence/p4/screenshots");

  const captures: Array<{ locale: "es" | "en"; width: number; file: string }> = [
    { locale: "es", width: 390, file: "home-es-390.png" },
    { locale: "es", width: 768, file: "home-es-768.png" },
    { locale: "es", width: 1440, file: "home-es-1440.png" },
    { locale: "en", width: 390, file: "home-en-390.png" },
    { locale: "en", width: 768, file: "home-en-768.png" },
    { locale: "en", width: 1440, file: "home-en-1440.png" },
  ];

  for (const { locale, width, file } of captures) {
    test(`captures ${file} from the static build`, async ({ page }) => {
      mkdirSync(outDir, { recursive: true });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);
      const filePath = path.join(outDir, file);
      await page.screenshot({ path: filePath, fullPage: true });
      expect(existsSync(filePath)).toBe(true);
      expect(statSync(filePath).size).toBeGreaterThan(1000);
    });
  }
});
