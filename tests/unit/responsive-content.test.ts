import { describe, expect, it } from "vitest";
import { homeContent, localizeResponsive } from "@/content/home";
import { getHomeAnchorHref, homeAnchors } from "@/i18n/routes";

describe("P4-QA-03 — approved mobile copy variants", () => {
  const { hero, selectedWork, experience, method, closing } = homeContent;

  it("hero headline: EN mobile drops '(who use them)'; ES mobile matches desktop", () => {
    expect(localizeResponsive(hero.headline, "en").mobile).toBe(
      "I design complex products that work for people—and the teams that build them.",
    );
    expect(localizeResponsive(hero.headline, "es").mobile).toBe(localizeResponsive(hero.headline, "es").desktop);
  });

  it("hero introduction has the exact compact ES/EN mobile strings", () => {
    expect(localizeResponsive(hero.introduction, "es").mobile).toBe(
      "Conecto estrategia, research, UX/UI, Design Systems e implementación frontend para convertir procesos complejos en productos claros, accesibles y técnicamente viables.",
    );
    expect(localizeResponsive(hero.introduction, "en").mobile).toBe(
      "I connect strategy, research, UX/UI, design systems, and frontend delivery to turn complex processes into clear, accessible, technically viable products.",
    );
  });

  it("hero context has the exact compact ES/EN mobile strings", () => {
    expect(localizeResponsive(hero.context, "es").mobile).toBe("CABUDARE · REMOTO INTERNACIONAL · ES / EN");
    expect(localizeResponsive(hero.context, "en").mobile).toBe("VENEZUELA · INTERNATIONAL REMOTE · ES / EN");
  });

  it("selected-work title and introduction have the exact compact ES/EN mobile strings", () => {
    expect(localizeResponsive(selectedWork.title, "es").mobile).toBe("Decisiones y evidencia visibles.");
    expect(localizeResponsive(selectedWork.title, "en").mobile).toBe("Decisions and evidence made visible.");
    expect(localizeResponsive(selectedWork.introduction, "es").mobile).toBe(
      "Producto, lenguaje visual, arquitectura de información e implementación técnica.",
    );
    expect(localizeResponsive(selectedWork.introduction, "en").mobile).toBe(
      "Product, visual language, information architecture, and technical delivery.",
    );
  });

  it("BM Envios card has the exact compact mobile title (EN) and summary (ES/EN)", () => {
    const bmEnvios = selectedWork.projects.find((project) => project.id === "bm-envios");
    expect(bmEnvios).toBeDefined();
    expect(localizeResponsive(bmEnvios!.title, "en").mobile).toBe("BM Envios Digital Experience");
    expect(localizeResponsive(bmEnvios!.summary, "es").mobile).toBe(
      "Research, arquitectura de información, diseño bilingüe e implementación Next.js para una plataforma logística.",
    );
    expect(localizeResponsive(bmEnvios!.summary, "en").mobile).toBe(
      "Research, information architecture, bilingual design, and Next.js delivery for a logistics platform.",
    );
  });

  it("experience eyebrow, title, and body have the exact compact ES/EN mobile strings", () => {
    expect(localizeResponsive(experience.eyebrow, "es").mobile).toBe("EXPERIENCIA COMPLEJA");
    expect(localizeResponsive(experience.eyebrow, "en").mobile).toBe("COMPLEX PRODUCT EXPERIENCE");
    expect(localizeResponsive(experience.title, "es").mobile).toBe(
      "GovTech, IA y datos, operaciones B2B, BI y e-commerce.",
    );
    expect(localizeResponsive(experience.title, "en").mobile).toBe(
      "GovTech, AI and data, B2B operations, BI, and e-commerce.",
    );
    expect(localizeResponsive(experience.body, "es").mobile).toBe(
      "Transformación digital para servicios públicos, plataformas de datos, operaciones, información financiera y comercio electrónico.",
    );
    expect(localizeResponsive(experience.body, "en").mobile).toBe(
      "Digital transformation for public services, data platforms, operations, financial information, and e-commerce.",
    );
  });

  it("method title has the exact compact ES/EN mobile strings", () => {
    expect(localizeResponsive(method.title, "es").mobile).toBe("Estrategia, sistema y entrega.");
    expect(localizeResponsive(method.title, "en").mobile).toBe("Strategy, systems, and delivery.");
  });

  it("method step 02 description has the exact compact ES/EN mobile strings", () => {
    const step2 = method.steps.find((step) => step.index === "02");
    expect(localizeResponsive(step2!.description, "es").mobile).toBe("Estrategia, flujos, arquitectura y componentes.");
    expect(localizeResponsive(step2!.description, "en").mobile).toBe("Strategy, flows, architecture, and components.");
  });

  it("closing title and body have the exact compact ES/EN mobile strings", () => {
    expect(localizeResponsive(closing.title, "es").mobile).toBe("¿Tu producto necesita claridad?");
    expect(localizeResponsive(closing.title, "en").mobile).toBe("Does your product need clarity?");
    expect(localizeResponsive(closing.body, "es").mobile).toBe(
      "Convirtamos procesos y restricciones técnicas en una experiencia útil y construible.",
    );
    expect(localizeResponsive(closing.body, "en").mobile).toBe(
      "Let's turn processes and technical constraints into a useful, buildable experience.",
    );
  });

  it("desktop copy is unchanged from the P4 attempt-1 baseline", () => {
    expect(hero.headline.en).toBe(
      "I design complex products that work for the people who use them—and the teams that build them.",
    );
    expect(closing.title.es).toBe("¿Tienes un producto complejo que necesita claridad?");
  });
});

