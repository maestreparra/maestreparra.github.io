import type { LocalizedValue, PublicationStatus } from "./home";

export interface CapabilityContent {
  id: string;
  label: LocalizedValue;
}

export interface ExperienceEntryContent {
  id: string;
  company: LocalizedValue;
  role: LocalizedValue;
  summary: LocalizedValue;
}

export interface AboutContent {
  eyebrow: LocalizedValue;
  title: LocalizedValue;
  introduction: LocalizedValue;
  perspectiveHeading: LocalizedValue;
  perspectiveBody: LocalizedValue;
  capabilitiesHeading: LocalizedValue;
  capabilities: CapabilityContent[];
  experienceHeading: LocalizedValue;
  experience: ExperienceEntryContent[];
  principleTitle: LocalizedValue;
  principleBody: LocalizedValue;
  principleCta: LocalizedValue;
}

export const aboutContent: AboutContent = {
  eyebrow: { es: "SOBRE MÍ", en: "ABOUT" },
  title: {
    es: "Diseño con criterio de producto y pienso con mentalidad de sistema.",
    en: "I design with product judgment and think in systems.",
  },
  introduction: {
    es: "Soy Product Designer & UX Engineer, con 12 años de experiencia en UX/Product Design y 25 años en el entorno digital. He colaborado con equipos de América, Europa y Medio Oriente en productos SaaS, plataformas web, aplicaciones móviles y servicios digitales. Mi trabajo consiste en entender problemas complejos, organizar la información y conectar las decisiones de diseño con una implementación técnicamente viable. Actualmente lidero iniciativas GovTech y de impacto social para Puerto Rico, donde traduzco normativas, flujos administrativos y necesidades de múltiples stakeholders en experiencias comprensibles para ciudadanos y equipos operativos. También he diseñado productos comerciales en IA y datos, operaciones B2B, Business Intelligence y e-commerce.",
    en: "I am a Product Designer & UX Engineer with 12 years of experience in UX and Product Design and 25 years in digital work. I have collaborated with teams across the Americas, Europe, and the Middle East on SaaS products, web platforms, mobile applications, and digital services. My role is to understand complex problems, structure information, and connect design decisions with technically viable delivery. I currently lead GovTech and social-impact initiatives for Puerto Rico, translating policy, administrative workflows, and multi-stakeholder requirements into experiences that make sense to citizens and operational teams. I have also designed commercial products across AI and data, B2B operations, Business Intelligence, and e-commerce.",
  },
  perspectiveHeading: {
    es: "Una práctica entre diseño, servicio y tecnología",
    en: "A practice spanning product, service, and technology",
  },
  perspectiveBody: {
    es: "No separo la experiencia del usuario de la realidad del sistema. Trabajo desde discovery y Service Design hasta Design Systems, prototipos, documentación y revisión frontend. La IA forma parte de mi workflow para investigar, explorar y documentar con mayor velocidad; el criterio de producto, la validación y la dirección final permanecen bajo mi responsabilidad.",
    en: "I do not separate user experience from system reality. My work moves from discovery and service design through design systems, prototyping, documentation, and frontend review. AI is part of my workflow for faster research, exploration, and documentation; product judgment, validation, and final direction remain my responsibility.",
  },
  capabilitiesHeading: { es: "Capacidades", en: "Capabilities" },
  capabilities: [
    { id: "product-strategy", label: { es: "Product strategy y discovery", en: "Product strategy and discovery" } },
    { id: "user-research", label: { es: "User Research", en: "User research" } },
    { id: "service-design", label: { es: "Service Design", en: "Service design" } },
    { id: "information-architecture", label: { es: "Information Architecture", en: "Information architecture" } },
    { id: "ux-ui-validation", label: { es: "UX/UI y validación", en: "UX/UI and validation" } },
    { id: "design-systems", label: { es: "Design Systems", en: "Design systems" } },
    { id: "accessibility", label: { es: "Accesibilidad WCAG", en: "WCAG accessibility" } },
    { id: "angular-typescript", label: { es: "Angular/TypeScript", en: "Angular/TypeScript" } },
    { id: "react-nextjs", label: { es: "React/Next.js", en: "React/Next.js" } },
    { id: "handoff", label: { es: "Handoff multidisciplinario", en: "Multidisciplinary handoff" } },
  ],
  experienceHeading: { es: "Experiencia seleccionada", en: "Selected experience" },
  experience: [
    {
      id: "sbd",
      company: { es: "SOLUTIONS BY DESIGN, LLC", en: "SOLUTIONS BY DESIGN, LLC" },
      role: { es: "Lead Product Designer & UX Engineer", en: "Lead Product Designer & UX Engineer" },
      summary: {
        es: "Lidero productos GovTech y de impacto social para municipios, agencias y programas públicos de Puerto Rico, desde discovery y Service Design hasta plataformas SaaS multirol, Design Systems y colaboración con ingeniería.",
        en: "I lead GovTech and social-impact products for Puerto Rican municipalities, agencies, and public programs, spanning discovery, service design, multi-role SaaS platforms, design systems, and engineering collaboration.",
      },
    },
    {
      id: "appliedxl",
      company: { es: "APPLIEDXL", en: "APPLIEDXL" },
      role: { es: "Senior Product Designer, AI & Data Platforms", en: "Senior Product Designer, AI & Data Platforms" },
      summary: {
        es: "Diseñé arquitectura de información, búsqueda, filtrado y visualizaciones para una plataforma B2B orientada a datos científicos y oportunidades de inversión en Life Sciences.",
        en: "I designed information architecture, search, filtering, and data views for a B2B platform supporting the evaluation of scientific data and Life Sciences investment opportunities.",
      },
    },
    {
      id: "prezo",
      company: { es: "PREZO", en: "PREZO" },
      role: { es: "Senior Product Designer, B2B SaaS & Operations", en: "Senior Product Designer, B2B SaaS & Operations" },
      summary: {
        es: "Rediseñé flujos de albaranes y facturación para reducir fricción, trabajo manual y errores operativos en una plataforma para restaurantes.",
        en: "I redesigned delivery-note and invoicing workflows to reduce friction, manual work, and operational errors in a restaurant SaaS product.",
      },
    },
    {
      id: "pilotorb",
      company: { es: "PILOTORB", en: "PILOTORB" },
      role: {
        es: "Product Designer, Business Intelligence & Data Visualization",
        en: "Product Designer, Business Intelligence & Data Visualization",
      },
      summary: {
        es: "Diseñé dashboards y flujos para convertir datos de QuickBooks Online sobre facturación, clientes y productos en información útil para gestión comercial.",
        en: "I designed dashboards and workflows that translated QuickBooks Online billing, customer, and product data into useful commercial insight.",
      },
    },
    {
      id: "licendi",
      company: { es: "LICENDI", en: "LICENDI" },
      role: { es: "Senior Product Designer, E-commerce & Brand Experience", en: "Senior Product Designer, E-commerce & Brand Experience" },
      summary: {
        es: "Lideré auditoría UX, customer journey, rediseño de e-commerce y rebranding para una plataforma de licencias de software.",
        en: "I led the UX audit, customer-journey redesign, e-commerce experience, and rebrand for a software-licensing platform.",
      },
    },
  ],
  principleTitle: {
    es: "El usuario primero, sin perder de vista el sistema",
    en: "Users first, without losing sight of the system",
  },
  principleBody: {
    es: "Busco productos que funcionen y se sientan bien: buena arquitectura de información, accesibilidad, consistencia visual y decisiones respaldadas por evidencia.",
    en: "I care about products that work and feel right: clear information architecture, accessibility, visual consistency, and decisions supported by evidence.",
  },
  principleCta: { es: "Iniciar una conversación", en: "Start a conversation" },
};

