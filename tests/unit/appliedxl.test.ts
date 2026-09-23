import { describe, expect, it } from "vitest";
import { appliedxlCaseContent } from "@/content/appliedxl";
import { buildAppliedXLStructuredData } from "@/lib/structured-data";
import { buildRouteMetadata } from "@/lib/metadata";
import { publicRoutes, primaryNavigationRouteKeys } from "@/i18n/routes";
import { workContent } from "@/content/core-pages";
import { locales } from "@/i18n/locales";

describe("AppliedXL — route registry", () => {
  it("registers the route with the single-flow-case-study template and indexable paths", () => {
    const route = publicRoutes.appliedxl;
    expect(route.template).toBe("single-flow-case-study");
    expect(route.indexable).toBe(true);
    expect(route.paths.es).toBe("/es/proyectos/appliedxl-ai-data-platform/");
    expect(route.paths.en).toBe("/en/work/appliedxl-ai-data-platform/");
  });

  it("keeps appliedxl out of the global primary navigation", () => {
    expect(primaryNavigationRouteKeys).not.toContain("appliedxl");
  });
});

describe("AppliedXL — content inventory and bilingual parity", () => {
  const c = appliedxlCaseContent;

  it("has a non-empty ES/EN pair for every top-level copy field", () => {
    const scalarFields = [
      c.breadcrumbParent,
      c.breadcrumbCurrent,
      c.statusLabel,
      c.eyebrow,
      c.title,
      c.introduction,
      c.roleLabel,
      c.role,
      c.scope,
      c.challengeSectionLabel,
      c.challengeTitle,
      c.challengeBody,
      c.responsibilityTitle,
      c.responsibilityBody,
      c.processSectionLabel,
      c.processTitle,
      c.evidenceSectionLabel,
      c.evidenceTitle,
      c.evidenceIntro,
      c.factsSectionLabel,
      c.outcomeLabel,
      c.outcomeTitle,
      c.outcomeBody,
      c.limitationsTitle,
      c.limitationsBody,
      c.linksTitle,
      c.linksBody,
      c.disclosure,
    ];
    for (const field of scalarFields) {
      for (const locale of locales) {
        expect(field[locale].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("has exactly five decisions with non-empty ES/EN title and body", () => {
    expect(c.decisions).toHaveLength(5);
    for (const decision of c.decisions) {
      for (const locale of locales) {
        expect(decision.title[locale].trim().length).toBeGreaterThan(0);
        expect(decision.body[locale].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("has exactly four facts with non-empty ES/EN value and label", () => {
    expect(c.facts).toHaveLength(4);
    for (const fact of c.facts) {
      for (const locale of locales) {
        expect(fact.value[locale].trim().length).toBeGreaterThan(0);
        expect(fact.label[locale].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("has no brand slide and four product slides with a unique id and non-empty ES/EN title/alt/caption/provenance (Mode A)", () => {
    const brandSlides = c.realEvidence.brandSlides ?? [];
    const { productSlides } = c.realEvidence;
    expect(brandSlides).toHaveLength(0);
    expect(productSlides).toHaveLength(4);
    const ids = productSlides.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.sort()).toEqual(["A-P1", "A-P2", "A-P3", "A-P4"]);
    for (const slide of productSlides) {
      for (const locale of locales) {
        expect(slide.title[locale].trim().length).toBeGreaterThan(0);
        expect(slide.alt[locale].trim().length).toBeGreaterThan(0);
        expect(slide.caption[locale].trim().length).toBeGreaterThan(0);
        expect(slide.provenance[locale].trim().length).toBeGreaterThan(0);
      }
      expect(slide.src).toMatch(/^\/images\/case-studies\/appliedxl\//);
    }
  });

  it("P13 Section 8.2 — all four wireframes are featured by default (the set is already bounded)", () => {
    expect(c.realEvidence.featuredProductCount).toBe(4);
    expect(c.realEvidence.productSlides.length).toBe(4);
  });

  it("uses the authorized-pre-final-evidence status in both locales (Mode A)", () => {
    expect(c.statusLabel.es).toBe("CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA");
    expect(c.statusLabel.en).toBe("DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE");
  });

  it("exposes exactly one internal back-to-work action and no external link (no verifiable public product)", () => {
    expect(c.actions).toHaveLength(1);
    expect(c.actions[0]!.external).toBe(false);
    expect(c.actions[0]!.internalRouteKey).toBe("work");
  });

  it("identifies AppliedXL as the publicly named engagement, and explains XYZ as the anonymized internal evidence identifier — not a confidential client name (P13, Section 7.2)", () => {
    const serialized = JSON.stringify(c);
    expect(serialized).toMatch(/XYZ/);
    expect(c.breadcrumbCurrent.es).toMatch(/AppliedXL/);
    expect(c.title.es).toMatch(/AppliedXL/);
    // The old, self-contradictory claim ("AppliedXL's real name is anonymized as XYZ")
    // must not reappear: XYZ only labels the internal product/workstream evidence.
    expect(serialized).not.toMatch(/nombre real (del producto y del cliente|se mantiene anonimizado)/);
    expect(c.limitationsBody.es).toMatch(/identificador anonimizado usado dentro de la evidencia de diseño/);
    expect(c.limitationsBody.en).toMatch(/anonymized identifier used inside the authorized design evidence/);
  });

  it("never claims the screens are the final approved visual design or real data", () => {
    expect(c.limitationsBody.es).toMatch(/no el diseño visual final aprobado/);
    expect(c.limitationsBody.en).toMatch(/not the final approved visual design/);
  });

  it("never renders a client-facing TODO placeholder or internal gate language", () => {
    const serialized = JSON.stringify(c);
    expect(serialized).not.toMatch(/TODO\(/);
    expect(serialized).not.toMatch(/Portfolio Gate/i);
  });

  it("never exposes a private filesystem path", () => {
    const serialized = JSON.stringify(c);
    expect(serialized).not.toMatch(/\/Users\//);
  });
});

describe("AppliedXL — CreativeWork structured data", () => {
  it("emits CreativeWork only, with no Product/Service/Offer/Review/rating/Organization schema", () => {
    for (const locale of locales) {
      const serialized = buildAppliedXLStructuredData(locale);
      const data = JSON.parse(serialized);
      expect(data["@type"]).toBe("CreativeWork");
      expect(serialized).not.toMatch(/"@type":"(Product|Service|Offer|Review|AggregateRating|Organization|LocalBusiness)"/);
    }
  });

  it("names the case with its exact localized title and canonical URL", () => {
    const es = JSON.parse(buildAppliedXLStructuredData("es"));
    expect(es.name).toBe(appliedxlCaseContent.title.es);
    expect(es.url).toBe("https://maestreparra.github.io/es/proyectos/appliedxl-ai-data-platform/");

    const en = JSON.parse(buildAppliedXLStructuredData("en"));
    expect(en.name).toBe(appliedxlCaseContent.title.en);
    expect(en.url).toBe("https://maestreparra.github.io/en/work/appliedxl-ai-data-platform/");
  });

  it("safely serializes JSON-LD so a literal \"<\" cannot terminate the script context", () => {
    const serialized = buildAppliedXLStructuredData("es");
    expect(serialized).not.toContain("</script>");
  });
});

describe("AppliedXL — exact approved SEO metadata", () => {
  it("matches the metadata copy verbatim", () => {
    const expected = {
      title: {
        es: "AppliedXL: IA y datos científicos | Giomar Maestre",
        en: "AppliedXL: AI & Scientific Data | Giomar Maestre",
      },
      description: {
        es: "Caso de estudio sobre discovery, arquitectura de información y visualización de datos para una plataforma SaaS B2B de IA y datos científicos.",
        en: "Case study covering discovery, information architecture, and data visualization for a B2B SaaS AI and scientific-data platform.",
      },
    };
    for (const locale of locales) {
      const metadata = buildRouteMetadata("appliedxl", locale);
      expect(metadata.title).toBe(expected.title[locale]);
      expect(metadata.description).toBe(expected.description[locale]);
    }
  });

  it("uses article openGraph type", () => {
    const metadata = buildRouteMetadata("appliedxl", "es");
    expect(metadata.openGraph).toMatchObject({ type: "article" });
  });
});

describe("AppliedXL — Work index card", () => {
  it("adds the appliedxl project with published status and correct case-study route key", () => {
    const card = workContent.projects.find((p) => p.caseStudyRouteKey === "appliedxl");
    expect(card).toBeDefined();
    expect(card?.publicationStatus).toBe("published");
  });

  it("is Work-only and never appears on Home", () => {
    return import("@/content/home").then(({ homeContent }) => {
      const found = homeContent.selectedWork.projects.some((p) => p.title.es.toLowerCase().includes("appliedxl"));
      expect(found).toBe(false);
    });
  });
});
