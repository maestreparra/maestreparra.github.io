import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const ALL_ROUTES = [
  "/es/",
  "/en/",
  "/es/sobre-mi/",
  "/en/about/",
  "/es/proyectos/",
  "/en/work/",
  "/es/contacto/",
  "/en/contact/",
];

test.describe("P7 — zero serious/critical axe findings across all eight routes", () => {
  for (const route of ALL_ROUTES) {
    test(`${route} has no serious/critical axe violations`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).analyze();
      const seriousOrCritical = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
      expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
    });
  }
});

test.describe("P7 — status meaning never depends on color alone", () => {
  test("Work status legend pairs each color with readable text", async ({ page }) => {
    await page.goto("/es/proyectos/");
    await expect(page.getByText("CASO PUBLICADO").first()).toBeVisible();
    await expect(page.getByText("REFINAMIENTO FINAL").first()).toBeVisible();
  });
});

test.describe("P7 — Contact and project actions use descriptive accessible names", () => {
  test("Contact links have accessible names beyond the bare service name", async ({ page }) => {
    await page.goto("/es/contacto/");
    const linkedin = page.getByRole("link", { name: /LinkedIn — Trayectoria/ });
    await expect(linkedin).toBeVisible();
  });
});
