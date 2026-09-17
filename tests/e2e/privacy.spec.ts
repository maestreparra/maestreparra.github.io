import { test, expect } from "@playwright/test";

test.describe("no network or storage side effects", () => {
  test("locale switch performs no fetch/XHR and sets no cookies or storage", async ({ page, context }) => {
    const requests: string[] = [];
    page.on("request", (request) => {
      if (["xhr", "fetch"].includes(request.resourceType())) {
        requests.push(request.url());
      }
    });

    await page.goto("/es/");
    await page.getByRole("link", { name: "EN", exact: true }).click();
    await page.waitForURL(/\/en\//);

    expect(requests).toEqual([]);

    const cookies = await context.cookies();
    expect(cookies).toEqual([]);

    const storageState = await page.evaluate(() => ({
      localStorage: window.localStorage.length,
      sessionStorage: window.sessionStorage.length,
    }));
    expect(storageState).toEqual({ localStorage: 0, sessionStorage: 0 });
  });
});
