import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const ROUTES = [
  { path: "/es/proyectos/ronald-parra-digital-health-ecosystem/", locale: "es", status: "CASO DOCUMENTADO · PROYECTO EN EVOLUCIÓN" },
  { path: "/en/work/ronald-parra-digital-health-ecosystem/", locale: "en", status: "DOCUMENTED CASE · EVOLVING PROJECT" },
] as const;

test.describe("Ronald Parra bilingual case study", () => {
  test.describe.configure({ mode: "serial" });

  for (const route of ROUTES) {
    test(`${route.path} renders the approved semantic and privacy-safe contract`, async ({ page, context }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.getByText(route.status, { exact: true }).first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: /breadcrumb|ruta de navegación/i })).toBeVisible();
      await expect(page.locator("main figure")).toHaveCount(4);
      const evidenceImages = page.locator("main img[src*='/ronald-parra/']");
      await expect(evidenceImages).toHaveCount(4);
      for (const image of await evidenceImages.all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(async (node) => {
          const imageNode = node as HTMLImageElement;
          if (!imageNode.complete) {
            await new Promise<void>((resolve, reject) => {
              imageNode.addEventListener("load", () => resolve(), { once: true });
              imageNode.addEventListener(
                "error",
                () => reject(new Error(`Failed to load ${imageNode.currentSrc || imageNode.src}`)),
                { once: true },
              );
            });
          }
          const source = imageNode.currentSrc || imageNode.src;
          try {
            await imageNode.decode();
          } catch (error) {
            throw new Error(`Failed to decode ${source}: ${error instanceof Error ? error.message : String(error)}`);
          }
        });
        const imageState = await image.evaluate((node) => {
          const imageNode = node as HTMLImageElement;
          return {
            src: imageNode.currentSrc || imageNode.src,
            width: imageNode.naturalWidth,
            height: imageNode.naturalHeight,
          };
        });
        expect(imageState, `Expected a decoded evidence image: ${imageState.src}`).toMatchObject({
          width: expect.any(Number),
          height: expect.any(Number),
        });
        expect(imageState.width, `Expected a decoded evidence image: ${imageState.src}`).toBeGreaterThan(0);
        expect(imageState.height, `Expected a decoded evidence image: ${imageState.src}`).toBeGreaterThan(0);
      }
      await expect(page.locator("form, input, textarea")).toHaveCount(0);
      expect(await context.cookies()).toEqual([]);
      expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({
        local: 0,
        session: 0,
      });
    });
  }

  test("locale switching preserves the equivalent case route", async ({ page }) => {
    await page.goto("/es/proyectos/ronald-parra-digital-health-ecosystem/");
    const switcher = page.locator('[aria-label="Selector de idioma"]:visible');
    await expect(switcher.getByRole("link", { name: "EN", exact: true })).toHaveAttribute(
      "href",
      "/en/work/ronald-parra-digital-health-ecosystem/",
    );
  });

  test("simulator attribution is explicit in both languages", async ({ page }) => {
    await page.goto(ROUTES[0].path);
    await expect(page.getByText(/Dr\. Ronald Parra concibió y diseñó el simulador/)).toBeVisible();
    await page.goto(ROUTES[1].path);
    await expect(page.getByText(/Dr\. Ronald Parra conceived and designed the simulator/)).toBeVisible();
  });

  test("public actions have safe external semantics and the internal return stays local", async ({ page }) => {
    await page.goto(ROUTES[0].path);
    for (const name of ["Ver website", "Abrir simulador"]) {
      const link = page.getByRole("link", { name });
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noreferrer noopener");
    }
    await expect(page.getByRole("link", { name: "Volver a proyectos" })).toHaveAttribute("href", "/es/proyectos/");
  });

  test("passes automated accessibility checks on the Spanish and English routes", async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route.path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    }
  });
});
