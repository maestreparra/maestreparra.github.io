import { test, expect } from "@playwright/test";

const widths = [360, 390, 768, 1024, 1280, 1440, 1920];

test.describe("responsive overflow", () => {
  for (const width of widths) {
    for (const path of ["/es/", "/en/"]) {
      test(`no horizontal overflow on ${path} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        expect(hasOverflow, `${path} at ${width}px should not overflow horizontally`).toBe(false);
      });
    }
  }
});
