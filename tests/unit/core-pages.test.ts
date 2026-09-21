import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/locales";
import { publicRoutes, publicRouteKeys, getRoutePath, buildRouteSwitchHref } from "@/i18n/routes";
import { aboutContent, workContent, contactContent } from "@/content/core-pages";
import { buildAboutStructuredData } from "@/lib/structured-data";

describe("P7/P9 — typed PublicRouteKey parity and exact paths", () => {
  it("defines exactly home, about, work, contact, vitalink, bm-envios, licendi, meeco, pilotorb, and appliedxl", () => {
    expect(publicRouteKeys.sort()).toEqual(
      ["about", "appliedxl", "bm-envios", "contact", "home", "licendi", "meeco", "pilotorb", "vitalink", "work"].sort(),
    );
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
  it("has exactly twelve capabilities in both locales (adds project leadership and stakeholder management)", () => {
    expect(aboutContent.capabilities).toHaveLength(12);
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
  it("orders cards BM Envios, VitaLink, AppliedXL, PilotOrb, Licendi, MEECO, and implies no other employer as a standalone case", () => {
    expect(workContent.projects.map((project) => project.id)).toEqual([
      "bm-envios",
      "vitalink",
      "appliedxl",
      "pilotorb",
      "licendi",
      "meeco",
    ]);
    const allText = JSON.stringify(workContent);
    expect(allText).not.toContain("Prezo");
  });

  it("labels VitaLink published and BM Envios final refinement in both locales", () => {
    const vitalink = workContent.projects.find((project) => project.id === "vitalink");
    const bmEnvios = workContent.projects.find((project) => project.id === "bm-envios");
    expect(vitalink?.publicationStatus).toBe("published");
    expect(vitalink?.status.es).toBe("CASO PUBLICADO");
    expect(bmEnvios?.publicationStatus).toBe("final-refinement");
    expect(bmEnvios?.status.en).toBe("FINAL REFINEMENT");
  });

  it("VitaLink and BM Envios link to their approved public GitHub repository", () => {
    for (const id of ["vitalink", "bm-envios"]) {
      const project = workContent.projects.find((p) => p.id === id);
      expect(project?.repositoryUrl).toMatch(/^https:\/\/github\.com\/maestreparra\//);
    }
  });

  it("Licendi and MEECO fall back to their approved public-reference URL, superseded by caseStudyRouteKey (P5-QA)", () => {
    const licendi = workContent.projects.find((p) => p.id === "licendi");
    const meeco = workContent.projects.find((p) => p.id === "meeco");
    expect(licendi?.repositoryUrl).toBe("https://licendi.com/es/");
    expect(licendi?.caseStudyRouteKey).toBe("licendi");
    expect(meeco?.repositoryUrl).toBe("https://meeco-group.com/");
    expect(meeco?.caseStudyRouteKey).toBe("meeco");
  });
});

describe("P11 — Contact's professional links and direct-contact contract", () => {
  it("has exactly LinkedIn, GitHub, and Behance, in that order", () => {
    expect(contactContent.links.map((link) => link.id)).toEqual(["linkedin", "github", "behance"]);
  });

  it("uses the approved external destinations", () => {
    expect(contactContent.links.find((l) => l.id === "linkedin")?.href).toBe("https://www.linkedin.com/in/maestreparra/");
    expect(contactContent.links.find((l) => l.id === "github")?.href).toBe("https://github.com/maestreparra");
    expect(contactContent.links.find((l) => l.id === "behance")?.href).toBe("https://www.behance.net/giomarmaestre/");
  });

  it("uses the approved phone number and exactly two privacy-preserving contact protocols", () => {
    expect(contactContent.directContact.phoneDisplay).toBe("+58 422 144 5743");
    expect(contactContent.directContact.actions).toEqual([
      expect.objectContaining({ id: "whatsapp", href: "https://wa.me/584221445743" }),
      expect.objectContaining({ id: "messages", href: "sms:+584221445743" }),
    ]);
    expect(JSON.stringify(contactContent.directContact)).not.toContain("tel:");
  });

  it("contains no email address, form endpoint, prefilled message, or tracking parameter", () => {
    const allText = JSON.stringify(contactContent);
    expect(allText).not.toMatch(/@[a-z0-9.-]+\.[a-z]{2,}/i);
    expect(allText).not.toMatch(/mailto:|api\/|webhook|utm_|[?&](?:text|body)=/i);
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

describe("P7/P9 — sitemap inventory", () => {
  const sitemap = readFileSync(path.resolve(process.cwd(), "public/sitemap.xml"), "utf8");

  it("contains exactly the twenty localized Home/Core Pages/Case Study URLs (adds AppliedXL)", () => {
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
        "https://maestreparra.github.io/es/proyectos/vitalink-digital-ecosystem/",
        "https://maestreparra.github.io/en/work/vitalink-digital-ecosystem/",
        "https://maestreparra.github.io/es/proyectos/bm-envios-digital-experience/",
        "https://maestreparra.github.io/en/work/bm-envios-digital-experience/",
        "https://maestreparra.github.io/es/proyectos/licendi-ecommerce-brand-experience/",
        "https://maestreparra.github.io/en/work/licendi-ecommerce-brand-experience/",
        "https://maestreparra.github.io/es/proyectos/meeco-renewable-energy-website/",
        "https://maestreparra.github.io/en/work/meeco-renewable-energy-website/",
        "https://maestreparra.github.io/es/proyectos/pilotorb-business-intelligence/",
        "https://maestreparra.github.io/en/work/pilotorb-business-intelligence/",
        "https://maestreparra.github.io/es/proyectos/appliedxl-ai-data-platform/",
        "https://maestreparra.github.io/en/work/appliedxl-ai-data-platform/",
      ].sort(),
    );
  });

  it("excludes the root resolver and the 404 route", () => {
    expect(sitemap).not.toMatch(/<loc>https:\/\/maestreparra\.github\.io\/<\/loc>/);
    expect(sitemap).not.toContain("404");
  });
});
