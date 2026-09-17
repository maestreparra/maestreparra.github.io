import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const CASE_ROUTES: Array<{ path: string; locale: "es" | "en" }> = [
  { path: "/es/proyectos/vitalink-digital-ecosystem/", locale: "es" },
  { path: "/en/work/vitalink-digital-ecosystem/", locale: "en" },
  { path: "/es/proyectos/bm-envios-digital-experience/", locale: "es" },
  { path: "/en/work/bm-envios-digital-experience/", locale: "en" },
];

const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];

test.describe("P9-QA — direct entry to all four Case Study routes", () => {
  for (const route of CASE_ROUTES) {
    test(`${route.path} returns 200 and the correct <html lang>`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    });
  }
});

test.describe("P9-QA — one H1 and one main landmark per Case Study route", () => {
  for (const route of CASE_ROUTES) {
    test(`${route.path} has exactly one H1 and one main`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
    });
  }
});

test.describe("P9-QA — skip link and semantic breadcrumb on every Case Study route", () => {
  for (const route of CASE_ROUTES) {
    test(`${route.path} has a working skip link and a labelled breadcrumb nav`, async ({ page }) => {
      await page.goto(route.path);
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("#main-content")).toBeVisible();
      const breadcrumbNav = page.getByRole("navigation", { name: /breadcrumb|ruta de navegación/i });
      await expect(breadcrumbNav).toBeVisible();
    });
  }
});

test.describe("P9 Correction Attempt 2 (QA-03) — the breadcrumb is a functional navigation, not plain text", () => {
  test("ES: the parent crumb is a real link to Work and the current crumb carries aria-current", async ({ page }) => {
    await page.goto("/es/proyectos/vitalink-digital-ecosystem/");
    const nav = page.getByRole("navigation", { name: "Ruta de navegación" });
    const parentLink = nav.getByRole("link", { name: "PROYECTOS" });
    await expect(parentLink).toHaveAttribute("href", "/es/proyectos/");
    const current = nav.locator('[aria-current="page"]');
    await expect(current.locator(".u-desktop-only")).toHaveText("VITALINK DIGITAL ECOSYSTEM");
    await expect(current.locator(".u-desktop-only")).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(1);
  });

  test("EN: the parent crumb is a real link to Work and the current crumb carries aria-current", async ({ page }) => {
    await page.goto("/en/work/bm-envios-digital-experience/");
    const nav = page.getByRole("navigation", { name: "Breadcrumb" });
    const parentLink = nav.getByRole("link", { name: "WORK" });
    await expect(parentLink).toHaveAttribute("href", "/en/work/");
    const current = nav.locator('[aria-current="page"]');
    await expect(current.locator(".u-desktop-only")).toHaveText("BM ENVIOS DIGITAL EXPERIENCE");
    await expect(current.locator(".u-desktop-only")).toBeVisible();
  });

  test("keyboard users can reach the Work link from the breadcrumb and navigate to it", async ({ page }) => {
    await page.goto("/es/proyectos/vitalink-digital-ecosystem/");
    const parentLink = page.getByRole("navigation", { name: "Ruta de navegación" }).getByRole("link", { name: "PROYECTOS" });
    await parentLink.focus();
    await expect(parentLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/es\/proyectos\/$/);
  });

  test("each Case Study route has exactly one breadcrumb nav with one parent link and one current item", async ({ page }) => {
    for (const route of CASE_ROUTES) {
      await page.goto(route.path);
      const nav = page.getByRole("navigation", { name: /breadcrumb|ruta de navegación/i });
      await expect(nav).toHaveCount(1);
      await expect(nav.getByRole("link")).toHaveCount(1);
      await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
    }
  });
});

test.describe("P9-QA — visible publication status on every Case Study route", () => {
  test("VitaLink shows CASO PUBLICADO / PUBLISHED CASE", async ({ page }) => {
    await page.goto("/es/proyectos/vitalink-digital-ecosystem/");
    await expect(page.getByText("CASO PUBLICADO").first()).toBeVisible();
    await page.goto("/en/work/vitalink-digital-ecosystem/");
    await expect(page.getByText("PUBLISHED CASE", { exact: true }).first()).toBeVisible();
  });

  test("BM Envíos shows REFINAMIENTO FINAL / FINAL REFINEMENT", async ({ page }) => {
    await page.goto("/es/proyectos/bm-envios-digital-experience/");
    await expect(page.getByText("REFINAMIENTO FINAL").first()).toBeVisible();
    await page.goto("/en/work/bm-envios-digital-experience/");
    await expect(page.getByText("FINAL REFINEMENT").first()).toBeVisible();
  });
});

