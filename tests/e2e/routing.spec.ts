import { test, expect } from "@playwright/test";

test.describe("direct entry and routing", () => {
  test("direct entry to /es/ renders the Spanish Home", async ({ page }) => {
    await page.goto("/es/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("direct entry to /en/ renders the English Home", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("root resolver navigates to /es/ and offers a no-JS fallback link", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("**/es/");
    expect(page.url()).toContain("/es/");
  });

  test("an unknown route renders the bilingual 404 with recovery links", async ({ page }) => {
    const response = await page.goto("/unknown-route-xyz/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link", { name: /inicio en español/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /english home/i })).toBeVisible();
  });

  test("each Home has exactly one H1", async ({ page }) => {
    await page.goto("/es/");
    await expect(page.locator("h1")).toHaveCount(1);
    await page.goto("/en/");
    await expect(page.locator("h1")).toHaveCount(1);
  });
});

test.describe("locale switch", () => {
  test("preserves query string and fragment when switching from ES to EN", async ({ page }) => {
    await page.goto("/es/?ref=cv#selected-work");
    await page.getByRole("link", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/\?ref=cv#selected-work$/);
  });
});
