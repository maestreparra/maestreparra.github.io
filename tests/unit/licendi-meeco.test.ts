import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { licendiMeecoCaseStudies, type LicendiMeecoCaseId } from "@/content/licendi-meeco";
import { buildDerivedEvidenceCaseStudyStructuredData } from "@/lib/structured-data";
import { buildRouteMetadata } from "@/lib/metadata";
import { publicRoutes, primaryNavigationRouteKeys } from "@/i18n/routes";
import { workContent } from "@/content/core-pages";
import { homeContent } from "@/content/home";
import { locales } from "@/i18n/locales";

const CASE_IDS: LicendiMeecoCaseId[] = ["licendi", "meeco"];

describe("P5-QA — Licendi/MEECO route registry", () => {
  it("registers both routes with the derived-evidence template and indexable paths", () => {
    for (const id of CASE_IDS) {
      const route = publicRoutes[id];
      expect(route.template).toBe("derived-evidence-case-study");
      expect(route.indexable).toBe(true);
      expect(route.paths.es).toMatch(/^\/es\/proyectos\//);
      expect(route.paths.en).toMatch(/^\/en\/work\//);
    }
  });

  it("keeps licendi/meeco out of the global primary navigation", () => {
    expect(primaryNavigationRouteKeys).not.toContain("licendi");
    expect(primaryNavigationRouteKeys).not.toContain("meeco");
  });
});

describe("P5-QA — Licendi/MEECO content inventory and bilingual parity", () => {
  it("defines both cases with a non-empty ES/EN pair for every top-level copy field", () => {
    for (const id of CASE_IDS) {
      const c = licendiMeecoCaseStudies[id];
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
          expect(field[locale].trim().length, `${id}.${locale}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("gives each case exactly five decisions with non-empty ES/EN title and body", () => {
    for (const id of CASE_IDS) {
      const decisions = licendiMeecoCaseStudies[id].decisions;
      expect(decisions).toHaveLength(5);
      for (const decision of decisions) {
        for (const locale of locales) {
          expect(decision.title[locale].trim().length).toBeGreaterThan(0);
          expect(decision.body[locale].trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("gives each case exactly four facts with non-empty ES/EN value and label", () => {
    for (const id of CASE_IDS) {
      const facts = licendiMeecoCaseStudies[id].facts;
      expect(facts).toHaveLength(4);
      for (const fact of facts) {
        for (const locale of locales) {
          expect(fact.value[locale].trim().length).toBeGreaterThan(0);
          expect(fact.label[locale].trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("both Licendi and MEECO have switched to real, agency-authorized evidence and carry zero reconstructed diagrams (Mode A)", () => {
    for (const id of CASE_IDS) {
      expect(licendiMeecoCaseStudies[id].diagrams).toHaveLength(0);
      expect(licendiMeecoCaseStudies[id].realEvidence).toBeDefined();
    }
  });

  it("MEECO's real evidence has exactly 5 product flows (no research/brand sections, since MEECO never had a UX audit or rebranding phase), all with non-empty ES/EN copy", () => {
    const evidence = licendiMeecoCaseStudies.meeco.realEvidence;
    expect(evidence).toBeDefined();
    if (!evidence) return;
    expect(evidence.researchSlides ?? []).toHaveLength(0);
    expect(evidence.brandSlides ?? []).toHaveLength(0);
    expect(evidence.productFlows).toHaveLength(5);

    for (const flow of evidence.productFlows) {
      for (const image of [flow.mobile, flow.desktop]) {
        expect(image.src).toMatch(/^\/images\/case-studies\/meeco\//);
        for (const locale of locales) {
          expect(image.alt[locale].trim().length).toBeGreaterThan(0);
          expect(image.caption[locale].trim().length).toBeGreaterThan(0);
          expect(image.provenance[locale].trim().length).toBeGreaterThan(0);
        }
      }
      for (const locale of locales) {
        expect(flow.title[locale].trim().length).toBeGreaterThan(0);
        expect(flow.note.title[locale].trim().length).toBeGreaterThan(0);
        expect(flow.note.body[locale].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("Licendi's real evidence has exactly 2 research slides, 3 brand slides, and 5 product flows, all with non-empty ES/EN copy", () => {
    const evidence = licendiMeecoCaseStudies.licendi.realEvidence;
    expect(evidence).toBeDefined();
    if (!evidence) return;
    const researchSlides = evidence.researchSlides ?? [];
    const brandSlides = evidence.brandSlides ?? [];
    expect(researchSlides).toHaveLength(2);
    expect(brandSlides).toHaveLength(3);
    expect(evidence.productFlows).toHaveLength(5);

    for (const slide of [...researchSlides, ...brandSlides]) {
      for (const locale of locales) {
        expect(slide.title[locale].trim().length).toBeGreaterThan(0);
        expect(slide.alt[locale].trim().length).toBeGreaterThan(0);
        expect(slide.caption[locale].trim().length).toBeGreaterThan(0);
        expect(slide.provenance[locale].trim().length).toBeGreaterThan(0);
      }
      expect(slide.src).toMatch(/^\/images\/case-studies\/licendi\//);
      expect(slide.width).toBeGreaterThan(0);
      expect(slide.height).toBeGreaterThan(0);
    }

    for (const flow of evidence.productFlows) {
      for (const image of [flow.mobile, flow.desktop]) {
        expect(image.src).toMatch(/^\/images\/case-studies\/licendi\//);
        for (const locale of locales) {
          expect(image.alt[locale].trim().length).toBeGreaterThan(0);
          expect(image.caption[locale].trim().length).toBeGreaterThan(0);
          expect(image.provenance[locale].trim().length).toBeGreaterThan(0);
        }
      }
      for (const locale of locales) {
        expect(flow.title[locale].trim().length).toBeGreaterThan(0);
        expect(flow.note.title[locale].trim().length).toBeGreaterThan(0);
        expect(flow.note.body[locale].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("P13 Section 8.2 — Licendi features 1 research + 2 brand + 2 product flows by default; the rest (1 research + 1 brand + 3 flows) stays available, not deleted", () => {
    const evidence = licendiMeecoCaseStudies.licendi.realEvidence;
    expect(evidence).toBeDefined();
    if (!evidence) return;
    expect(evidence.featuredResearchCount).toBe(1);
    expect(evidence.featuredBrandCount).toBe(2);
    expect(evidence.featuredProductFlowCount).toBe(2);
    expect((evidence.researchSlides ?? []).length - evidence.featuredResearchCount!).toBe(1);
    expect((evidence.brandSlides ?? []).length - evidence.featuredBrandCount!).toBe(1);
    expect(evidence.productFlows.length - evidence.featuredProductFlowCount).toBe(3);
  });

  it("P13 Section 8.2 — MEECO features 2 product flows by default; the remaining 3 stay available, not deleted", () => {
    const evidence = licendiMeecoCaseStudies.meeco.realEvidence;
    expect(evidence).toBeDefined();
    if (!evidence) return;
    expect(evidence.featuredProductFlowCount).toBe(2);
    expect(evidence.productFlows.length - evidence.featuredProductFlowCount).toBe(3);
  });

  it("never claims Licendi's real evidence is a portfolio reconstruction", () => {
    const serialized = JSON.stringify(licendiMeecoCaseStudies.licendi.realEvidence);
    expect(serialized).not.toMatch(/reconstruc/i);
  });

  it("never renders a client-facing TODO placeholder or internal gate language", () => {
    const serialized = JSON.stringify(licendiMeecoCaseStudies);
    expect(serialized).not.toMatch(/TODO\(/);
    expect(serialized).not.toMatch(/Plomo al hampa/i);
    expect(serialized).not.toMatch(/Portfolio Gate/i);
  });

  it("never exposes a private filesystem path", () => {
    const serialized = JSON.stringify(licendiMeecoCaseStudies);
    expect(serialized).not.toMatch(/\/Users\//);
  });

  it("never asserts an unverified conversion/sales/traffic/ranking metric or current-UI ownership claim", () => {
    for (const id of CASE_IDS) {
      const limitations = licendiMeecoCaseStudies[id].limitationsBody;
      expect(limitations.es).toMatch(/No se publican métricas/);
      expect(limitations.en).toMatch(/metrics.*(are|were) published|No .*metrics/);
    }
  });

  it("never asserts a legal-corporate relationship between Licendi and the meeco Group as verified fact", () => {
    const disclosure = licendiMeecoCaseStudies.meeco.disclosure;
    expect(disclosure.es).toMatch(/no afirma que Licendi y meeco Group sean la misma corporación legal/);
    expect(disclosure.en).toMatch(/does not claim that Licendi and the meeco Group are the same legal corporation/);
  });
});

describe("P5-QA — Licendi content and link boundary", () => {
  const licendi = licendiMeecoCaseStudies.licendi;

  it("uses the authorized-pre-final-evidence status (Mode A, agency-authorized, not the final approved client delivery)", () => {
    expect(licendi.statusLabel.es).toBe("CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA");
    expect(licendi.statusLabel.en).toBe("DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE");
  });

  it("never calls its own evidence the final approved client delivery, and states the product may have evolved", () => {
    for (const field of [licendi.evidenceIntro, licendi.limitationsBody, licendi.disclosure]) {
      expect(field.es).toMatch(/no reproducen la entrega final aprobada|no representan la entrega final aprobada/);
      expect(field.en).toMatch(/do not reproduce the client's final approved delivery|do not represent the client's final approved delivery/);
    }
  });

  it("exposes exactly three actions: external public reference, internal related case, internal back-to-work", () => {
    expect(licendi.actions).toHaveLength(3);
    const external = licendi.actions.filter((a) => a.external);
    const internal = licendi.actions.filter((a) => !a.external);
    expect(external).toHaveLength(1);
    expect(external[0]!.href).toBe("https://licendi.com/es/");
    expect(internal).toHaveLength(2);
    expect(internal.map((a) => a.internalRouteKey).sort()).toEqual(["meeco", "work"]);
  });
});

describe("P5-QA — MEECO content and link boundary", () => {
  const meeco = licendiMeecoCaseStudies.meeco;

  it("uses the authorized-pre-final-evidence status (Mode A, agency-authorized), matching Licendi's", () => {
    expect(meeco.statusLabel.es).toBe("CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA");
    expect(meeco.statusLabel.en).toBe("DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE");
  });

  it("never calls its own evidence the final approved client delivery, and states the product may have evolved", () => {
    for (const field of [meeco.evidenceIntro, meeco.limitationsBody, meeco.disclosure]) {
      expect(field.es).toMatch(/no representan la entrega final aprobada|no reproducen la entrega final aprobada/);
      expect(field.en).toMatch(/do not represent the client's final approved delivery|do not reproduce the client's final approved delivery/);
    }
  });

  it("exposes exactly three actions: external public reference, internal related case, internal back-to-work", () => {
    expect(meeco.actions).toHaveLength(3);
    const external = meeco.actions.filter((a) => a.external);
    const internal = meeco.actions.filter((a) => !a.external);
    expect(external).toHaveLength(1);
    expect(external[0]!.href).toBe("https://meeco-group.com/");
    expect(internal).toHaveLength(2);
    expect(internal.map((a) => a.internalRouteKey).sort()).toEqual(["licendi", "work"]);
  });
});

describe("P5-QA — Licendi/MEECO CreativeWork structured data", () => {
  it("emits CreativeWork only, with no Product/Service/Offer/Review/rating/Organization schema", () => {
    for (const id of CASE_IDS) {
      for (const locale of locales) {
        const serialized = buildDerivedEvidenceCaseStudyStructuredData(id, locale);
        const data = JSON.parse(serialized);
        expect(data["@type"]).toBe("CreativeWork");
        expect(serialized).not.toMatch(/"@type":"(Product|Service|Offer|Review|AggregateRating|Organization|LocalBusiness)"/);
      }
    }
  });

  it("names each case with its exact localized title and canonical URL", () => {
    const es = JSON.parse(buildDerivedEvidenceCaseStudyStructuredData("licendi", "es"));
    expect(es.name).toBe(licendiMeecoCaseStudies.licendi.title.es);
    expect(es.url).toBe("https://maestreparra.github.io/es/proyectos/licendi-ecommerce-brand-experience/");

    const en = JSON.parse(buildDerivedEvidenceCaseStudyStructuredData("meeco", "en"));
    expect(en.name).toBe(licendiMeecoCaseStudies.meeco.title.en);
    expect(en.url).toBe("https://maestreparra.github.io/en/work/meeco-renewable-energy-website/");
  });

  it("safely serializes JSON-LD so a literal \"<\" cannot terminate the script context", () => {
    for (const id of CASE_IDS) {
      const serialized = buildDerivedEvidenceCaseStudyStructuredData(id, "es");
      expect(serialized).not.toContain("</script>");
    }
  });
});

describe("P5-QA — exact approved SEO metadata for the four Licendi/MEECO route/locale combinations", () => {
  it("matches the P3 SEO matrix verbatim", () => {
    const expected: Record<LicendiMeecoCaseId, { title: Record<string, string>; description: Record<string, string> }> = {
      licendi: {
        title: {
          es: "Licendi: UX, e-commerce y rebranding | Giomar Maestre",
          en: "Licendi: UX, E-commerce & Rebranding | Giomar Maestre",
        },
        description: {
          es: "Caso de estudio sobre auditoría UX/UI, arquitectura de e-commerce, rebranding y diseño responsive para una plataforma internacional de licencias.",
          en: "Case study covering UX/UI auditing, e-commerce architecture, rebranding, and responsive design for an international software-licensing platform.",
        },
      },
      meeco: {
        title: {
          es: "MEECO: UX/UI para energía renovable | Giomar Maestre",
          en: "MEECO: Renewable Energy Website UX/UI | Giomar Maestre",
        },
        description: {
          es: "Caso de estudio sobre arquitectura de información, UX/UI y diseño responsive para un website corporativo internacional de energía renovable.",
          en: "Case study covering information architecture, UX/UI, and responsive design for an international renewable-energy corporate website.",
        },
      },
    };

    for (const id of CASE_IDS) {
      for (const locale of locales) {
        const metadata = buildRouteMetadata(id, locale);
        expect(metadata.title).toBe(expected[id].title[locale]);
        expect(metadata.description).toBe(expected[id].description[locale]);
      }
    }
  });

  it("uses article openGraph type for both Licendi and MEECO routes", () => {
    for (const id of CASE_IDS) {
      const metadata = buildRouteMetadata(id, "es");
      expect(metadata.openGraph).toMatchObject({ type: "article" });
    }
  });
});

describe("P5-QA — Work index gains exactly the Licendi and MEECO cards", () => {
  it("adds licendi and meeco projects with published status and correct case-study route keys", () => {
    const licendiCard = workContent.projects.find((p) => p.caseStudyRouteKey === "licendi");
    const meecoCard = workContent.projects.find((p) => p.caseStudyRouteKey === "meeco");
    expect(licendiCard).toBeDefined();
    expect(meecoCard).toBeDefined();
    expect(licendiCard?.publicationStatus).toBe("published");
    expect(meecoCard?.publicationStatus).toBe("published");
  });
});

describe("P5-QA — Home selected-work gains only the Licendi card, never MEECO", () => {
  it("includes Licendi in home.selectedWork.projects", () => {
    const found = homeContent.selectedWork.projects.some((p) => p.title.es.toLowerCase().includes("licendi"));
    expect(found).toBe(true);
  });

  it("never includes MEECO in home.selectedWork.projects", () => {
    const found = homeContent.selectedWork.projects.some((p) => p.title.es.toLowerCase().includes("meeco"));
    expect(found).toBe(false);
  });
});

describe("P5-QA — the derived-evidence template renders the reconstruction label and dispatches every diagram kind", () => {
  it("references the reconstruction label and every diagram component in source", () => {
    const template = readFileSync(
      path.resolve(process.cwd(), "src/components/case-study/DerivedEvidenceCaseStudyTemplate.tsx"),
      "utf8",
    );
    expect(template).toMatch(/RECONSTRUCCIÓN PARA PORTAFOLIO|PORTFOLIO RECONSTRUCTION/);
    for (const component of [
      "StageSequenceDiagram",
      "DomainTreeDiagram",
      "TaxonomyColumnsDiagram",
      "JourneyPathDiagram",
      "PrincipleCardsDiagram",
      "TemplateSystemDiagram",
      "ResponsiveComparisonDiagram",
      "RelatedEngagementDiagram",
    ]) {
      expect(template).toContain(component);
    }
  });

  it("never imports or reuses the protected VitaLink/BM Envíos CaseStudyTemplate", () => {
    const template = readFileSync(
      path.resolve(process.cwd(), "src/components/case-study/DerivedEvidenceCaseStudyTemplate.tsx"),
      "utf8",
    );
    expect(template).not.toMatch(/from ["']\.\/CaseStudyTemplate["']/);
  });
});
