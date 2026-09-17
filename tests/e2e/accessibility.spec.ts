import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test.describe("accessibility", () => {
  for (const path of ["/es/", "/en/"]) {
    test(`zero serious/critical axe violations on ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const seriousOrCritical = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
      expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
    });
  }

  test("skip link moves focus to main content on /es/", async ({ page }) => {
    await page.goto("/es/");
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeVisible();
  });

  test("main landmark is unique on /en/", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.locator("main")).toHaveCount(1);
  });
});