export interface WorkProjectContent {
  id: string;
  publicationStatus: PublicationStatus;
  status: LocalizedValue;
  title: LocalizedValue;
  summary: LocalizedValue;
  scope: LocalizedValue;
  action: LocalizedValue;
  repositoryUrl: string;
}

export interface WorkContent {
  eyebrow: LocalizedValue;
  title: LocalizedValue;
  introduction: LocalizedValue;
  indexHeading: LocalizedValue;
  indexBody: LocalizedValue;
  projects: WorkProjectContent[];
  legendHeading: LocalizedValue;
  legendPublished: { label: LocalizedValue; description: LocalizedValue };
  legendFinalRefinement: { label: LocalizedValue; description: LocalizedValue };
  contactCtaTitle: LocalizedValue;
  contactCtaBody: LocalizedValue;
  contactCtaButton: LocalizedValue;
}

export const workContent: WorkContent = {
  eyebrow: { es: "PROYECTOS", en: "WORK" },
  title: {
    es: "Trabajo seleccionado, con decisiones y evidencia visibles.",
    en: "Selected work with visible decisions and inspectable evidence.",
  },
  introduction: {
    es: "Cada caso explica el contexto, mi responsabilidad, las decisiones que tomé, cómo conecté diseño y tecnología, y qué límites siguen existiendo.",
    en: "Each case study explains the context, my responsibility, the decisions I made, how design connected with technology, and the limitations that remain.",
  },
  indexHeading: { es: "Casos disponibles", en: "Available case studies" },
  indexBody: {
    es: "El estado de cada caso distingue evidencia publicada de trabajo que todavía se encuentra en refinamiento visual.",
    en: "Each status distinguishes published evidence from work that is still undergoing visual refinement.",
  },
  projects: [
    {
      id: "vitalink",
      publicationStatus: "published",
      status: { es: "CASO PUBLICADO", en: "PUBLISHED CASE STUDY" },
      title: { es: "VitaLink Digital Ecosystem", en: "VitaLink Digital Ecosystem" },
      summary: {
        es: "Estrategia, identidad, UX/UI, Design System y arquitectura Angular para dos superficies logísticas bilingües.",
        en: "From an unconsolidated brand to a bilingual logistics ecosystem: strategy, identity, information architecture, design-system work, and a shared Angular implementation.",
      },
      // Figma's ES Work frame left this card's scope tag unbound to the
      // Spanish default (an English "STRATEGY · BRAND · UX/UI · ANGULAR"
      // string leaking into the ES page). Using the already-approved
      // Spanish evidence tag from the Home vertical slice instead of
      // shipping English text on the Spanish route.
      scope: { es: "ESTRATEGIA · MARCA · UX/UI · ANGULAR", en: "PRODUCT STRATEGY · BRANDING · UX/UI · ANGULAR · I18N" },
      action: { es: "Ver caso →", en: "Read case →" },
      repositoryUrl: "https://github.com/maestreparra/vitalink-digital-ecosystem",
    },
    {
      id: "bm-envios",
      publicationStatus: "final-refinement",
      status: { es: "REFINAMIENTO FINAL", en: "FINAL REFINEMENT" },
      title: { es: "BM Envíos Digital Experience", en: "BM Envios Digital Experience" },
      summary: {
        es: "Research, arquitectura de información, diseño bilingüe e implementación Next.js para una plataforma logística y de generación de leads.",
        en: "A bilingual logistics platform for US-to-Latin-America shipping and a Miami mailbox service, with demonstration forms that transmit and store no data.",
      },
      scope: { es: "RESEARCH · IA · UX/UI · NEXT.JS", en: "RESEARCH · INFORMATION ARCHITECTURE · UX/UI · NEXT.JS · I18N" },
      action: { es: "Ver proyecto →", en: "View project →" },
      repositoryUrl: "https://github.com/maestreparra/bm-envios-digital-platform",
    },
  ],
  legendHeading: { es: "Cómo leer el estado", en: "How to read the status" },
  legendPublished: {
    label: { es: "CASO PUBLICADO", en: "PUBLISHED CASE STUDY" },
    description: {
      es: "Repositorio y evidencia pública disponibles para revisión.",
      en: "Public repository and supporting evidence are available for review.",
    },
  },
  legendFinalRefinement: {
    label: { es: "REFINAMIENTO FINAL", en: "FINAL REFINEMENT" },
    description: {
      es: "Sistema publicado con ajustes visuales locales todavía en proceso.",
      en: "Published system with local visual refinements still in progress.",
    },
  },
  contactCtaTitle: {
    es: "¿Quieres conversar sobre alguno de estos productos?",
    en: "Would you like to discuss one of these products?",
  },
  contactCtaBody: {
    es: "Puedo explicar las decisiones, la arquitectura y los límites de cada caso con mayor profundidad.",
    en: "I can walk through the decisions, architecture, evidence, and limits of each case in greater depth.",
  },
  contactCtaButton: { es: "Iniciar una conversación", en: "Start a conversation" },
};

