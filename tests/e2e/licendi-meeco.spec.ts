import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const ROUTES: Array<{ path: string; locale: "es" | "en" }> = [
  { path: "/es/proyectos/licendi-ecommerce-brand-experience/", locale: "es" },
  { path: "/en/work/licendi-ecommerce-brand-experience/", locale: "en" },
  { path: "/es/proyectos/meeco-renewable-energy-website/", locale: "es" },
  { path: "/en/work/meeco-renewable-energy-website/", locale: "en" },
];

const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];

test.describe("P5-QA — direct entry to all four Licendi/MEECO routes", () => {
  for (const route of ROUTES) {
    test(`${route.path} returns 200 and the correct <html lang>`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    });
  }
});

test.describe("P5-QA — one H1 and one main landmark per route", () => {
  for (const route of ROUTES) {
    test(`${route.path} has exactly one H1 and one main`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
    });
  }
});

test.describe("P5-QA — skip link and functional breadcrumb on every route", () => {
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
      await expect(breadcrumbNav.locator('[aria-current="page"]')).toHaveCount(1);
    });
  }
});

test.describe("P5-QA — the breadcrumb parent always links to Work", () => {
  test("ES: the parent crumb links to /es/proyectos/", async ({ page }) => {
    await page.goto("/es/proyectos/licendi-ecommerce-brand-experience/");
    const nav = page.getByRole("navigation", { name: "Ruta de navegación" });
    await expect(nav.getByRole("link")).toHaveAttribute("href", "/es/proyectos/");
  });

  test("EN: the parent crumb links to /en/work/", async ({ page }) => {
    await page.goto("/en/work/meeco-renewable-energy-website/");
    const nav = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(nav.getByRole("link")).toHaveAttribute("href", "/en/work/");
  });
});

test.describe("P5-QA — visible documented-case status badge on every route", () => {
  test("Licendi shows CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA / DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE (Mode A, P13)", async ({ page }) => {
    await page.goto("/es/proyectos/licendi-ecommerce-brand-experience/");
    await expect(page.getByText("CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA").first()).toBeVisible();
    await page.goto("/en/work/licendi-ecommerce-brand-experience/");
    await expect(page.getByText("DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE").first()).toBeVisible();
  });

  test("MEECO shows CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA / DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE (Mode A, P13)", async ({ page }) => {
    await page.goto("/es/proyectos/meeco-renewable-energy-website/");
    await expect(page.getByText("CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA").first()).toBeVisible();
    await page.goto("/en/work/meeco-renewable-energy-website/");
    await expect(page.getByText("DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE").first()).toBeVisible();
  });
});

test.describe("P13 — recruiter-first progressive evidence disclosure", () => {
  test("Licendi ES: 5 featured evidence figures are visible before expanding; the disclosure reveals the remaining 5 (10 total, none deleted)", async ({ page }) => {
    await page.goto("/es/proyectos/licendi-ecommerce-brand-experience/");
    await expect(page.locator("figure")).toHaveCount(10);
    const details = page.locator("details", { has: page.getByText("Explorar evidencia adicional") });
    await expect(details.locator("figure")).toHaveCount(5);
    await details.locator("summary").click();
    await expect(page.getByText("Ocultar evidencia adicional")).toBeVisible();
    await expect(details.locator("figure")).toHaveCount(5);
    await expect(page.locator("figure")).toHaveCount(10);
  });

  test("MEECO EN: the disclosure control is keyboard-operable and toggles the translated label", async ({ page }) => {
    await page.goto("/en/work/meeco-renewable-energy-website/");
    const summary = page.locator("summary", { hasText: "Explore additional evidence" });
    await summary.focus();
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByText("Hide additional evidence")).toBeVisible();
  });

  test("the disclosure adds no cookies, storage, fetch, XHR, or sendBeacon calls when toggled (P13 Correction 2, C4)", async ({ page, context }) => {
    // The title previously claimed "no network calls" but only checked
    // cookies/storage — it never actually observed fetch/XHR/sendBeacon.
    // Instrumented the same way as the "zero fetch/XHR/sendBeacon on every
    // route" suite above, so the toggle is genuinely proven silent.
    const transportCalls: string[] = [];
    await page.exposeFunction("__recordDisclosureTransport", (call: string) => {
      transportCalls.push(call);
    });
    await page.addInitScript(() => {
      const record = (label: string) =>
        (window as unknown as { __recordDisclosureTransport: (call: string) => Promise<void> })
          .__recordDisclosureTransport(label);
      const originalFetch = window.fetch;
      window.fetch = (...args: Parameters<typeof fetch>) => {
        void record(`fetch:${String(args[0])}`);
        return originalFetch(...args);
      };
      const originalOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = new Proxy(originalOpen, {
        apply(target, thisArg, args) {
          void record(`xhr:${String(args[1])}`);
          return Reflect.apply(target, thisArg, args);
        },
      });
      navigator.sendBeacon = ((url: string | URL) => {
        void record(`beacon:${String(url)}`);
        return true;
      }) as typeof navigator.sendBeacon;
    });

    await page.goto("/es/proyectos/licendi-ecommerce-brand-experience/");
    // Reset the count so only calls made by the toggle itself are measured
    // (page load may legitimately differ from the toggle's own behavior).
    transportCalls.length = 0;

    const summary = page.locator("summary", { hasText: "Explorar evidencia adicional" });
    await summary.click();

    expect(transportCalls, `unexpected transport calls from the disclosure toggle: ${JSON.stringify(transportCalls)}`).toEqual([]);

    const cookies = await context.cookies();
    expect(cookies).toEqual([]);
    const storage = await page.evaluate(() => ({
      localStorage: window.localStorage.length,
      sessionStorage: window.sessionStorage.length,
    }));
    expect(storage).toEqual({ localStorage: 0, sessionStorage: 0 });
  });
});

