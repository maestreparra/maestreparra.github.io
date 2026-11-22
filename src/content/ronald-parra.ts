import type { LocalizedValue } from "./home";

export interface RonaldParraDecision {
  title: LocalizedValue;
  body: LocalizedValue;
}

export interface RonaldParraPhase {
  index: string;
  title: LocalizedValue;
  body: LocalizedValue;
}

export interface RonaldParraEvidence {
  id: string;
  title: LocalizedValue;
  src: string;
  alt: LocalizedValue;
  caption: LocalizedValue;
  provenance: LocalizedValue;
  width: number;
  height: number;
  presentation: "contain" | "scroll";
}

export interface RonaldParraCaseContent {
  breadcrumbParent: LocalizedValue;
  breadcrumbCurrent: LocalizedValue;
  statusLabel: LocalizedValue;
  eyebrow: LocalizedValue;
  title: LocalizedValue;
  introduction: LocalizedValue;
  roleLabel: LocalizedValue;
  role: LocalizedValue;
  scope: LocalizedValue;
  contextLabel: LocalizedValue;
  challengeTitle: LocalizedValue;
  challengeBody: LocalizedValue;
  responsibilityTitle: LocalizedValue;
  responsibilityBody: LocalizedValue;
  decisionsLabel: LocalizedValue;
  decisionsTitle: LocalizedValue;
  decisions: RonaldParraDecision[];
  phasesLabel: LocalizedValue;
  phasesTitle: LocalizedValue;
  phasesIntro: LocalizedValue;
  phases: RonaldParraPhase[];
  evidenceLabel: LocalizedValue;
  evidenceTitle: LocalizedValue;
  evidenceIntro: LocalizedValue;
  evidence: RonaldParraEvidence[];
  attributionTitle: LocalizedValue;
  attributionBody: LocalizedValue;
  factsLabel: LocalizedValue;
  facts: Array<{ value: LocalizedValue; label: LocalizedValue }>;
  outcomeLabel: LocalizedValue;
  outcomeTitle: LocalizedValue;
  outcomeBody: LocalizedValue;
  limitationsTitle: LocalizedValue;
  limitationsBody: LocalizedValue;
  linksTitle: LocalizedValue;
  linksBody: LocalizedValue;
  disclosure: LocalizedValue;
}

