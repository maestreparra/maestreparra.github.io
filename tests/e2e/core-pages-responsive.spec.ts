import { test, expect } from "@playwright/test";

const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];
const ROUTES = ["/es/sobre-mi/", "/en/about/", "/es/proyectos/", "/en/work/", "/es/contacto/", "/en/contact/"];

test.describe("P7 — responsive overflow across the full seven-width matrix", () => {
  for (const width of WIDTHS) {
    for (const route of ROUTES) {
      test(`no horizontal overflow on ${route} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route);
        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        expect(hasOverflow, `${route} at ${width}px should not overflow horizontally`).toBe(false);
      });
    }
  }
});

test.describe("P7 — 390px and 1440px visual-composition sanity (no brittle pixel-perfect snapshot)", () => {
  test("About page sections render in the approved order at 1440px", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/es/sobre-mi/");
    const headings = await page.locator("main h1, main h2").allTextContents();
    expect(headings[0]).toContain("Diseño con criterio de producto");
    expect(headings).toContain("Una práctica entre diseño, servicio y tecnología");
    expect(headings).toContain("Capacidades");
    expect(headings).toContain("Experiencia seleccionada");
  });

  test("Work page sections render in the approved order at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/en/work/");
    const headings = await page.locator("main h1, main h2").allTextContents();
    expect(headings[0]).toContain("Selected work with visible decisions");
    expect(headings).toContain("Available case studies");
    expect(headings).toContain("How to read the status");
  });

  test("Capabilities collapse to a single column at 390px and form multiple columns at 1440px", async ({ page }) => {
    await page.goto("/es/sobre-mi/");
    await page.setViewportSize({ width: 390, height: 900 });
    const mobileItems = page.locator("main li").filter({ hasText: "Product strategy" });
    const mobileBox = await mobileItems.first().boundingBox();
    expect(mobileBox!.width).toBeGreaterThan(300);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    const desktopBox = await page.locator("main li").filter({ hasText: "Product strategy" }).first().boundingBox();
    expect(desktopBox!.width).toBeLessThan(450);
  });
});

test.describe("P7-QA-01 — Contact mobile matches the frozen Figma composition (23:8, 23:15)", () => {
  test("the mobile Page Hero reserves the approved editorial whitespace (title >= 300px, introduction >= 460px)", async ({
    page,
  }) => {
    // Regression guard: before this correction, PageHero used pure
    // content-driven auto height, so this title/introduction pair (short
    // Contact copy) measured well under Figma's reserved area and the
    // whole page came in 201px (9.2%) shorter than node 23:8.
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/es/contacto/");
    const titleBox = await page.locator("h1").boundingBox();
    const introBox = await page.locator("main p").nth(1).boundingBox();
    expect(titleBox!.height, "title reserved height").toBeGreaterThanOrEqual(300);
    expect(introBox!.height, "introduction reserved height").toBeGreaterThanOrEqual(460);
  });

  test("the mobile Contact Links section is ~360px wide with ~15px side insets, not the generic 342px/24px column", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/en/contact/");
    // The Footer also has a plain "LinkedIn" link; the Contact Links card's
    // accessible name is "{label} — {detail}", so anchor on the em dash to
    // select only the card, not the Footer link.
    const linkedinCard = page.getByRole("link", { name: /LinkedIn — /u });
    const box = await linkedinCard.boundingBox();
    expect(box!.width, "Contact Link card width").toBeGreaterThanOrEqual(355);
    expect(box!.x, "left inset").toBeLessThanOrEqual(20);
  });

  test("does not regress: About and Work still reserve no extra height (PageHero fix is Contact-only)", async ({
    page,
  }) => {
    // Applying the reservation PageHero-wide made Work's total mobile
    // height overshoot Figma by +11.5% during this correction's own
    // investigation; this guards against that regression recurring.
    // Baseline updated for P5: Work gained the Licendi and MEECO cards,
    // which legitimately grows the page beyond the pre-P5 Figma frame
    // (23:6). Updated again after adding the PilotOrb card, then again
    // after adding AppliedXL (D-030, sixth card completing the 3x2 grid).
    // This is the measured post-P5 static-export baseline, not a new Figma
    // cross-check — that remains pending Sol's independent QA.
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/es/proyectos/");
    const workHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(Math.abs(workHeight - 5043), "Work ES 390px measured baseline after AppliedXL (5043px)").toBeLessThanOrEqual(80);

    // About's own +173px (+3.7%) gap versus Figma pre-dates this correction
    // and About's composition is denylisted this round (out of scope for
    // P7-QA-01); this loose bound only guards against a *new* large
    // regression (e.g. the PageHero-wide min-height mistake above), not a
    // tight Figma-parity claim. Baseline updated after adding the "Liderazgo
    // de proyectos técnicos" and "Gestión de stakeholders" capability tags,
    // which legitimately grow the Capabilities list from 10 to 12 items.
    await page.goto("/es/sobre-mi/");
    const aboutHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(Math.abs(aboutHeight - 5015), "About ES 390px measured baseline after the PM capability tags (5015px)").toBeLessThanOrEqual(200);
  });

  test("P11 Contact ES/EN full-page height includes the approved fourth contact card without layout drift", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/es/contacto/");
    const es = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(Math.abs(es - 2369), "Contact ES 390px P11 composition (2369px)").toBeLessThanOrEqual(40);

    await page.goto("/en/contact/");
    const en = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(Math.abs(en - 2369), "Contact EN 390px P11 composition (2369px)").toBeLessThanOrEqual(40);
  });

  test("no clipping or overflow at 360px with the reserved whitespace active", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 });
    await page.goto("/en/contact/");
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /Behance — /u })).toBeVisible();
  });
});
