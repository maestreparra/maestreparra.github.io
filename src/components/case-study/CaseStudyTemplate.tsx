import type { Locale } from "@/i18n/locales";
import { localize, localizeResponsive, type ResponsiveValue } from "@/content/home";
import { caseStudies, type CaseStudyId } from "@/content/case-studies";
import { getRoutePath } from "@/i18n/routes";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DecisionList } from "@/components/ui/DecisionList";
import { EvidenceFigure } from "@/components/ui/EvidenceFigure";
import { FactGrid } from "@/components/ui/FactGrid";
import { LimitationsPanel } from "@/components/ui/LimitationsPanel";
import { ExternalLinkGroup } from "@/components/ui/ExternalLinkGroup";
import styles from "./CaseStudyTemplate.module.css";

export interface CaseStudyTemplateProps {
  caseId: CaseStudyId;
  locale: Locale;
}

/**
 * Renders one text node per breakpoint inside whatever single element wraps
 * it, toggled by the global .u-mobile-only/.u-desktop-only classes — the
 * same pattern already used by HomeTemplate.tsx (duplicated locally since
 * that file is out of scope for this correction).
 */
function ResponsiveText({ value, locale }: { value: ResponsiveValue; locale: Locale }) {
  const { desktop, mobile } = localizeResponsive(value, locale);
  if (desktop === mobile) {
    return <>{desktop}</>;
  }
  return (
    <>
      <span className="u-mobile-only">{mobile}</span>
      <span className="u-desktop-only">{desktop}</span>
    </>
  );
}

