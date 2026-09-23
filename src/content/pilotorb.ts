import type { SingleFlowCaseContent } from "./single-flow-case";

export const pilotorbCaseContent: SingleFlowCaseContent = {
  breadcrumbParent: { es: "Proyectos", en: "Work" },
  breadcrumbCurrent: { es: "PilotOrb Business Intelligence", en: "PilotOrb Business Intelligence" },
  statusLabel: { es: "CASO DOCUMENTADO · EVIDENCIA VERIFICADA", en: "DOCUMENTED CASE · VERIFIED EVIDENCE" },
  eyebrow: { es: "Caso de estudio · Business Intelligence", en: "Case study · Business Intelligence" },
  title: {
    es: "PilotOrb: convertir datos de QuickBooks en decisiones de negocio claras.",
    en: "PilotOrb: turning QuickBooks data into clear business decisions.",
  },
  introduction: {
    es: "PilotOrb necesitaba transformar datos de facturación, clientes y productos en una experiencia visual comprensible para equipos directivos, de ventas y marketing. Colaboré con los fundadores en la definición y el diseño inicial de una plataforma de Business Intelligence integrada con QuickBooks Online.",
    en: "PilotOrb needed to turn billing, customer, and product data into a visual experience that leadership, sales, and marketing teams could understand. I collaborated with the founders on the initial definition and design of a Business Intelligence platform integrated with QuickBooks Online.",
  },
  roleLabel: { es: "MI ROL", en: "MY ROLE" },
  role: { es: "Product Designer — Business Intelligence & Data Visualization (Consultoría)", en: "Product Designer — Business Intelligence & Data Visualization (Consultant)" },
  scope: {
    es: "Discovery · Arquitectura de información · Data Visualization · Wireframes · Prototipado en Figma/FigJam",
    en: "Discovery · Information architecture · Data visualization · Wireframes · Figma/FigJam prototyping",
  },
  challengeSectionLabel: { es: "CONTEXTO Y RESPONSABILIDAD", en: "CONTEXT AND RESPONSIBILITY" },
  challengeTitle: {
    es: "Convertir información contable en una historia de negocio",
    en: "Turning accounting data into a business story",
  },
  challengeBody: {
    es: "El reto no era mostrar más datos, sino ayudar a equipos no técnicos a entender el comportamiento del negocio sin depender de reportes contables tradicionales. Eso exigía definir qué preguntas debía responder cada pantalla antes de diseñar un solo gráfico.",
    en: "The challenge was not to surface more data, but to help non-technical teams understand business behavior without relying on traditional accounting reports. That required defining what question each screen needed to answer before designing a single chart.",
  },
  responsibilityTitle: { es: "Mi responsabilidad", en: "My responsibility" },
  responsibilityBody: {
    es: "Trabajé directamente con los fundadores para traducir su visión y los requerimientos de datos en una propuesta de experiencia coherente: perfiles de usuario, arquitectura de información, dashboard principal, filtros de exploración y prototipos interactivos. Mi contribución se concentró en la etapa inicial de definición y diseño; no participé en la implementación ni en fases posteriores del producto.",
    en: "I worked directly with the founders to translate their vision and data requirements into a coherent experience proposal: user profiles, information architecture, the main dashboard, exploration filters, and interactive prototypes. My contribution was concentrated in the initial definition and design stage; I was not involved in implementation or later product phases.",
  },
  processSectionLabel: { es: "DECISIONES CLAVE", en: "KEY DECISIONS" },
  processTitle: { es: "De datos contables dispersos a un dashboard explorable", en: "From scattered accounting data to an explorable dashboard" },
  decisions: [
    {
      title: { es: "Partir de preguntas de negocio, no de tablas", en: "Start from business questions, not tables" },
      body: {
        es: "Definí junto a los fundadores los escenarios de análisis prioritarios (tendencias de venta, comportamiento por cliente, productos inactivos) antes de diseñar cualquier visualización.",
        en: "I defined the priority analysis scenarios with the founders (sales trends, customer behavior, inactive products) before designing any visualization.",
      },
    },
    {
      title: { es: "Diseñar un dashboard de entrada único", en: "Design a single entry dashboard" },
      body: {
        es: "El Home concentra métricas generales, un resumen semanal y highlights recientes, para que cualquier usuario entienda el estado del negocio en una sola vista.",
        en: "The Home dashboard concentrates overall metrics, a weekly overview, and recent highlights, so any user understands the state of the business in a single view.",
      },
    },
    {
      title: { es: "Hacer explorables los datos, no solo visibles", en: "Make data explorable, not just visible" },
      body: {
        es: "Diseñé filtros por cliente, producto, período y ubicación geográfica que permiten pasar de una vista general a un análisis específico sin cambiar de pantalla.",
        en: "I designed filters by customer, product, period, and geographic location that move from a general view to a specific analysis without switching screens.",
      },
    },
    {
      title: { es: "Comparar en vez de solo reportar", en: "Compare, not just report" },
      body: {
        es: "Introduje el concepto de análisis de vecindad (períodos comparables) para que las tendencias se lean en contexto, no como cifras aisladas.",
        en: "I introduced a neighboring-analysis concept (comparable periods) so trends read in context rather than as isolated figures.",
      },
    },
    {
      title: { es: "Documentar decisiones para el siguiente equipo", en: "Document decisions for the next team" },
      body: {
        es: "Organicé research, requerimientos y decisiones de producto en Notion, y prototipos interactivos en Figma/FigJam, para dejar una base clara de cara a la implementación.",
        en: "I organized research, requirements, and product decisions in Notion, with interactive prototypes in Figma/FigJam, to leave a clear foundation for implementation.",
      },
    },
  ],
  evidenceSectionLabel: { es: "EVIDENCIA DEL PROCESO", en: "PROCESS EVIDENCE" },
  evidenceTitle: { es: "Evidencia real autorizada por los fundadores del proyecto", en: "Real evidence authorized by the project's founders" },
  evidenceIntro: {
    es: "Los fundadores de PilotOrb autorizaron reproducir en este portafolio pantallas del diseño final desarrollado durante el engagement. Las capturas provienen directamente de los archivos de diseño del proyecto en Figma; no son capturas de un producto en producción ni incluyen datos reales de clientes.",
    en: "PilotOrb's founders authorized reproducing screens from the final design developed during the engagement in this portfolio. The screens are taken directly from the project's Figma design files; they are not screenshots of a production product and include no real customer data.",
  },
  realEvidence: {
    featuredProductCount: 2,
    brandSectionLabel: { es: "Identidad de producto", en: "Product identity" },
    brandSlides: [
      {
        id: "P-B1",
        title: { es: "Logotipo PilotOrb", en: "PilotOrb logo" },
        src: "/images/case-studies/pilotorb/pilotorb-brand-logo.webp",
        alt: {
          es: "Logotipo de PilotOrb: un ícono circular azul con un punto central y la palabra PILOT ORB en tipografía técnica.",
          en: "PilotOrb logo: a blue circular icon with a center dot and the words PILOT ORB in a technical typeface.",
        },
        caption: {
          es: "Identidad visual del producto.",
          en: "The product's visual identity.",
        },
        provenance: { es: "FIGMA · PROYECTO PILOTORB · USO AUTORIZADO", en: "FIGMA · PILOTORB PROJECT · AUTHORIZED USE" },
        width: 1728,
        height: 1117,
      },
    ],
    productSectionLabel: { es: "Producto: plataforma de Business Intelligence", en: "Product: Business Intelligence platform" },
    productSlides: [
      {
        id: "P-P1",
        title: { es: "Acceso", en: "Sign in" },
        src: "/images/case-studies/pilotorb/pilotorb-desktop-login.webp",
        alt: {
          es: "Pantalla de acceso de PilotOrb con formulario de email y contraseña sobre una fotografía de oficina con capa azul.",
          en: "PilotOrb sign-in screen with an email and password form over a blue-toned office photograph.",
        },
        caption: {
          es: "Punto de entrada a la plataforma.",
          en: "The platform's entry point.",
        },
        provenance: { es: "FIGMA · PROYECTO PILOTORB · USO AUTORIZADO", en: "FIGMA · PILOTORB PROJECT · AUTHORIZED USE" },
        width: 1920,
        height: 1118,
      },
      {
        id: "P-P2",
        title: { es: "Dashboard principal", en: "Home dashboard" },
        src: "/images/case-studies/pilotorb/pilotorb-desktop-home-dashboard.webp",
        alt: {
          es: "Home Dashboard de PilotOrb con métricas generales, resumen semanal reciente y highlights de productos inactivos.",
          en: "PilotOrb Home Dashboard with overall metrics, a recent weekly overview, and inactive-product highlights.",
        },
        caption: {
          es: "Vista de entrada que resume el estado del negocio.",
          en: "The entry view summarizing business status.",
        },
        provenance: { es: "FIGMA · PROYECTO PILOTORB · USO AUTORIZADO", en: "FIGMA · PILOTORB PROJECT · AUTHORIZED USE" },
        width: 1920,
        height: 1188,
      },
      {
        id: "P-P3",
        title: { es: "Your Sales — analítica de ventas", en: "Your Sales — sales analytics" },
        src: "/images/case-studies/pilotorb/pilotorb-desktop-your-sales.webp",
        alt: {
          es: "Dashboard Your Sales con tendencias anuales, análisis de vecindad trimestral y tablas de top clientes y top productos.",
          en: "Your Sales dashboard with yearly trends, quarterly neighboring analysis, and top-customer and top-product tables.",
        },
        caption: {
          es: "Exploración comparativa de tendencias de venta.",
          en: "Comparative exploration of sales trends.",
        },
        provenance: { es: "FIGMA · PROYECTO PILOTORB · USO AUTORIZADO", en: "FIGMA · PILOTORB PROJECT · AUTHORIZED USE" },
        width: 1867,
        height: 2000,
      },
      {
        id: "P-P4",
        title: { es: "Product Explorer", en: "Product Explorer" },
        src: "/images/case-studies/pilotorb/pilotorb-desktop-product-explorer.webp",
        alt: {
          es: "Product Explorer con el resumen de un producto individual, su tendencia de ventas en unidades y el desempeño de clientes.",
          en: "Product Explorer showing a single product's summary, its unit-sales trend, and customer performance.",
        },
        caption: {
          es: "Análisis a nivel de producto individual.",
          en: "Analysis at the individual product level.",
        },
        provenance: { es: "FIGMA · PROYECTO PILOTORB · USO AUTORIZADO", en: "FIGMA · PILOTORB PROJECT · AUTHORIZED USE" },
        width: 1920,
        height: 1705,
      },
      {
        id: "P-P5",
        title: { es: "Project Manager — cuenta y proyecto", en: "Project Manager — account and project" },
        src: "/images/case-studies/pilotorb/pilotorb-desktop-project-manager.webp",
        alt: {
          es: "Pantalla Project Manager con preferencias del proyecto, estado de la suscripción y la lista de usuarios del proyecto.",
          en: "Project Manager screen with project preferences, subscription status, and the project's user list.",
        },
        caption: {
          es: "Configuración de cuenta, suscripción y usuarios.",
          en: "Account, subscription, and user configuration.",
        },
        provenance: { es: "FIGMA · PROYECTO PILOTORB · USO AUTORIZADO", en: "FIGMA · PILOTORB PROJECT · AUTHORIZED USE" },
        width: 1530,
        height: 2000,
      },
    ],
  },
  factsSectionLabel: { es: "COBERTURA DOCUMENTADA", en: "DOCUMENTED COVERAGE" },
  facts: [
    { value: { es: "5 meses", en: "5 months" }, label: { es: "de discovery y diseño inicial", en: "of discovery and initial design" } },
    { value: { es: "6 pantallas", en: "6 screens" }, label: { es: "de evidencia real autorizada", en: "of authorized real evidence" } },
    { value: { es: "QuickBooks Online", en: "QuickBooks Online" }, label: { es: "como fuente de datos integrada", en: "as the integrated data source" } },
    { value: { es: "Figma + FigJam", en: "Figma + FigJam" }, label: { es: "para prototipos y research", en: "for prototypes and research" } },
  ],
  outcomeLabel: { es: "RESULTADO DEL TRABAJO", en: "WORK OUTCOME" },
  outcomeTitle: { es: "Una base de experiencia y arquitectura para un producto de Business Intelligence", en: "An experience and architecture foundation for a Business Intelligence product" },
  outcomeBody: {
    es: "El engagement estableció las bases de experiencia y arquitectura de información para transformar datos de QuickBooks Online en insights útiles para planificación comercial. El valor del caso está en la claridad del razonamiento de producto, no en métricas de adopción o resultados comerciales que no fueron medidos durante mi participación.",
    en: "The engagement established the experience and information-architecture foundation for turning QuickBooks Online data into useful planning insights. The value of the case lies in the clarity of the product reasoning, not in adoption metrics or business outcomes that were not measured during my involvement.",
  },
  limitationsTitle: { es: "Límites declarados", en: "Declared limitations" },
  limitationsBody: {
    es: "No se publican datos financieros reales ni métricas de adopción. Este caso no afirma que el producto haya sido implementado en producción, ni que continúe operando con este diseño; mi participación se limitó a la etapa inicial de definición y diseño (jul.–nov. 2023).",
    en: "No real financial data or adoption metrics are published. This case does not claim the product was implemented in production or that it continues to operate with this design; my involvement was limited to the initial definition and design stage (Jul.–Nov. 2023).",
  },
  linksTitle: { es: "Sobre esta evidencia", en: "About this evidence" },
  linksBody: {
    es: "PilotOrb fue un engagement de definición temprana, no un producto público con un sitio de referencia verificable. Por eso este caso no enlaza a un website externo.",
    en: "PilotOrb was an early-definition engagement, not a public product with a verifiable reference site. For that reason, this case does not link to an external website.",
  },
  actions: [
    { label: { es: "Volver a proyectos", en: "Back to Work" }, variant: "secondary", external: false, internalRouteKey: "work" },
  ],
  disclosure: {
    es: "Trabajo de diseño realizado durante una colaboración profesional con los fundadores de PilotOrb, quienes autorizaron reproducir en este portafolio las pantallas del diseño final desarrolladas durante el proyecto. PilotOrb nunca llegó a producción pública, por lo que esta evidencia proviene de los archivos de diseño en Figma, no de un producto en vivo.",
    en: "Design work completed during a professional engagement with PilotOrb's founders, who authorized reproducing the final design screens developed during the project in this portfolio. PilotOrb never reached public production, so this evidence comes from the project's Figma design files, not a live product.",
  },
};
