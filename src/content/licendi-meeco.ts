import type { LocalizedValue } from "./home";

export type LicendiMeecoCaseId = "licendi" | "meeco";

export interface LicendiMeecoDecision {
  title: LocalizedValue;
  body: LocalizedValue;
}

export interface LicendiMeecoFact {
  value: LocalizedValue;
  label: LocalizedValue;
}

export interface LicendiMeecoAction {
  label: LocalizedValue;
  variant: "primary" | "secondary";
  external: boolean;
  href?: string;
  /** Set when `external` is false — resolved via getRoutePath at render time. */
  internalRouteKey?: "licendi" | "meeco" | "work";
}

/** One labelled node in a diagram, with optional children for tree/branching shapes. */
export interface DiagramNode {
  label: LocalizedValue;
  children?: LocalizedValue[];
}

export interface LicendiMeecoDiagram {
  id: string;
  title: LocalizedValue;
  caption: LocalizedValue;
  textEquivalent: LocalizedValue;
}

export interface StageSequenceDiagramContent extends LicendiMeecoDiagram {
  kind: "stage-sequence";
  stages: [DiagramNode, DiagramNode, DiagramNode];
}

export interface DomainTreeDiagramContent extends LicendiMeecoDiagram {
  kind: "domain-tree";
  root: LocalizedValue;
  branches: DiagramNode[];
}

export interface TaxonomyColumnsDiagramContent extends LicendiMeecoDiagram {
  kind: "taxonomy-columns";
  columns: DiagramNode[];
}

export interface JourneyPathDiagramContent extends LicendiMeecoDiagram {
  kind: "journey-path";
  steps: LocalizedValue[];
}

export interface PrincipleCardsDiagramContent extends LicendiMeecoDiagram {
  kind: "principle-cards";
  centralStatement: LocalizedValue;
  principles: LocalizedValue[];
}

export interface TemplateSystemDiagramContent extends LicendiMeecoDiagram {
  kind: "template-system";
  sharedLayers: LocalizedValue[];
  families: LocalizedValue[];
}

export interface ResponsiveComparisonDiagramContent extends LicendiMeecoDiagram {
  kind: "responsive-comparison";
  changes: LocalizedValue[];
}

export interface RelatedEngagementDiagramContent extends LicendiMeecoDiagram {
  kind: "related-engagement";
  contextStatement: LocalizedValue;
  projects: [DiagramNode, DiagramNode];
  legalNote: LocalizedValue;
}

export type LicendiMeecoDiagramContent =
  | StageSequenceDiagramContent
  | DomainTreeDiagramContent
  | TaxonomyColumnsDiagramContent
  | JourneyPathDiagramContent
  | PrincipleCardsDiagramContent
  | TemplateSystemDiagramContent
  | ResponsiveComparisonDiagramContent
  | RelatedEngagementDiagramContent;

/** A single real, agency-authorized screenshot shown at its natural aspect ratio (no diagram reconstruction). */
export interface RealEvidenceSlide {
  id: string;
  title: LocalizedValue;
  src: string;
  alt: LocalizedValue;
  caption: LocalizedValue;
  provenance: LocalizedValue;
  width: number;
  height: number;
}

export interface RealEvidenceImage {
  src: string;
  alt: LocalizedValue;
  caption: LocalizedValue;
  provenance: LocalizedValue;
  width: number;
  height: number;
}

/** A real product screen shown as mobile + desktop side by side, each boxed with its own scroll, per Sol's "Priorización responsive" comparison-card pattern. */
export interface RealEvidenceProductFlow {
  id: string;
  title: LocalizedValue;
  mobile: RealEvidenceImage;
  desktop: RealEvidenceImage;
  note: { title: LocalizedValue; body: LocalizedValue };
}

/**
 * Real, agency-authorized evidence (Figma screens for the client's UX audit,
 * brand system, and live product), used instead of the reconstructed
 * `diagrams` for cases that have publication permission for client visuals.
 * Research/brand sections are optional: MEECO's engagement never included a
 * UX audit deck or a rebranding phase, so it only carries `productFlows`.
 */
export interface LicendiMeecoRealEvidence {
  researchSectionLabel?: LocalizedValue;
  researchSlides?: RealEvidenceSlide[];
  brandSectionLabel?: LocalizedValue;
  brandSlides?: RealEvidenceSlide[];
  productSectionLabel: LocalizedValue;
  productFlows: RealEvidenceProductFlow[];
  /**
   * Recruiter-first evidence architecture (P13, Section 8.2): how many
   * items of each group are visible on first scan before the
   * EvidenceDisclosure control. The remaining, still-authorized evidence
   * stays in the DOM behind the disclosure — nothing is deleted.
   */
  featuredResearchCount?: number;
  featuredBrandCount?: number;
  featuredProductFlowCount: number;
}

export interface LicendiMeecoCaseContent {
  id: LicendiMeecoCaseId;
  breadcrumbParent: LocalizedValue;
  breadcrumbCurrent: LocalizedValue;
  /** The on-page badge near the breadcrumb, e.g. "CASO DOCUMENTADO · EVIDENCIA RECONSTRUIDA". */
  statusLabel: LocalizedValue;
  eyebrow: LocalizedValue;
  title: LocalizedValue;
  introduction: LocalizedValue;
  roleLabel: LocalizedValue;
  role: LocalizedValue;
  scope: LocalizedValue;
  challengeSectionLabel: LocalizedValue;
  challengeTitle: LocalizedValue;
  challengeBody: LocalizedValue;
  responsibilityTitle: LocalizedValue;
  responsibilityBody: LocalizedValue;
  processSectionLabel: LocalizedValue;
  processTitle: LocalizedValue;
  decisions: LicendiMeecoDecision[];
  evidenceSectionLabel: LocalizedValue;
  evidenceTitle: LocalizedValue;
  evidenceIntro: LocalizedValue;
  diagrams: LicendiMeecoDiagramContent[];
  /** Present only for cases with agency-authorized real evidence (currently Licendi); renders instead of `diagrams`. */
  realEvidence?: LicendiMeecoRealEvidence;
  factsSectionLabel: LocalizedValue;
  facts: LicendiMeecoFact[];
  outcomeLabel: LocalizedValue;
  outcomeTitle: LocalizedValue;
  outcomeBody: LocalizedValue;
  limitationsTitle: LocalizedValue;
  limitationsBody: LocalizedValue;
  linksTitle: LocalizedValue;
  linksBody: LocalizedValue;
  actions: LicendiMeecoAction[];
  disclosure: LocalizedValue;
}