test.describe("P5-QA — external public-reference link and internal related-case/back-to-work links", () => {
  test("Licendi EN links out to licendi.com and internally to the MEECO case and Work", async ({ page }) => {
    await page.goto("/en/work/licendi-ecommerce-brand-experience/");
    const external = page.getByRole("link", { name: "Visit the current website" });
    await expect(external).toHaveAttribute("href", "https://licendi.com/es/");
    await expect(external).toHaveAttribute("target", "_blank");
    await expect(external).toHaveAttribute("rel", "noreferrer noopener");
    const related = page.getByRole("link", { name: "View the related MEECO case" });
    await expect(related).toHaveAttribute("href", "/en/work/meeco-renewable-energy-website/");
    const back = page.getByRole("link", { name: "Back to Work" });
    await expect(back).toHaveAttribute("href", "/en/work/");
  });

  test("MEECO ES links out to meeco-group.com and internally to the Licendi case and Proyectos", async ({ page }) => {
    await page.goto("/es/proyectos/meeco-renewable-energy-website/");
    const external = page.getByRole("link", { name: "Visitar el website actual" });
    await expect(external).toHaveAttribute("href", "https://meeco-group.com/");
    await expect(external).toHaveAttribute("target", "_blank");
    const related = page.getByRole("link", { name: "Ver el caso relacionado de Licendi" });
    await expect(related).toHaveAttribute("href", "/es/proyectos/licendi-ecommerce-brand-experience/");
    const back = page.getByRole("link", { name: "Volver a proyectos" });
    await expect(back).toHaveAttribute("href", "/es/proyectos/");
  });

  test("no route ever links to an unapproved client asset path", async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route.path);
      const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((l) => l.getAttribute("href")));
      for (const href of hrefs) {
        expect(href).not.toMatch(/\/images\/case-studies\//);
      }
    }
  });

  test("MEECO (Mode A) renders exactly its 10 agency-authorized images, all served from /images/case-studies/meeco/", async ({ page }) => {
    for (const path of [
      "/es/proyectos/meeco-renewable-energy-website/",
      "/en/work/meeco-renewable-energy-website/",
    ]) {
      await page.goto(path);
      const imgSrcs = await page.locator("main img[src]").evaluateAll((imgs) => imgs.map((i) => i.getAttribute("src")));
      expect(imgSrcs).toHaveLength(10);
      for (const src of imgSrcs) {
        expect(src).toMatch(/^\/images\/case-studies\/meeco\//);
      }
    }
  });

  test("Licendi (Mode A) renders exactly its 15 agency-authorized images, all served from /images/case-studies/licendi/", async ({ page }) => {
    for (const path of [
      "/es/proyectos/licendi-ecommerce-brand-experience/",
      "/en/work/licendi-ecommerce-brand-experience/",
    ]) {
      await page.goto(path);
      const imgSrcs = await page.locator("main img[src]").evaluateAll((imgs) => imgs.map((i) => i.getAttribute("src")));
      expect(imgSrcs).toHaveLength(15);
      for (const src of imgSrcs) {
        expect(src).toMatch(/^\/images\/case-studies\/licendi\//);
      }
    }
  });
});

test.describe("P5-QA — MEECO's real-evidence figures never claim to be portfolio reconstructions (Mode A)", () => {
  const meecoRoutes = ROUTES.filter((r) => r.path.includes("meeco"));
  for (const route of meecoRoutes) {
    test(`${route.path} shows 5 real evidence figures (5 product-flow cards, no research/brand sections) and no reconstruction label`, async ({ page }) => {
      await page.goto(route.path);
      const figures = page.locator("figure");
      await expect(figures).toHaveCount(5);
      await expect(page.getByText("RECONSTRUCCIÓN PARA PORTAFOLIO")).toHaveCount(0);
      await expect(page.getByText("PORTFOLIO RECONSTRUCTION")).toHaveCount(0);
    });
  }
});

