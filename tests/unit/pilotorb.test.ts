import { describe, expect, it } from "vitest";
import { pilotorbCaseContent } from "@/content/pilotorb";
import { buildPilotOrbStructuredData } from "@/lib/structured-data";
import { buildRouteMetadata } from "@/lib/metadata";
import { publicRoutes, primaryNavigationRouteKeys } from "@/i18n/routes";
import { workContent } from "@/content/core-pages";
import { locales } from "@/i18n/locales";

describe("PilotOrb — route registry", () => {
  it("registers the route with the single-flow-case-study template and indexable paths", () => {
    const route = publicRoutes.pilotorb;
    expect(route.template).toBe("single-flow-case-study");
    expect(route.indexable).toBe(true);
    expect(route.paths.es).toBe("/es/proyectos/pilotorb-business-intelligence/");
    expect(route.paths.en).toBe("/en/work/pilotorb-business-intelligence/");
  });

  it("keeps pilotorb out of the global primary navigation", () => {
    expect(primaryNavigationRouteKeys).not.toContain("pilotorb");
  });
});

describe("PilotOrb — content inventory and bilingual parity", () => {
  const c = pilotorbCaseContent;

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

  it("has one brand slide and five product slides with a unique id and non-empty ES/EN title/alt/caption/provenance (Mode A)", () => {
    const brandSlides = c.realEvidence.brandSlides ?? [];
    const { productSlides } = c.realEvidence;
    expect(brandSlides).toHaveLength(1);
    expect(productSlides).toHaveLength(5);
    const ids = [...brandSlides, ...productSlides].map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.sort()).toEqual(["P-B1", "P-P1", "P-P2", "P-P3", "P-P4", "P-P5"]);
    for (const slide of [...brandSlides, ...productSlides]) {
      for (const locale of locales) {
        expect(slide.title[locale].trim().length).toBeGreaterThan(0);
        expect(slide.alt[locale].trim().length).toBeGreaterThan(0);
        expect(slide.caption[locale].trim().length).toBeGreaterThan(0);
        expect(slide.provenance[locale].trim().length).toBeGreaterThan(0);
      }
      expect(slide.src).toMatch(/^\/images\/case-studies\/pilotorb\//);
    }
  });

  it("P13 Section 8.2 — features 3 evidence figures by default (1 brand + 2 product); the remaining 3 product slides stay available, not deleted", () => {
    expect(c.realEvidence.featuredProductCount).toBe(2);
    const brandCount = (c.realEvidence.brandSlides ?? []).length;
    expect(brandCount + c.realEvidence.featuredProductCount).toBe(3);
    expect(c.realEvidence.productSlides.length - c.realEvidence.featuredProductCount).toBe(3);
  });

  it("PilotOrb's authorization and scope claims remain unchanged by P13 (Section 7.3)", () => {
    expect(c.disclosure.es).toMatch(/quienes autorizaron reproducir en este portafolio las pantallas del diseño final/);
    expect(c.disclosure.en).toMatch(/who authorized reproducing the final design screens/);
  });

  it("uses the documented-case verified-evidence status in both locales (Mode A)", () => {
    expect(c.statusLabel.es).toBe("CASO DOCUMENTADO · EVIDENCIA VERIFICADA");
    expect(c.statusLabel.en).toBe("DOCUMENTED CASE · VERIFIED EVIDENCE");
  });

  it("exposes exactly one internal back-to-work action and no external link (no verifiable public product)", () => {
    expect(c.actions).toHaveLength(1);
    expect(c.actions[0]!.external).toBe(false);
    expect(c.actions[0]!.internalRouteKey).toBe("work");
  });

  it("never claims the product was implemented, shipped, or continues to operate", () => {
    expect(c.limitationsBody.es).toMatch(/no afirma que el producto haya sido implementado en producción/);
    expect(c.limitationsBody.en).toMatch(/does not claim the product was implemented in production/);
  });

  it("never renders a client-facing TODO placeholder or internal gate language", () => {
    const serialized = JSON.stringify(c);
    expect(serialized).not.toMatch(/TODO\(/);
    expect(serialized).not.toMatch(/Plomo al hampa/i);
    expect(serialized).not.toMatch(/Portfolio Gate/i);
  });

  it("never exposes a private filesystem path", () => {
    const serialized = JSON.stringify(c);
    expect(serialized).not.toMatch(/\/Users\//);
  });

  it("never publishes real financial data or adoption metrics", () => {
    expect(c.limitationsBody.es).toMatch(/No se publican datos financieros reales ni métricas de adopción/);
    expect(c.limitationsBody.en).toMatch(/No real financial data or adoption metrics are published/);
  });
});

describe("PilotOrb — CreativeWork structured data", () => {
  it("emits CreativeWork only, with no Product/Service/Offer/Review/rating/Organization schema", () => {
    for (const locale of locales) {
      const serialized = buildPilotOrbStructuredData(locale);
      const data = JSON.parse(serialized);
      expect(data["@type"]).toBe("CreativeWork");
      expect(serialized).not.toMatch(/"@type":"(Product|Service|Offer|Review|AggregateRating|Organization|LocalBusiness)"/);
    }
  });

  it("names the case with its exact localized title and canonical URL", () => {
    const es = JSON.parse(buildPilotOrbStructuredData("es"));
    expect(es.name).toBe(pilotorbCaseContent.title.es);
    expect(es.url).toBe("https://maestreparra.github.io/es/proyectos/pilotorb-business-intelligence/");

    const en = JSON.parse(buildPilotOrbStructuredData("en"));
    expect(en.name).toBe(pilotorbCaseContent.title.en);
    expect(en.url).toBe("https://maestreparra.github.io/en/work/pilotorb-business-intelligence/");
  });

  it("safely serializes JSON-LD so a literal \"<\" cannot terminate the script context", () => {
    const serialized = buildPilotOrbStructuredData("es");
    expect(serialized).not.toContain("</script>");
  });
});

describe("PilotOrb — exact approved SEO metadata", () => {
  it("matches the metadata copy verbatim", () => {
    const expected = {
      title: {
        es: "PilotOrb: Business Intelligence y Data Visualization | Giomar Maestre",
        en: "PilotOrb: Business Intelligence & Data Visualization | Giomar Maestre",
      },
      description: {
        es: "Caso de estudio sobre discovery, arquitectura de información y diseño de dashboards para una plataforma de Business Intelligence integrada con QuickBooks Online.",
        en: "Case study covering discovery, information architecture, and dashboard design for a Business Intelligence platform integrated with QuickBooks Online.",
      },
    };
    for (const locale of locales) {
      const metadata = buildRouteMetadata("pilotorb", locale);
      expect(metadata.title).toBe(expected.title[locale]);
      expect(metadata.description).toBe(expected.description[locale]);
    }
  });

  it("uses article openGraph type", () => {
    const metadata = buildRouteMetadata("pilotorb", "es");
    expect(metadata.openGraph).toMatchObject({ type: "article" });
  });
});

describe("PilotOrb — Work index card", () => {
  it("adds the pilotorb project with published status and correct case-study route key", () => {
    const card = workContent.projects.find((p) => p.caseStudyRouteKey === "pilotorb");
    expect(card).toBeDefined();
    expect(card?.publicationStatus).toBe("published");
  });

  it("is Work-only and never appears on Home (early-stage engagement, no public product)", () => {
    // Imported lazily to avoid a hard module-load-order dependency in this file's other suites.
    return import("@/content/home").then(({ homeContent }) => {
      const found = homeContent.selectedWork.projects.some((p) => p.title.es.toLowerCase().includes("pilotorb"));
      expect(found).toBe(false);
    });
  });
});