const SHARED_LABELS = {
  statusLabel: { es: "CASO DOCUMENTADO · EVIDENCIA RECONSTRUIDA", en: "DOCUMENTED CASE · RECONSTRUCTED EVIDENCE" },
  roleLabel: { es: "MI ROL", en: "MY ROLE" },
  challengeSectionLabel: { es: "CONTEXTO Y RESPONSABILIDAD", en: "CONTEXT AND RESPONSIBILITY" },
  processSectionLabel: { es: "DECISIONES CLAVE", en: "KEY DECISIONS" },
  evidenceSectionLabel: { es: "EVIDENCIA DEL PROCESO", en: "PROCESS EVIDENCE" },
  factsSectionLabel: { es: "COBERTURA DOCUMENTADA", en: "DOCUMENTED COVERAGE" },
  outcomeLabel: { es: "RESULTADO DEL TRABAJO", en: "WORK OUTCOME" },
  limitationsTitle: { es: "Límites declarados", en: "Declared limitations" },
} satisfies Record<string, LocalizedValue>;

export const licendiMeecoCaseStudies: Record<LicendiMeecoCaseId, LicendiMeecoCaseContent> = {
  licendi: {
    id: "licendi",
    breadcrumbParent: { es: "Proyectos", en: "Work" },
    breadcrumbCurrent: { es: "Licendi E-commerce & Brand Experience", en: "Licendi E-commerce & Brand Experience" },
    statusLabel: { es: "CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA", en: "DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE" },
    eyebrow: { es: "Caso de estudio · E-commerce y marca", en: "Case study · E-commerce and brand" },
    title: {
      es: "Licendi: conectar la arquitectura del e-commerce con una marca más clara y confiable.",
      en: "Licendi: connecting e-commerce architecture with a clearer, more trustworthy brand.",
    },
    introduction: {
      es: "Licendi necesitaba articular una experiencia de compra compleja, una arquitectura de información más comprensible y una identidad capaz de transmitir confianza en un mercado internacional de licencias de software. Mi trabajo conectó auditoría UX/UI, análisis competitivo, journeys de compra, rebranding y diseño responsive para desktop y mobile.",
      en: "Licendi needed to bring together a complex purchasing experience, a more understandable information architecture, and an identity capable of building trust in an international software-licensing market. My work connected UX/UI auditing, competitive review, purchasing journeys, rebranding, and responsive desktop and mobile design.",
    },
    roleLabel: SHARED_LABELS.roleLabel,
    role: { es: "Senior Product Designer — E-commerce & Brand Experience (Consultoría)", en: "Senior Product Designer — E-commerce & Brand Experience (Consultant)" },
    scope: {
      es: "Auditoría UX/UI · Benchmarking · Arquitectura de información · Customer journeys · Rebranding · Sistema visual · Diseño responsive",
      en: "UX/UI audit · Competitive review · Information architecture · Customer journeys · Rebranding · Visual system · Responsive design",
    },
    challengeSectionLabel: SHARED_LABELS.challengeSectionLabel,
    challengeTitle: {
      es: "Una experiencia comercial y una identidad que necesitaban hablar el mismo idioma",
      en: "A commercial experience and identity that needed to speak the same language",
    },
    challengeBody: {
      es: "El reto no consistía solamente en modernizar pantallas. La estructura debía ayudar a descubrir, comparar y seleccionar productos digitales, mientras la identidad visual debía reforzar claridad, coherencia y confianza a lo largo del journey. La solución tenía que considerar catálogo, búsqueda, detalle de producto, carrito, checkout, autenticación y área privada en desktop y mobile.",
      en: "The challenge was not simply to modernize screens. The structure needed to support product discovery, comparison, and selection, while the visual identity reinforced clarity, coherence, and trust across the journey. The solution had to consider catalog, search, product detail, cart, checkout, authentication, and private-account experiences across desktop and mobile.",
    },
    responsibilityTitle: { es: "Mi responsabilidad", en: "My responsibility" },
    responsibilityBody: {
      es: "Lideré el diagnóstico UX/UI y competitivo, organicé la arquitectura del e-commerce, definí los principales journeys, desarrollé la dirección de rebranding y diseñé las propuestas responsive en Figma. Mi alcance documentado corresponde a estrategia y diseño; no afirmo propiedad sobre el código de producción ni sobre cambios posteriores.",
      en: "I led the UX/UI and competitive assessment, organized the e-commerce architecture, defined the principal journeys, developed the rebranding direction, and designed responsive proposals in Figma. My documented scope covers strategy and design; I do not claim ownership of production code or subsequent changes.",
    },
    processSectionLabel: SHARED_LABELS.processSectionLabel,
    processTitle: { es: "Del diagnóstico a una experiencia comercial coherente", en: "From diagnosis to a coherent commercial experience" },
    decisions: [
      {
        title: { es: "Convertir hallazgos en prioridades", en: "Turn findings into priorities" },
        body: {
          es: "Organicé los problemas detectados en navegación, descubrimiento, confianza, consistencia visual y continuidad del journey para conectar la auditoría con decisiones concretas de producto.",
          en: "I organized issues across navigation, discovery, trust, visual consistency, and journey continuity to connect the audit with concrete product decisions.",
        },
      },
      {
        title: { es: "Simplificar la arquitectura de compra", en: "Simplify the purchasing architecture" },
        body: {
          es: "Estructuré categorías, búsqueda, catálogo, detalle de producto y pasos de compra para reducir ambigüedad y facilitar la orientación dentro de una oferta extensa.",
          en: "I structured categories, search, catalog, product detail, and purchase steps to reduce ambiguity and improve orientation across an extensive offer.",
        },
      },
      {
        title: { es: "Diseñar el journey completo", en: "Design the complete journey" },
        body: {
          es: "Conecté descubrimiento, evaluación, carrito, checkout, autenticación y área privada como partes de una misma experiencia, evitando que cada pantalla funcionara como una solución aislada.",
          en: "I connected discovery, evaluation, cart, checkout, authentication, and private-account experiences as one system rather than isolated screens.",
        },
      },
      {
        title: { es: "Alinear marca e interfaz", en: "Align brand and interface" },
        body: {
          es: "La dirección visual buscó transmitir profesionalismo, claridad y confianza mediante jerarquía, tipografía, color y patrones de interfaz coherentes.",
          en: "The visual direction aimed to communicate professionalism, clarity, and trust through consistent hierarchy, typography, color, and interface patterns.",
        },
      },
      {
        title: { es: "Priorizar la experiencia responsive", en: "Prioritize the responsive experience" },
        body: {
          es: "Diseñé composiciones desktop y mobile considerando cambios reales de jerarquía, densidad y acción; no una simple reducción proporcional de la pantalla grande.",
          en: "I designed desktop and mobile compositions around real changes in hierarchy, density, and action—not a proportional reduction of the larger screen.",
        },
      },
    ],
    evidenceSectionLabel: SHARED_LABELS.evidenceSectionLabel,
    evidenceTitle: { es: "Evidencia prefinal autorizada por la agencia del proyecto", en: "Authorized pre-final evidence from the project's agency" },
    evidenceIntro: {
      es: "La agencia de marketing y branding que contrató este proyecto autorizó reproducir en este portafolio iteraciones prefinales de las interfaces del sitio, el material del estudio UX/UI y el sistema de marca desarrollados para Licendi. Las capturas provienen directamente de los archivos de diseño del proyecto y no representan la entrega final aprobada por el cliente.",
      en: "The marketing and branding agency that commissioned this project authorized reproducing pre-final iterations of the site interfaces, UX/UI study material, and brand system developed for Licendi in this portfolio. The screens are taken directly from the project's design files and do not represent the client's final approved delivery.",
    },
    diagrams: [],
    realEvidence: {
      featuredResearchCount: 1,
      featuredBrandCount: 2,
      featuredProductFlowCount: 2,
      researchSectionLabel: { es: "Investigación y auditoría UX/UI", en: "Research and UX/UI audit" },
      researchSlides: [
        {
          id: "L-R1",
          title: { es: "Estudio comparativo de interfaces", en: "Comparative interface study" },
          src: "/images/case-studies/licendi/licendi-research-cover.webp",
          alt: {
            es: "Portada del estudio comparativo de interfaces de Licendi, con el logotipo original Licencias Directas.es.",
            en: "Cover of Licendi's comparative interface study, showing the original Licencias Directas.es logo.",
          },
          caption: {
            es: "Punto de partida de la auditoría UX/UI.",
            en: "The starting point of the UX/UI audit.",
          },
          provenance: { es: "FIGMA · PROYECTO LICENDI · USO AUTORIZADO", en: "FIGMA · LICENDI PROJECT · AUTHORIZED USE" },
          width: 1000,
          height: 562,
        },
        {
          id: "L-R2",
          title: { es: "Hallazgos y recomendaciones", en: "Findings and recommendations" },
          src: "/images/case-studies/licendi/licendi-research-summary.webp",
          alt: {
            es: "Resumen ejecutivo de la auditoría UX/UI con hallazgos y recomendaciones sobre branding, landing page, búsqueda y ficha de producto.",
            en: "Executive summary of the UX/UI audit with findings and recommendations on branding, the landing page, search, and product pages.",
          },
          caption: {
            es: "Resumen ejecutivo que guió el rediseño.",
            en: "Executive summary that guided the redesign.",
          },
          provenance: { es: "FIGMA · PROYECTO LICENDI · USO AUTORIZADO", en: "FIGMA · LICENDI PROJECT · AUTHORIZED USE" },
          width: 1000,
          height: 562,
        },
      ],
      brandSectionLabel: { es: "Sistema de marca (rebranding)", en: "Brand system (rebranding)" },
      brandSlides: [
        {
          id: "L-B1",
          title: { es: "Logotipo emblema principal", en: "Primary logo emblem" },
          src: "/images/case-studies/licendi/licendi-brand-logo.webp",
          alt: {
            es: "Logotipo emblema principal de la nueva marca Licendi, en tipografía blanca sobre fondo azul cian con un ícono circular de llave.",
            en: "Primary logo emblem of the new Licendi brand, white type on a cyan-blue background with a circular key icon.",
          },
          caption: {
            es: "Resultado del proceso de rebranding.",
            en: "Result of the rebranding process.",
          },
          provenance: { es: "FIGMA · BRAND BOOK LICENDI · USO AUTORIZADO", en: "FIGMA · LICENDI BRAND BOOK · AUTHORIZED USE" },
          width: 1000,
          height: 562,
        },
        {
          id: "L-B2",
          title: { es: "Paleta cromática", en: "Color palette" },
          src: "/images/case-studies/licendi/licendi-brand-palette.webp",
          alt: {
            es: "Paleta cromática de la marca Licendi con cuatro colores y sus valores exactos en RGB, CMYK, HEX y HSB.",
            en: "Licendi brand color palette with four colors and their exact RGB, CMYK, HEX, and HSB values.",
          },
          caption: {
            es: "Valores exactos listos para producción.",
            en: "Exact production-ready values.",
          },
          provenance: { es: "FIGMA · BRAND BOOK LICENDI · USO AUTORIZADO", en: "FIGMA · LICENDI BRAND BOOK · AUTHORIZED USE" },
          width: 1000,
          height: 562,
        },
        {
          id: "L-B3",
          title: { es: "Familia tipográfica", en: "Typographic family" },
          src: "/images/case-studies/licendi/licendi-brand-typography.webp",
          alt: {
            es: "Familia tipográfica de la marca Licendi: Poppins Light para títulos, Futura Condensed Medium para subtítulos e Inter Regular para contenido.",
            en: "Licendi's typographic family: Poppins Light for headings, Futura Condensed Medium for subheadings, and Inter Regular for body content.",
          },
          caption: {
            es: "Sistema tipográfico completo de la marca.",
            en: "The brand's complete typographic system.",
          },
          provenance: { es: "FIGMA · BRAND BOOK LICENDI · USO AUTORIZADO", en: "FIGMA · LICENDI BRAND BOOK · AUTHORIZED USE" },
          width: 1000,
          height: 562,
        },
      ],
      productSectionLabel: { es: "Producto: e-commerce responsive", en: "Product: responsive e-commerce" },
      productFlows: [
        {
          id: "L-P1",
          title: { es: "Descubrimiento", en: "Discovery" },
          mobile: {
            src: "/images/case-studies/licendi/licendi-mobile-landing.webp",
            alt: { es: "Página de inicio de Licendi en mobile con banner promocional, productos destacados y categorías.", en: "Licendi mobile homepage with the promotional banner, featured products, and categories." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · LICENDI · AUTORIZADO", en: "FIGMA · LICENDI · AUTHORIZED" },
            width: 340,
            height: 3425,
          },
          desktop: {
            src: "/images/case-studies/licendi/licendi-desktop-landing.webp",
            alt: { es: "Página de inicio de Licendi en desktop con banner promocional, productos destacados, proceso de compra y categorías.", en: "Licendi desktop homepage with the promotional banner, featured products, purchase process, and categories." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO LICENDI · USO AUTORIZADO", en: "SOURCE · FIGMA LICENDI PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 2233,
          },
          note: {
            title: { es: "Home / landing", en: "Home / landing" },
            body: { es: "El home organiza banner promocional, productos de interés, proceso de compra y categorías en una sola vista de entrada.", en: "The home page organizes the promotional banner, featured products, purchase process, and categories into a single entry view." },
          },
        },
        {
          id: "L-P2",
          title: { es: "Evaluar", en: "Evaluate" },
          mobile: {
            src: "/images/case-studies/licendi/licendi-mobile-catalogo.webp",
            alt: { es: "Página de categoría en mobile con filtros de precio, categoría y sistema operativo, y una cuadrícula de productos.", en: "Mobile category page with price, category, and operating-system filters, and a product grid." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · LICENDI · AUTORIZADO", en: "FIGMA · LICENDI · AUTHORIZED" },
            width: 340,
            height: 3766,
          },
          desktop: {
            src: "/images/case-studies/licendi/licendi-desktop-catalogo.webp",
            alt: { es: "Página de categoría Office 2021 en desktop con filtros de precio, categoría y sistema operativo, y una cuadrícula de productos.", en: "Desktop Office 2021 category page with price, category, and operating-system filters, and a product grid." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO LICENDI · USO AUTORIZADO", en: "SOURCE · FIGMA LICENDI PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 992,
          },
          note: {
            title: { es: "Catálogo y categorías", en: "Catalog and categories" },
            body: { es: "Los filtros y la cuadrícula de productos ayudan a comparar opciones dentro de una categoría extensa.", en: "Filters and the product grid help compare options within a large category." },
          },
        },
        {
          id: "L-P3",
          title: { es: "Decisión de compra", en: "Purchase decision" },
          mobile: {
            src: "/images/case-studies/licendi/licendi-mobile-producto.webp",
            alt: { es: "Página de detalle de producto en mobile con selector de plataforma, versión, entrega y cantidad.", en: "Mobile product detail page with platform, version, delivery, and quantity selectors." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · LICENDI · AUTORIZADO", en: "FIGMA · LICENDI · AUTHORIZED" },
            width: 340,
            height: 3572,
          },
          desktop: {
            src: "/images/case-studies/licendi/licendi-desktop-producto.webp",
            alt: { es: "Página de detalle de producto de Office Professional Plus 2021 en desktop con selector de plataforma, versión, entrega y cantidad.", en: "Desktop Office Professional Plus 2021 product detail page with platform, version, delivery, and quantity selectors." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO LICENDI · USO AUTORIZADO", en: "SOURCE · FIGMA LICENDI PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 1268,
          },
          note: {
            title: { es: "Detalle de producto", en: "Product detail" },
            body: { es: "La ficha de producto concentra las variables de decisión (versión, plataforma, cantidad) antes del carrito.", en: "The product page concentrates the decision variables (version, platform, quantity) before the cart." },
          },
        },
        {
          id: "L-P4",
          title: { es: "Revisión", en: "Review" },
          mobile: {
            src: "/images/case-studies/licendi/licendi-mobile-carrito.webp",
            alt: { es: "Carrito de compra en mobile con artículos, selector de unidades y precio total.", en: "Mobile shopping cart with items, a quantity selector, and the total price." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · LICENDI · AUTORIZADO", en: "FIGMA · LICENDI · AUTHORIZED" },
            width: 340,
            height: 2512,
          },
          desktop: {
            src: "/images/case-studies/licendi/licendi-desktop-carrito.webp",
            alt: { es: "Carrito de compra en desktop con dos artículos, selector de unidades y precio total.", en: "Desktop shopping cart with two items, a quantity selector, and the total price." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO LICENDI · USO AUTORIZADO", en: "SOURCE · FIGMA LICENDI PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 964,
          },
          note: {
            title: { es: "Carrito de compra", en: "Shopping cart" },
            body: { es: "El carrito permite ajustar cantidades y revisar el total antes de avanzar al pago.", en: "The cart allows adjusting quantities and reviewing the total before moving to payment." },
          },
        },
        {
          id: "L-P5",
          title: { es: "Cierre de compra", en: "Purchase completion" },
          mobile: {
            src: "/images/case-studies/licendi/licendi-mobile-checkout.webp",
            alt: { es: "Resumen de pedido en mobile durante el checkout, con el precio total y el botón para finalizar la compra.", en: "Mobile order summary during checkout, with the total price and the button to complete the purchase." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · LICENDI · AUTORIZADO", en: "FIGMA · LICENDI · AUTHORIZED" },
            width: 340,
            height: 2142,
          },
          desktop: {
            src: "/images/case-studies/licendi/licendi-desktop-checkout.webp",
            alt: { es: "Resumen de pedido en desktop durante el checkout, con el precio total y el botón para finalizar la compra.", en: "Desktop order summary during checkout, with the total price and the button to complete the purchase." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO LICENDI · USO AUTORIZADO", en: "SOURCE · FIGMA LICENDI PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 634,
          },
          note: {
            title: { es: "Checkout / pago", en: "Checkout / payment" },
            body: { es: "El resumen de pedido confirma artículos, total y país del comprador antes del pago.", en: "The order summary confirms items, total, and buyer country before payment." },
          },
        },
      ],
    },
    factsSectionLabel: SHARED_LABELS.factsSectionLabel,
    facts: [
      { value: { es: "15", en: "15" }, label: { es: "capturas reales autorizadas por la agencia", en: "real, agency-authorized screens" } },
      { value: { es: "Desktop + mobile", en: "Desktop + mobile" }, label: { es: "superficies de diseño documentadas", en: "documented design surfaces" } },
      { value: { es: "End-to-end", en: "End-to-end" }, label: { es: "journey desde el home hasta el checkout", en: "journey from home through checkout" } },
      { value: { es: "Research + Brand + Product", en: "Research + Brand + Product" }, label: { es: "tratados como un sistema conectado", en: "treated as one connected system" } },
    ],
    outcomeLabel: SHARED_LABELS.outcomeLabel,
    outcomeTitle: { es: "Una dirección integral para producto, marca y experiencia de compra", en: "An integrated direction for product, brand, and purchasing experience" },
    outcomeBody: {
      es: "El trabajo consolidó una propuesta que conecta diagnóstico, arquitectura de información, journeys de e-commerce, dirección visual y comportamiento responsive. El valor demostrable del caso está en la amplitud y coherencia de las decisiones documentadas, no en métricas comerciales que no fueron verificadas para publicación.",
      en: "The work consolidated a direction connecting diagnosis, information architecture, e-commerce journeys, visual direction, and responsive behavior. The demonstrable value of the case lies in the breadth and coherence of the documented decisions—not in commercial metrics that were not verified for publication.",
    },
    limitationsTitle: SHARED_LABELS.limitationsTitle,
    limitationsBody: {
      es: "No se publican métricas de conversión, ventas, tráfico ni engagement. Las imágenes mostradas corresponden a iteraciones prefinales autorizadas para publicación en el portafolio; no reproducen la entrega final aprobada por el cliente. Este caso no afirma implementación del código de producción, cumplimiento de accesibilidad ni propiedad sobre la experiencia actual. El producto actual puede haber evolucionado después de mi participación; el website vigente representa trabajo posterior de sus equipos.",
      en: "No conversion, sales, traffic, or engagement metrics are published. The images shown are authorized pre-final iterations for portfolio publication; they do not reproduce the client's final approved delivery. This case does not claim production-code implementation, accessibility compliance, or ownership of the current experience. The current product may have evolved after my involvement; the live website reflects later work by its teams.",
    },
    linksTitle: { es: "Referencias y trabajo relacionado", en: "References and related work" },
    linksBody: {
      es: "El website actual se ofrece solamente como referencia pública de un producto que ha seguido evolucionando. El caso relacionado de MEECO documenta otro reto desarrollado dentro de la misma colaboración profesional y contexto de negocio.",
      en: "The current website is provided only as a public reference for a product that has continued to evolve. The related MEECO case documents a different challenge developed within the same professional collaboration and business context.",
    },
    actions: [
      { label: { es: "Visitar el website actual", en: "Visit the current website" }, variant: "secondary", external: true, href: "https://licendi.com/es/" },
      { label: { es: "Ver el caso relacionado de MEECO", en: "View the related MEECO case" }, variant: "secondary", external: false, internalRouteKey: "meeco" },
      { label: { es: "Volver a proyectos", en: "Back to Work" }, variant: "secondary", external: false, internalRouteKey: "work" },
    ],
    disclosure: {
      es: "Trabajo de diseño realizado durante una colaboración profesional. Las imágenes mostradas corresponden a iteraciones prefinales autorizadas para publicación en el portafolio; no reproducen la entrega final aprobada por el cliente. Las marcas, contenidos, fotografías y activos de terceros pertenecen a sus respectivos propietarios. El producto actual puede haber evolucionado después de mi participación.",
      en: "Design work completed during a professional engagement. The images shown are authorized pre-final iterations for portfolio publication; they do not reproduce the client's final approved delivery. Trademarks, content, photography, and third-party assets belong to their respective owners. The current product may have evolved after my involvement.",
    },
  },
  meeco: {
    id: "meeco",
    breadcrumbParent: { es: "Proyectos", en: "Work" },
    breadcrumbCurrent: { es: "MEECO Renewable Energy Website", en: "MEECO Renewable Energy Website" },
    statusLabel: { es: "CASO DOCUMENTADO · EVIDENCIA PREFINAL AUTORIZADA", en: "DOCUMENTED CASE · AUTHORIZED PRE-FINAL EVIDENCE" },
    eyebrow: { es: "Caso de estudio · Website corporativo", en: "Case study · Corporate website" },
    title: {
      es: "MEECO: organizar una oferta energética internacional en una experiencia corporativa clara.",
      en: "MEECO: organizing an international energy offering into a clear corporate experience.",
    },
    introduction: {
      es: "MEECO necesitaba presentar una oferta internacional y técnicamente extensa sin perder claridad ni orientación. Rediseñé la arquitectura y la experiencia de su website corporativo para organizar productos, servicios, inversión solar, proyectos, referencias, noticias y contenido institucional en una estructura responsive y multilingüe.",
      en: "MEECO needed to present an international and technically extensive offering without losing clarity or direction. I redesigned the architecture and experience of its corporate website to organize products, services, solar investment, projects, references, news, and company content within a responsive, multilingual structure.",
    },
    roleLabel: SHARED_LABELS.roleLabel,
    role: { es: "Senior Product Designer — Corporate Web Experience (Consultoría)", en: "Senior Product Designer — Corporate Web Experience (Consultant)" },
    scope: {
      es: "Information Architecture · UX/UI · Content hierarchy · Responsive web · Multilingual structure · Figma prototyping",
      en: "Information architecture · UX/UI · Content hierarchy · Responsive web · Multilingual structure · Figma prototyping",
    },
    challengeSectionLabel: SHARED_LABELS.challengeSectionLabel,
    challengeTitle: { es: "Hacer comprensible una oferta técnica, internacional y diversa", en: "Making a diverse international technical offering understandable" },
    challengeBody: {
      es: "El website debía servir a audiencias con necesidades distintas y explicar categorías comerciales, técnicas e institucionales sin convertir la navegación en una lista extensa de información. El reto principal fue crear jerarquía y continuidad entre productos, servicios, inversión, compañía, proyectos, referencias y noticias.",
      en: "The website needed to serve audiences with different needs and explain commercial, technical, and company categories without turning navigation into an undifferentiated list of information. The central challenge was to create hierarchy and continuity across products, services, investment, company, projects, references, and news.",
    },
    responsibilityTitle: { es: "Mi responsabilidad", en: "My responsibility" },
    responsibilityBody: {
      es: "Rediseñé la arquitectura de información, la navegación, las jerarquías de contenido, los principales templates editoriales y las composiciones responsive para desktop y mobile. Trabajé en Figma sobre una experiencia corporativa internacional y multilingüe; mi alcance documentado no incluye atribución sobre el código de producción.",
      en: "I redesigned the information architecture, navigation, content hierarchies, principal editorial templates, and responsive desktop and mobile compositions. I worked in Figma on an international multilingual corporate experience; my documented scope does not include ownership of production code.",
    },
    processSectionLabel: SHARED_LABELS.processSectionLabel,
    processTitle: { es: "De contenido disperso a un sistema corporativo navegable", en: "From distributed content to a navigable corporate system" },
    decisions: [
      {
        title: { es: "Modelar la oferta", en: "Model the offering" },
        body: {
          es: "Organicé los grandes dominios de contenido para separar lo que la empresa ofrece, cómo trabaja, dónde tiene experiencia y quién es.",
          en: "I organized the primary content domains to distinguish what the company offers, how it works, where it has experience, and who it is.",
        },
      },
      {
        title: { es: "Definir una navegación escalable", en: "Define scalable navigation" },
        body: {
          es: "Convertí una estructura extensa en rutas y categorías reconocibles para reducir competencia entre contenidos técnicos, comerciales e institucionales.",
          en: "I translated an extensive structure into recognizable routes and categories, reducing competition across technical, commercial, and company content.",
        },
      },
      {
        title: { es: "Diseñar familias de templates", en: "Design template families" },
        body: {
          es: "Productos, servicios, inversión, compañía, referencias y noticias necesitaban patrones consistentes con flexibilidad suficiente para contenidos distintos.",
          en: "Products, services, investment, company, references, and news required consistent patterns with enough flexibility for different content types.",
        },
      },
      {
        title: { es: "Adaptar la jerarquía a mobile", en: "Adapt hierarchy for mobile" },
        body: {
          es: "Priorización, orden y densidad se ajustaron para conservar comprensión y acción en pantallas pequeñas.",
          en: "Priority, order, and density changed to preserve comprehension and action on smaller screens.",
        },
      },
      {
        title: { es: "Conectar los proyectos relacionados", en: "Connect related engagements" },
        body: {
          es: "El trabajo se documenta junto con Licendi como parte de la misma colaboración profesional, manteniendo separados sus problemas, soluciones y alcance.",
          en: "The work is documented alongside Licendi as part of the same professional collaboration while keeping each project's problem, solution, and scope separate.",
        },
      },
    ],
    evidenceSectionLabel: SHARED_LABELS.evidenceSectionLabel,
    evidenceTitle: { es: "Evidencia prefinal autorizada por la agencia del proyecto", en: "Authorized pre-final evidence from the project's agency" },
    evidenceIntro: {
      es: "La agencia de marketing y branding que contrató este proyecto autorizó reproducir en este portafolio iteraciones prefinales de las interfaces del sitio desarrolladas para MEECO. Las capturas provienen directamente de los archivos de diseño del proyecto y no representan la entrega final aprobada por el cliente.",
      en: "The marketing and branding agency that commissioned this project authorized reproducing pre-final iterations of the site interfaces developed for MEECO in this portfolio. The screens are taken directly from the project's design files and do not represent the client's final approved delivery.",
    },
    diagrams: [],
    realEvidence: {
      featuredProductFlowCount: 2,
      productSectionLabel: { es: "Producto: website corporativo responsive", en: "Product: responsive corporate website" },
      productFlows: [
        {
          id: "M-P1",
          title: { es: "Descubrimiento", en: "Discovery" },
          mobile: {
            src: "/images/case-studies/meeco/meeco-mobile-home.webp",
            alt: { es: "Página de inicio de MEECO en mobile con hero de energía solar, propuesta de valor y accesos a productos, servicios e inversión.", en: "MEECO mobile homepage with a solar-energy hero, value proposition, and links to products, services, and investment." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · MEECO · AUTORIZADO", en: "FIGMA · MEECO · AUTHORIZED" },
            width: 340,
            height: 9154,
          },
          desktop: {
            src: "/images/case-studies/meeco/meeco-desktop-home.webp",
            alt: { es: "Página de inicio de MEECO en desktop con hero de energía solar, propuesta de valor, accesos a productos, servicios, inversión, testimonios y noticias.", en: "MEECO desktop homepage with a solar-energy hero, value proposition, links to products, services, and investment, testimonials, and news." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO MEECO · USO AUTORIZADO", en: "SOURCE · FIGMA MEECO PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 2051,
          },
          note: {
            title: { es: "Home", en: "Home" },
            body: { es: "El home organiza una oferta técnica extensa en una sola vista de entrada: propuesta de valor, video institucional y accesos directos a productos, servicios e inversión.", en: "The home page organizes an extensive technical offering into a single entry view: value proposition, an institutional video, and direct links to products, services, and investment." },
          },
        },
        {
          id: "M-P2",
          title: { es: "Modelar la oferta", en: "Model the offering" },
          mobile: {
            src: "/images/case-studies/meeco/meeco-mobile-productos.webp",
            alt: { es: "Página de productos en mobile organizada por producción solar, almacenamiento energético, soluciones Hydro y otros productos.", en: "Mobile products page organized by solar production, energy storage, Hydro solutions, and other products." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · MEECO · AUTORIZADO", en: "FIGMA · MEECO · AUTHORIZED" },
            width: 340,
            height: 10503,
          },
          desktop: {
            src: "/images/case-studies/meeco/meeco-desktop-productos.webp",
            alt: { es: "Página de productos en desktop organizada por producción solar, almacenamiento energético, soluciones Hydro y otros productos.", en: "Desktop products page organized by solar production, energy storage, Hydro solutions, and other products." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO MEECO · USO AUTORIZADO", en: "SOURCE · FIGMA MEECO PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 1941,
          },
          note: {
            title: { es: "Productos", en: "Products" },
            body: { es: "Una oferta técnica extensa se organiza en categorías reconocibles (producción, almacenamiento, soluciones Hydro) en vez de una lista plana de productos.", en: "An extensive technical offering is organized into recognizable categories (production, storage, Hydro solutions) instead of a flat product list." },
          },
        },
        {
          id: "M-P3",
          title: { es: "Definir una navegación escalable", en: "Define scalable navigation" },
          mobile: {
            src: "/images/case-studies/meeco/meeco-mobile-servicios.webp",
            alt: { es: "Página de servicios en mobile con consultoría estratégica, plan de financiación, gestión de proyecto, implementación, operación y monitorización.", en: "Mobile services page with strategic consulting, financing plan, project management, implementation, operation, and monitoring." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · MEECO · AUTORIZADO", en: "FIGMA · MEECO · AUTHORIZED" },
            width: 340,
            height: 8336,
          },
          desktop: {
            src: "/images/case-studies/meeco/meeco-desktop-servicios.webp",
            alt: { es: "Página de servicios en desktop con consultoría estratégica, plan de financiación, gestión de proyecto, implementación, operación y monitorización.", en: "Desktop services page with strategic consulting, financing plan, project management, implementation, operation, and monitoring." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO MEECO · USO AUTORIZADO", en: "SOURCE · FIGMA MEECO PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 1603,
          },
          note: {
            title: { es: "Servicios", en: "Services" },
            body: { es: "El ciclo completo de servicio (consultoría, financiación, implementación, operación) se presenta como un recorrido secuencial, no como una lista aislada de ofertas.", en: "The complete service cycle (consulting, financing, implementation, operation) is presented as a sequential journey, not an isolated list of offerings." },
          },
        },
        {
          id: "M-P4",
          title: { es: "Priorizar la inversión", en: "Prioritize the investment offer" },
          mobile: {
            src: "/images/case-studies/meeco/meeco-mobile-inversion.webp",
            alt: { es: "Página de inversión ecológica en mobile con beneficios de invertir en energía limpia y noticias sobre inversiones.", en: "Mobile green-investment page with the benefits of investing in clean energy and investment-related news." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · MEECO · AUTORIZADO", en: "FIGMA · MEECO · AUTHORIZED" },
            width: 340,
            height: 7644,
          },
          desktop: {
            src: "/images/case-studies/meeco/meeco-desktop-inversion.webp",
            alt: { es: "Página de inversión ecológica en desktop con beneficios de invertir en energía limpia y noticias sobre inversiones.", en: "Desktop green-investment page with the benefits of investing in clean energy and investment-related news." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO MEECO · USO AUTORIZADO", en: "SOURCE · FIGMA MEECO PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 1628,
          },
          note: {
            title: { es: "Inversión", en: "Investment" },
            body: { es: "La inversión se presenta como una categoría propia junto a producto y servicio, con sus propios beneficios y prueba social, en vez de una nota al pie comercial.", en: "Investment is presented as its own category alongside product and service, with its own benefits and social proof, rather than a commercial footnote." },
          },
        },
        {
          id: "M-P5",
          title: { es: "Adaptar la jerarquía a mobile", en: "Adapt hierarchy for mobile" },
          mobile: {
            src: "/images/case-studies/meeco/meeco-mobile-empresa.webp",
            alt: { es: "Página de la compañía en mobile mostrando el alcance global de MEECO mediante una lista de países.", en: "Mobile company page showing MEECO's global reach through a list of countries." },
            caption: { es: "Mobile", en: "Mobile" },
            provenance: { es: "FIGMA · MEECO · AUTORIZADO", en: "FIGMA · MEECO · AUTHORIZED" },
            width: 340,
            height: 9034,
          },
          desktop: {
            src: "/images/case-studies/meeco/meeco-desktop-empresa.webp",
            alt: { es: "Página de la compañía en desktop mostrando el alcance global de MEECO y su estructura corporativa por país.", en: "Desktop company page showing MEECO's global reach and its per-country corporate structure." },
            caption: { es: "Desktop", en: "Desktop" },
            provenance: { es: "FUENTE · FIGMA PROYECTO MEECO · USO AUTORIZADO", en: "SOURCE · FIGMA MEECO PROJECT · AUTHORIZED USE" },
            width: 700,
            height: 1231,
          },
          note: {
            title: { es: "Compañía", en: "Company" },
            body: { es: "La misma sección de “alcance global” se resuelve distinto por densidad: en desktop se muestra la estructura corporativa completa por país; en mobile se prioriza una lista visual de países, más legible en pantallas pequeñas.", en: "The same “global reach” section resolves differently by density: desktop shows the full per-country corporate structure, while mobile prioritizes a visual country list that reads better on small screens." },
          },
        },
      ],
    },
    factsSectionLabel: SHARED_LABELS.factsSectionLabel,
    facts: [
      { value: { es: "10", en: "10" }, label: { es: "capturas reales autorizadas por la agencia", en: "real, agency-authorized screens" } },
      { value: { es: "Desktop + mobile", en: "Desktop + mobile" }, label: { es: "superficies documentadas", en: "documented surfaces" } },
      { value: { es: "5 categorías", en: "5 categories" }, label: { es: "de contenido estructuradas", en: "of structured content" } },
      { value: { es: "Responsive + multilingüe", en: "Responsive + multilingual" }, label: { es: "como restricciones de diseño", en: "as design constraints" } },
    ],
    outcomeLabel: SHARED_LABELS.outcomeLabel,
    outcomeTitle: { es: "Un sistema editorial para explicar una organización compleja", en: "An editorial system for explaining a complex organization" },
    outcomeBody: {
      es: "El rediseño produjo una dirección coherente para navegación, jerarquía, templates y comportamiento responsive. El caso demuestra cómo convertí una oferta técnica e internacional en una estructura de contenido más organizada y reutilizable, sin atribuir resultados comerciales que no fueron medidos para publicación.",
      en: "The redesign established a coherent direction for navigation, hierarchy, templates, and responsive behavior. The case demonstrates how I turned an international technical offering into a more organized, reusable content structure without attributing commercial outcomes that were not measured for publication.",
    },
    limitationsTitle: SHARED_LABELS.limitationsTitle,
    limitationsBody: {
      es: "No se publican métricas comerciales, resultados de tráfico ni certificaciones técnicas. Las imágenes mostradas corresponden a iteraciones prefinales autorizadas para publicación en el portafolio; no reproducen la entrega final aprobada por el cliente. El caso no afirma implementación del código de producción ni propiedad sobre cambios posteriores. El producto actual puede haber evolucionado después de mi participación; este documento se limita al alcance y a las decisiones de diseño respaldadas por la evidencia disponible.",
      en: "No commercial metrics, traffic outcomes, or technical certifications are published. The images shown are authorized pre-final iterations for portfolio publication; they do not reproduce the client's final approved delivery. The case does not claim production-code implementation or ownership of subsequent changes. The current product may have evolved after my involvement; this document is limited to the scope and design decisions supported by the available evidence.",
    },
    linksTitle: { es: "Referencias y trabajo relacionado", en: "References and related work" },
    linksBody: {
      es: "El website actual se enlaza como referencia pública de una experiencia posterior. El caso relacionado de Licendi presenta un reto transaccional y de marca desarrollado dentro de la misma colaboración profesional.",
      en: "The current website is linked as a public reference for a later experience. The related Licendi case presents a transactional and brand challenge developed within the same professional collaboration.",
    },
    actions: [
      { label: { es: "Visitar el website actual", en: "Visit the current website" }, variant: "secondary", external: true, href: "https://meeco-group.com/" },
      { label: { es: "Ver el caso relacionado de Licendi", en: "View the related Licendi case" }, variant: "secondary", external: false, internalRouteKey: "licendi" },
      { label: { es: "Volver a proyectos", en: "Back to Work" }, variant: "secondary", external: false, internalRouteKey: "work" },
    ],
    disclosure: {
      es: "Trabajo de diseño realizado durante una colaboración profesional. Las imágenes mostradas corresponden a iteraciones prefinales autorizadas para publicación en el portafolio; no reproducen la entrega final aprobada por el cliente. Las marcas, contenidos, fotografías y activos de terceros pertenecen a sus respectivos propietarios. El producto actual puede haber evolucionado después de mi participación. Este caso no afirma que Licendi y meeco Group sean la misma corporación legal ni que una empresa sea propietaria legal de la otra; documenta únicamente el contexto de colaboración profesional compartido.",
      en: "Design work completed during a professional engagement. The images shown are authorized pre-final iterations for portfolio publication; they do not reproduce the client's final approved delivery. Trademarks, content, photography, and third-party assets belong to their respective owners. The current product may have evolved after my involvement. This case does not claim that Licendi and the meeco Group are the same legal corporation or that one company legally owns the other; it documents only the shared professional-collaboration context.",
    },
  },
};
