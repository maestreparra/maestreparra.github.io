import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { getAbsoluteUrl, getRoutePath, type PublicRouteKey } from "@/i18n/routes";

/**
 * Exact ES/EN title and description pairs approved in
 * docs/content/P2_SEO_AND_MESSAGE_MATRIX.md. This is the one typed source
 * for route metadata copy — do not derive it from visible H1s or nav
 * labels, which drift from the approved SEO wording over time.
 */
const routeMetadataCopy: Record<PublicRouteKey, { title: Record<Locale, string>; description: Record<Locale, string> }> = {
  home: {
    title: {
      es: "Giomar Maestre — Product Designer & UX Engineer",
      en: "Giomar Maestre — Product Designer & UX Engineer",
    },
    description: {
      es: "Diseño productos complejos de estrategia a código: Product Design, Service Design, Design Systems y UX Engineering.",
      en: "End-to-end product design and UX engineering for complex, accessible, technically viable digital products.",
    },
  },
  about: {
    title: {
      es: "Sobre mí — Giomar Maestre",
      en: "About — Giomar Maestre",
    },
    description: {
      es: "Experiencia en GovTech, SaaS B2B, IA y datos, operaciones, e-commerce, Design Systems y frontend.",
      en: "Product design and UX engineering experience across GovTech, B2B SaaS, AI and data, operations, and e-commerce.",
    },
  },
  work: {
    title: {
      es: "Proyectos seleccionados — Giomar Maestre",
      en: "Selected work — Giomar Maestre",
    },
    description: {
      es: "Casos de Product Design, branding, arquitectura de información, Design Systems e implementación frontend.",
      en: "Case studies spanning product strategy, branding, information architecture, design systems, and frontend delivery.",
    },
  },
  contact: {
    title: {
      es: "Contacto — Giomar Maestre",
      en: "Contact — Giomar Maestre",
    },
    description: {
      es: "Contacta a Giomar Maestre para oportunidades remotas de Product Design y UX Engineering.",
      en: "Contact Giomar Maestre for remote Product Design and UX Engineering opportunities.",
    },
  },
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

/**
 * One generic, typed metadata builder for every public route, rather than
 * six copied metadata objects.
 */
export function buildRouteMetadata(routeKey: PublicRouteKey, locale: Locale): Metadata {
  const path = getRoutePath(routeKey, locale);
  const url = getAbsoluteUrl(path);
  const { title, description } = routeMetadataCopy[routeKey];

  return {
    title: title[locale],
    description: description[locale],
    alternates: {
      canonical: url,
      languages: {
        es: getAbsoluteUrl(getRoutePath(routeKey, "es")),
        en: getAbsoluteUrl(getRoutePath(routeKey, "en")),
        "x-default": getAbsoluteUrl(getRoutePath(routeKey, "es")),
      },
    },
    openGraph: {
      title: title[locale],
      description: description[locale],
      url,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: routeKey === "about" ? "profile" : routeKey === "vitalink" || routeKey === "bm-envios" ? "article" : "website",
    },
  };
}

export const resolverMetadata: Metadata = {
  title: "Giomar Maestre",
  robots: { index: false, follow: true },
};
