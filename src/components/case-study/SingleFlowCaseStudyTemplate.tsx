import type { Locale } from "@/i18n/locales";
import { localize } from "@/content/home";
import type { SingleFlowCaseContent } from "@/content/single-flow-case";
import { getRoutePath, type PublicRouteKey } from "@/i18n/routes";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DecisionList } from "@/components/ui/DecisionList";
import { FactGrid } from "@/components/ui/FactGrid";
import { LimitationsPanel } from "@/components/ui/LimitationsPanel";
import { ExternalLinkGroup } from "@/components/ui/ExternalLinkGroup";
import { RealEvidenceImage } from "@/components/ui/RealEvidenceImage";
import { EvidenceDisclosure } from "@/components/ui/EvidenceDisclosure";
import styles from "./SingleFlowCaseStudyTemplate.module.css";

export interface SingleFlowCaseStudyTemplateProps {
  locale: Locale;
  content: SingleFlowCaseContent;
  routeKey: PublicRouteKey;
}

const DISCLOSURE_COLLAPSED_LABEL = { es: "Explorar evidencia adicional", en: "Explore additional evidence" } as const;
const DISCLOSURE_EXPANDED_LABEL = { es: "Ocultar evidencia adicional", en: "Hide additional evidence" } as const;

/**
 * Shared template for single-founder-authorized case studies whose evidence
 * is one real product flow with no mobile pairing and no research/brand
 * deck (PilotOrb, AppliedXL). Structurally identical to
 * DerivedEvidenceCaseStudyTemplate's real-evidence branch, but standalone
 * since these cases never have diagrams to fall back to.
 */
