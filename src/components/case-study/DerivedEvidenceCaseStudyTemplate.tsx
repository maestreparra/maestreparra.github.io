import type { Locale } from "@/i18n/locales";
import { localize } from "@/content/home";
import {
  licendiMeecoCaseStudies,
  type LicendiMeecoCaseId,
  type LicendiMeecoDiagramContent,
} from "@/content/licendi-meeco";
import { getRoutePath } from "@/i18n/routes";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DecisionList } from "@/components/ui/DecisionList";
import { FactGrid } from "@/components/ui/FactGrid";
import { LimitationsPanel } from "@/components/ui/LimitationsPanel";
import { ExternalLinkGroup } from "@/components/ui/ExternalLinkGroup";
import { DiagramFigureShell } from "@/components/ui/DiagramFigureShell";
import { RealEvidenceImage } from "@/components/ui/RealEvidenceImage";
import { RealEvidenceProductFlowCard } from "@/components/ui/RealEvidenceProductFlowCard";
import { EvidenceDisclosure } from "@/components/ui/EvidenceDisclosure";
import { StageSequenceDiagram } from "@/components/ui/StageSequenceDiagram";
import { DomainTreeDiagram } from "@/components/ui/DomainTreeDiagram";
import { TaxonomyColumnsDiagram } from "@/components/ui/TaxonomyColumnsDiagram";
import { JourneyPathDiagram } from "@/components/ui/JourneyPathDiagram";
import { PrincipleCardsDiagram } from "@/components/ui/PrincipleCardsDiagram";
import { TemplateSystemDiagram } from "@/components/ui/TemplateSystemDiagram";
import { ResponsiveComparisonDiagram } from "@/components/ui/ResponsiveComparisonDiagram";
import { RelatedEngagementDiagram } from "@/components/ui/RelatedEngagementDiagram";
import styles from "./DerivedEvidenceCaseStudyTemplate.module.css";

export interface DerivedEvidenceCaseStudyTemplateProps {
  caseId: LicendiMeecoCaseId;
  locale: Locale;
}

const RECONSTRUCTION_LABEL = { es: "RECONSTRUCCIÓN PARA PORTAFOLIO", en: "PORTFOLIO RECONSTRUCTION" } as const;

const DISCLOSURE_COLLAPSED_LABEL = { es: "Explorar evidencia adicional", en: "Explore additional evidence" } as const;
const DISCLOSURE_EXPANDED_LABEL = { es: "Ocultar evidencia adicional", en: "Hide additional evidence" } as const;

function DiagramBody({ diagram, locale }: { diagram: LicendiMeecoDiagramContent; locale: Locale }) {
  switch (diagram.kind) {
    case "stage-sequence":
      return (
        <StageSequenceDiagram
          stages={diagram.stages.map((stage) => ({
            label: localize(stage.label, locale),
            children: stage.children?.map((child) => localize(child, locale)) ?? [],
          })) as [
            { label: string; children: string[] },
            { label: string; children: string[] },
            { label: string; children: string[] },
          ]}
        />
      );
    case "domain-tree":
      return (
        <DomainTreeDiagram
          root={localize(diagram.root, locale)}
          branches={diagram.branches.map((branch) => ({
            label: localize(branch.label, locale),
            children: branch.children?.map((child) => localize(child, locale)) ?? [],
          }))}
        />
      );
    case "taxonomy-columns":
      return (
        <TaxonomyColumnsDiagram
          columns={diagram.columns.map((column) => ({
            label: localize(column.label, locale),
            children: column.children?.map((child) => localize(child, locale)) ?? [],
          }))}
        />
      );
    case "journey-path":
      return <JourneyPathDiagram steps={diagram.steps.map((step) => localize(step, locale))} />;
    case "principle-cards":
      return (
        <PrincipleCardsDiagram
          centralStatement={localize(diagram.centralStatement, locale)}
          principles={diagram.principles.map((principle) => localize(principle, locale))}
        />
      );
    case "template-system":
      return (
        <TemplateSystemDiagram
          sharedLayersLabel={locale === "es" ? "Capas compartidas" : "Shared layers"}
          sharedLayers={diagram.sharedLayers.map((layer) => localize(layer, locale))}
          families={diagram.families.map((family) => localize(family, locale))}
        />
      );
    case "responsive-comparison":
      return (
        <ResponsiveComparisonDiagram
          desktopLabel={locale === "es" ? "Desktop" : "Desktop"}
          mobileLabel={locale === "es" ? "Mobile" : "Mobile"}
          changes={diagram.changes.map((change) => localize(change, locale))}
        />
      );
    case "related-engagement":
      return (
        <RelatedEngagementDiagram
          contextStatement={localize(diagram.contextStatement, locale)}
          projects={diagram.projects.map((project) => localize(project.label, locale)) as [string, string]}
          legalNote={localize(diagram.legalNote, locale)}
        />
      );
    default:
      return null;
  }
}

