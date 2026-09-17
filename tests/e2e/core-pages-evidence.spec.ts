import { test, expect } from "@playwright/test";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "evidence/p7/screenshots");

const captures: Array<{ route: string; width: number; file: string }> = [
  { route: "/es/sobre-mi/", width: 390, file: "about-es-390.png" },
  { route: "/es/sobre-mi/", width: 768, file: "about-es-768.png" },
  { route: "/es/sobre-mi/", width: 1440, file: "about-es-1440.png" },
  { route: "/en/about/", width: 390, file: "about-en-390.png" },
  { route: "/en/about/", width: 768, file: "about-en-768.png" },
  { route: "/en/about/", width: 1440, file: "about-en-1440.png" },
  { route: "/es/proyectos/", width: 390, file: "work-es-390.png" },
  { route: "/es/proyectos/", width: 768, file: "work-es-768.png" },
  { route: "/es/proyectos/", width: 1440, file: "work-es-1440.png" },
  { route: "/en/work/", width: 390, file: "work-en-390.png" },
  { route: "/en/work/", width: 768, file: "work-en-768.png" },
  { route: "/en/work/", width: 1440, file: "work-en-1440.png" },
  { route: "/es/contacto/", width: 390, file: "contact-es-390.png" },
  { route: "/es/contacto/", width: 768, file: "contact-es-768.png" },
  { route: "/es/contacto/", width: 1440, file: "contact-es-1440.png" },
  { route: "/en/contact/", width: 390, file: "contact-en-390.png" },
  { route: "/en/contact/", width: 768, file: "contact-en-768.png" },
  { route: "/en/contact/", width: 1440, file: "contact-en-1440.png" },
];

test.describe("P7 — 18 static-export screenshots for visual evidence", () => {
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
