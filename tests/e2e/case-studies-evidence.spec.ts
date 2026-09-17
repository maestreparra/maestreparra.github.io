import { test, expect } from "@playwright/test";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "evidence/p9/screenshots");

const captures: Array<{ route: string; width: number; file: string }> = [
  { route: "/es/proyectos/vitalink-digital-ecosystem/", width: 390, file: "vitalink-es-390.png" },
  { route: "/es/proyectos/vitalink-digital-ecosystem/", width: 768, file: "vitalink-es-768.png" },
  { route: "/es/proyectos/vitalink-digital-ecosystem/", width: 1440, file: "vitalink-es-1440.png" },
  { route: "/en/work/vitalink-digital-ecosystem/", width: 390, file: "vitalink-en-390.png" },
  { route: "/en/work/vitalink-digital-ecosystem/", width: 768, file: "vitalink-en-768.png" },
  { route: "/en/work/vitalink-digital-ecosystem/", width: 1440, file: "vitalink-en-1440.png" },
  { route: "/es/proyectos/bm-envios-digital-experience/", width: 390, file: "bm-envios-es-390.png" },
  { route: "/es/proyectos/bm-envios-digital-experience/", width: 768, file: "bm-envios-es-768.png" },
  { route: "/es/proyectos/bm-envios-digital-experience/", width: 1440, file: "bm-envios-es-1440.png" },
  { route: "/en/work/bm-envios-digital-experience/", width: 390, file: "bm-envios-en-390.png" },
  { route: "/en/work/bm-envios-digital-experience/", width: 768, file: "bm-envios-en-768.png" },
  { route: "/en/work/bm-envios-digital-experience/", width: 1440, file: "bm-envios-en-1440.png" },
];

/**
 * The evidence image visible at this viewport is `loading="lazy"`, so
 * navigating and immediately screenshotting captured a blank box before the
 * browser decided to fetch it (P9-QA-02). Scrolling it into view triggers
 * the lazy fetch, and waiting for `complete`/`naturalWidth`/`decode()`
 * proves the pixels are actually painted before the full-page screenshot
 * is taken. The hidden responsive alternative (the other breakpoint's
 * image) is not asserted — only the one the viewport actually shows.
 */
async function waitForVisibleEvidenceImage(page: import("@playwright/test").Page) {
  const visibleImage = page.locator("figure img:visible").first();
  await visibleImage.scrollIntoViewIfNeeded();
  await expect(visibleImage).toBeVisible();
  await page.waitForFunction(
    (img) => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0,
    await visibleImage.elementHandle(),
  );
  await visibleImage.evaluate(async (img) => {
    if (img instanceof HTMLImageElement && typeof img.decode === "function") {
      await img.decode();
    }
  });
  await page.evaluate(() => window.scrollTo(0, 0));
}

test.describe("P9 Correction Attempt 2 (QA-02) — evidence image is decoded and visible before capture", () => {
  for (const { route, width } of captures.filter((c) => c.file.endsWith("-390.png") || c.file.endsWith("-1440.png"))) {
    test(`${route} at ${width}px: the visible evidence image loads and decodes successfully`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await waitForVisibleEvidenceImage(page);
    });
  }
});

test.describe("P9 — 12 static-export screenshots for visual evidence", () => {
  for (const { route, width, file } of captures) {
    test(`captures ${file} from the static build`, async ({ page }) => {
      mkdirSync(outDir, { recursive: true });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await waitForVisibleEvidenceImage(page);
      const filePath = path.join(outDir, file);
      await page.screenshot({ path: filePath, fullPage: true });
      expect(existsSync(filePath)).toBe(true);
      expect(statSync(filePath).size).toBeGreaterThan(1000);
    });
  }
});