export function DerivedEvidenceCaseStudyTemplate({ caseId, locale }: DerivedEvidenceCaseStudyTemplateProps) {
  const isEs = locale === "es";
  const c = licendiMeecoCaseStudies[caseId];

  const actions = c.actions.map((action) => ({
    label: localize(action.label, locale),
    variant: action.variant,
    external: action.external,
    href: action.external
      ? (action.href as string)
      : getRoutePath(action.internalRouteKey === "work" ? "work" : (action.internalRouteKey as "licendi" | "meeco"), locale),
  }));

  return (
    <>
      <a className="skip-link" href="#main-content">
        {isEs ? "Saltar al contenido principal" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale} currentRouteKey={caseId} />
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
            {c.realEvidence ? (
              (() => {
                const realEvidence = c.realEvidence;
                const researchSlides = realEvidence.researchSlides ?? [];
                const brandSlides = realEvidence.brandSlides ?? [];
                const productFlows = realEvidence.productFlows;
                const totalRealEvidence = researchSlides.length + brandSlides.length + productFlows.length;
                let figureIndex = 0;
                const nextFigureNumber = (id: string) => {
                  figureIndex += 1;
                  return `${id} · ${String(figureIndex).padStart(2, "0")}/${totalRealEvidence}`;
                };

                const featuredResearchCount = realEvidence.featuredResearchCount ?? researchSlides.length;
                const featuredBrandCount = realEvidence.featuredBrandCount ?? brandSlides.length;
                const featuredFlowCount = realEvidence.featuredProductFlowCount;

                const featuredResearch = researchSlides.slice(0, featuredResearchCount);
                const restResearch = researchSlides.slice(featuredResearchCount);
                const featuredBrand = brandSlides.slice(0, featuredBrandCount);
                const restBrand = brandSlides.slice(featuredBrandCount);
                const featuredFlows = productFlows.slice(0, featuredFlowCount);
                const restFlows = productFlows.slice(featuredFlowCount);
                const hasRest = restResearch.length + restBrand.length + restFlows.length > 0;

                const researchGroup = (slides: typeof researchSlides) =>
                  slides.length > 0 && realEvidence.researchSectionLabel ? (
                    <div className={styles.realEvidenceGroup}>
                      <h3 className={styles.subheading}>{localize(realEvidence.researchSectionLabel, locale)}</h3>
                      <div className={styles.slideGrid}>
                        {slides.map((slide) => (
                          <RealEvidenceImage
                            key={slide.id}
                            figureNumber={nextFigureNumber(slide.id)}
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

                const brandGroup = (slides: typeof brandSlides) =>
                  slides.length > 0 && realEvidence.brandSectionLabel ? (
                    <div className={styles.realEvidenceGroup}>
                      <h3 className={styles.subheading}>{localize(realEvidence.brandSectionLabel, locale)}</h3>
                      <div className={styles.slideGrid}>
                        {slides.map((slide) => (
                          <RealEvidenceImage
                            key={slide.id}
                            figureNumber={nextFigureNumber(slide.id)}
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

                const flowGroup = (flows: typeof productFlows) =>
                  flows.length > 0 ? (
                    <div className={styles.realEvidenceGroup}>
                      <h3 className={styles.subheading}>{localize(realEvidence.productSectionLabel, locale)}</h3>
                      <div className={styles.productFlowGrid}>
                        {flows.map((flow) => (
                          <RealEvidenceProductFlowCard
                            key={flow.id}
                            figureNumber={nextFigureNumber(flow.id)}
                            title={localize(flow.title, locale)}
                            mobile={{
                              src: flow.mobile.src,
                              alt: localize(flow.mobile.alt, locale),
                              width: flow.mobile.width,
                              height: flow.mobile.height,
                              caption: localize(flow.mobile.caption, locale),
                              provenance: localize(flow.mobile.provenance, locale),
                            }}
                            desktop={{
                              src: flow.desktop.src,
                              alt: localize(flow.desktop.alt, locale),
                              width: flow.desktop.width,
                              height: flow.desktop.height,
                              caption: localize(flow.desktop.caption, locale),
                              provenance: localize(flow.desktop.provenance, locale),
                            }}
                            noteTitle={localize(flow.note.title, locale)}
                            noteBody={localize(flow.note.body, locale)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : null;

                return (
                  <div className={styles.realEvidenceGroups}>
                    {researchGroup(featuredResearch)}
                    {brandGroup(featuredBrand)}
                    {flowGroup(featuredFlows)}
                    {hasRest ? (
                      <EvidenceDisclosure
                        collapsedLabel={localize(DISCLOSURE_COLLAPSED_LABEL, locale)}
                        expandedLabel={localize(DISCLOSURE_EXPANDED_LABEL, locale)}
                      >
                        {researchGroup(restResearch)}
                        {brandGroup(restBrand)}
                        {flowGroup(restFlows)}
                      </EvidenceDisclosure>
                    ) : null}
                  </div>
                );
              })()
            ) : (
              <div className={styles.diagramGrid}>
                {c.diagrams.map((diagram, index) => (
                  <DiagramFigureShell
                    key={diagram.id}
                    reconstructionLabel={localize(RECONSTRUCTION_LABEL, locale)}
                    figureNumber={`${diagram.id} · ${String(index + 1).padStart(2, "0")}/${c.diagrams.length}`}
                    title={localize(diagram.title, locale)}
                    caption={localize(diagram.caption, locale)}
                    textEquivalent={localize(diagram.textEquivalent, locale)}
                  >
                    <DiagramBody diagram={diagram} locale={locale} />
                  </DiagramFigureShell>
                ))}
              </div>
            )}
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
