import type { LocalizedValue, PublicationStatus, ResponsiveValue } from "./home";

export type CaseStudyId = "vitalink" | "bm-envios";

export interface CaseStudyDecision {
  /** Titles are short in both variants; some still differ between breakpoints per the frozen mobile nodes. */
  title: ResponsiveValue;
  body: ResponsiveValue;
}

export interface CaseStudyFact {
  value: LocalizedValue;
  label: ResponsiveValue;
}

export interface CaseStudyEvidenceImage {
  /** Localized because BM Envíos shows a different approved screenshot per locale. */
  src: LocalizedValue;
  alt: LocalizedValue;
  caption: LocalizedValue;
  /**
   * The frozen Figma evidence-figure box height in CSS pixels at this
   * breakpoint (390 px mobile / 1440 px desktop). The approved evidence
   * screenshots are full-page captures with their own tall intrinsic aspect
   * ratio, so the figure box height is fixed and the image is fit inside it
   * with `object-fit: contain` rather than left to its natural height.
   */
  heightPx: number;
}

export interface CaseStudyEvidenceNotes {
  title: LocalizedValue;
  body: LocalizedValue;
  provenance: LocalizedValue;
}

export interface CaseStudyEvidence {
  mobile: CaseStudyEvidenceImage;
  desktop: CaseStudyEvidenceImage;
  /** The frozen mobile Evidence Notes card uses shorter copy than desktop for both cases. */
  notesMobile: CaseStudyEvidenceNotes;
  notesDesktop: CaseStudyEvidenceNotes;
}

export interface CaseStudyExternalAction {
  label: ResponsiveValue;
  variant: "primary" | "secondary";
  /** External repository/site links always open safely in a new tab. */
  external: true;
  href: string;
}

export interface CaseStudyInternalAction {
  label: ResponsiveValue;
  variant: "primary" | "secondary";
  /** The single internal destination this slice may link to: Contact. */
  external: false;
  internalRouteKey: "contact";
}

export type CaseStudyAction = CaseStudyExternalAction | CaseStudyInternalAction;

export interface CaseStudyContent {
  id: CaseStudyId;
  publicationStatus: PublicationStatus;
  breadcrumbParent: LocalizedValue;
  breadcrumbCurrent: ResponsiveValue;
  statusLabel: LocalizedValue;
  eyebrow: ResponsiveValue;
  title: ResponsiveValue;
  introduction: ResponsiveValue;
  roleLabel: LocalizedValue;
  role: LocalizedValue;
  scope: ResponsiveValue;
  challengeSectionLabel: ResponsiveValue;
  challengeTitle: LocalizedValue;
  challengeBody: ResponsiveValue;
  responsibilityTitle: LocalizedValue;
  responsibilityBody: ResponsiveValue;
  processSectionLabel: ResponsiveValue;
  processTitle: ResponsiveValue;
  decisions: CaseStudyDecision[];
  evidenceSectionLabel: ResponsiveValue;
  evidenceTitle: ResponsiveValue;
  evidenceIntro: ResponsiveValue;
  evidence: CaseStudyEvidence;
  technicalSectionLabel: ResponsiveValue;
  technicalTitle: ResponsiveValue;
  technicalNote: ResponsiveValue;
  facts: CaseStudyFact[];
  outcomeLabel: ResponsiveValue;
  outcomeTitle: ResponsiveValue;
  outcomeBody: ResponsiveValue;
  limitationsTitle: ResponsiveValue;
  limitationsBody: ResponsiveValue;
  linksTitle: ResponsiveValue;
  linksBody: ResponsiveValue;
  actions: CaseStudyAction[];
}

