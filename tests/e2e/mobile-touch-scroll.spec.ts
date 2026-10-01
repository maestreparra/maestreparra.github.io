import { devices, expect, test } from "@playwright/test";

const routes = ["/es/", "/es/proyectos/", "/es/contacto/"] as const;

test.describe("mobile touch scrolling", () => {
  for (const route of routes) {
    test(`responds to the first touch gesture on ${route}`, async ({ browser }) => {
      const context = await browser.newContext({ ...devices["iPhone 13"] });
      const page = await context.newPage();

      try {
        await page.goto(route, { waitUntil: "networkidle" });
        expect(await page.evaluate(() => window.scrollY)).toBe(0);

        const cdp = await context.newCDPSession(page);
        await cdp.send("Input.synthesizeScrollGesture", {
          x: 195,
          y: 650,
          yDistance: -450,
          gestureSourceType: "touch",
          speed: 800,
        });

        await expect
          .poll(() => page.evaluate(() => window.scrollY))
          .toBeGreaterThan(0);
      } finally {
        await context.close();
      }
    });
  }
});
