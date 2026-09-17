import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

const ALL_ROUTES: Array<{ path: string; locale: "es" | "en" }> = [
  { path: "/es/", locale: "es" },
  { path: "/en/", locale: "en" },
  { path: "/es/sobre-mi/", locale: "es" },
  { path: "/en/about/", locale: "en" },
  { path: "/es/proyectos/", locale: "es" },
  { path: "/en/work/", locale: "en" },
  { path: "/es/contacto/", locale: "es" },
  { path: "/en/contact/", locale: "en" },
];

test.describe("P7 — direct entry to all six new routes", () => {
  for (const route of ALL_ROUTES) {
    test(`${route.path} returns 200 and the correct <html lang>`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
    });
  }
});

test.describe("P7 — one H1 and one main landmark per route", () => {
  for (const route of ALL_ROUTES) {
    test(`${route.path} has exactly one H1 and one main`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
    });
  }
});

test.describe("P7 — skip link on every new route", () => {
  for (const route of ["/es/sobre-mi/", "/en/about/", "/es/proyectos/", "/en/work/", "/es/contacto/", "/en/contact/"]) {
    test(`${route} has a working skip link`, async ({ page }) => {
      await page.goto(route);
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("#main-content")).toBeVisible();
    });
  }
});

test.describe("P7 — Header route inventory and active-page semantics", () => {
  test("Header nav order is Home, Work, About on the ES About page, with About marked current", async ({ page }) => {
    await page.goto("/es/sobre-mi/");
    const nav = page.locator("nav").filter({ has: page.getByRole("link", { name: "Inicio" }) }).first();
    const links = nav.getByRole("link");
    await expect(links.nth(0)).toHaveText("Inicio");
    await expect(links.nth(1)).toHaveText("Proyectos");
    await expect(links.nth(2)).toHaveText("Sobre mí");
    await expect(page.getByRole("link", { name: "Sobre mí" }).first()).toHaveAttribute("aria-current", "page");
  });

  test("the header Contact button points to the Contact route and is labelled Contacto/Contact", async ({ page }) => {
    await page.goto("/es/");
    await expect(page.getByRole("link", { name: "Contacto", exact: true })).toHaveAttribute("href", "/es/contacto/");
    await page.goto("/en/");
    await expect(page.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute("href", "/en/contact/");
  });
});

test.describe("P7 — Footer route inventory", () => {
  test("Footer Work and About are typed routes; Experience is the Home anchor", async ({ page }) => {
    await page.goto("/es/proyectos/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Proyectos" })).toHaveAttribute("href", "/es/proyectos/");
    await expect(footer.getByRole("link", { name: "Sobre mí" })).toHaveAttribute("href", "/es/sobre-mi/");
    await expect(footer.getByRole("link", { name: "Experiencia" })).toHaveAttribute("href", "/es/#experience");
  });
});

test.describe("P7 — Home CTA migration", () => {
  test("Home primary/secondary/closing CTAs point to Work, About, and Contact", async ({ page }) => {
    await page.goto("/es/");
    await expect(page.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute("href", "/es/proyectos/");
    await expect(page.getByRole("link", { name: "Conocer mi enfoque" })).toHaveAttribute("href", "/es/sobre-mi/");
    await expect(page.getByRole("link", { name: "Iniciar una conversación" })).toHaveAttribute("href", "/es/contacto/");
  });
});

test.describe("P7 — locale switching preserves query and fragment on every route", () => {
  const cases: Array<{ from: string; to: string }> = [
    { from: "/es/sobre-mi/?ref=cv#capabilities", to: "/en/about/?ref=cv#capabilities" },
    { from: "/en/work/?ref=cv#legend", to: "/es/proyectos/?ref=cv#legend" },
    { from: "/es/contacto/?ref=cv", to: "/en/contact/?ref=cv" },
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

test.describe("P7 — mobile disclosure has no duplicate visible/focusable navigation", () => {
  test("only one set of nav links is focusable at 390px on the About page", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/es/sobre-mi/");
    const visibleWorkLinks = await page.getByRole("link", { name: "Proyectos" }).all();
    let visibleCount = 0;
    for (const link of visibleWorkLinks) {
      if (await link.isVisible()) visibleCount += 1;
    }
    expect(visibleCount).toBeLessThanOrEqual(1);
  });
});

test.describe("P9-QA — Work-card actions migrated to the internal case-study routes", () => {
  test("Work page project actions now link to the internal case-study routes, not the external repositories", async ({
    page,
  }) => {
    await page.goto("/es/proyectos/");
    const vitalinkLink = page.getByRole("link", { name: /Ver caso →/ });
    await expect(vitalinkLink).toHaveAttribute("href", "/es/proyectos/vitalink-digital-ecosystem/");
    await expect(vitalinkLink).not.toHaveAttribute("target", "_blank");
    const bmLink = page.getByRole("link", { name: /Ver proyecto →/ });
    await expect(bmLink).toHaveAttribute("href", "/es/proyectos/bm-envios-digital-experience/");
    await expect(bmLink).not.toHaveAttribute("target", "_blank");
  });

  test("the English Work page migrates both cards to the English case-study routes", async ({ page }) => {
    await page.goto("/en/work/");
    const vitalinkLink = page.getByRole("link", { name: /Read case →/ });
    await expect(vitalinkLink).toHaveAttribute("href", "/en/work/vitalink-digital-ecosystem/");
    const bmLink = page.getByRole("link", { name: /View project →/ });
    await expect(bmLink).toHaveAttribute("href", "/en/work/bm-envios-digital-experience/");
  });

  test("each case study still links out to its approved public repository as an explicit external action", async ({
    page,
  }) => {
    await page.goto("/es/proyectos/vitalink-digital-ecosystem/");
    const repoLink = page.getByRole("link", { name: "Revisar GitHub" });
    await expect(repoLink).toHaveAttribute("href", "https://github.com/maestreparra/vitalink-digital-ecosystem");
    await expect(repoLink).toHaveAttribute("target", "_blank");
    await expect(repoLink).toHaveAttribute("rel", "noreferrer noopener");
  });
});

test.describe("P7 — bilingual 404 includes valid Work recovery links", () => {
  test("the 404 page links to both locales' Work index alongside Home", async ({ page }) => {
    const response = await page.goto("/unknown-route-xyz/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute("href", "/es/proyectos/");
    await expect(page.getByRole("link", { name: "View selected work" })).toHaveAttribute("href", "/en/work/");
  });
});

test.describe("P7/P9 — static output English-lang postbuild invariant", () => {
  test("out/en/ six-route English inventory all expose lang=\"en\" and never lang=\"es\" (P9-QA)", () => {
    for (const relativePath of [
      "index.html",
      "about/index.html",
      "work/index.html",
      "contact/index.html",
      "work/vitalink-digital-ecosystem/index.html",
      "work/bm-envios-digital-experience/index.html",
    ]) {
      const html = readFileSync(path.resolve(process.cwd(), "out/en", relativePath), "utf8");
      expect(html, relativePath).toMatch(/<html lang="en"/);
      expect(html, relativePath).not.toMatch(/<html lang="es"/);
    }
  });

  test("out/es/{index,sobre-mi,proyectos,contacto}/*.html all expose lang=\"es\"", () => {
    for (const relativePath of ["index.html", "sobre-mi/index.html", "proyectos/index.html", "contacto/index.html"]) {
      const html = readFileSync(path.resolve(process.cwd(), "out/es", relativePath), "utf8");
      expect(html, relativePath).toMatch(/<html lang="es"/);
    }
  });
});