test.describe("P9-QA — verified external actions and the internal Contact action", () => {
  test("VitaLink links safely to the verified live site and the public repository, never to Express", async ({ page }) => {
    await page.goto("/en/work/vitalink-digital-ecosystem/");
    const site = page.getByRole("link", { name: "View VitaLink Courier" });
    await expect(site).toHaveAttribute("href", "https://www.vitalinkcouriers.com/");
    await expect(site).toHaveAttribute("target", "_blank");
    await expect(site).toHaveAttribute("rel", "noreferrer noopener");
    const repo = page.getByRole("link", { name: "Review GitHub" });
    await expect(repo).toHaveAttribute("href", "https://github.com/maestreparra/vitalink-digital-ecosystem");
    const hrefs = await page.locator("a[href]").evaluateAll((links) => links.map((l) => l.getAttribute("href")));
    for (const href of hrefs) {
      expect(href).not.toContain("express.vitalinkcouriers.com");
    }
  });

  test("BM Envíos links safely to the public repository and internally to Contact, with no client-website link", async ({
    page,
  }) => {
    await page.goto("/es/proyectos/bm-envios-digital-experience/");
    const repo = page.getByRole("link", { name: "Revisar GitHub" });
    await expect(repo).toHaveAttribute("href", "https://github.com/maestreparra/bm-envios-digital-platform");
    await expect(repo).toHaveAttribute("target", "_blank");
    const contactAction = page.getByRole("link", { name: "Hablemos" });
    await expect(contactAction).toHaveAttribute("href", "/es/contacto/");
    await expect(contactAction).not.toHaveAttribute("target", "_blank");
  });
});

test.describe("P9-QA — evidence figures render the approved images with captions", () => {
  test("VitaLink renders the authorized cover image at both breakpoints, with a caption", async ({ page }) => {
    await page.goto("/es/proyectos/vitalink-digital-ecosystem/");
    // One <img> per breakpoint (mobile/desktop figure-box height), same authorized source.
    const image = page.locator("img[src*='vitalink-case-study-cover']");
    await expect(image).toHaveCount(2);
    await expect(page.locator("figcaption")).toContainText("Cover autorizado");
  });

  test("BM Envíos ES renders the ES desktop and mobile evidence images in the DOM", async ({ page }) => {
    await page.goto("/es/proyectos/bm-envios-digital-experience/");
    await expect(page.locator("img[src*='home-desktop-es']")).toHaveCount(1);
    await expect(page.locator("img[src*='home-mobile-es']")).toHaveCount(1);
  });

  test("BM Envíos EN renders the distinct EN desktop and mobile evidence images, not the ES ones", async ({ page }) => {
    await page.goto("/en/work/bm-envios-digital-experience/");
    await expect(page.locator("img[src*='services-desktop-en']")).toHaveCount(1);
    await expect(page.locator("img[src*='registration-mobile-en']")).toHaveCount(1);
    await expect(page.locator("img[src*='home-desktop-es']")).toHaveCount(0);
    await expect(page.locator("img[src*='home-mobile-es']")).toHaveCount(0);
  });
});

