import { test, expect } from "@playwright/test";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "evidence/licendi-meeco/screenshots");

const captures: Array<{ route: string; width: number; file: string }> = [
  { route: "/es/proyectos/licendi-ecommerce-brand-experience/", width: 390, file: "licendi-es-390.png" },
  { route: "/es/proyectos/licendi-ecommerce-brand-experience/", width: 768, file: "licendi-es-768.png" },
  { route: "/es/proyectos/licendi-ecommerce-brand-experience/", width: 1440, file: "licendi-es-1440.png" },
  { route: "/en/work/licendi-ecommerce-brand-experience/", width: 390, file: "licendi-en-390.png" },
  { route: "/en/work/licendi-ecommerce-brand-experience/", width: 768, file: "licendi-en-768.png" },
  { route: "/en/work/licendi-ecommerce-brand-experience/", width: 1440, file: "licendi-en-1440.png" },
  { route: "/es/proyectos/meeco-renewable-energy-website/", width: 390, file: "meeco-es-390.png" },
  { route: "/es/proyectos/meeco-renewable-energy-website/", width: 768, file: "meeco-es-768.png" },
  { route: "/es/proyectos/meeco-renewable-energy-website/", width: 1440, file: "meeco-es-1440.png" },
  { route: "/en/work/meeco-renewable-energy-website/", width: 390, file: "meeco-en-390.png" },
  { route: "/en/work/meeco-renewable-energy-website/", width: 768, file: "meeco-en-768.png" },
  { route: "/en/work/meeco-renewable-energy-website/", width: 1440, file: "meeco-en-1440.png" },
];

test.describe("P5 — 12 static-export screenshots for visual evidence", () => {
  for (const { route, width, file } of captures) {
    test(`captures ${file} from the static build`, async ({ page }) => {
      mkdirSync(outDir, { recursive: true });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const filePath = path.join(outDir, file);
      await page.screenshot({ path: filePath, fullPage: true });
      expect(existsSync(filePath)).toBe(true);
      expect(statSync(filePath).size).toBeGreaterThan(1000);
    });
  }
});