export interface ContactLinkContent {
  id: string;
  label: LocalizedValue;
  detail: LocalizedValue;
  href: string;
}

export interface ContactContent {
  eyebrow: LocalizedValue;
  title: LocalizedValue;
  introduction: LocalizedValue;
  linksHeading: LocalizedValue;
  linksBody: LocalizedValue;
  links: ContactLinkContent[];
  privacyHeading: LocalizedValue;
  privacyBody: LocalizedValue;
}

export const contactContent: ContactContent = {
  eyebrow: { es: "CONTACTO", en: "CONTACT" },
  title: {
    es: "Hablemos de productos complejos, sistemas y experiencias útiles.",
    en: "Let’s talk about complex products, systems, and useful experiences.",
  },
  introduction: {
    es: "Estoy disponible para oportunidades remotas internacionales y colaboraciones donde Product Design, Service Design y frontend necesiten trabajar como un solo sistema.",
    en: "I am available for international remote opportunities and collaborations where Product Design, service design, and frontend delivery need to operate as one system.",
  },
  linksHeading: { es: "Canales profesionales", en: "Professional channels" },
  linksBody: {
    es: "Elige el canal que mejor se ajuste a lo que quieres revisar o conversar.",
    en: "Choose the channel that best fits what you would like to review or discuss.",
  },
  links: [
    {
      id: "linkedin",
      label: { es: "LinkedIn", en: "LinkedIn" },
      detail: {
        es: "Trayectoria, experiencia y conversación profesional",
        en: "Experience, roles, and professional conversation",
      },
      href: "https://www.linkedin.com/in/maestreparra/",
    },
    {
      id: "github",
      label: { es: "GitHub", en: "GitHub" },
      detail: { es: "Código, arquitectura y evidencia técnica", en: "Code, architecture, and technical evidence" },
      href: "https://github.com/maestreparra",
    },
    {
      id: "behance",
      label: { es: "Behance", en: "Behance" },
      detail: { es: "Casos visuales y trabajo de diseño", en: "Visual case studies and design work" },
      href: "https://www.behance.net/giomarmaestre/",
    },
  ],
  privacyHeading: { es: "Privacidad por diseño", en: "Privacy by design" },
  privacyBody: {
    es: "Este sitio no utiliza formularios, cookies de seguimiento ni almacenamiento de datos personales. Los enlaces abren perfiles profesionales externos y dejan el control de la conversación en tus manos.",
    en: "This website does not use forms, tracking cookies, or personal-data storage. External links open professional profiles and leave you in control of the conversation.",
  },
};
