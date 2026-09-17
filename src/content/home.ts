import type { Locale } from "@/i18n/locales";

export interface LocalizedValue {
  es: string;
  en: string;
}

/**
 * A value with an optional compact variant for the frozen mobile Figma
 * frames (390 px). When a locale has no mobile override, the desktop value
 * is reused — the two are never both rendered for the same locale at once.
 */
export interface ResponsiveValue {
  es: string;
  en: string;
  mobile?: {
    es?: string;
    en?: string;
  };
}

export interface EvidenceItem {
  metric: LocalizedValue;
  caption: LocalizedValue;
}

export type PublicationStatus = "published" | "final-refinement";

export interface ProjectCardContent {
  id: string;
  publicationStatus: PublicationStatus;
  status: LocalizedValue;
  title: ResponsiveValue;
  summary: ResponsiveValue;
  scope: LocalizedValue;
  action: LocalizedValue;
  repositoryUrl: string;
}

export interface ProcessStepContent {
  index: string;
  title: LocalizedValue;
  description: ResponsiveValue;
}

export interface FooterLink {
  id: string;
  label: LocalizedValue;
  /** Set for internal typed-route links (e.g. Work, About); resolved per locale by the route registry. */
  routeKey?: "about" | "work";
  /** Set for the Experience link, which has no standalone route (Home #experience anchor only). */
  homeAnchor?: "experience";
  /** Set for external links only. */
  href?: string;
  external: boolean;
}

export interface HomeContent {
  brandName: string;
  nav: {
    home: LocalizedValue;
    work: LocalizedValue;
    experience: LocalizedValue;
    about: LocalizedValue;
    contactCta: LocalizedValue;
  };
  hero: {
    eyebrow: LocalizedValue;
    headline: ResponsiveValue;
    introduction: ResponsiveValue;
    primaryCta: LocalizedValue;
    secondaryCta: LocalizedValue;
    context: ResponsiveValue;
  };
  evidence: EvidenceItem[];
  selectedWork: {
    eyebrow: LocalizedValue;
    title: ResponsiveValue;
    introduction: ResponsiveValue;
    projects: ProjectCardContent[];
  };
  experience: {
    eyebrow: ResponsiveValue;
    title: ResponsiveValue;
    body: ResponsiveValue;
  };
  method: {
    eyebrow: LocalizedValue;
    title: ResponsiveValue;
    steps: ProcessStepContent[];
  };
  closing: {
    title: ResponsiveValue;
    body: ResponsiveValue;
    cta: LocalizedValue;
  };
  footer: {
    tagline: LocalizedValue;
    copyright: LocalizedValue;
    links: FooterLink[];
  };
}

