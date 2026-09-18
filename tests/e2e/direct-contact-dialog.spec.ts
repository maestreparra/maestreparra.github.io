import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const ROUTES = [
  {
    path: "/es/contacto/",
    trigger: "Contacto directo",
    title: "Elige cómo quieres contactarme",
    close: "Cerrar opciones de contacto",
  },
  {
    path: "/en/contact/",
    trigger: "Direct contact",
    title: "Choose how you would like to contact me",
    close: "Close contact options",
  },
] as const;

for (const route of ROUTES) {
  test.describe(`P11 — direct-contact dialog on ${route.path}`, () => {
    test("is bilingual, keyboard operable, and exposes exact native-app protocols", async ({ page }) => {
      await page.goto(route.path);
      const trigger = page.getByRole("button", { name: new RegExp(route.trigger, "i") });
      await trigger.focus();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog", { name: route.title });
      await expect(dialog).toBeVisible();
      await expect(page.getByRole("link", { name: /WhatsApp/i })).toHaveAttribute(
        "href",
        "https://wa.me/584221445743",
      );
      await expect(page.getByRole("link", { name: /Messages \/ SMS/i })).toHaveAttribute(
        "href",
        "sms:+584221445743",
      );
      await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
      await expect(page.getByRole("button", { name: route.close })).toBeFocused();

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });

    test("has no serious or critical axe findings while open", async ({ page }) => {
      await page.goto(route.path);
      await page.getByRole("button", { name: new RegExp(route.trigger, "i") }).click();
      const results = await new AxeBuilder({ page }).include("dialog").analyze();
      const seriousOrCritical = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
      expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
    });

    test("opens and closes without network transmission, cookies, or storage mutation", async ({ page, context }) => {
      const sideEffects: string[] = [];
      page.on("request", (request) => {
        if (["xhr", "fetch"].includes(request.resourceType())) sideEffects.push(request.url());
      });

      await page.goto(route.path);
      const before = await page.evaluate(() => ({
        localStorage: JSON.stringify(window.localStorage),
        sessionStorage: JSON.stringify(window.sessionStorage),
      }));
      await page.getByRole("button", { name: new RegExp(route.trigger, "i") }).click();
      await page.getByRole("button", { name: route.close }).click();
      const after = await page.evaluate(() => ({
        localStorage: JSON.stringify(window.localStorage),
        sessionStorage: JSON.stringify(window.sessionStorage),
      }));

      expect(sideEffects).toEqual([]);
      expect(after).toEqual(before);
      expect(await context.cookies()).toEqual([]);
    });

    for (const width of [360, 390, 768, 1440]) {
      test(`does not overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        await page.getByRole("button", { name: new RegExp(route.trigger, "i") }).click();
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        expect(overflow).toBe(false);
        await expect(page.getByRole("dialog", { name: route.title })).toBeVisible();
      });
    }
  });
}
