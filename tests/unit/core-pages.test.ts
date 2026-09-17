import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/locales";
import { publicRoutes, publicRouteKeys, getRoutePath, buildRouteSwitchHref } from "@/i18n/routes";
import { aboutContent, workContent, contactContent } from "@/content/core-pages";
import { buildAboutStructuredData } from "@/lib/structured-data";

describe("P7 — typed PublicRouteKey parity and exact paths", () => {
  it("defines exactly home, about, work, and contact", () => {
    expect(publicRouteKeys.sort()).toEqual(["about", "contact", "home", "work"]);
  });

  it("has a path for every locale on every route", () => {
    for (const key of publicRouteKeys) {
      for (const locale of locales) {
        expect(publicRoutes[key].paths[locale]).toMatch(/^\//);
      }
    }
  });

  it("matches the exact required paths from the P7 contract", () => {
    expect(getRoutePath("home", "es")).toBe("/es/");
    expect(getRoutePath("home", "en")).toBe("/en/");
    expect(getRoutePath("about", "es")).toBe("/es/sobre-mi/");
    expect(getRoutePath("about", "en")).toBe("/en/about/");
    expect(getRoutePath("work", "es")).toBe("/es/proyectos/");
    expect(getRoutePath("work", "en")).toBe("/en/work/");
    expect(getRoutePath("contact", "es")).toBe("/es/contacto/");
    expect(getRoutePath("contact", "en")).toBe("/en/contact/");
  });

  it("every route is marked indexable", () => {
    for (const key of publicRouteKeys) {
      expect(publicRoutes[key].indexable).toBe(true);
    }
  });
});

describe("P7 — route-aware locale switching preserves query and fragment", () => {
  it("switches About preserving a query string", () => {
    expect(buildRouteSwitchHref("about", "en", "?ref=cv", "")).toBe("/en/about/?ref=cv");
  });

  it("switches Work preserving a fragment", () => {
    expect(buildRouteSwitchHref("work", "es", "", "#legend")).toBe("/es/proyectos/#legend");
  });

  it("switches Contact preserving both", () => {
    expect(buildRouteSwitchHref("contact", "en", "?ref=cv", "#links")).toBe("/en/contact/?ref=cv#links");
  });
});

describe("P7 — About capability and experience inventories", () => {
  it("has exactly ten capabilities in both locales", () => {
    expect(aboutContent.capabilities).toHaveLength(10);
    for (const capability of aboutContent.capabilities) {
      expect(capability.label.es.length).toBeGreaterThan(0);
      expect(capability.label.en.length).toBeGreaterThan(0);
    }
  });

  it("has exactly the five approved factual experience entries", () => {
    expect(aboutContent.experience.map((entry) => entry.id)).toEqual([
      "sbd",
      "appliedxl",
      "prezo",
      "pilotorb",
      "licendi",
    ]);
  });

  it("keeps SBD high-level (no confidential terms) and every entry has a company/role/summary in both locales", () => {
    for (const entry of aboutContent.experience) {
      expect(entry.company.es.length).toBeGreaterThan(0);
      expect(entry.role.en.length).toBeGreaterThan(0);
      expect(entry.summary.es).not.toMatch(/WIOA|SAIL|SGMD|CRM|confidential/i);
    }
  });
});

describe("P7 — Work status labels and case inventory", () => {
  it("has exactly VitaLink and BM Envios, and no other employer implied as a standalone case", () => {
    expect(workContent.projects.map((project) => project.id)).toEqual(["vitalink", "bm-envios"]);
    const allText = JSON.stringify(workContent);
    for (const otherEmployer of ["AppliedXL", "Prezo", "PilotOrb", "Licendi"]) {
      expect(allText).not.toContain(otherEmployer);
    }
  });

  it("labels VitaLink published and BM Envios final refinement in both locales", () => {
    const vitalink = workContent.projects.find((project) => project.id === "vitalink");
    const bmEnvios = workContent.projects.find((project) => project.id === "bm-envios");
    expect(vitalink?.publicationStatus).toBe("published");
    expect(vitalink?.status.es).toBe("CASO PUBLICADO");
    expect(bmEnvios?.publicationStatus).toBe("final-refinement");
    expect(bmEnvios?.status.en).toBe("FINAL REFINEMENT");
  });

  it("every project links to its approved public repository", () => {
    for (const project of workContent.projects) {
      expect(project.repositoryUrl).toMatch(/^https:\/\/github\.com\/maestreparra\//);
    }
  });
});

describe("P7 — Contact's exact link inventory and absence of email/telephone/form", () => {
  it("has exactly LinkedIn, GitHub, and Behance, in that order", () => {
    expect(contactContent.links.map((link) => link.id)).toEqual(["linkedin", "github", "behance"]);
  });

  it("uses the approved external destinations", () => {
    expect(contactContent.links.find((l) => l.id === "linkedin")?.href).toBe("https://www.linkedin.com/in/maestreparra/");
    expect(contactContent.links.find((l) => l.id === "github")?.href).toBe("https://github.com/maestreparra");
    expect(contactContent.links.find((l) => l.id === "behance")?.href).toBe("https://www.behance.net/giomarmaestre/");
  });

  it("never renders an email address or telephone number", () => {
    // The privacy statement legitimately says "does not use forms" in
    // prose — that assertion belongs at the rendered-DOM level (checked by
    // the e2e privacy suite: no <form>/<input> elements), not as a banned
    // word here.
    const allText = JSON.stringify(contactContent);
    expect(allText).not.toMatch(/@[a-z0-9.-]+\.[a-z]{2,}/i);
    expect(allText).not.toMatch(/\+?\d[\d\s().-]{7,}\d/);
  });
});

describe("P7 — ES/EN content-key parity and absence of placeholders", () => {
  it("has non-empty ES and EN values for every LocalizedValue in core-pages content", () => {
    const modules = [aboutContent, workContent, contactContent];
    const pairs: Array<{ es: unknown; en: unknown }> = [];
    const walk = (node: unknown) => {
      if (node && typeof node === "object") {
        if ("es" in node && "en" in node && typeof (node as { es: unknown }).es === "string") {
          pairs.push(node as { es: string; en: string });
          return;
        }
        for (const value of Object.values(node)) walk(value);
      }
    };
    modules.forEach(walk);

    expect(pairs.length).toBeGreaterThan(0);
    for (const pair of pairs) {
      expect((pair.es as string).trim().length).toBeGreaterThan(0);
      expect((pair.en as string).trim().length).toBeGreaterThan(0);
    }
  });

  it("never renders a TODO(...) placeholder or internal gate language", () => {
    const allText = JSON.stringify([aboutContent, workContent, contactContent]);
    expect(allText).not.toMatch(/TODO\(/);
    expect(allText).not.toMatch(/Portfolio Gate|Claudio|Sol \/ Codex/);
  });
});

describe("P7 — About-only structured data", () => {
  it("serializes valid JSON with no unescaped '<' that could close the script tag", () => {
    const serialized = buildAboutStructuredData("es");
    expect(serialized).not.toContain("<");
    expect(() => JSON.parse(serialized)).not.toThrow();
  });

  it("emits ProfilePage/Person with only the three approved public profile links", () => {
    const parsed = JSON.parse(buildAboutStructuredData("en"));
    expect(parsed["@type"]).toBe("ProfilePage");
    expect(parsed.mainEntity["@type"]).toBe("Person");
    expect(parsed.mainEntity.sameAs).toEqual([
      "https://www.linkedin.com/in/maestreparra/",
      "https://github.com/maestreparra",
      "https://www.behance.net/giomarmaestre/",
    ]);
  });

  it("P7-QA-03: jobTitle is the approved public professional title, not the editorial About H1, in both locales", () => {
    const es = JSON.parse(buildAboutStructuredData("es"));
    const en = JSON.parse(buildAboutStructuredData("en"));
    expect(es.mainEntity.jobTitle).toBe("Product Designer & UX Engineer");
    expect(en.mainEntity.jobTitle).toBe("Product Designer & UX Engineer");
    expect(es.mainEntity.jobTitle).not.toBe(aboutContent.title.es);
    expect(en.mainEntity.jobTitle).not.toBe(aboutContent.title.en);
  });

  it("does not emit Product, Service, Organization, Review, or rating schema", () => {
    const serialized = buildAboutStructuredData("es");
    expect(serialized).not.toMatch(/"@type":"(Product|Service|Organization|Review|AggregateRating)"/);
  });
});

describe("P7 — sitemap inventory", () => {
  const sitemap = readFileSync(path.resolve(process.cwd(), "public/sitemap.xml"), "utf8");

  it("contains exactly the eight localized Home/Core Pages URLs", () => {
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    expect(locs.sort()).toEqual(
      [
        "https://maestreparra.github.io/es/",
        "https://maestreparra.github.io/en/",
        "https://maestreparra.github.io/es/sobre-mi/",
        "https://maestreparra.github.io/en/about/",
        "https://maestreparra.github.io/es/proyectos/",
        "https://maestreparra.github.io/en/work/",
        "https://maestreparra.github.io/es/contacto/",
        "https://maestreparra.github.io/en/contact/",
      ].sort(),
    );
  });

  it("excludes the root resolver, 404, and any case-study route", () => {
    expect(sitemap).not.toMatch(/<loc>https:\/\/maestreparra\.github\.io\/<\/loc>/);
    expect(sitemap).not.toContain("404");
    expect(sitemap).not.toContain("vitalink");
    expect(sitemap).not.toContain("bm-envios");
  });
});
