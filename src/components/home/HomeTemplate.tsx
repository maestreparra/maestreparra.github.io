import type { Locale } from "@/i18n/locales";
import { homeContent, localize, localizeResponsive, type ResponsiveValue } from "@/content/home";
import { homeAnchors, getHomeAnchorHref, getRoutePath } from "@/i18n/routes";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EvidenceLabel } from "@/components/ui/EvidenceLabel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProcessStep } from "@/components/ui/ProcessStep";
import styles from "./HomeTemplate.module.css";

export interface HomeTemplateProps {
  locale: Locale;
}

/**
 * Renders one text node per breakpoint inside whatever single element wraps
 * it (h1, p, ...), toggled by the global .u-mobile-only/.u-desktop-only
 * classes (styles/tokens.css). Keeps element counts singular (one <h1>,
 * etc.) in the static HTML while matching the frozen Figma copy per
 * viewport, with no client JavaScript.
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

export function HomeTemplate({ locale }: HomeTemplateProps) {
  const { hero, evidence, selectedWork, experience, method, closing } = homeContent;
  const isEs = locale === "es";

  return (
    <>
      <a className="skip-link" href="#main-content">
        {isEs ? "Saltar al contenido principal" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale} currentRouteKey="home" />
      <main id="main-content">
        <section id={homeAnchors.hero} className={`${styles.section} ${styles.hero}`} aria-labelledby="hero-heading">
          <p className={styles.eyebrow}>{localize(hero.eyebrow, locale)}</p>
          <h1 id="hero-heading" className={styles.headline}>
            <ResponsiveText value={hero.headline} locale={locale} />
          </h1>
          <p className={styles.introduction}>
            <ResponsiveText value={hero.introduction} locale={locale} />
          </p>
          <div className={styles.actions}>
            <ButtonLink href={getRoutePath("work", locale)} variant="primary">
              {localize(hero.primaryCta, locale)}
            </ButtonLink>
            <ButtonLink href={getRoutePath("about", locale)} variant="secondary">
              {localize(hero.secondaryCta, locale)}
            </ButtonLink>
          </div>
          <p className={styles.context}>
            <ResponsiveText value={hero.context} locale={locale} />
          </p>
        </section>

        <section className={`${styles.section} ${styles.evidence}`} aria-label={isEs ? "Evidencia profesional" : "Professional evidence"}>
          {evidence.map((item) => (
            <EvidenceLabel key={localize(item.caption, locale)} metric={localize(item.metric, locale)} caption={localize(item.caption, locale)} />
          ))}
        </section>

        <section id={homeAnchors.selectedWork} className={styles.section} aria-labelledby="selected-work-heading">
          <div className={styles.selectedWorkHeader}>
            <p className={styles.eyebrow}>{localize(selectedWork.eyebrow, locale)}</p>
            <h2 id="selected-work-heading" className={styles.title2}>
              <ResponsiveText value={selectedWork.title} locale={locale} />
            </h2>
            <p className={styles.body2}>
              <ResponsiveText value={selectedWork.introduction} locale={locale} />
            </p>
          </div>
          <ul className={styles.projectList}>
            {selectedWork.projects.map((project) => (
              <ProjectCard
                key={project.id}
                publicationStatus={project.publicationStatus}
                status={localize(project.status, locale)}
                title={localizeResponsive(project.title, locale)}
                summary={localizeResponsive(project.summary, locale)}
                scope={localize(project.scope, locale)}
                action={localize(project.action, locale)}
                href={project.repositoryUrl}
              />
            ))}
          </ul>
        </section>

        <section id={homeAnchors.experience} className={`${styles.section} ${styles.experience}`} aria-labelledby="experience-heading">
          <p className={styles.eyebrow}>
            <ResponsiveText value={experience.eyebrow} locale={locale} />
          </p>
          <h2 id="experience-heading" className={styles.title2}>
            <ResponsiveText value={experience.title} locale={locale} />
          </h2>
          <p className={styles.body2}>
            <ResponsiveText value={experience.body} locale={locale} />
          </p>
        </section>

        <section id={homeAnchors.method} className={`${styles.section} ${styles.method}`} aria-labelledby="method-heading">
          <p className={styles.eyebrow}>{localize(method.eyebrow, locale)}</p>
          <h2 id="method-heading" className={styles.title2}>
            <ResponsiveText value={method.title} locale={locale} />
          </h2>
          <ol className={styles.stepList}>
            {method.steps.map((step) => (
              <ProcessStep
                key={step.index}
                index={step.index}
                title={localize(step.title, locale)}
                description={localizeResponsive(step.description, locale)}
              />
            ))}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.closing}`} aria-labelledby="closing-heading">
          <h2 id="closing-heading" className={styles.title2}>
            <ResponsiveText value={closing.title} locale={locale} />
          </h2>
          <p className={styles.body2}>
            <ResponsiveText value={closing.body} locale={locale} />
          </p>
          <ButtonLink href={getRoutePath("contact", locale)} variant="secondary">
            {localize(closing.cta, locale)}
          </ButtonLink>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
