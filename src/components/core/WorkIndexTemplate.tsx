import type { Locale } from "@/i18n/locales";
import { localize } from "@/content/home";
import { workContent } from "@/content/core-pages";
import { getRoutePath } from "@/i18n/routes";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { StatusLabel } from "@/components/ui/StatusLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./WorkIndexTemplate.module.css";

export interface WorkIndexTemplateProps {
  locale: Locale;
}

export function WorkIndexTemplate({ locale }: WorkIndexTemplateProps) {
  const isEs = locale === "es";
  const c = workContent;

  return (
    <>
      <a className="skip-link" href="#main-content">
        {isEs ? "Saltar al contenido principal" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale} currentRouteKey="work" />
      <main id="main-content">
        <section className={styles.section}>
          <div className={styles.inner}>
            <PageHero
              headingId="work-heading"
              eyebrow={localize(c.eyebrow, locale)}
              title={localize(c.title, locale)}
              introduction={localize(c.introduction, locale)}
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="index-heading">
          <div className={styles.inner}>
            <h2 id="index-heading" className={styles.heading}>
              {localize(c.indexHeading, locale)}
            </h2>
            <p className={styles.body}>{localize(c.indexBody, locale)}</p>
            <ul className={styles.projectGrid}>
              {c.projects.map((project) => {
                const title = localize(project.title, locale);
                const summary = localize(project.summary, locale);
                const internal = Boolean(project.caseStudyRouteKey);
                const href = project.caseStudyRouteKey
                  ? getRoutePath(project.caseStudyRouteKey, locale)
                  : project.repositoryUrl;
                return (
                  <ProjectCard
                    key={project.id}
                    publicationStatus={project.publicationStatus}
                    status={localize(project.status, locale)}
                    title={{ desktop: title, mobile: title }}
                    summary={{ desktop: summary, mobile: summary }}
                    scope={localize(project.scope, locale)}
                    action={localize(project.action, locale)}
                    href={href}
                    internal={internal}
                  />
                );
              })}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="legend-heading">
          <div className={styles.legend}>
            <h2 id="legend-heading" className={styles.heading}>
              {localize(c.legendHeading, locale)}
            </h2>
            <div className={styles.legendItems}>
              <div className={styles.legendItem}>
                <StatusLabel label={localize(c.legendPublished.label, locale)} />
                <p className={styles.legendDescription}>{localize(c.legendPublished.description, locale)}</p>
              </div>
              <div className={styles.legendItem}>
                <StatusLabel label={localize(c.legendFinalRefinement.label, locale)} />
                <p className={styles.legendDescription}>{localize(c.legendFinalRefinement.description, locale)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.contactCta}>
            <h2 className={styles.heading}>{localize(c.contactCtaTitle, locale)}</h2>
            <p className={styles.body}>{localize(c.contactCtaBody, locale)}</p>
            <ButtonLink href={getRoutePath("contact", locale)} variant="secondary">
              {localize(c.contactCtaButton, locale)}
            </ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
