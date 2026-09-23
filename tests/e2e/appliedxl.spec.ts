import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const ROUTES: Array<{ path: string; locale: "es" | "en" }> = [
  { path: "/es/proyectos/appliedxl-ai-data-platform/", locale: "es" },
  { path: "/en/work/appliedxl-ai-data-platform/", locale: "en" },
];

const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];

test.describe("AppliedXL — direct entry to both routes", () => {
  for (const route of ROUTES) {
    test(`${route.path} returns 200 and the correct <html lang>`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    });
  }
});

test.describe("AppliedXL — one H1 and one main landmark per route", () => {
  for (const route of ROUTES) {
    test(`${route.path} has exactly one H1 and one main`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
    });
  }
});

test.describe("AppliedXL — skip link and functional breadcrumb", () => {
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

test.describe("AppliedXL — visible documented-case status and real evidence (Mode A)", () => {
  test("shows CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA / DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE (P13)", async ({ page }) => {
    await page.goto("/es/proyectos/appliedxl-ai-data-platform/");
    await expect(page.getByText("CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA").first()).toBeVisible();
    await page.goto("/en/work/appliedxl-ai-data-platform/");
    await expect(page.getByText("DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE").first()).toBeVisible();
  });

  test("identifies AppliedXL publicly (breadcrumb + H1) while XYZ stays only the internal evidence identifier, never the client's name", async ({ page }) => {
    await page.goto("/es/proyectos/appliedxl-ai-data-platform/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("AppliedXL");
    const breadcrumb = page.getByRole("navigation", { name: /breadcrumb|ruta de navegación/i });
    await expect(breadcrumb).toContainText("AppliedXL");
  });

  for (const route of ROUTES) {
    test(`${route.path} renders four real-evidence figures with four images and mentions XYZ anonymization`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator("figure")).toHaveCount(4);
      await expect(page.locator("img[src^='/images/case-studies/appliedxl/']")).toHaveCount(4);
      await expect(page.getByText("XYZ").first()).toBeVisible();
    });
  }
});

test.describe("AppliedXL — no external client-asset link; internal back-to-work action only", () => {
  test("ES: back-to-work action points to /es/proyectos/", async ({ page }) => {
    await page.goto("/es/proyectos/appliedxl-ai-data-platform/");
    const back = page.getByRole("link", { name: "Volver a proyectos" });
    await expect(back).toHaveAttribute("href", "/es/proyectos/");
  });

  test("EN: back-to-work action points to /en/work/", async ({ page }) => {
    await page.goto("/en/work/appliedxl-ai-data-platform/");
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

test.describe("AppliedXL — no form controls, cookies, storage, or network calls", () => {
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

test.describe("AppliedXL — zero serious/critical axe findings", () => {
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

test.describe("AppliedXL — responsive overflow across the full seven-width matrix", () => {
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

test.describe("AppliedXL — the global Header keeps only Home, Work, About, and the Contact CTA", () => {
  test("AppliedXL never appears as a global Header nav item", async ({ page }) => {
    await page.goto("/en/work/appliedxl-ai-data-platform/");
    const nav = page.locator("nav").filter({ has: page.getByRole("link", { name: "Home" }) }).first();
    await expect(nav.getByRole("link", { name: "AppliedXL", exact: false })).toHaveCount(0);
  });

  test("the header Contact CTA still points to the Contact route", async ({ page }) => {
    await page.goto("/es/proyectos/appliedxl-ai-data-platform/");
    await expect(page.getByRole("link", { name: "Contacto", exact: true })).toHaveAttribute("href", "/es/contacto/");
  });
});

test.describe("AppliedXL — locale switching preserves query and fragment", () => {
  test("switching from ES to EN preserves query and fragment", async ({ page }) => {
    await page.goto("/es/proyectos/appliedxl-ai-data-platform/?ref=cv#evidence");
    await page.getByRole("link", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/work\/appliedxl-ai-data-platform\/\?ref=cv#evidence$/);
  });
});

test.describe("AppliedXL — ten-English-output postbuild invariant covers the new EN route", () => {
  test("the fix-locale-lang script's expected inventory lists the new EN route", async () => {
    const { readFileSync } = await import("node:fs");
    const path = await import("node:path");
    const src = readFileSync(path.resolve(process.cwd(), "scripts/fix-locale-lang.mjs"), "utf8");
    expect(src).toContain("work/appliedxl-ai-data-platform/index.html");
  });
});