export function CaseStudyTemplate({ caseId, locale }: CaseStudyTemplateProps) {
  const isEs = locale === "es";
  const c = caseStudies[caseId];
  const routeKey = caseId;

  const evidenceMobile = {
    src: localize(c.evidence.mobile.src, locale),
    alt: localize(c.evidence.mobile.alt, locale),
    caption: localize(c.evidence.mobile.caption, locale),
    heightPx: c.evidence.mobile.heightPx,
  };
  const evidenceDesktop = {
    src: localize(c.evidence.desktop.src, locale),
    alt: localize(c.evidence.desktop.alt, locale),
    caption: localize(c.evidence.desktop.caption, locale),
    heightPx: c.evidence.desktop.heightPx,
  };
  const notesMobile = {
    title: localize(c.evidence.notesMobile.title, locale),
    body: localize(c.evidence.notesMobile.body, locale),
    provenance: localize(c.evidence.notesMobile.provenance, locale),
  };
  const notesDesktop = {
    title: localize(c.evidence.notesDesktop.title, locale),
    body: localize(c.evidence.notesDesktop.body, locale),
    provenance: localize(c.evidence.notesDesktop.provenance, locale),
  };

  const actions = c.actions.map((action) => {
    const label = localizeResponsive(action.label, locale);
    return {
      label,
      variant: action.variant,
      external: action.external,
      href: action.external ? action.href : getRoutePath(action.internalRouteKey, locale),
    };
  });

  const { desktop: titleDesktop, mobile: titleMobile } = localizeResponsive(c.title, locale);
  const { desktop: eyebrowDesktop, mobile: eyebrowMobile } = localizeResponsive(c.eyebrow, locale);
  const { desktop: introDesktop, mobile: introMobile } = localizeResponsive(c.introduction, locale);
  const breadcrumbCurrent = localizeResponsive(c.breadcrumbCurrent, locale);
  const facts = c.facts.map((fact) => ({
    value: localize(fact.value, locale),
    label: localizeResponsive(fact.label, locale),
  }));
  const limitationsTitle = localizeResponsive(c.limitationsTitle, locale);
  const limitationsBody = localizeResponsive(c.limitationsBody, locale);
  const linksTitle = localizeResponsive(c.linksTitle, locale);
  const linksBody = localizeResponsive(c.linksBody, locale);

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
              currentLabel={breadcrumbCurrent.desktop}
              currentLabelMobile={breadcrumbCurrent.mobile !== breadcrumbCurrent.desktop ? breadcrumbCurrent.mobile : undefined}
            />
            <StatusLabel label={localize(c.statusLabel, locale)} />
            <PageHero
              headingId="case-study-heading"
              eyebrow={eyebrowDesktop}
              title={titleDesktop}
              introduction={introDesktop}
              eyebrowMobile={eyebrowMobile !== eyebrowDesktop ? eyebrowMobile : undefined}
              titleMobile={titleMobile !== titleDesktop ? titleMobile : undefined}
              introductionMobile={introMobile !== introDesktop ? introMobile : undefined}
              reserveMobileHeight
            />
            <div className={styles.snapshot}>
              <p className={styles.snapshotLabel}>{localize(c.roleLabel, locale)}</p>
              <p className={styles.role}>{localize(c.role, locale)}</p>
              <p className={styles.scope}>
                <ResponsiveText value={c.scope} locale={locale} />
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionTight} aria-label={localizeResponsive(c.challengeSectionLabel, locale).desktop}>
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>
              <ResponsiveText value={c.challengeSectionLabel} locale={locale} />
            </p>
            <div className={styles.contextCards}>
              <div className={`${styles.contextCard} ${styles.contextCardEmphasis}`}>
                <h3 className={styles.cardTitle}>{localize(c.challengeTitle, locale)}</h3>
                <p className={styles.cardBody}>
                  <ResponsiveText value={c.challengeBody} locale={locale} />
                </p>
              </div>
              <div className={styles.contextCard}>
                <h3 className={styles.cardTitle}>{localize(c.responsibilityTitle, locale)}</h3>
                <p className={styles.cardBody}>
                  <ResponsiveText value={c.responsibilityBody} locale={locale} />
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="process-heading">
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>
              <ResponsiveText value={c.processSectionLabel} locale={locale} />
            </p>
            <h2 id="process-heading" className={styles.heading}>
              <ResponsiveText value={c.processTitle} locale={locale} />
            </h2>
            <DecisionList
              decisions={c.decisions.map((decision) => {
                const title = localizeResponsive(decision.title, locale);
                const body = localizeResponsive(decision.body, locale);
                return {
                  title: title.desktop,
                  titleMobile: title.mobile !== title.desktop ? title.mobile : undefined,
                  body: body.desktop,
                  bodyMobile: body.mobile !== body.desktop ? body.mobile : undefined,
                };
              })}
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="evidence-heading">
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>
              <ResponsiveText value={c.evidenceSectionLabel} locale={locale} />
            </p>
            <h2 id="evidence-heading" className={styles.heading}>
              <ResponsiveText value={c.evidenceTitle} locale={locale} />
            </h2>
            <p className={styles.body}>
              <ResponsiveText value={c.evidenceIntro} locale={locale} />
            </p>
            <EvidenceFigure
              mobile={evidenceMobile}
              desktop={evidenceDesktop}
              notesMobile={notesMobile}
              notesDesktop={notesDesktop}
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="technical-heading">
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>
              <ResponsiveText value={c.technicalSectionLabel} locale={locale} />
            </p>
            <h2 id="technical-heading" className={styles.heading}>
              <ResponsiveText value={c.technicalTitle} locale={locale} />
            </h2>
            <p className={styles.body}>
              <ResponsiveText value={c.technicalNote} locale={locale} />
            </p>
            <div className="u-mobile-only">
              <FactGrid facts={facts.map((fact) => ({ value: fact.value, label: fact.label.mobile }))} />
            </div>
            <div className="u-desktop-only">
              <FactGrid facts={facts.map((fact) => ({ value: fact.value, label: fact.label.desktop }))} />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.outcome}>
              <p className={styles.sectionLabelInverse}>
                <ResponsiveText value={c.outcomeLabel} locale={locale} />
              </p>
              <p className={styles.outcomeTitle}>
                <ResponsiveText value={c.outcomeTitle} locale={locale} />
              </p>
              <p className={styles.outcomeBody}>
                <ResponsiveText value={c.outcomeBody} locale={locale} />
              </p>
            </div>
            <div className="u-mobile-only">
              <LimitationsPanel title={limitationsTitle.mobile} body={limitationsBody.mobile} />
              <ExternalLinkGroup
                title={linksTitle.mobile}
                body={linksBody.mobile}
                actions={actions.map((action) => ({ ...action, label: action.label.mobile }))}
              />
            </div>
            <div className="u-desktop-only">
              <LimitationsPanel title={limitationsTitle.desktop} body={limitationsBody.desktop} />
              <ExternalLinkGroup
                title={linksTitle.desktop}
                body={linksBody.desktop}
                actions={actions.map((action) => ({ ...action, label: action.label.desktop }))}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