export const caseStudies: Record<CaseStudyId, CaseStudyContent> = {
  vitalink: {
    id: "vitalink",
    publicationStatus: "published",
    breadcrumbParent: { es: "PROYECTOS", en: "WORK" },
    breadcrumbCurrent: {
      es: "VITALINK DIGITAL ECOSYSTEM",
      en: "VITALINK DIGITAL ECOSYSTEM",
      mobile: { es: "VITALINK", en: "VITALINK" },
    },
    statusLabel: { es: "CASO PUBLICADO", en: "PUBLISHED CASE" },
    eyebrow: {
      es: "CASO DE ESTUDIO · LOGÍSTICA Y SERVICIOS",
      en: "CASE STUDY · LOGISTICS AND SERVICES",
      mobile: { es: "CASO · LOGÍSTICA Y SERVICIOS", en: "CASE · LOGISTICS AND SERVICES" },
    },
    title: {
      es: "VitaLink: un ecosistema digital bilingüe creado de estrategia a código.",
      en: "VitaLink: a bilingual digital ecosystem built from strategy through code.",
      mobile: {
        es: "VitaLink: un ecosistema bilingüe de estrategia a código.",
        en: "VitaLink: a bilingual ecosystem from strategy through code.",
      },
    },
    introduction: {
      es: "VitaLink necesitaba construir su identidad digital y explicar dos ofertas relacionadas: mensajería médica y servicios Express. Lideré el proyecto end-to-end, desde research, posicionamiento y branding hasta UX/UI, Design System, arquitectura Angular, implementación frontend y coordinación de publicación.",
      en: "VitaLink needed a digital identity and a clear way to communicate two related offers: medical courier and Express services. I led the initiative end to end, from research, positioning, and brand direction through UX/UI, design-system work, Angular architecture, frontend implementation, and publication coordination.",
      mobile: {
        es: "Construí la identidad digital y el sistema de producto para Courier y Express: research, branding, UX/UI, Design System, Angular y coordinación de publicación.",
        en: "I built the digital identity and product system for Courier and Express: research, brand, UX/UI, design-system work, Angular, and publication coordination.",
      },
    },
    roleLabel: { es: "ROL Y ALCANCE", en: "ROLE AND SCOPE" },
    role: { es: "Lead Product Designer & UX Engineer", en: "Lead Product Designer & UX Engineer" },
    scope: {
      es: "Estrategia, marca, UX/UI, contenido, Design System, frontend y SEO · VitaLink Courier + VitaLink Express · Inglés + español · Angular, TypeScript, RxJS, Tailwind CSS, SSR/prerender y Express",
      en: "Strategy, brand, UX/UI, content, design system, frontend, and SEO · VitaLink Courier + VitaLink Express · English + Spanish · Angular, TypeScript, RxJS, Tailwind CSS, SSR/prerendering, and Express",
      mobile: {
        es: "Estrategia · marca · UX/UI · Design System · frontend · SEO · Angular · i18n",
        en: "Strategy · brand · UX/UI · design system · frontend · SEO · Angular · i18n",
      },
    },
    challengeSectionLabel: {
      es: "CONTEXTO Y RESPONSABILIDAD",
      en: "CONTEXT AND RESPONSIBILITY",
      mobile: { es: "CONTEXTO", en: "CONTEXT" },
    },
    challengeTitle: { es: "El reto", en: "The challenge" },
    challengeBody: {
      es: "La empresa partía sin identidad digital consolidada. Debía explicar servicios sensibles a la confianza, diferenciar Courier y Express sin fragmentar la marca y mantener rutas, metadata y estados HTTP coherentes en dos idiomas y dos dominios.",
      en: "The company lacked a consolidated digital identity. The product had to communicate trust-sensitive services, distinguish Courier and Express without fragmenting the brand, and keep routes, metadata, and HTTP behavior coherent across two languages and domains.",
      mobile: {
        es: "Diferenciar Courier y Express sin fragmentar la marca, en dos idiomas y con comportamiento técnico coherente.",
        en: "Distinguish Courier and Express without fragmenting the brand, across two languages and coherent technical behavior.",
      },
    },
    responsibilityTitle: { es: "Mi responsabilidad", en: "My responsibility" },
    responsibilityBody: {
      es: "El cliente aportó conocimiento operativo, servicios y aprobaciones. Yo traduje ese material en estrategia, identidad, arquitectura de información, lenguaje visual, flujos, documentación, arquitectura frontend y estabilización técnica.",
      en: "The client supplied operational knowledge, services, and approvals. I translated that input into strategy, identity, information architecture, visual language, flows, documentation, frontend architecture, and technical stabilization.",
      mobile: {
        es: "Convertí el conocimiento operativo del cliente en estrategia, identidad, arquitectura, UX/UI y frontend.",
        en: "I turned the client's operational knowledge into strategy, identity, architecture, UX/UI, and frontend delivery.",
      },
    },
    processSectionLabel: {
      es: "DEL BRIEF OPERATIVO AL SISTEMA DIGITAL",
      en: "FROM OPERATIONAL BRIEF TO DIGITAL SYSTEM",
      mobile: { es: "PROCESO", en: "PROCESS" },
    },
    processTitle: {
      es: "Cinco decisiones conectaron marca, producto y arquitectura.",
      en: "Five decisions connected brand, product, and architecture.",
      mobile: {
        es: "De brief operativo a sistema digital.",
        en: "From operational brief to digital system.",
      },
    },
    decisions: [
      {
        title: {
          es: "Discovery y posicionamiento",
          en: "Discovery and positioning",
          mobile: { es: "Discovery", en: "Discovery" },
        },
        body: {
          es: "Organicé servicios, audiencias, requisitos de confianza y objetivos. VitaLink se mantuvo como ancla.",
          en: "I organized services, audiences, trust requirements, and goals. VitaLink remained the anchor.",
          mobile: { es: "Servicios, audiencias y confianza.", en: "Services, audiences, and trust." },
        },
      },
      {
        title: {
          es: "Arquitectura de información",
          en: "Information architecture",
          mobile: { es: "Arquitectura", en: "Architecture" },
        },
        body: {
          es: "La navegación responde servicio, cobertura, señales de confianza y siguiente paso antes del contacto.",
          en: "Navigation answers service fit, coverage, trust signals, and next step before contact.",
          mobile: { es: "Cobertura, señales y siguiente paso.", en: "Coverage, signals, and next step." },
        },
      },
      {
        title: { es: "Sistema visual", en: "Visual system" },
        body: {
          es: "Definí logo, color, tipografía, fotografía, componentes y comportamiento responsive.",
          en: "I defined logo, color, typography, photography, components, and responsive behavior.",
          mobile: { es: "Marca, componentes y responsive.", en: "Brand, components, responsive." },
        },
      },
      {
        title: {
          es: "Una arquitectura, dos superficies",
          en: "One architecture, two surfaces",
          mobile: { es: "Arquitectura compartida", en: "Shared architecture" },
        },
        body: {
          es: "Un código Angular compartido reduce duplicación sin perder identidad ni canonical URLs.",
          en: "A shared Angular base reduces duplication while preserving identity and canonical origins.",
          mobile: { es: "Courier y Express, una base.", en: "Courier and Express, one base." },
        },
      },
      {
        title: { es: "Conversión honesta", en: "Honest conversion" },
        body: {
          es: "Cotización deriva explícitamente a WhatsApp o SMS sin fingir un backend inexistente.",
          en: "Quote flow hands users to WhatsApp or SMS without claiming a nonexistent backend.",
          mobile: { es: "WhatsApp o SMS, sin backend falso.", en: "WhatsApp or SMS, no fake backend." },
        },
      },
    ],
    evidenceSectionLabel: {
      es: "EVIDENCIA PUBLICADA",
      en: "PUBLISHED EVIDENCE",
      mobile: { es: "EVIDENCIA", en: "EVIDENCE" },
    },
    evidenceTitle: {
      es: "La evidencia separa intención, implementación y validación.",
      en: "Evidence separates intent, implementation, and validation.",
      mobile: { es: "Intención, código y validación.", en: "Intent, code, and validation." },
    },
    evidenceIntro: {
      es: "El caso no presenta conceptos como producto enviado. Cada artefacto identifica su estado y su fuente.",
      en: "The case does not present concepts as shipped product. Each artifact identifies its state and source.",
      mobile: { es: "Cada artefacto declara fuente y estado.", en: "Every artifact declares source and state." },
    },
    evidence: {
      // Same authorized cover image at both breakpoints. The frozen mobile
      // composition reserves the same 420px evidence canvas as desktop so
      // the architecture diagram stays inspectable instead of collapsing
      // into a thumbnail (46:135 / 46:303 vs 46:86 / 46:254).
      mobile: {
        src: { es: "/images/case-studies/vitalink-case-study-cover.png", en: "/images/case-studies/vitalink-case-study-cover.png" },
        alt: {
          es: "Portada del caso VitaLink Digital Ecosystem que presenta VitaLink Courier y VitaLink Express como dos superficies sobre una arquitectura compartida.",
          en: "VitaLink Digital Ecosystem case-study cover presenting VitaLink Courier and VitaLink Express as two surfaces on a shared architecture.",
        },
        caption: {
          es: "Cover autorizado del caso público.",
          en: "Authorized public case-study cover.",
        },
        heightPx: 420,
      },
      desktop: {
        src: { es: "/images/case-studies/vitalink-case-study-cover.png", en: "/images/case-studies/vitalink-case-study-cover.png" },
        alt: {
          es: "Portada del caso VitaLink Digital Ecosystem que presenta VitaLink Courier y VitaLink Express como dos superficies sobre una arquitectura compartida.",
          en: "VitaLink Digital Ecosystem case-study cover presenting VitaLink Courier and VitaLink Express as two surfaces on a shared architecture.",
        },
        caption: {
          es: "Cover autorizado del caso público VitaLink Digital Ecosystem.",
          en: "Authorized cover for the public VitaLink Digital Ecosystem case.",
        },
        heightPx: 420,
      },
      notesMobile: {
        title: { es: "Arquitectura compartida", en: "Shared architecture" },
        body: {
          es: "Courier y Express comparten una base Angular sin perder identidad.",
          en: "Courier and Express share one Angular base without losing identity.",
        },
        provenance: { es: "REPO 34bef38 · AUTORIZADO", en: "REPO 34bef38 · AUTHORIZED" },
      },
      notesDesktop: {
        title: { es: "Una arquitectura compartida", en: "One shared architecture" },
        body: {
          es: "Courier y Express comparten navegación, localización, componentes y base Angular, mientras conservan propuesta y origen canonical propios.",
          en: "Courier and Express share navigation, localization, components, and one Angular base while preserving distinct propositions and canonical origins.",
        },
        provenance: { es: "FUENTE · REPO PÚBLICO 34bef38 · USO AUTORIZADO", en: "SOURCE · PUBLIC REPO 34bef38 · AUTHORIZED" },
      },
    },
    technicalSectionLabel: {
      es: "EVIDENCIA TÉCNICA VERIFICABLE",
      en: "INSPECTABLE TECHNICAL EVIDENCE",
      mobile: { es: "EVIDENCIA TÉCNICA", en: "TECHNICAL EVIDENCE" },
    },
    technicalTitle: {
      es: "La calidad se presenta como un punto de validación, no como una promesa.",
      en: "Quality is presented as a validation point, not a promise.",
      mobile: { es: "Punto de validación documentado.", en: "Documented validation point." },
    },
    technicalNote: {
      es: "Valores documentados en la edición pública y limitados al momento de validación.",
      en: "Values documented in the public edition and limited to the recorded validation point.",
      mobile: { es: "Sin claims de negocio.", en: "No business-impact claims." },
    },
    facts: [
      { value: { es: "27", en: "27" }, label: { es: "pruebas automatizadas aprobadas", en: "passing automated tests", mobile: { es: "tests aprobados", en: "passing tests" } } },
      { value: { es: "21", en: "21" }, label: { es: "rutas prerenderizadas", en: "prerendered routes" } },
      { value: { es: "≈23,5 %", en: "≈23.5%" }, label: { es: "reducción del bundle inicial raw", en: "initial raw bundle reduction", mobile: { es: "bundle raw reducido", en: "raw bundle reduction" } } },
      { value: { es: "478 + 478", en: "478 + 478" }, label: { es: "valores ES/EN con paridad automatizada", en: "ES/EN values with automated parity", mobile: { es: "paridad ES/EN", en: "ES/EN parity" } } },
      { value: { es: "2 orígenes", en: "2 origins" }, label: { es: "canonical multidominio corregido", en: "corrected multidomain canonicals", mobile: { es: "orígenes canonical", en: "canonical origins" } } },
      { value: { es: "0", en: "0" }, label: { es: "vulnerabilidades reportadas por npm audit", en: "vulnerabilities reported by npm audit", mobile: { es: "vulnerabilidades", en: "vulnerabilities" } } },
    ],
    outcomeLabel: {
      es: "RESULTADO ACTUAL",
      en: "CURRENT OUTCOME",
      mobile: { es: "RESULTADO", en: "OUTCOME" },
    },
    outcomeTitle: {
      es: "Un ecosistema coherente y observable.",
      en: "A coherent, observable ecosystem.",
      mobile: {
        es: "Identidad, servicio y código en un solo sistema.",
        en: "Identity, service, and code in one system.",
      },
    },
    outcomeBody: {
      es: "El trabajo convirtió un brief operativo amplio en una experiencia que conecta identidad, Service Design, contenido bilingüe y entrega frontend. El producto y el repositorio permiten evaluar decisiones y límites con transparencia.",
      en: "The work turned a broad operational brief into an experience connecting identity, service design, bilingual content, and frontend delivery. Product and repository make decisions and boundaries inspectable.",
      mobile: {
        es: "La experiencia y el repositorio hacen visibles las decisiones y sus límites.",
        en: "The experience and repository make decisions and limitations visible.",
      },
    },
    limitationsTitle: { es: "Límites declarados", en: "Declared limitations", mobile: { es: "Límites", en: "Limitations" } },
    limitationsBody: {
      es: "No se afirma impacto en conversión, ingresos, tráfico o posicionamiento. La edición pública no incluye pagos, tracking, backend de cotizaciones ni integraciones operativas. VitaLink Express no se presenta como enlace activo mientras su ruta pública responda 404.",
      en: "No claims are made about conversion, revenue, traffic, or ranking. The public edition excludes payments, tracking, quote backend, and operational integrations. VitaLink Express is not shown as an active link while its public route returns 404.",
      mobile: {
        es: "Sin claims de conversión o ingresos. Sin pagos, tracking ni backend. Express no es enlace activo mientras responda 404.",
        en: "No conversion or revenue claims. No payments, tracking, or backend. Express stays inactive while returning 404.",
      },
    },
    linksTitle: { es: "Revisa la experiencia y su arquitectura.", en: "Review the experience and architecture.", mobile: { es: "Explora el caso.", en: "Explore the case." } },
    linksBody: {
      es: "Producto público y repositorio técnico, sin ocultar las limitaciones.",
      en: "A public product and technical repository with explicit boundaries.",
      mobile: { es: "Producto y código verificables.", en: "Inspectable product and code." },
    },
    actions: [
      {
        label: { es: "Ver VitaLink Courier", en: "View VitaLink Courier", mobile: { es: "Ver Courier", en: "View Courier" } },
        href: "https://www.vitalinkcouriers.com/",
        variant: "primary",
        external: true,
      },
      {
        label: { es: "Revisar GitHub", en: "Review GitHub", mobile: { es: "GitHub", en: "GitHub" } },
        href: "https://github.com/maestreparra/vitalink-digital-ecosystem",
        variant: "secondary",
        external: true,
      },
    ],
  },
  "bm-envios": {
    id: "bm-envios",
    publicationStatus: "final-refinement",
    breadcrumbParent: { es: "PROYECTOS", en: "WORK" },
    breadcrumbCurrent: {
      es: "BM ENVÍOS DIGITAL EXPERIENCE",
      en: "BM ENVIOS DIGITAL EXPERIENCE",
      mobile: { es: "BM ENVÍOS", en: "BM ENVIOS" },
    },
    statusLabel: { es: "REFINAMIENTO FINAL", en: "FINAL REFINEMENT" },
    eyebrow: {
      es: "CASO DE ESTUDIO · LOGÍSTICA Y GENERACIÓN DE LEADS",
      en: "CASE STUDY · LOGISTICS AND LEAD GENERATION",
      mobile: { es: "CASO · LOGÍSTICA Y LEADS", en: "CASE · LOGISTICS AND LEADS" },
    },
    title: {
      es: "BM Envíos: una experiencia logística bilingüe con privacidad verificable desde el diseño.",
      en: "BM Envios: a bilingual logistics experience with privacy that is verifiable by design.",
      mobile: {
        es: "BM Envíos: logística bilingüe con privacidad verificable.",
        en: "BM Envios: bilingual logistics with verifiable privacy.",
      },
    },
    introduction: {
      es: "BM Envíos necesitaba evolucionar desde una presencia digital básica hacia una plataforma capaz de explicar envíos desde Estados Unidos hacia Latinoamérica y casillero en Miami. Lideré discovery, arquitectura de información, dirección de marca, UX/UI, estrategia bilingüe y arquitectura Next.js.",
      en: "BM Envios needed to evolve from a basic digital presence into a platform for US-to-Latin-America shipping and a Miami mailbox service. I led discovery, information architecture, brand direction, UX/UI, bilingual strategy, and the Next.js implementation architecture.",
      mobile: {
        es: "Transformé una presencia digital básica en un sistema bilingüe para servicios, destinos y journeys demostrativos, con una arquitectura Next.js verificable.",
        en: "I turned an early web presence into a bilingual system for services, destinations, and demonstration journeys, backed by an inspectable Next.js architecture.",
      },
    },
    roleLabel: { es: "ROL Y ALCANCE", en: "ROLE AND SCOPE" },
    role: { es: "Product Designer & UX Engineer", en: "Product Designer & UX Engineer" },
    scope: {
      es: "Research, IA, UX/UI, responsive, localización, accesibilidad, SEO y QA · Español predeterminado + inglés completo · Next.js 16, React 19, TypeScript, MUI, next-intl, Vitest y Playwright",
      en: "Research, IA, UX/UI, responsive system, localization, accessibility, SEO, and QA · Spanish default + complete English support · Next.js 16, React 19, TypeScript, MUI, next-intl, Vitest, and Playwright",
      mobile: {
        es: "Research · IA · UX/UI · i18n · accesibilidad · SEO · QA · Next.js · React · MUI",
        en: "Research · IA · UX/UI · i18n · accessibility · SEO · QA · Next.js · React · MUI",
      },
    },
    challengeSectionLabel: { es: "PROBLEMA Y ALCANCE", en: "PROBLEM AND SCOPE" },
    challengeTitle: { es: "El reto", en: "The challenge" },
    challengeBody: {
      es: "Tarifas, tiempos, disponibilidad por país y textos legales no estaban confirmados. La experiencia debía mostrar cotización, contacto y registro sin inventar operaciones, certificaciones ni una integración backend inexistente.",
      en: "Rates, transit times, country availability, and legal language were unconfirmed. The experience had to demonstrate quote, contact, and registration journeys without inventing operations, certifications, or a backend integration.",
      mobile: {
        es: "Diseñar journeys completos sin inventar tarifas, tiempos, certificaciones ni un backend real.",
        en: "Show complete journeys without inventing rates, timing, certifications, or a real backend.",
      },
    },
    responsibilityTitle: { es: "Mi responsabilidad", en: "My responsibility" },
    responsibilityBody: {
      es: "Definí servicios, destinos, navegación, rutas bilingües, componentes, estados de contenido y límites de publicación. Diseñé en Figma y orienté la arquitectura Next.js, accesibilidad, indexación y QA.",
      en: "I defined services, destinations, navigation, bilingual routes, components, content states, and publication boundaries. I directed Figma, Next.js architecture, accessibility, indexing, and QA.",
      mobile: {
        es: "Organicé servicios, destinos, rutas bilingües, estados de contenido, diseño responsive, arquitectura y QA.",
        en: "I structured services, destinations, bilingual routes, content states, responsive design, architecture, and QA.",
      },
    },
    processSectionLabel: {
      es: "DECISIONES PRINCIPALES",
      en: "KEY DECISIONS",
      mobile: { es: "DECISIONES", en: "DECISIONS" },
    },
    processTitle: {
      es: "El sistema protege coherencia, privacidad y publicación.",
      en: "The system protects coherence, privacy, and publication.",
      mobile: {
        es: "Coherencia y privacidad desde la arquitectura.",
        en: "Coherence and privacy by architecture.",
      },
    },
    decisions: [
      {
        title: {
          es: "Español primero, inglés completo",
          en: "Spanish first, full English",
          mobile: { es: "Español primero", en: "Spanish first" },
        },
        body: {
          es: "Ambas versiones mantienen rutas, metadata, contenido y comportamiento equivalentes.",
          en: "Both locales retain equivalent routes, metadata, content, and behavior.",
          mobile: { es: "Inglés completo y equivalente.", en: "Complete, equivalent English." },
        },
      },
      {
        title: { es: "Registro tipado", en: "Typed registry" },
        body: {
          es: "Una fuente conecta route keys, contenido, metadata y templates sin duplicar árboles.",
          en: "One source connects route keys, content, metadata, and templates without duplicated trees.",
          mobile: { es: "Rutas, contenido y metadata.", en: "Routes, content, and metadata." },
        },
      },
      {
        title: { es: "Estados verificables", en: "Verifiable content states" },
        body: {
          es: "Separa información pública, propuesta y no confirmada para impedir claims accidentales.",
          en: "Public, proposed, and unconfirmed information stay explicitly separated.",
          mobile: { es: "Sin datos no confirmados.", en: "No unconfirmed claims." },
        },
      },
      {
        title: {
          es: "Formularios sin falsa transmisión",
          en: "No fake transmission",
          mobile: { es: "Cero transmisión", en: "Zero transmission" },
        },
        body: {
          es: "Validación y recuperación local sin fetch, XHR, cookies ni almacenamiento.",
          en: "Validation and recovery remain local with no fetch, XHR, cookies, or storage.",
          mobile: { es: "Formularios locales y comprobables.", en: "Inspectable local forms." },
        },
      },
      {
        title: {
          es: "Indexación segura",
          en: "Safe indexing",
          mobile: { es: "Noindex seguro", en: "Safe noindex" },
        },
        body: {
          es: "Noindex por defecto; conversión y avisos legales permanecen fuera del índice.",
          en: "Noindex by default; conversion and legal-notice routes stay excluded.",
          mobile: { es: "Publicación solo con autorización.", en: "Publication only by authorization." },
        },
      },
    ],
    evidenceSectionLabel: {
      es: "EVIDENCIA PUBLICADA",
      en: "PUBLISHED EVIDENCE",
      mobile: { es: "EVIDENCIA", en: "EVIDENCE" },
    },
    evidenceTitle: {
      es: "Una plataforma bilingüe verificable en código y pruebas.",
      en: "A bilingual platform inspectable through code and tests.",
      mobile: { es: "Experiencia pública verificable.", en: "An inspectable public experience." },
    },
    evidenceIntro: {
      es: "La selección visual utiliza únicamente capturas ya presentes en el repositorio público aprobado.",
      en: "The visual selection uses only screenshots already present in the approved public repository.",
      mobile: { es: "Captura aprobada del repositorio.", en: "Approved repository screenshot." },
    },
    evidence: {
      // BM Envíos shows a different approved screenshot per locale, per the
      // P8 evidence ledger: ES uses the Home captures, EN uses the Services
      // (desktop) and registration-demo (mobile) captures.
      desktop: {
        src: {
          es: "/images/case-studies/home-desktop-es.webp",
          en: "/images/case-studies/services-desktop-en.webp",
        },
        alt: {
          es: "Página de inicio de BM Envíos en español con hero, servicios, destinos, flujo de tres pasos, preguntas frecuentes y llamadas a la acción.",
          en: "English BM Envios Services page with navigation, service overview cards, and the responsive public-site layout.",
        },
        caption: {
          es: "Home ES documentado en el repositorio público; muestra navegación, servicios, destinos y CTA.",
          en: "English Services page documented in the public repository, showing the bilingual page system.",
        },
        heightPx: 640,
      },
      mobile: {
        src: {
          es: "/images/case-studies/home-mobile-es.webp",
          en: "/images/case-studies/registration-mobile-en.webp",
        },
        alt: {
          es: "Vista móvil de la página de inicio de BM Envíos en español con navegación compacta, servicios, destinos y recorrido logístico.",
          en: "Mobile English mailbox-registration demonstration with disclosure, form fields, zero-transmission acknowledgement, and a local-only completion path.",
        },
        caption: {
          es: "Home ES móvil en la baseline pública.",
          en: "English mailbox registration demo on mobile.",
        },
        heightPx: 620,
      },
      notesMobile: {
        title: { es: "Cero transmisión", en: "Zero transmission" },
        body: {
          es: "Validación local sin fetch, XHR, cookies ni storage.",
          en: "Local validation with no fetch, XHR, cookies, or storage.",
        },
        provenance: { es: "REPO ed44c8e · APROBADA", en: "REPO ed44c8e · APPROVED" },
      },
      notesDesktop: {
        title: { es: "Privacidad comprobable", en: "Inspectable privacy" },
        body: {
          es: "Las pruebas instrumentan red y almacenamiento durante interacciones reales: la demostración valida y recupera estados sin transmitir ni persistir datos.",
          en: "Tests instrument network and storage primitives during real interactions: the demo validates and recovers states without transmitting or persisting data.",
        },
        provenance: { es: "FUENTE · REPO PÚBLICO ed44c8e · CAPTURA APROBADA", en: "SOURCE · PUBLIC REPO ed44c8e · APPROVED CAPTURE" },
      },
    },
    technicalSectionLabel: {
      es: "EVIDENCIA TÉCNICA PUBLICADA",
      en: "PUBLISHED TECHNICAL EVIDENCE",
      mobile: { es: "EVIDENCIA TÉCNICA", en: "TECHNICAL EVIDENCE" },
    },
    technicalTitle: {
      es: "La arquitectura y la privacidad tienen pruebas reproducibles.",
      en: "Architecture and privacy are backed by reproducible tests.",
      mobile: {
        es: "QA reproducible en baseline pública.",
        en: "Reproducible QA in the public baseline.",
      },
    },
    technicalNote: {
      es: "Baseline pública ed44c8e; los refinamientos locales posteriores no se representan como publicados.",
      en: "Public baseline ed44c8e; later local refinements are not represented as published.",
      mobile: { es: "Refinamientos locales no incluidos.", en: "Local refinements excluded." },
    },
    facts: [
      { value: { es: "42", en: "42" }, label: { es: "páginas canonical localizadas", en: "localized canonical pages", mobile: { es: "canonical localizadas", en: "localized canonicals" } } },
      { value: { es: "46", en: "46" }, label: { es: "páginas estáticas generadas", en: "generated static pages", mobile: { es: "páginas estáticas", en: "static pages" } } },
      { value: { es: "184", en: "184" }, label: { es: "tests unitarios y de componentes", en: "unit and component tests", mobile: { es: "tests unitarios", en: "unit tests" } } },
      { value: { es: "608", en: "608" }, label: { es: "tests Playwright aprobados", en: "passing Playwright tests", mobile: { es: "Playwright", en: "Playwright" } } },
      { value: { es: "0", en: "0" }, label: { es: "violaciones axe serious/critical reportadas", en: "reported serious/critical axe findings", mobile: { es: "axe serious/critical", en: "serious/critical axe" } } },
      { value: { es: "0", en: "0" }, label: { es: "vulnerabilidades conocidas en audits", en: "known vulnerabilities in audits", mobile: { es: "vulnerabilidades", en: "vulnerabilities" } } },
    ],
    outcomeLabel: {
      es: "RESULTADO ACTUAL",
      en: "CURRENT OUTCOME",
      mobile: { es: "RESULTADO", en: "OUTCOME" },
    },
    outcomeTitle: {
      es: "Una demostración sólida de Product Design y UX Engineering.",
      en: "A strong demonstration of Product Design and UX Engineering.",
      mobile: {
        es: "Producto, contenido y QA conectados.",
        en: "Product, content, and QA connected.",
      },
    },
    outcomeBody: {
      es: "El proyecto conecta research, contenido, interfaz bilingüe, arquitectura frontend y QA reproducible. Los refinamientos pendientes son visuales; no se presentan como publicados hasta completar su propio flujo de aprobación.",
      en: "The project connects research, content, bilingual interface design, frontend architecture, and reproducible QA. Remaining visual refinements are not represented as published until their own approval flow is complete.",
      mobile: {
        es: "La baseline pública es sólida; los refinamientos locales siguen separados.",
        en: "The public baseline is solid; local refinements remain separate.",
      },
    },
    limitationsTitle: { es: "Límites declarados", en: "Declared limitations", mobile: { es: "Límites", en: "Limitations" } },
    limitationsBody: {
      es: "No existe backend, CRM, pago, tracking, autenticación ni creación real de cotizaciones o casilleros. No se publican tarifas, tiempos, certificaciones o disponibilidad no confirmados. No se afirma una auditoría manual completa ni Lighthouse.",
      en: "No backend, CRM, payments, tracking, authentication, or real quote/mailbox creation. No unconfirmed rates, timing, certifications, or availability. No claim of a full manual screen-reader audit or Lighthouse score.",
      mobile: {
        es: "Sin backend, pagos, tracking, autenticación ni operaciones reales. Sin claims no confirmados.",
        en: "No backend, payments, tracking, authentication, or real operations. No unconfirmed claims.",
      },
    },
    linksTitle: { es: "Inspecciona la baseline pública.", en: "Inspect the public baseline.", mobile: { es: "Inspecciona la baseline.", en: "Inspect the baseline." } },
    linksBody: {
      es: "Arquitectura, documentación, screenshots y pruebas reproducibles.",
      en: "Architecture, documentation, screenshots, and reproducible tests.",
      mobile: { es: "Código y evidencia pública.", en: "Public code and evidence." },
    },
    actions: [
      {
        label: { es: "Revisar GitHub", en: "Review GitHub", mobile: { es: "GitHub", en: "GitHub" } },
        href: "https://github.com/maestreparra/bm-envios-digital-platform",
        variant: "secondary",
        external: true,
      },
      {
        label: { es: "Hablemos", en: "Contact me" },
        variant: "secondary",
        external: false,
        internalRouteKey: "contact",
      },
    ],
  },
};