describe("P4-QA-04 — #method anchor", () => {
  it("registers a method Home anchor", () => {
    expect(homeAnchors.method).toBe("method");
  });

  it("builds a #method href for both locales", () => {
    expect(getHomeAnchorHref("es", "method")).toBe("/es/#method");
    expect(getHomeAnchorHref("en", "method")).toBe("/en/#method");
  });
});

describe("P4-QA-04 — project repository links", () => {
  it("VitaLink points to its approved public repository", () => {
    const vitalink = homeContent.selectedWork.projects.find((project) => project.id === "vitalink");
    expect(vitalink?.repositoryUrl).toBe("https://github.com/maestreparra/vitalink-digital-ecosystem");
  });

  it("BM Envios points to its approved public repository", () => {
    const bmEnvios = homeContent.selectedWork.projects.find((project) => project.id === "bm-envios");
    expect(bmEnvios?.repositoryUrl).toBe("https://github.com/maestreparra/bm-envios-digital-platform");
  });
});

describe("P7 — Footer route migration and external-link inventory", () => {
  const { links } = homeContent.footer;

  it("lists Work, Experience, and About before the external profiles", () => {
    expect(links.map((link) => link.id)).toEqual(["work", "experience", "about", "linkedin", "behance"]);
  });

  it("migrates Work and About to typed routes, per D-029", () => {
    const work = links.find((entry) => entry.id === "work");
    const about = links.find((entry) => entry.id === "about");
    expect(work?.routeKey).toBe("work");
    expect(work?.external).toBe(false);
    expect(about?.routeKey).toBe("about");
    expect(about?.external).toBe(false);
  });

  it("keeps Experience as the Home #experience anchor (no standalone route)", () => {
    const experience = links.find((entry) => entry.id === "experience");
    expect(experience?.homeAnchor).toBe("experience");
    expect(experience?.external).toBe(false);
  });

  it("uses the corrected public profile URLs", () => {
    expect(links.find((link) => link.id === "linkedin")?.href).toBe("https://www.linkedin.com/in/maestreparra/");
    expect(links.find((link) => link.id === "behance")?.href).toBe("https://www.behance.net/giomarmaestre/");
  });

  it("has identical link inventory across locales (only the labels localize)", () => {
    for (const link of links) {
      expect(link.label.es.length).toBeGreaterThan(0);
      expect(link.label.en.length).toBeGreaterThan(0);
    }
  });
});