test.describe("P5-QA — Licendi's real-evidence figures never claim to be portfolio reconstructions (Mode A)", () => {
  const licendiRoutes = ROUTES.filter((r) => r.path.includes("licendi"));
  for (const route of licendiRoutes) {
    test(`${route.path} shows 10 real evidence figures (2 research + 3 brand + 5 product-flow cards) and no reconstruction label`, async ({ page }) => {
      await page.goto(route.path);
      const figures = page.locator("figure");
      await expect(figures).toHaveCount(10);
      await expect(page.getByText("RECONSTRUCCIÓN PARA PORTAFOLIO")).toHaveCount(0);
      await expect(page.getByText("PORTFOLIO RECONSTRUCTION")).toHaveCount(0);
    });
  }
});

test.describe("P5-QA — no form controls, cookies, or storage on any Licendi/MEECO route", () => {
  for (const route of ROUTES) {
    test(`${route.path} renders no <form>, <input>, or <textarea>, and sets no cookies/storage`, async ({ page, context }) => {
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

test.describe("P5-QA — zero fetch/XHR/sendBeacon on every route", () => {
  for (const route of ROUTES) {
    test(`${route.path} never calls fetch, XHR, or sendBeacon on load`, async ({ page }) => {
      const transportCalls: string[] = [];
      await page.exposeFunction("__recordLicendiMeecoTransport", (call: string) => {
        transportCalls.push(call);
      });
      await page.addInitScript(() => {
        const record = (label: string) =>
          (window as unknown as { __recordLicendiMeecoTransport: (call: string) => Promise<void> })
            .__recordLicendiMeecoTransport(label);
        const originalFetch = window.fetch;
        window.fetch = (...args: Parameters<typeof fetch>) => {
          void record(`fetch:${String(args[0])}`);
          return originalFetch(...args);
        };
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = new Proxy(originalOpen, {
          apply(target, thisArg, args) {
            void record(`xhr:${String(args[1])}`);
            return Reflect.apply(target, thisArg, args);
          },
        });
        navigator.sendBeacon = ((url: string | URL) => {
          void record(`beacon:${String(url)}`);
          return true;
        }) as typeof navigator.sendBeacon;
      });
      await page.goto(route.path);
      expect(transportCalls, JSON.stringify(transportCalls)).toEqual([]);
    });
  }
});

test.describe("P5-QA — zero serious/critical axe findings across all four routes", () => {
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

test.describe("P5-QA — responsive overflow across the full seven-width matrix", () => {
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

test.describe("P5 Architecture Amendment 1 — the global Header keeps only Home, Work, About, and the Contact CTA", () => {
  test("Licendi and MEECO never appear as global Header nav items", async ({ page }) => {
    await page.goto("/en/work/licendi-ecommerce-brand-experience/");
    const nav = page.locator("nav").filter({ has: page.getByRole("link", { name: "Home" }) }).first();
    await expect(nav.getByRole("link", { name: "Licendi", exact: false })).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "MEECO", exact: false })).toHaveCount(0);
  });

  test("the header Contact CTA still points to the Contact route", async ({ page }) => {
    await page.goto("/es/proyectos/meeco-renewable-energy-website/");
    await expect(page.getByRole("link", { name: "Contacto", exact: true })).toHaveAttribute("href", "/es/contacto/");
  });
});

test.describe("P5-QA — locale switching preserves query and fragment", () => {
  const cases: Array<{ from: string; to: string }> = [
    {
      from: "/es/proyectos/licendi-ecommerce-brand-experience/?ref=cv#evidence",
      to: "/en/work/licendi-ecommerce-brand-experience/?ref=cv#evidence",
    },
    {
      from: "/en/work/meeco-renewable-energy-website/?ref=cv",
      to: "/es/proyectos/meeco-renewable-energy-website/?ref=cv",
    },
  ];

  for (const { from, to } of cases) {
    test(`switching from ${from} lands on ${to}`, async ({ page }) => {
      await page.goto(from);
      const targetLabel = to.startsWith("/en/") ? "EN" : "ES";
      await page.getByRole("link", { name: targetLabel, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(to.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"));
    });
  }
});

// Both Licendi's and MEECO's frozen-Figma-height entries were REMOVED (not
// adjusted) once each case switched to real, agency-authorized evidence
// (Mode A): the page now includes full-length real screenshots instead of
// compact abstract diagrams, so total page height legitimately grew several
// times over. Comparing it to the pre-Mode-A Figma case-study frame no
// longer means anything; see the P5-QA responsive-overflow suite above and
// the visual evidence screenshots for each case's actual layout QA instead.

test.describe("P5-QA — eight-English-output postbuild invariant covers the two new EN routes", () => {
  test("the fix-locale-lang script's expected inventory lists both new EN routes", async () => {
    const { readFileSync } = await import("node:fs");
    const path = await import("node:path");
    const src = readFileSync(path.resolve(process.cwd(), "scripts/fix-locale-lang.mjs"), "utf8");
    expect(src).toContain("work/licendi-ecommerce-brand-experience/index.html");
    expect(src).toContain("work/meeco-renewable-energy-website/index.html");
  });
});
