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
  pilotorb: {
    title: {
      es: "PilotOrb: Business Intelligence y Data Visualization | Giomar Maestre",
      en: "PilotOrb: Business Intelligence & Data Visualization | Giomar Maestre",
    },
    description: {
      es: "Caso de estudio sobre discovery, arquitectura de información y diseño de dashboards para una plataforma de Business Intelligence integrada con QuickBooks Online.",
      en: "Case study covering discovery, information architecture, and dashboard design for a Business Intelligence platform integrated with QuickBooks Online.",
    },
  },
  appliedxl: {
    title: {
      es: "AppliedXL: IA y datos científicos | Giomar Maestre",
      en: "AppliedXL: AI & Scientific Data | Giomar Maestre",
    },
    description: {
      es: "Caso de estudio sobre discovery, arquitectura de información y visualización de datos para una plataforma SaaS B2B de IA y datos científicos.",
      en: "Case study covering discovery, information architecture, and data visualization for a B2B SaaS AI and scientific-data platform.",
    },
  },
};

/**
 * Portfolio-owned 1200x630 social preview cards (P13, Section 11): one card
 * per case study plus a default card reused for Home/About/Work/Contact,
 * which have no dedicated case-study identity of their own.
 */
const socialImageSlug: Record<PublicRouteKey, string> = {
  home: "home",
  about: "home",
  work: "home",
  contact: "home",
  vitalink: "vitalink",
  "bm-envios": "bm-envios",
  licendi: "licendi",
  meeco: "meeco",
  pilotorb: "pilotorb",
  appliedxl: "appliedxl",
};

/**
 * One generic, typed metadata builder for every public route, rather than
 * six copied metadata objects.
 */
export function buildRouteMetadata(routeKey: PublicRouteKey, locale: Locale): Metadata {
  const path = getRoutePath(routeKey, locale);
  const url = getAbsoluteUrl(path);
  const { title, description } = routeMetadataCopy[routeKey];
  const socialImageUrl = getAbsoluteUrl(`/images/social/${socialImageSlug[routeKey]}.png`);
  const ogType =
    routeKey === "about"
      ? "profile"
      : routeKey === "vitalink" ||
          routeKey === "bm-envios" ||
          routeKey === "licendi" ||
          routeKey === "meeco" ||
          routeKey === "pilotorb" ||
          routeKey === "appliedxl"
        ? "article"
        : "website";

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
      type: ogType,
      images: [{ url: socialImageUrl, width: 1200, height: 630, alt: title[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: title[locale],
      description: description[locale],
      images: [socialImageUrl],
    },
  };
}

export const resolverMetadata: Metadata = {
  title: "Giomar Maestre",
  robots: { index: false, follow: true },
};