export function SingleFlowCaseStudyTemplate({ locale, content: c, routeKey }: SingleFlowCaseStudyTemplateProps) {
  const isEs = locale === "es";

  const actions = c.actions.map((action) => ({
    label: localize(action.label, locale),
    variant: action.variant,
    external: action.external,
    href: action.external ? (action.href as string) : getRoutePath("work", locale),
  }));

  return (
    <>
      <a className="skip-link" href="#main-content">
        {isEs ? "Saltar al contenido principal" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale} currentRouteKey={routeKey} />
      <main id="main-content">
        <section className={styles.section}>
          <div className={styles.inner}>
            <Breadcrumbs
              ariaLabel={isEs ? "Ruta de navegación" : "Breadcrumb"}
              parentLabel={localize(c.breadcrumbParent, locale)}
              parentHref={getRoutePath("work", locale)}
              currentLabel={localize(c.breadcrumbCurrent, locale)}
            />
            <StatusLabel label={localize(c.statusLabel, locale)} />
            <PageHero
              headingId="case-study-heading"
              eyebrow={localize(c.eyebrow, locale)}
              title={localize(c.title, locale)}
              introduction={localize(c.introduction, locale)}
            />
            <div className={styles.snapshot}>
              <p className={styles.snapshotLabel}>{localize(c.roleLabel, locale)}</p>
              <p className={styles.role}>{localize(c.role, locale)}</p>
              <p className={styles.scope}>{localize(c.scope, locale)}</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-label={localize(c.challengeSectionLabel, locale)}>
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>{localize(c.challengeSectionLabel, locale)}</p>
            <div className={styles.contextCards}>
              <div className={`${styles.contextCard} ${styles.contextCardEmphasis}`}>
                <h3 className={styles.cardTitle}>{localize(c.challengeTitle, locale)}</h3>
                <p className={styles.cardBody}>{localize(c.challengeBody, locale)}</p>
              </div>
              <div className={styles.contextCard}>
                <h3 className={styles.cardTitle}>{localize(c.responsibilityTitle, locale)}</h3>
                <p className={styles.cardBody}>{localize(c.responsibilityBody, locale)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="process-heading">
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>{localize(c.processSectionLabel, locale)}</p>
            <h2 id="process-heading" className={styles.heading}>
              {localize(c.processTitle, locale)}
            </h2>
            <DecisionList
              decisions={c.decisions.map((decision) => ({
                title: localize(decision.title, locale),
                body: localize(decision.body, locale),
              }))}
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="evidence-heading">
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>{localize(c.evidenceSectionLabel, locale)}</p>
            <h2 id="evidence-heading" className={styles.heading}>
              {localize(c.evidenceTitle, locale)}
            </h2>
            <p className={styles.body}>{localize(c.evidenceIntro, locale)}</p>
            {(() => {
              const brandSlides = c.realEvidence.brandSlides ?? [];
              const { productSlides, featuredProductCount } = c.realEvidence;
              const total = brandSlides.length + productSlides.length;
              const figureNumber = (slideIndex: number, id: string) =>
                `${id} · ${String(slideIndex + 1).padStart(2, "0")}/${total}`;

              const featuredProduct = productSlides.slice(0, featuredProductCount);
              const restProduct = productSlides.slice(featuredProductCount);
              const hasRest = restProduct.length > 0;

              const productGroup = (slides: typeof productSlides, offset: number) =>
                slides.length > 0 ? (
                  <div className={styles.realEvidenceGroup}>
                    <h3 className={styles.subheading}>{localize(c.realEvidence.productSectionLabel, locale)}</h3>
                    <div className={styles.slideGrid}>
                      {slides.map((slide, index) => (
                        <RealEvidenceImage
                          key={slide.id}
                          figureNumber={figureNumber(brandSlides.length + offset + index, slide.id)}
                          title={localize(slide.title, locale)}
                          src={slide.src}
                          alt={localize(slide.alt, locale)}
                          width={slide.width}
                          height={slide.height}
                          caption={localize(slide.caption, locale)}
                          provenance={localize(slide.provenance, locale)}
                        />
                      ))}
                    </div>
                  </div>
                ) : null;

              return (
                <div className={styles.realEvidenceGroups}>
                  {brandSlides.length > 0 && c.realEvidence.brandSectionLabel ? (
                    <div className={styles.realEvidenceGroup}>
                      <h3 className={styles.subheading}>{localize(c.realEvidence.brandSectionLabel, locale)}</h3>
                      <div className={styles.slideGrid}>
                        {brandSlides.map((slide, index) => (
                          <RealEvidenceImage
                            key={slide.id}
                            figureNumber={figureNumber(index, slide.id)}
                            title={localize(slide.title, locale)}
                            src={slide.src}
                            alt={localize(slide.alt, locale)}
                            width={slide.width}
                            height={slide.height}
                            caption={localize(slide.caption, locale)}
                            provenance={localize(slide.provenance, locale)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {productGroup(featuredProduct, 0)}
                  {hasRest ? (
                    <EvidenceDisclosure
                      collapsedLabel={localize(DISCLOSURE_COLLAPSED_LABEL, locale)}
                      expandedLabel={localize(DISCLOSURE_EXPANDED_LABEL, locale)}
                    >
                      {productGroup(restProduct, featuredProduct.length)}
                    </EvidenceDisclosure>
                  ) : null}
                </div>
              );
            })()}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="facts-heading">
          <div className={styles.inner}>
            <h2 id="facts-heading" className={styles.sectionLabel}>
              {localize(c.factsSectionLabel, locale)}
            </h2>
            <FactGrid
              facts={c.facts.map((fact) => ({
                value: localize(fact.value, locale),
                label: localize(fact.label, locale),
              }))}
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.outcome}>
              <p className={styles.sectionLabelInverse}>{localize(c.outcomeLabel, locale)}</p>
              <p className={styles.outcomeTitle}>{localize(c.outcomeTitle, locale)}</p>
              <p className={styles.outcomeBody}>{localize(c.outcomeBody, locale)}</p>
            </div>
            <LimitationsPanel title={localize(c.limitationsTitle, locale)} body={localize(c.limitationsBody, locale)} />
            <ExternalLinkGroup title={localize(c.linksTitle, locale)} body={localize(c.linksBody, locale)} actions={actions} />
            <p className={styles.disclosure}>{localize(c.disclosure, locale)}</p>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
