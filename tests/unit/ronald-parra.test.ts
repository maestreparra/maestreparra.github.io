import { describe, expect, it } from "vitest";
import { ronaldParraCaseContent } from "@/content/ronald-parra";
import { buildRonaldParraCaseStructuredData } from "@/lib/structured-data";
import { buildRouteMetadata } from "@/lib/metadata";
import { getRoutePath } from "@/i18n/routes";

describe("Ronald Parra case-study content and claim boundaries", () => {
  it("defines equivalent Spanish and English routes", () => {
    expect(getRoutePath("ronald-parra", "es")).toBe("/es/proyectos/ronald-parra-digital-health-ecosystem/");
    expect(getRoutePath("ronald-parra", "en")).toBe("/en/work/ronald-parra-digital-health-ecosystem/");
  });

  it("contains non-empty ES/EN values throughout the localized content", () => {
    const pairs: Array<{ es: string; en: string }> = [];
    const walk = (node: unknown) => {
      if (!node || typeof node !== "object") return;
      if ("es" in node && "en" in node) {
        const pair = node as { es: unknown; en: unknown };
        if (typeof pair.es === "string" && typeof pair.en === "string") pairs.push(pair as { es: string; en: string });
        return;
      }
      Object.values(node).forEach(walk);
    };

    walk(ronaldParraCaseContent);
    expect(pairs.length).toBeGreaterThan(40);
    for (const pair of pairs) {
      expect(pair.es.trim().length).toBeGreaterThan(0);
      expect(pair.en.trim().length).toBeGreaterThan(0);
    }
  });

  it("attributes simulator design to Dr. Ronald Parra and limits Giomar's contribution", () => {
    expect(ronaldParraCaseContent.attributionBody.es).toContain("Dr. Ronald Parra concibió y diseñó el simulador");
    expect(ronaldParraCaseContent.attributionBody.en).toContain("Dr. Ronald Parra conceived and designed the simulator");
    expect(ronaldParraCaseContent.attributionBody.es).toContain("UX Engineering");
  });

  it("does not make ranking, conversion, certification, or legal-outcome claims", () => {
    const allText = JSON.stringify(ronaldParraCaseContent);
    expect(allText).not.toMatch(/garantiza|guarantees|certified|certificado|aumentó el tráfico|increased traffic/i);
    expect(ronaldParraCaseContent.limitationsBody.es).toContain("no se atribuyen mejoras de tráfico, ranking, conversión");
  });

  it("publishes exactly four sanitized visual evidence items", () => {
    expect(ronaldParraCaseContent.evidence).toHaveLength(4);
    for (const evidence of ronaldParraCaseContent.evidence) {
      expect(evidence.src).toMatch(/^\/images\/case-studies\/ronald-parra\//);
      expect(evidence.src).not.toMatch(/admin|legal|source|credential|token/i);
    }
  });
});

describe("Ronald Parra metadata and structured data", () => {
  it("emits locale-specific canonical, hreflang, article Open Graph, and social image", () => {
    const es = buildRouteMetadata("ronald-parra", "es");
    const en = buildRouteMetadata("ronald-parra", "en");
    expect(es.alternates?.canonical).toBe(
      "https://maestreparra.github.io/es/proyectos/ronald-parra-digital-health-ecosystem/",
    );
    expect(en.alternates?.canonical).toBe("https://maestreparra.github.io/en/work/ronald-parra-digital-health-ecosystem/");
    expect(es.alternates?.languages).toMatchObject({
      es: "https://maestreparra.github.io/es/proyectos/ronald-parra-digital-health-ecosystem/",
      en: "https://maestreparra.github.io/en/work/ronald-parra-digital-health-ecosystem/",
    });
    expect(es.openGraph).toMatchObject({ type: "article" });
    expect(es.openGraph && "images" in es.openGraph ? es.openGraph.images : []).toEqual([
      expect.objectContaining({ url: "https://maestreparra.github.io/images/social/ronald-parra.png" }),
    ]);
  });

  it("uses CreativeWork schema authored by Giomar without medical business or product claims", () => {
    const serialized = buildRonaldParraCaseStructuredData("en");
    const parsed = JSON.parse(serialized);
    expect(parsed["@type"]).toBe("CreativeWork");
    expect(parsed.author.name).toBe("Giomar Maestre");
    expect(serialized).not.toMatch(/MedicalBusiness|Product|Service|Review|AggregateRating/);
  });
});