test.describe("P9-QA — no form controls, cookies, or storage on any Case Study route", () => {
  for (const route of CASE_ROUTES) {
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

test.describe("P9 Correction Attempt 2 (QA-04) — zero fetch/XHR/sendBeacon on every Case Study route", () => {
  for (const route of CASE_ROUTES) {
    test(`${route.path} never calls fetch, XHR, or sendBeacon while navigating and clicking every internal link`, async ({
      page,
      context,
    }) => {
      const transportCalls: string[] = [];
      await page.exposeFunction("__recordCaseStudyTransport", (call: string) => {
        transportCalls.push(call);
      });

      // Test-only instrumentation installed before any page script runs;
      // the exposed recorder survives full-page navigation while each new
      // document receives fresh wrappers. Nothing here ships in production.
      await page.addInitScript(() => {
        const record = (label: string) =>
          (window as unknown as { __recordCaseStudyTransport: (call: string) => Promise<void> })
            .__recordCaseStudyTransport(label);
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

      const internalHrefs = await page.locator("main a[href^='/']").evaluateAll((links) =>
        Array.from(new Set(links.map((link) => link.getAttribute("href")).filter((href): href is string => Boolean(href)))),
      );
      expect(internalHrefs.length).toBeGreaterThan(0);

      // Exercise every real same-origin action from a fresh copy of the Case
      // Study page. These are plain anchors, so navigation uses a normal
      // document request; the wrapped application primitives must remain
      // untouched before and after each click.
      for (const href of internalHrefs) {
        await page.goto(route.path);
        await page.locator(`main a[href="${href}"]:visible`).first().click();
        await page.waitForLoadState("domcontentloaded");
        expect(new URL(page.url()).pathname).toBe(new URL(href, "http://portfolio.test").pathname);
      }

      expect(transportCalls, JSON.stringify(transportCalls)).toEqual([]);

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

test.describe("P9 Sol takeover — exact mobile facts, limitations, links, and breadcrumb copy", () => {
  const mobileCases = [
    {
      path: "/es/proyectos/vitalink-digital-ecosystem/",
      breadcrumb: "VITALINK",
      facts: ["tests aprobados", "rutas prerenderizadas", "bundle raw reducido", "paridad ES/EN", "orígenes canonical", "vulnerabilidades"],
      limitations: "Sin claims de conversión o ingresos. Sin pagos, tracking ni backend. Express no es enlace activo mientras responda 404.",
      linksTitle: "Explora el caso.",
      linksBody: "Producto y código verificables.",
    },
    {
      path: "/en/work/vitalink-digital-ecosystem/",
      breadcrumb: "VITALINK",
      facts: ["passing tests", "prerendered routes", "raw bundle reduction", "ES/EN parity", "canonical origins", "vulnerabilities"],
      limitations: "No conversion or revenue claims. No payments, tracking, or backend. Express stays inactive while returning 404.",
      linksTitle: "Explore the case.",
      linksBody: "Inspectable product and code.",
    },
    {
      path: "/es/proyectos/bm-envios-digital-experience/",
      breadcrumb: "BM ENVÍOS",
      facts: ["canonical localizadas", "páginas estáticas", "tests unitarios", "Playwright", "axe serious/critical", "vulnerabilidades"],
      limitations: "Sin backend, pagos, tracking, autenticación ni operaciones reales. Sin claims no confirmados.",
      linksTitle: "Inspecciona la baseline.",
      linksBody: "Código y evidencia pública.",
    },
    {
      path: "/en/work/bm-envios-digital-experience/",
      breadcrumb: "BM ENVIOS",
      facts: ["localized canonicals", "static pages", "unit tests", "Playwright", "serious/critical axe", "vulnerabilities"],
      limitations: "No backend, payments, tracking, authentication, or real operations. No unconfirmed claims.",
      linksTitle: "Inspect the baseline.",
      linksBody: "Public code and evidence.",
    },
  ];

  for (const expected of mobileCases) {
    test(`${expected.path} renders the frozen 390px copy`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto(expected.path);
      const main = page.locator("main");
      await expect(main.locator('[aria-current="page"] .u-mobile-only')).toHaveText(expected.breadcrumb);
      await expect(main.locator('[aria-current="page"] .u-mobile-only')).toBeVisible();
      const mobileFacts = main.locator("div.u-mobile-only dl");
      for (const label of expected.facts) {
        await expect(mobileFacts.getByText(label, { exact: true })).toBeVisible();
      }
      const mobileOutcome = main.locator("div.u-mobile-only").filter({ hasText: expected.limitations });
      await expect(mobileOutcome.getByText(expected.limitations, { exact: true })).toBeVisible();
      await expect(mobileOutcome.getByText(expected.linksTitle, { exact: true })).toBeVisible();
      await expect(mobileOutcome.getByText(expected.linksBody, { exact: true })).toBeVisible();
    });
  }
});

test.describe("P9-QA — zero serious/critical axe findings across all four Case Study routes", () => {
  for (const route of CASE_ROUTES) {
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

test.describe("P9-QA — responsive overflow across the full seven-width matrix", () => {
  for (const width of WIDTHS) {
    for (const route of CASE_ROUTES) {
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

test.describe("P9 Architecture Amendment 1 — the global Header keeps only Home, Work, About, and the Contact CTA", () => {
  test("the Header nav on a Case Study page still shows Home, Work, About in that order", async ({ page }) => {
    await page.goto("/es/proyectos/vitalink-digital-ecosystem/");
    const nav = page.locator("nav").filter({ has: page.getByRole("link", { name: "Inicio" }) }).first();
    const primaryLinks = nav.getByRole("link").filter({ hasText: /^(Inicio|Proyectos|Sobre mí)$/ });
    await expect(primaryLinks).toHaveCount(3);
    await expect(primaryLinks.nth(0)).toHaveText("Inicio");
    await expect(primaryLinks.nth(1)).toHaveText("Proyectos");
    await expect(primaryLinks.nth(2)).toHaveText("Sobre mí");
  });

  test("VitaLink and BM Envíos never appear as global Header nav items", async ({ page }) => {
    await page.goto("/en/work/bm-envios-digital-experience/");
    const nav = page.locator("nav").filter({ has: page.getByRole("link", { name: "Home" }) }).first();
    await expect(nav.getByRole("link", { name: "VitaLink Digital Ecosystem" })).toHaveCount(0);
    await expect(nav.getByRole("link", { name: "BM Envios Digital Experience" })).toHaveCount(0);
  });

  test("the header Contact CTA still points to the Contact route on a Case Study page", async ({ page }) => {
    await page.goto("/es/proyectos/vitalink-digital-ecosystem/");
    await expect(page.getByRole("link", { name: "Contacto", exact: true })).toHaveAttribute("href", "/es/contacto/");
  });
});

test.describe("P9-QA — locale switching preserves query and fragment on Case Study routes", () => {
  const cases: Array<{ from: string; to: string }> = [
    { from: "/es/proyectos/vitalink-digital-ecosystem/?ref=cv#evidence", to: "/en/work/vitalink-digital-ecosystem/?ref=cv#evidence" },
    {
      from: "/en/work/bm-envios-digital-experience/?ref=cv",
      to: "/es/proyectos/bm-envios-digital-experience/?ref=cv",
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

test.describe("P9 Correction Attempt 2 (QA-01) — page height within ±5% of the frozen Figma frame at 390px and 1440px", () => {
  const frozenHeights: Array<{ path: string; width: number; figmaHeight: number; node: string }> = [
    { path: "/es/proyectos/vitalink-digital-ecosystem/", width: 390, figmaHeight: 6088, node: "46:135" },
    { path: "/es/proyectos/vitalink-digital-ecosystem/", width: 1440, figmaHeight: 4592, node: "46:86" },
    { path: "/en/work/vitalink-digital-ecosystem/", width: 390, figmaHeight: 6114, node: "46:303" },
    { path: "/en/work/vitalink-digital-ecosystem/", width: 1440, figmaHeight: 4544, node: "46:254" },
    { path: "/es/proyectos/bm-envios-digital-experience/", width: 390, figmaHeight: 6176, node: "46:219" },
    { path: "/es/proyectos/bm-envios-digital-experience/", width: 1440, figmaHeight: 4726, node: "46:170" },
    { path: "/en/work/bm-envios-digital-experience/", width: 390, figmaHeight: 6118, node: "46:387" },
    { path: "/en/work/bm-envios-digital-experience/", width: 1440, figmaHeight: 4636, node: "46:338" },
  ];

  for (const { path: routePath, width, figmaHeight, node } of frozenHeights) {
    test(`${routePath} at ${width}px is within ±5% of frozen Figma node ${node} (${figmaHeight}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(routePath);
      const actual = await page.evaluate(() => document.documentElement.scrollHeight);
      const tolerance = figmaHeight * 0.05;
      expect(
        Math.abs(actual - figmaHeight),
        `${routePath} at ${width}px measured ${actual}px vs Figma ${node} (${figmaHeight}px), tolerance ±${tolerance.toFixed(0)}px`,
      ).toBeLessThanOrEqual(tolerance);
    });
  }
});