export const ronaldParraCaseContent: RonaldParraCaseContent = {
  breadcrumbParent: { es: "Proyectos", en: "Work" },
  breadcrumbCurrent: { es: "Dr. Ronald Parra", en: "Dr. Ronald Parra" },
  statusLabel: {
    es: "CASO DOCUMENTADO · PROYECTO EN EVOLUCIÓN",
    en: "DOCUMENTED CASE · EVOLVING PROJECT",
  },
  eyebrow: {
    es: "Caso de estudio · Salud digital",
    en: "Case study · Digital health",
  },
  title: {
    es: "Dr. Ronald Parra: de identidad médica a ecosistema digital confiable.",
    en: "Dr. Ronald Parra: from medical identity to a trusted digital ecosystem.",
  },
  introduction: {
    es: "El proyecto comenzó como una necesidad de marca y evolucionó hacia la consolidación de un ecosistema médico completo: identidad, website, dominio, contenido clínico, SEO/AEO/GEO, privacidad, medición responsable, simulador educativo y documentación técnica. El reto fue conectar todas esas capas sin reemplazar la experiencia visual del sitio que ya había sido aprobada.",
    en: "The engagement began as a brand need and evolved into the consolidation of a complete medical ecosystem: identity, website, domain, clinical content, SEO/AEO/GEO, privacy, responsible measurement, an educational simulator, and technical documentation. The challenge was to connect those layers without replacing the website experience that had already been approved.",
  },
  roleLabel: { es: "MI ROL", en: "MY ROLE" },
  role: {
    es: "Lead Product Designer & UX Engineer — colaboración independiente",
    en: "Lead Product Designer & UX Engineer — independent engagement",
  },
  scope: {
    es: "Estrategia de producto · Rebranding · Arquitectura de información · UX Engineering · WordPress · SEO/AEO/GEO · Privacidad y analítica · Operaciones técnicas · QA y documentación",
    en: "Product strategy · Rebranding · Information architecture · UX engineering · WordPress · SEO/AEO/GEO · Privacy and analytics · Technical operations · QA and documentation",
  },
  contextLabel: { es: "CONTEXTO Y RESPONSABILIDAD", en: "CONTEXT AND RESPONSIBILITY" },
  challengeTitle: {
    es: "Un ecosistema fragmentado que necesitaba una sola dirección",
    en: "A fragmented ecosystem that needed one direction",
  },
  challengeBody: {
    es: "La presencia digital combinaba una identidad en transición, un dominio histórico, un website en WordPress, información médica sensible, medición de Meta, hosting y un simulador independiente. La solución debía preservar lo aprobado, reducir contradicciones entre plataformas y establecer una base verificable para crecer.",
    en: "The digital presence combined a changing identity, a legacy domain, a WordPress website, sensitive medical information, Meta measurement, hosting, and a standalone simulator. The solution needed to preserve approved work, reduce contradictions across platforms, and establish a verifiable foundation for growth.",
  },
  responsibilityTitle: { es: "Mi responsabilidad", en: "My responsibility" },
  responsibilityBody: {
    es: "Dirigí la evolución de marca, la arquitectura de contenido, la mejora incremental de la experiencia, la coordinación técnica, las configuraciones de privacidad y búsqueda, el aseguramiento de calidad y los paquetes de handoff. El simulador fue concebido y diseñado por el Dr. Ronald Parra; mi contribución se limitó a su integración, alineación de marca, QA, despliegue y documentación.",
    en: "I directed the brand evolution, content architecture, incremental experience improvements, technical coordination, privacy and search configuration, quality assurance, and handoff packages. The simulator was conceived and designed by Dr. Ronald Parra; my contribution was limited to integration, brand alignment, QA, deployment, and documentation.",
  },
  decisionsLabel: { es: "DECISIONES DE PRODUCTO", en: "PRODUCT DECISIONS" },
  decisionsTitle: {
    es: "Mejorar el sistema sin desarmar lo que ya funcionaba",
    en: "Improve the system without dismantling what already worked",
  },
  decisions: [
    {
      title: { es: "Convertir al médico en la marca principal", en: "Make the physician the primary brand" },
      body: {
        es: "La identidad pasó de depender de una categoría genérica a organizarse alrededor del Dr. Ronald Parra, con un sistema visual aplicable al website, el simulador y la documentación.",
        en: "The identity moved from a generic category-led presence to a system centered on Dr. Ronald Parra and applicable across the website, simulator, and documentation.",
      },
    },
    {
      title: { es: "Preservar la interfaz aprobada", en: "Preserve the approved interface" },
      body: {
        es: "Las mejoras de contenido, navegación y conversión se incorporaron dentro de la estructura existente, evitando un rediseño no solicitado del landing y sus componentes principales.",
        en: "Content, navigation, and conversion improvements were introduced within the existing structure, avoiding an unrequested redesign of the landing page and its core components.",
      },
    },
    {
      title: { es: "Consolidar dominio y señales de búsqueda", en: "Consolidate domain and search signals" },
      body: {
        es: "La migración hacia ronaldparra.com se acompañó con redirecciones, canonicals, sitemap y Search Console para comunicar una única versión principal a los buscadores.",
        en: "The migration to ronaldparra.com was supported by redirects, canonicals, a sitemap, and Search Console to communicate one primary version to search engines.",
      },
    },
    {
      title: { es: "Gobernar el contenido médico", en: "Govern medical content" },
      body: {
        es: "El contenido clínico se organizó por intención de búsqueda y revisión médica, incluyendo la nueva especialidad de testosterona y bienestar masculino dentro del lenguaje visual existente.",
        en: "Clinical content was organized around search intent and medical review, including the new testosterone and men's wellness specialty within the existing visual language.",
      },
    },
    {
      title: { es: "Medir solo con consentimiento", en: "Measure only with consent" },
      body: {
        es: "La configuración de Meta se integró con una capa de consentimiento y exclusiones para evitar que la medición operara sobre datos clínicos o interacciones sensibles.",
        en: "Meta measurement was integrated with a consent layer and exclusions designed to keep clinical data and sensitive interactions outside the analytics flow.",
      },
    },
    {
      title: { es: "Tratar el simulador como un producto conectado", en: "Treat the simulator as a connected product" },
      body: {
        es: "El simulador se mantuvo como una superficie independiente, bilingüe y educativa, vinculada al website y documentada como un producto con autoría explícita.",
        en: "The simulator remained a standalone, bilingual educational surface linked to the website and documented as a product with explicit authorship.",
      },
    },
  ],
  phasesLabel: { es: "EVOLUCIÓN DEL PROYECTO", en: "PROJECT EVOLUTION" },
  phasesTitle: {
    es: "Cinco frentes coordinados como un solo producto",
    en: "Five coordinated workstreams operating as one product",
  },
  phasesIntro: {
    es: "La secuencia conectó decisiones de marca, experiencia, contenido y operaciones técnicas. Cada fase dejó evidencia verificable y un siguiente paso delimitado.",
    en: "The sequence connected brand, experience, content, and technical operations. Each phase produced inspectable evidence and a bounded next step.",
  },
  phases: [
    {
      index: "01",
      title: { es: "Marca y posicionamiento", en: "Brand and positioning" },
      body: { es: "Auditoría, rebranding, sistema visual y manual de marca.", en: "Audit, rebranding, visual system, and brand manual." },
    },
    {
      index: "02",
      title: { es: "Consolidación técnica", en: "Technical consolidation" },
      body: { es: "Hosting, acceso, dominio, correo y mantenimiento de WordPress.", en: "Hosting, access, domain, email, and WordPress maintenance." },
    },
    {
      index: "03",
      title: { es: "Contenido y descubrimiento", en: "Content and discovery" },
      body: { es: "Arquitectura médica, metadata, SEO/AEO/GEO y Search Console.", en: "Medical architecture, metadata, SEO/AEO/GEO, and Search Console." },
    },
    {
      index: "04",
      title: { es: "Privacidad y medición", en: "Privacy and measurement" },
      body: { es: "Consentimiento, Meta Pixel y límites para interacciones clínicas.", en: "Consent, Meta Pixel, and boundaries for clinical interactions." },
    },
    {
      index: "05",
      title: { es: "Simulador y evidencia", en: "Simulator and evidence" },
      body: { es: "Integración, QA, despliegue, manuales y paquete técnico para revisión legal.", en: "Integration, QA, deployment, manuals, and a technical package for legal review." },
    },
  ],
  evidenceLabel: { es: "EVIDENCIA SELECCIONADA", en: "SELECTED EVIDENCE" },
  evidenceTitle: {
    es: "Del sistema de marca a las superficies de producto",
    en: "From the brand system to product surfaces",
  },
  evidenceIntro: {
    es: "Esta selección muestra resultados públicos y autorizados. Los paneles administrativos, credenciales, datos de pacientes, código privado y documentos legales permanecen fuera del portafolio.",
    en: "This selection shows authorized public outcomes. Administrative panels, credentials, patient data, private source code, and legal documents remain outside the portfolio.",
  },
  evidence: [
    {
      id: "RP-01",
      title: { es: "Identidad consolidada", en: "Consolidated identity" },
      src: "/images/case-studies/ronald-parra/brand-logo.png",
      alt: { es: "Logotipo horizontal del Dr. Ronald Parra", en: "Horizontal Dr. Ronald Parra logo" },
      caption: {
        es: "Sistema de identidad aplicado a la práctica médica y sus superficies digitales.",
        en: "Identity system applied across the medical practice and its digital surfaces.",
      },
      provenance: { es: "ASSET V7 AUTORIZADO", en: "AUTHORIZED V7 ASSET" },
      width: 1080,
      height: 231,
      presentation: "contain",
    },
    {
      id: "RP-02",
      title: { es: "Nueva especialidad dentro del website", en: "New specialty within the website" },
      src: "/images/case-studies/ronald-parra/bienestar-desktop.jpg",
      alt: {
        es: "Página de testosterona y bienestar masculino en ronaldparra.com",
        en: "Testosterone and men's wellness page on ronaldparra.com",
      },
      caption: {
        es: "Contenido médico y SEO incorporado sin reemplazar la estructura visual aprobada.",
        en: "Medical and SEO content introduced without replacing the approved visual structure.",
      },
      provenance: { es: "EVIDENCIA DE QA · WEBSITE CHILE", en: "QA EVIDENCE · CHILE WEBSITE" },
      width: 1440,
      height: 4050,
      presentation: "scroll",
    },
    {
      id: "RP-03",
      title: { es: "Entrada bilingüe al simulador", en: "Bilingual simulator entry" },
      src: "/images/case-studies/ronald-parra/simulator-entry.png",
      alt: {
        es: "Pantalla inicial bilingüe del simulador educativo del Dr. Ronald Parra",
        en: "Bilingual welcome screen for Dr. Ronald Parra's educational simulator",
      },
      caption: {
        es: "Selección de idioma, advertencias educativas y acceso claro a condiciones de uso.",
        en: "Language selection, educational notices, and clear access to terms of use.",
      },
      provenance: { es: "CAPTURA DE PRODUCCIÓN AUTORIZADA", en: "AUTHORIZED PRODUCTION CAPTURE" },
      width: 1200,
      height: 1000,
      presentation: "contain",
    },
    {
      id: "RP-04",
      title: { es: "Interacción educativa", en: "Educational interaction" },
      src: "/images/case-studies/ronald-parra/simulator-interaction.png",
      alt: {
        es: "Interfaz educativa del simulador para una visualización de armonización genital",
        en: "Educational simulator interface for a genital harmonization visualization",
      },
      caption: {
        es: "La experiencia traduce parámetros médicos a una visualización guiada, sin sustituir la evaluación clínica.",
        en: "The experience translates medical parameters into a guided visualization without replacing clinical evaluation.",
      },
      provenance: { es: "CAPTURA DE PRODUCCIÓN AUTORIZADA", en: "AUTHORIZED PRODUCTION CAPTURE" },
      width: 1200,
      height: 1000,
      presentation: "contain",
    },
  ],
  attributionTitle: { es: "Límite de autoría del simulador", en: "Simulator authorship boundary" },
  attributionBody: {
    es: "El Dr. Ronald Parra concibió y diseñó el simulador y sus versiones publicadas. Mi trabajo documentado en esta superficie corresponde a UX Engineering, integración con el ecosistema, adaptación de marca, validación responsive y accesible, despliegue y evidencia técnica.",
    en: "Dr. Ronald Parra conceived and designed the simulator and its published versions. My documented contribution to this surface covers UX engineering, ecosystem integration, brand adaptation, responsive and accessibility validation, deployment, and technical evidence.",
  },
  factsLabel: { es: "COBERTURA DOCUMENTADA", en: "DOCUMENTED COVERAGE" },
  facts: [
    { value: { es: "11", en: "11" }, label: { es: "rutas clínicas mapeadas", en: "mapped clinical routes" } },
    { value: { es: "2", en: "2" }, label: { es: "superficies públicas conectadas", en: "connected public surfaces" } },
    { value: { es: "ES / EN", en: "ES / EN" }, label: { es: "entrada bilingüe al simulador", en: "bilingual simulator entry" } },
    { value: { es: "5", en: "5" }, label: { es: "frentes coordinados", en: "coordinated workstreams" } },
  ],
  outcomeLabel: { es: "RESULTADO DEL TRABAJO", en: "WORK OUTCOME" },
  outcomeTitle: {
    es: "Una base digital coherente, gobernable y lista para evolucionar",
    en: "A coherent, governable digital foundation ready to evolve",
  },
  outcomeBody: {
    es: "La marca, el dominio, el contenido médico, la medición, el website y el simulador quedaron articulados como un mismo ecosistema. El valor del trabajo no se presenta como una promesa de ranking o conversión, sino como una reducción de fragmentación, una mayor trazabilidad y una base más segura para las siguientes fases.",
    en: "The brand, domain, medical content, measurement, website, and simulator now operate as one connected ecosystem. The work is not presented as a ranking or conversion promise, but as reduced fragmentation, stronger traceability, and a safer foundation for the next phases.",
  },
  limitationsTitle: { es: "Límites declarados", en: "Declared limitations" },
  limitationsBody: {
    es: "La visibilidad orgánica requiere tiempo y monitoreo; no se atribuyen mejoras de tráfico, ranking, conversión ni resultados clínicos sin medición posterior. La futura experiencia por país —Chile y Venezuela— y la localización completa del website a inglés permanecen planificadas, no implementadas. Este caso no constituye una opinión legal ni publica el código privado del simulador.",
    en: "Organic visibility requires time and monitoring; no traffic, ranking, conversion, or clinical outcomes are attributed without follow-up measurement. The future country-specific experience for Chile and Venezuela and full English website localization remain planned, not implemented. This case is not a legal opinion and does not publish the simulator's private source code.",
  },
  linksTitle: { es: "Explora las superficies públicas", en: "Explore the public surfaces" },
  linksBody: {
    es: "El website médico y el simulador educativo se abren en una nueva pestaña. El código privado y los expedientes de registro no son públicos.",
    en: "The medical website and educational simulator open in a new tab. Private source code and registration files are not public.",
  },
  disclosure: {
    es: "Caso publicado con autorización del cliente. La evidencia fue seleccionada y sanitizada para proteger accesos, datos clínicos, expedientes legales y propiedad intelectual privada.",
    en: "Case study published with client authorization. Evidence was selected and sanitized to protect access credentials, clinical data, legal files, and private intellectual property.",
  },
};
