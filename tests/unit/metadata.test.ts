import { describe, expect, it } from "vitest";
import { buildRouteMetadata } from "@/lib/metadata";
import { publicRouteKeys } from "@/i18n/routes";

describe("home metadata", () => {
  it("sets the canonical URL to the locale's own home path", () => {
    const es = buildRouteMetadata("home", "es");
    const en = buildRouteMetadata("home", "en");
    expect(es.alternates?.canonical).toBe("https://maestreparra.github.io/es/");
    expect(en.alternates?.canonical).toBe("https://maestreparra.github.io/en/");
  });

  it("emits the exact required hreflang set: es, en, and x-default", () => {
    const { languages } = buildRouteMetadata("home", "es").alternates ?? {};
    expect(languages).toMatchObject({
      es: "https://maestreparra.github.io/es/",
      en: "https://maestreparra.github.io/en/",
      "x-default": "https://maestreparra.github.io/es/",
    });
  });

  it("uses the exact approved ES/EN title and description from the P2 SEO matrix", () => {
    const es = buildRouteMetadata("home", "es");
    const en = buildRouteMetadata("home", "en");
    expect(es.title).toBe("Giomar Maestre — Product Designer & UX Engineer");
    expect(en.title).toBe("Giomar Maestre — Product Designer & UX Engineer");
    expect(es.description).toBe(
      "Diseño productos complejos de estrategia a código: Product Design, Service Design, Design Systems y UX Engineering.",
    );
    expect(en.description).toBe(
      "End-to-end product design and UX engineering for complex, accessible, technically viable digital products.",
    );
  });
});

describe("P7 — Core Pages metadata", () => {
  const routeKeys = ["about", "work", "contact"] as const;
  const expectedPaths: Record<(typeof routeKeys)[number], { es: string; en: string }> = {
    about: { es: "/es/sobre-mi/", en: "/en/about/" },
    work: { es: "/es/proyectos/", en: "/en/work/" },
    contact: { es: "/es/contacto/", en: "/en/contact/" },
  };

  for (const routeKey of routeKeys) {
    it(`${routeKey}: canonical and alternates match the typed route paths`, () => {
      const es = buildRouteMetadata(routeKey, "es");
      const en = buildRouteMetadata(routeKey, "en");
      expect(es.alternates?.canonical).toBe(`https://maestreparra.github.io${expectedPaths[routeKey].es}`);
      expect(en.alternates?.canonical).toBe(`https://maestreparra.github.io${expectedPaths[routeKey].en}`);
      expect(es.alternates?.languages).toMatchObject({
        es: `https://maestreparra.github.io${expectedPaths[routeKey].es}`,
        en: `https://maestreparra.github.io${expectedPaths[routeKey].en}`,
        "x-default": `https://maestreparra.github.io${expectedPaths[routeKey].es}`,
      });
    });

    it(`${routeKey}: title and description are indexable`, () => {
      const es = buildRouteMetadata(routeKey, "es");
      expect(es.robots).toBe(undefined);
    });
  }

  it("uses the exact approved P2 SEO matrix copy for About, Work, and Contact", () => {
    const expectedCopy: Record<
      (typeof routeKeys)[number],
      { title: { es: string; en: string }; description: { es: string; en: string } }
    > = {
      about: {
        title: { es: "Sobre mí — Giomar Maestre", en: "About — Giomar Maestre" },
        description: {
          es: "Experiencia en GovTech, SaaS B2B, IA y datos, operaciones, e-commerce, Design Systems y frontend.",
          en: "Product design and UX engineering experience across GovTech, B2B SaaS, AI and data, operations, and e-commerce.",
        },
      },
      work: {
        title: { es: "Proyectos seleccionados — Giomar Maestre", en: "Selected work — Giomar Maestre" },
        description: {
          es: "Casos de Product Design, branding, arquitectura de información, Design Systems e implementación frontend.",
          en: "Case studies spanning product strategy, branding, information architecture, design systems, and frontend delivery.",
        },
      },
      contact: {
        title: { es: "Contacto — Giomar Maestre", en: "Contact — Giomar Maestre" },
        description: {
          es: "Contacta a Giomar Maestre para oportunidades remotas de Product Design y UX Engineering.",
          en: "Contact Giomar Maestre for remote Product Design and UX Engineering opportunities.",
        },
      },
    };

    for (const routeKey of routeKeys) {
      const es = buildRouteMetadata(routeKey, "es");
      const en = buildRouteMetadata(routeKey, "en");
      expect(es.title, `${routeKey} es title`).toBe(expectedCopy[routeKey].title.es);
      expect(en.title, `${routeKey} en title`).toBe(expectedCopy[routeKey].title.en);
      expect(es.description, `${routeKey} es description`).toBe(expectedCopy[routeKey].description.es);
      expect(en.description, `${routeKey} en description`).toBe(expectedCopy[routeKey].description.en);
    }
  });

  it("About emits Open Graph type 'profile'; Work and Contact emit 'website'", () => {
    expect(buildRouteMetadata("about", "es").openGraph).toMatchObject({ type: "profile" });
    expect(buildRouteMetadata("work", "es").openGraph).toMatchObject({ type: "website" });
    expect(buildRouteMetadata("contact", "es").openGraph).toMatchObject({ type: "website" });
  });
});

describe("P13 — social sharing metadata (Section 11)", () => {
  it("every public route emits an absolute-URL Open Graph image and a summary_large_image Twitter card", () => {
    for (const routeKey of publicRouteKeys) {
      for (const locale of ["es", "en"] as const) {
        const metadata = buildRouteMetadata(routeKey, locale);
        const ogImages = metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : undefined;
        expect(Array.isArray(ogImages), `${routeKey} ${locale} openGraph.images`).toBe(true);
        const image = (ogImages as Array<{ url: string; width?: number; height?: number }>)[0]!;
        expect(image.url).toMatch(/^https:\/\/maestreparra\.github\.io\/images\/social\/.+\.png$/);
        expect(image.width).toBe(1200);
        expect(image.height).toBe(630);

        expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
        const twitterImages = metadata.twitter && "images" in metadata.twitter ? metadata.twitter.images : undefined;
        expect(twitterImages).toEqual([image.url]);
      }
    }
  });

  it("each case study gets its own social card; Home/About/Work/Contact share the default card", () => {
    const urlFor = (routeKey: (typeof publicRouteKeys)[number]) => {
      const metadata = buildRouteMetadata(routeKey, "es");
      const ogImages = metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : undefined;
      return (ogImages as Array<{ url: string }>)[0]!.url;
    };

    const caseStudyKeys = ["vitalink", "bm-envios", "licendi", "meeco", "pilotorb", "appliedxl"] as const;
    const caseStudyUrls = caseStudyKeys.map(urlFor);
    expect(new Set(caseStudyUrls).size).toBe(caseStudyKeys.length);

    const sharedUrl = urlFor("home");
    for (const routeKey of ["about", "work", "contact"] as const) {
      expect(urlFor(routeKey)).toBe(sharedUrl);
    }
  });

  it("does not regress existing canonical/hreflang behavior for any route", () => {
    for (const routeKey of publicRouteKeys) {
      const metadata = buildRouteMetadata(routeKey, "es");
      expect(metadata.alternates?.canonical).toBeTruthy();
      expect(metadata.alternates?.languages).toBeTruthy();
    }
  });
});
