import { test, expect } from "@playwright/test";

const ROUTES = ["/es/sobre-mi/", "/en/about/", "/es/proyectos/", "/en/work/", "/es/contacto/", "/en/contact/"];

test.describe("P7 — no form controls, cookies, or storage on any Core Page", () => {
  for (const route of ROUTES) {
    test(`${route} renders no <form>, <input>, or <textarea>`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("form")).toHaveCount(0);
      await expect(page.locator("input")).toHaveCount(0);
      await expect(page.locator("textarea")).toHaveCount(0);
    });

    test(`${route} sets no cookies and touches no storage`, async ({ page, context }) => {
      await page.goto(route);
      const cookies = await context.cookies();
      expect(cookies).toEqual([]);
      const storage = await page.evaluate(() => ({
        localStorage: window.localStorage.length,
        sessionStorage: window.sessionStorage.length,
      }));
      expect(storage).toEqual({ localStorage: 0, sessionStorage: 0 });
    });
  }

  test("navigating About → Work → Contact performs no fetch/XHR/beacon", async ({ page }) => {
    const sideEffectRequests: string[] = [];
    page.on("request", (request) => {
      if (["xhr", "fetch"].includes(request.resourceType())) {
        sideEffectRequests.push(request.url());
      }
    });

    await page.goto("/es/sobre-mi/");
    await page.getByRole("link", { name: "Proyectos", exact: true }).first().click();
    await page.waitForURL(/\/proyectos\//);
    await page.getByRole("link", { name: "Contacto", exact: true }).first().click();
    await page.waitForURL(/\/contacto\//);

    expect(sideEffectRequests).toEqual([]);
  });
});