export const homeContent: HomeContent = {
  brandName: "Giomar Maestre",
  nav: {
    home: { es: "Inicio", en: "Home" },
    work: { es: "Proyectos", en: "Work" },
    experience: { es: "Experiencia", en: "Experience" },
    about: { es: "Sobre mí", en: "About" },
    contactCta: { es: "Contacto", en: "Contact" },
  },
  hero: {
    eyebrow: { es: "Product Designer & UX Engineer", en: "Product Designer & UX Engineer" },
    headline: {
      es: "Diseño productos complejos que funcionan para las personas y para quienes los construyen.",
      en: "I design complex products that work for the people who use them—and the teams that build them.",
      mobile: {
        en: "I design complex products that work for people—and the teams that build them.",
      },
    },
    introduction: {
      es: "Conecto estrategia, research, UX/UI, Design Systems e implementación frontend para convertir procesos complejos en productos claros, accesibles y técnicamente viables. Trabajo entre diseño y código en GovTech, SaaS B2B, plataformas de datos, operaciones y e-commerce, acompañando el producto desde la comprensión del problema hasta una entrega que los equipos pueden mantener y evolucionar.",
      en: "I connect strategy, research, UX/UI, design systems, and frontend delivery to turn complex processes into clear, accessible, technically viable products. I work across GovTech, B2B SaaS, data-rich platforms, operations, and e-commerce, taking products from problem framing and evidence through systems, interfaces, and delivery that teams can maintain and evolve.",
      mobile: {
        es: "Conecto estrategia, research, UX/UI, Design Systems e implementación frontend para convertir procesos complejos en productos claros, accesibles y técnicamente viables.",
        en: "I connect strategy, research, UX/UI, design systems, and frontend delivery to turn complex processes into clear, accessible, technically viable products.",
      },
    },
    primaryCta: { es: "Ver proyectos", en: "View selected work" },
    secondaryCta: { es: "Conocer mi enfoque", en: "Explore my approach" },
    context: {
      es: "CABUDARE, VENEZUELA · TRABAJO REMOTO INTERNACIONAL · ES / EN",
      en: "BASED IN VENEZUELA · INTERNATIONAL REMOTE WORK · ES / EN",
      mobile: {
        es: "CABUDARE · REMOTO INTERNACIONAL · ES / EN",
        en: "VENEZUELA · INTERNATIONAL REMOTE · ES / EN",
      },
    },
  },
  evidence: [
    {
      metric: { es: "12 años", en: "12 years" },
      caption: { es: "UX Y PRODUCT DESIGN", en: "UX AND PRODUCT DESIGN" },
    },
    {
      metric: { es: "25 años", en: "25 years" },
      caption: { es: "ENTORNO DIGITAL", en: "DIGITAL WORK" },
    },
    {
      metric: { es: "End-to-end", en: "End-to-end" },
      caption: { es: "PRODUCT DESIGN", en: "PRODUCT DESIGN" },
    },
    {
      metric: { es: "Diseño + código", en: "Design + code" },
      caption: { es: "SYSTEMS / UX ENGINEERING", en: "SYSTEMS / UX ENGINEERING" },
    },
  ],
  selectedWork: {
    eyebrow: { es: "TRABAJO SELECCIONADO", en: "SELECTED WORK" },
    title: {
      es: "Casos donde las decisiones y la evidencia permanecen visibles.",
      en: "Case studies where decisions and evidence remain visible.",
      mobile: {
        es: "Decisiones y evidencia visibles.",
        en: "Decisions and evidence made visible.",
      },
    },
    introduction: {
      es: "Conecto decisiones de producto, lenguaje visual, arquitectura de información e implementación técnica.",
      en: "Product decisions, visual language, information architecture, and technical delivery in one narrative.",
      mobile: {
        es: "Producto, lenguaje visual, arquitectura de información e implementación técnica.",
        en: "Product, visual language, information architecture, and technical delivery.",
      },
    },
    projects: [
      {
        id: "vitalink",
        publicationStatus: "published",
        status: { es: "CASO PUBLICADO", en: "PUBLISHED CASE STUDY" },
        title: { es: "VitaLink Digital Ecosystem", en: "VitaLink Digital Ecosystem" },
        summary: {
          es: "Estrategia, identidad, UX/UI, Design System y arquitectura Angular para dos superficies logísticas bilingües.",
          en: "Strategy, identity, UX/UI, design-system work, and Angular architecture for two bilingual logistics surfaces.",
        },
        scope: { es: "ESTRATEGIA · MARCA · UX/UI · ANGULAR", en: "STRATEGY · BRAND · UX/UI · ANGULAR" },
        action: { es: "Ver caso →", en: "View case →" },
        repositoryUrl: "https://github.com/maestreparra/vitalink-digital-ecosystem",
      },
      {
        id: "bm-envios",
        publicationStatus: "final-refinement",
        status: { es: "REFINAMIENTO FINAL", en: "FINAL REFINEMENT" },
        title: {
          es: "BM Envíos Digital Experience",
          en: "BM Envíos Digital Experience",
          mobile: {
            en: "BM Envios Digital Experience",
          },
        },
        summary: {
          es: "Research, arquitectura de información, diseño bilingüe e implementación Next.js para una plataforma logística y de generación de leads.",
          en: "Research, information architecture, bilingual design, and Next.js delivery for a logistics and lead-generation platform.",
          mobile: {
            es: "Research, arquitectura de información, diseño bilingüe e implementación Next.js para una plataforma logística.",
            en: "Research, information architecture, bilingual design, and Next.js delivery for a logistics platform.",
          },
        },
        scope: { es: "RESEARCH · IA · UX/UI · NEXT.JS", en: "RESEARCH · IA · UX/UI · NEXT.JS" },
        action: { es: "Ver proyecto →", en: "View project →" },
        repositoryUrl: "https://github.com/maestreparra/bm-envios-digital-platform",
      },
    ],
  },
  experience: {
    eyebrow: {
      es: "EXPERIENCIA EN PRODUCTOS COMPLEJOS",
      en: "EXPERIENCE ACROSS COMPLEX PRODUCT DOMAINS",
      mobile: {
        es: "EXPERIENCIA COMPLEJA",
        en: "COMPLEX PRODUCT EXPERIENCE",
      },
    },
    title: {
      es: "GovTech, IA y datos, operaciones B2B, Business Intelligence y e-commerce.",
      en: "GovTech, AI and data, B2B operations, Business Intelligence, and e-commerce.",
      mobile: {
        es: "GovTech, IA y datos, operaciones B2B, BI y e-commerce.",
        en: "GovTech, AI and data, B2B operations, BI, and e-commerce.",
      },
    },
    body: {
      es: "He trabajado en transformación digital para servicios públicos, plataformas de IA y datos científicos, operaciones para restaurantes, Business Intelligence conectado con QuickBooks Online y e-commerce.",
      en: "My work includes digital transformation for public services, AI and scientific-data products, restaurant operations, QuickBooks-connected Business Intelligence, and e-commerce.",
      mobile: {
        es: "Transformación digital para servicios públicos, plataformas de datos, operaciones, información financiera y comercio electrónico.",
        en: "Digital transformation for public services, data platforms, operations, financial information, and e-commerce.",
      },
    },
  },
  method: {
    eyebrow: { es: "DEL PROBLEMA AL PRODUCTO", en: "FROM PROBLEM TO PRODUCT" },
    title: {
      es: "Un proceso continuo entre estrategia, sistema y entrega.",
      en: "A continuous process across strategy, systems, and delivery.",
      mobile: {
        es: "Estrategia, sistema y entrega.",
        en: "Strategy, systems, and delivery.",
      },
    },
    steps: [
      {
        index: "01",
        title: { es: "Entiendo el contexto", en: "Understand the context" },
        description: {
          es: "Research, stakeholders, restricciones y evidencia.",
          en: "Research, stakeholders, constraints, and evidence.",
        },
      },
      {
        index: "02",
        title: { es: "Diseño el sistema", en: "Design the system" },
        description: {
          es: "Estrategia, flujos, arquitectura de información y componentes.",
          en: "Strategy, flows, information architecture, and components.",
          mobile: {
            es: "Estrategia, flujos, arquitectura y componentes.",
            en: "Strategy, flows, architecture, and components.",
          },
        },
      },
      {
        index: "03",
        title: { es: "Conecto diseño y código", en: "Connect design and code" },
        description: {
          es: "Prototipos, handoff, frontend y validación.",
          en: "Prototypes, handoff, frontend delivery, and validation.",
          mobile: {
            en: "Prototypes, handoff, frontend, and validation.",
          },
        },
      },
    ],
  },
  closing: {
    title: {
      es: "¿Tienes un producto complejo que necesita claridad?",
      en: "Working on a complex product that needs clarity?",
      mobile: {
        es: "¿Tu producto necesita claridad?",
        en: "Does your product need clarity?",
      },
    },
    body: {
      es: "Puedo ayudar a convertir procesos, información y restricciones técnicas en una experiencia útil, coherente y construible.",
      en: "I can help turn processes, information, and technical constraints into a useful, coherent, buildable experience.",
      mobile: {
        es: "Convirtamos procesos y restricciones técnicas en una experiencia útil y construible.",
        en: "Let's turn processes and technical constraints into a useful, buildable experience.",
      },
    },
    cta: { es: "Iniciar una conversación", en: "Start a conversation" },
  },
  footer: {
    tagline: { es: "PRODUCT DESIGN · UX ENGINEERING", en: "PRODUCT DESIGN · UX ENGINEERING" },
    copyright: { es: "© 2026 · ES / EN", en: "© 2026 · ES / EN" },
    links: [
      {
        id: "work",
        label: { es: "Proyectos", en: "Work" },
        routeKey: "work",
        external: false,
      },
      {
        id: "experience",
        label: { es: "Experiencia", en: "Experience" },
        homeAnchor: "experience",
        external: false,
      },
      {
        id: "about",
        label: { es: "Sobre mí", en: "About" },
        routeKey: "about",
        external: false,
      },
      {
        id: "linkedin",
        label: { es: "LinkedIn", en: "LinkedIn" },
        href: "https://www.linkedin.com/in/maestreparra/",
        external: true,
      },
      {
        id: "behance",
        label: { es: "Behance", en: "Behance" },
        href: "https://www.behance.net/giomarmaestre/",
        external: true,
      },
    ],
  },
};

export function localize<T extends string>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}

/** Resolves a ResponsiveValue to its desktop and mobile strings for a locale. */
export function localizeResponsive(value: ResponsiveValue, locale: Locale): { desktop: string; mobile: string } {
  const desktop = value[locale];
  const mobile = value.mobile?.[locale] ?? desktop;
  return { desktop, mobile };
}
