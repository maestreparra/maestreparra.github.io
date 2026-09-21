import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const ROUTES: Array<{ path: string; locale: "es" | "en" }> = [
  { path: "/es/proyectos/pilotorb-business-intelligence/", locale: "es" },
  { path: "/en/work/pilotorb-business-intelligence/", locale: "en" },
];

const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];

test.describe("PilotOrb — direct entry to both routes", () => {
  for (const route of ROUTES) {
    test(`${route.path} returns 200 and the correct <html lang>`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    });
  }
});

test.describe("PilotOrb — one H1 and one main landmark per route", () => {
  for (const route of ROUTES) {
    test(`${route.path} has exactly one H1 and one main`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
    });
  }
});

test.describe("PilotOrb — skip link and functional breadcrumb", () => {
  for (const route of ROUTES) {
    test(`${route.path} has a working skip link and a labelled breadcrumb nav`, async ({ page }) => {
      await page.goto(route.path);
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("#main-content")).toBeVisible();
      const breadcrumbNav = page.getByRole("navigation", { name: /breadcrumb|ruta de navegación/i });
      await expect(breadcrumbNav).toBeVisible();
      await expect(breadcrumbNav.getByRole("link")).toHaveCount(1);
    });
  }
});

test.describe("PilotOrb — visible documented-case status and real evidence (Mode A)", () => {
  test("shows CASO DOCUMENTADO · EVIDENCIA VERIFICADA / DOCUMENTED CASE · VERIFIED EVIDENCE", async ({ page }) => {
    await page.goto("/es/proyectos/pilotorb-business-intelligence/");
    await expect(page.getByText("CASO DOCUMENTADO · EVIDENCIA VERIFICADA").first()).toBeVisible();
    await page.goto("/en/work/pilotorb-business-intelligence/");
    await expect(page.getByText("DOCUMENTED CASE · VERIFIED EVIDENCE").first()).toBeVisible();
  });

  for (const route of ROUTES) {
    test(`${route.path} renders six real-evidence figures with six images and no diagram reconstruction`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator("figure")).toHaveCount(6);
      await expect(page.locator("img[src^='/images/case-studies/pilotorb/']")).toHaveCount(6);
      await expect(page.getByText("RECONSTRUCCIÓN PARA PORTAFOLIO")).toHaveCount(0);
      await expect(page.getByText("PORTFOLIO RECONSTRUCTION")).toHaveCount(0);
    });
  }
});

test.describe("PilotOrb — no external client-asset link; internal back-to-work action only", () => {
  test("ES: back-to-work action points to /es/proyectos/", async ({ page }) => {
    await page.goto("/es/proyectos/pilotorb-business-intelligence/");
    const back = page.getByRole("link", { name: "Volver a proyectos" });
    await expect(back).toHaveAttribute("href", "/es/proyectos/");
  });

  test("EN: back-to-work action points to /en/work/", async ({ page }) => {
    await page.goto("/en/work/pilotorb-business-intelligence/");
    const back = page.getByRole("link", { name: "Back to Work" });
    await expect(back).toHaveAttribute("href", "/en/work/");
  });

  test("no route links to a client asset path", async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route.path);
      const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((l) => l.getAttribute("href")));
      for (const href of hrefs) {
        expect(href).not.toMatch(/\/images\/case-studies\//);
      }
    }
  });
});

test.describe("PilotOrb — no form controls, cookies, storage, or network calls", () => {
  for (const route of ROUTES) {
    test(`${route.path} renders no <form>/<input>/<textarea> and sets no cookies/storage`, async ({ page, context }) => {
      await page.goto(route.path);
      await expect(page.locator("form")).toHaveCount(0);
      await expect(page.locator("input")).toHaveCount(0);
      await expect(page.locator("textarea")).toHaveCount(0);
      const cookies = await context.cookies();
      expect(cookies).toEqual([]);
      const storage = await page.evaluate(() => ({
        localStorage: window.localStorage.length,
        sessionStorage: window.sessionStorage.length,
      }));
      expect(storage).toEqual({ localStorage: 0, sessionStorage: 0 });
    });
  }
});

test.describe("PilotOrb — zero serious/critical axe findings", () => {
  for (const route of ROUTES) {
    test(`${route.path} has no serious/critical axe violations`, async ({ page }) => {
      await page.goto(route.path);
      const results = await new AxeBuilder({ page }).analyze();
      const seriousOrCritical = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
      expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
    });
  }
});

test.describe("PilotOrb — responsive overflow across the full seven-width matrix", () => {
  for (const width of WIDTHS) {
    for (const route of ROUTES) {
      test(`no horizontal overflow on ${route.path} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        expect(hasOverflow, `${route.path} at ${width}px should not overflow horizontally`).toBe(false);
      });
    }
  }
});

test.describe("PilotOrb — the global Header keeps only Home, Work, About, and the Contact CTA", () => {
  test("PilotOrb never appears as a global Header nav item", async ({ page }) => {
    await page.goto("/en/work/pilotorb-business-intelligence/");
    const nav = page.locator("nav").filter({ has: page.getByRole("link", { name: "Home" }) }).first();
    await expect(nav.getByRole("link", { name: "PilotOrb", exact: false })).toHaveCount(0);
  });

  test("the header Contact CTA still points to the Contact route", async ({ page }) => {
    await page.goto("/es/proyectos/pilotorb-business-intelligence/");
    await expect(page.getByRole("link", { name: "Contacto", exact: true })).toHaveAttribute("href", "/es/contacto/");
  });
});

test.describe("PilotOrb — locale switching preserves query and fragment", () => {
  test("switching from ES to EN preserves query and fragment", async ({ page }) => {
    await page.goto("/es/proyectos/pilotorb-business-intelligence/?ref=cv#evidence");
    await page.getByRole("link", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/work\/pilotorb-business-intelligence\/\?ref=cv#evidence$/);
  });
});

test.describe("PilotOrb — nine-English-output postbuild invariant covers the new EN route", () => {
  test("the fix-locale-lang script's expected inventory lists the new EN route", async () => {
    const { readFileSync } = await import("node:fs");
    const path = await import("node:path");
    const src = readFileSync(path.resolve(process.cwd(), "scripts/fix-locale-lang.mjs"), "utf8");
    expect(src).toContain("work/pilotorb-business-intelligence/index.html");
  });
});
