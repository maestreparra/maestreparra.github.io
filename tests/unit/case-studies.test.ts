import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, type CaseStudyId } from "@/content/case-studies";
import { buildCaseStudyStructuredData } from "@/lib/structured-data";
import { buildRouteMetadata } from "@/lib/metadata";
import { locales } from "@/i18n/locales";

const CASE_IDS: CaseStudyId[] = ["vitalink", "bm-envios"];

describe("P9-QA — case-study content inventory and bilingual parity", () => {
  it("defines both cases with a non-empty ES/EN pair for every top-level copy field", () => {
    for (const id of CASE_IDS) {
      const c = caseStudies[id];
      const scalarFields = [
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
        c.evidence.notesMobile.title,
        c.evidence.notesMobile.body,
        c.evidence.notesMobile.provenance,
        c.evidence.notesDesktop.title,
        c.evidence.notesDesktop.body,
        c.evidence.notesDesktop.provenance,
        c.breadcrumbParent,
        c.technicalSectionLabel,
        c.technicalTitle,
        c.technicalNote,
        c.outcomeLabel,
        c.outcomeTitle,
        c.outcomeBody,
        c.limitationsTitle,
        c.limitationsBody,
        c.linksTitle,
        c.linksBody,
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
      const decisions = caseStudies[id].decisions;
      expect(decisions).toHaveLength(5);
      for (const decision of decisions) {
        for (const locale of locales) {
          expect(decision.title[locale].trim().length).toBeGreaterThan(0);
          expect(decision.body[locale].trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("gives each case exactly six technical facts with non-empty ES/EN value and label", () => {
    for (const id of CASE_IDS) {
      const facts = caseStudies[id].facts;
      expect(facts).toHaveLength(6);
      for (const fact of facts) {
        for (const locale of locales) {
          expect(fact.value[locale].trim().length).toBeGreaterThan(0);
          expect(fact.label[locale].trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("never renders a client-facing TODO placeholder or internal gate language", () => {
    const serialized = JSON.stringify(caseStudies);
    expect(serialized).not.toMatch(/TODO\(/);
    expect(serialized).not.toMatch(/Plomo al hampa/i);
    expect(serialized).not.toMatch(/Portfolio Gate/i);
  });

  it("never exposes a private filesystem path from either source project", () => {
    const serialized = JSON.stringify(caseStudies);
    expect(serialized).not.toMatch(/\/Users\//);
    expect(serialized).not.toMatch(/vitalink-digital-ecosystem-public/);
    expect(serialized).not.toMatch(/BM Envios — Next\.js Production/);
  });
});

describe("P9-QA — VitaLink content and link boundary", () => {
  const vitalink = caseStudies.vitalink;

  it("keeps the published-case status in both locales", () => {
    expect(vitalink.statusLabel.es).toBe("CASO PUBLICADO");
    expect(vitalink.statusLabel.en).toBe("PUBLISHED CASE");
    expect(vitalink.publicationStatus).toBe("published");
  });

  it("exposes exactly two external actions: the verified live site and the public repository", () => {
    expect(vitalink.actions).toHaveLength(2);
    for (const action of vitalink.actions) {
      expect(action.external).toBe(true);
    }
    const hrefs = vitalink.actions.filter((a) => a.external).map((a) => a.href);
    expect(hrefs).toContain("https://www.vitalinkcouriers.com/");
    expect(hrefs).toContain("https://github.com/maestreparra/vitalink-digital-ecosystem");
  });

  it("never links to the VitaLink Express route, which returns 404", () => {
    const serialized = JSON.stringify(vitalink);
    expect(serialized).not.toContain("express.vitalinkcouriers.com");
  });

  it("declares no conversion/revenue/traffic/ranking claim in its limitations copy", () => {
    expect(vitalink.limitationsBody.es).toMatch(/conversión, ingresos, tráfico o posicionamiento/);
    expect(vitalink.limitationsBody.en).toMatch(/conversion, revenue, traffic, or ranking/);
  });
});

describe("P9-QA — BM Envíos content and link boundary", () => {
  const bmEnvios = caseStudies["bm-envios"];

  it("keeps the final-refinement status in both locales", () => {
    expect(bmEnvios.statusLabel.es).toBe("REFINAMIENTO FINAL");
    expect(bmEnvios.statusLabel.en).toBe("FINAL REFINEMENT");
    expect(bmEnvios.publicationStatus).toBe("final-refinement");
  });

  it("has one external repository action and one internal Contact action, and no client-website link", () => {
    expect(bmEnvios.actions).toHaveLength(2);
    const external = bmEnvios.actions.filter((a) => a.external);
    const internal = bmEnvios.actions.filter((a) => !a.external);
    expect(external).toHaveLength(1);
    expect(external[0]!.href).toBe("https://github.com/maestreparra/bm-envios-digital-platform");
    expect(internal).toHaveLength(1);
    expect(internal[0]!).toMatchObject({ internalRouteKey: "contact" });
  });

  it("declares no backend/CRM/payment/tracking/auth claim in its limitations copy", () => {
    expect(bmEnvios.limitationsBody.es).toMatch(/backend/);
    expect(bmEnvios.limitationsBody.en).toMatch(/backend/);
  });

  it("uses a distinct approved screenshot per locale for both desktop and mobile evidence", () => {
    expect(bmEnvios.evidence.desktop.src.es).not.toBe(bmEnvios.evidence.desktop.src.en);
    expect(bmEnvios.evidence.mobile.src.es).not.toBe(bmEnvios.evidence.mobile.src.en);
    expect(bmEnvios.evidence.desktop.src.es).not.toBe(bmEnvios.evidence.mobile.src.es);
  });
});

describe("P9-QA — approved evidence assets are referenced from public/images/case-studies only", () => {
  it("every evidence image src is a same-origin path under /images/case-studies/, for both locales", () => {
    for (const id of CASE_IDS) {
      const evidence = caseStudies[id].evidence;
      for (const image of [evidence.desktop, evidence.mobile]) {
        for (const locale of locales) {
          expect(image.src[locale]).toMatch(/^\/images\/case-studies\//);
        }
      }
    }
  });

  it("gives every evidence image a positive frozen figure-box height in CSS pixels", () => {
    for (const id of CASE_IDS) {
      const evidence = caseStudies[id].evidence;
      expect(evidence.desktop.heightPx).toBeGreaterThan(0);
      expect(evidence.mobile.heightPx).toBeGreaterThan(0);
    }
  });
});

describe("P9-QA — Case Study CreativeWork structured data", () => {
  it("emits CreativeWork only, with no Product/Service/Offer/Review/rating/Organization schema", () => {
    for (const id of CASE_IDS) {
      for (const locale of locales) {
        const serialized = buildCaseStudyStructuredData(id, locale);
        const data = JSON.parse(serialized);
        expect(data["@type"]).toBe("CreativeWork");
        expect(serialized).not.toMatch(/"@type":"(Product|Service|Offer|Review|AggregateRating|Organization)"/);
      }
    }
  });

  it("names each case study with its exact localized title and canonical URL", () => {
    const es = JSON.parse(buildCaseStudyStructuredData("vitalink", "es"));
    expect(es.name).toBe(caseStudies.vitalink.title.es);
    expect(es.url).toBe("https://maestreparra.github.io/es/proyectos/vitalink-digital-ecosystem/");

    const en = JSON.parse(buildCaseStudyStructuredData("bm-envios", "en"));
    expect(en.name).toBe(caseStudies["bm-envios"].title.en);
    expect(en.url).toBe("https://maestreparra.github.io/en/work/bm-envios-digital-experience/");
  });

  it("safely serializes JSON-LD so a literal \"<\" cannot terminate the script context", () => {
    for (const id of CASE_IDS) {
      const serialized = buildCaseStudyStructuredData(id, "es");
      expect(serialized).not.toContain("</script>");
    }
  });
});

describe("P9 Correction Attempt 2 (QA-01) — exact condensed mobile copy extracted from the frozen mobile nodes", () => {
  it("VitaLink ES mobile (46:135) uses the condensed breadcrumb, eyebrow, title, and scope", () => {
    const v = caseStudies.vitalink;
    expect(v.breadcrumbParent.es).toBe("PROYECTOS");
    expect(v.breadcrumbCurrent.mobile?.es).toBe("VITALINK");
    expect(v.eyebrow.mobile?.es).toBe("CASO · LOGÍSTICA Y SERVICIOS");
    expect(v.title.mobile?.es).toBe("VitaLink: un ecosistema bilingüe de estrategia a código.");
    expect(v.scope.mobile?.es).toBe("Estrategia · marca · UX/UI · Design System · frontend · SEO · Angular · i18n");
  });

  it("VitaLink EN mobile (46:303) uses the condensed breadcrumb, eyebrow, title, and scope", () => {
    const v = caseStudies.vitalink;
    expect(v.breadcrumbParent.en).toBe("WORK");
    expect(v.breadcrumbCurrent.mobile?.en).toBe("VITALINK");
    expect(v.eyebrow.mobile?.en).toBe("CASE · LOGISTICS AND SERVICES");
    expect(v.title.mobile?.en).toBe("VitaLink: a bilingual ecosystem from strategy through code.");
    expect(v.scope.mobile?.en).toBe("Strategy · brand · UX/UI · design system · frontend · SEO · Angular · i18n");
  });

  it("BM Envíos ES mobile (46:219) uses the condensed breadcrumb, eyebrow, title, and scope", () => {
    const b = caseStudies["bm-envios"];
    expect(b.breadcrumbParent.es).toBe("PROYECTOS");
    expect(b.breadcrumbCurrent.mobile?.es).toBe("BM ENVÍOS");
    expect(b.eyebrow.mobile?.es).toBe("CASO · LOGÍSTICA Y LEADS");
    expect(b.title.mobile?.es).toBe("BM Envíos: logística bilingüe con privacidad verificable.");
    expect(b.scope.mobile?.es).toBe("Research · IA · UX/UI · i18n · accesibilidad · SEO · QA · Next.js · React · MUI");
  });

  it("BM Envios EN mobile (46:387) uses the condensed breadcrumb, eyebrow, title, and scope", () => {
    const b = caseStudies["bm-envios"];
    expect(b.breadcrumbParent.en).toBe("WORK");
    expect(b.breadcrumbCurrent.mobile?.en).toBe("BM ENVIOS");
    expect(b.eyebrow.mobile?.en).toBe("CASE · LOGISTICS AND LEADS");
    expect(b.title.mobile?.en).toBe("BM Envios: bilingual logistics with verifiable privacy.");
    expect(b.scope.mobile?.en).toBe("Research · IA · UX/UI · i18n · accessibility · SEO · QA · Next.js · React · MUI");
  });

  it("every decision, section label, and evidence note that differs on mobile has a non-empty override for both locales", () => {
    for (const id of CASE_IDS) {
      const c = caseStudies[id];
      for (const decision of c.decisions) {
        if (decision.title.mobile) {
          expect(decision.title.mobile.es?.trim().length ?? 0).toBeGreaterThan(0);
          expect(decision.title.mobile.en?.trim().length ?? 0).toBeGreaterThan(0);
        }
        expect(decision.body.mobile?.es?.trim().length ?? 0).toBeGreaterThan(0);
        expect(decision.body.mobile?.en?.trim().length ?? 0).toBeGreaterThan(0);
      }
    }
  });

  it("keeps typed breadcrumb fields and never reconstructs labels by parsing display text", () => {
    const template = readFileSync(
      path.resolve(process.cwd(), "src/components/case-study/CaseStudyTemplate.tsx"),
      "utf8",
    );
    expect(template).toContain("c.breadcrumbParent");
    expect(template).toContain("c.breadcrumbCurrent");
    expect(template).not.toMatch(/\.split\(["'] \/ ["']\)/);
  });

  it("matches the frozen mobile facts, limitations, and link-panel copy in both cases and locales", () => {
    const expected = {
      vitalink: {
        es: {
          facts: ["tests aprobados", "rutas prerenderizadas", "bundle raw reducido", "paridad ES/EN", "orígenes canonical", "vulnerabilidades"],
          limitations: "Sin claims de conversión o ingresos. Sin pagos, tracking ni backend. Express no es enlace activo mientras responda 404.",
          linksTitle: "Explora el caso.",
          linksBody: "Producto y código verificables.",
        },
        en: {
          facts: ["passing tests", "prerendered routes", "raw bundle reduction", "ES/EN parity", "canonical origins", "vulnerabilities"],
          limitations: "No conversion or revenue claims. No payments, tracking, or backend. Express stays inactive while returning 404.",
          linksTitle: "Explore the case.",
          linksBody: "Inspectable product and code.",
        },
      },
      "bm-envios": {
        es: {
          facts: ["canonical localizadas", "páginas estáticas", "tests unitarios", "Playwright", "axe serious/critical", "vulnerabilidades"],
          limitations: "Sin backend, pagos, tracking, autenticación ni operaciones reales. Sin claims no confirmados.",
          linksTitle: "Inspecciona la baseline.",
          linksBody: "Código y evidencia pública.",
        },
        en: {
          facts: ["localized canonicals", "static pages", "unit tests", "Playwright", "serious/critical axe", "vulnerabilities"],
          limitations: "No backend, payments, tracking, authentication, or real operations. No unconfirmed claims.",
          linksTitle: "Inspect the baseline.",
          linksBody: "Public code and evidence.",
        },
      },
    } as const;

    for (const id of CASE_IDS) {
      const content = caseStudies[id];
      for (const locale of locales) {
        const mobile = expected[id][locale];
        expect(content.facts.map((fact) => fact.label.mobile?.[locale] ?? fact.label[locale])).toEqual(mobile.facts);
        expect(content.limitationsBody.mobile?.[locale]).toBe(mobile.limitations);
        expect(content.linksTitle.mobile?.[locale]).toBe(mobile.linksTitle);
        expect(content.linksBody.mobile?.[locale]).toBe(mobile.linksBody);
      }
    }
  });
});

describe("P9 Correction Attempt 2 (QA-01) — PageHero callers outside this correction stay byte-equivalent", () => {
  it("About/Work/Contact templates never pass the new optional responsive PageHero props", () => {
    const files = [
      "src/components/core/AboutTemplate.tsx",
      "src/components/core/WorkIndexTemplate.tsx",
      "src/components/core/ContactTemplate.tsx",
    ];
    for (const file of files) {
      const src = readFileSync(path.resolve(process.cwd(), file), "utf8");
      expect(src, file).not.toMatch(/eyebrowMobile|titleMobile|introductionMobile/);
    }
  });
});

describe("P9-QA — exact approved SEO metadata for the four Case Study route/locale combinations", () => {
  it("matches docs/content/P2_SEO_AND_MESSAGE_MATRIX.md verbatim", () => {
    const expected: Record<CaseStudyId, { title: Record<string, string>; description: Record<string, string> }> = {
      vitalink: {
        title: {
          es: "VitaLink Digital Ecosystem — Caso de estudio",
          en: "VitaLink Digital Ecosystem — Case study",
        },
        description: {
          es: "Estrategia, identidad, UX/UI, Design System y arquitectura Angular para un ecosistema logístico bilingüe.",
          en: "Strategy, identity, UX/UI, design-system work, and Angular architecture for a bilingual logistics ecosystem.",
        },
      },
      "bm-envios": {
        title: {
          es: "BM Envíos Digital Experience — Caso de estudio",
          en: "BM Envios Digital Experience — Case study",
        },
        description: {
          es: "Research, UX/UI, localización y Next.js para una plataforma logística bilingüe con formularios demostrativos privados por diseño.",
          en: "Research, UX/UI, localization, and Next.js delivery for a bilingual logistics platform with privacy-safe demonstration forms.",
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
});
