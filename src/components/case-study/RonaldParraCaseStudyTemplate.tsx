import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import { localize } from "@/content/home";
import { ronaldParraCaseContent } from "@/content/ronald-parra";
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
import styles from "./RonaldParraCaseStudyTemplate.module.css";

export interface RonaldParraCaseStudyTemplateProps {
  locale: Locale;
}

export function RonaldParraCaseStudyTemplate({ locale }: RonaldParraCaseStudyTemplateProps) {
  const isEs = locale === "es";
  const c = ronaldParraCaseContent;

  return (
    <>
      <a className="skip-link" href="#main-content">
        {isEs ? "Saltar al contenido principal" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale} currentRouteKey="ronald-parra" />
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
              headingId="ronald-parra-case-heading"
              eyebrow={localize(c.eyebrow, locale)}
              title={localize(c.title, locale)}
              introduction={localize(c.introduction, locale)}
            />
            <div className={styles.snapshot}>
              <p className={styles.label}>{localize(c.roleLabel, locale)}</p>
              <p className={styles.role}>{localize(c.role, locale)}</p>
              <p className={styles.scope}>{localize(c.scope, locale)}</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="ronald-context-heading">
          <div className={styles.inner}>
            <p className={styles.label}>{localize(c.contextLabel, locale)}</p>
            <div className={styles.contextGrid}>
              <article className={`${styles.contextCard} ${styles.contextCardInverse}`}>
                <h2 id="ronald-context-heading" className={styles.cardTitle}>
                  {localize(c.challengeTitle, locale)}
                </h2>
                <p className={styles.cardBody}>{localize(c.challengeBody, locale)}</p>
              </article>
              <article className={styles.contextCard}>
                <h2 className={styles.cardTitle}>{localize(c.responsibilityTitle, locale)}</h2>
                <p className={styles.cardBody}>{localize(c.responsibilityBody, locale)}</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="ronald-decisions-heading">
          <div className={styles.inner}>
            <p className={styles.label}>{localize(c.decisionsLabel, locale)}</p>
            <h2 id="ronald-decisions-heading" className={styles.heading}>
              {localize(c.decisionsTitle, locale)}
            </h2>
            <DecisionList
              decisions={c.decisions.map((decision) => ({
                title: localize(decision.title, locale),
                body: localize(decision.body, locale),
              }))}
            />
          </div>
        </section>

        <section className={`${styles.section} ${styles.phaseSection}`} aria-labelledby="ronald-phases-heading">
          <div className={styles.inner}>
            <p className={styles.label}>{localize(c.phasesLabel, locale)}</p>
            <h2 id="ronald-phases-heading" className={styles.heading}>
              {localize(c.phasesTitle, locale)}
            </h2>
            <p className={styles.body}>{localize(c.phasesIntro, locale)}</p>
            <ol className={styles.phaseGrid}>
              {c.phases.map((phase) => (
                <li className={styles.phaseCard} key={phase.index}>
                  <span className={styles.phaseIndex} aria-hidden="true">
                    {phase.index}
                  </span>
                  <h3 className={styles.phaseTitle}>{localize(phase.title, locale)}</h3>
                  <p className={styles.phaseBody}>{localize(phase.body, locale)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="ronald-evidence-heading">
          <div className={styles.inner}>
            <p className={styles.label}>{localize(c.evidenceLabel, locale)}</p>
            <h2 id="ronald-evidence-heading" className={styles.heading}>
              {localize(c.evidenceTitle, locale)}
            </h2>
            <p className={styles.body}>{localize(c.evidenceIntro, locale)}</p>
            <div className={styles.evidenceGrid}>
              {c.evidence.map((evidence, index) => (
                <figure className={styles.evidenceCard} key={evidence.id}>
                  <h3 className={styles.evidenceTitle}>
                    <span className={styles.figureNumber}>
                      {evidence.id} · {String(index + 1).padStart(2, "0")}/{String(c.evidence.length).padStart(2, "0")}
                    </span>
                    {localize(evidence.title, locale)}
                  </h3>
                  <div
                    className={`${styles.imageFrame} ${
                      evidence.presentation === "scroll" ? styles.imageFrameScroll : styles.imageFrameContain
                    }`}
                    tabIndex={evidence.presentation === "scroll" ? 0 : undefined}
                    role={evidence.presentation === "scroll" ? "group" : undefined}
                    aria-label={evidence.presentation === "scroll" ? localize(evidence.alt, locale) : undefined}
                  >
                    <Image
                      src={evidence.src}
                      alt={localize(evidence.alt, locale)}
                      width={evidence.width}
                      height={evidence.height}
                      className={styles.evidenceImage}
                      sizes="(max-width: 767px) 100vw, 560px"
                    />
                  </div>
                  <figcaption className={styles.evidenceCaption}>
                    <p>{localize(evidence.caption, locale)}</p>
                    <p className={styles.provenance}>{localize(evidence.provenance, locale)}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <aside className={styles.attribution} aria-labelledby="ronald-attribution-heading">
              <p className={styles.attributionEyebrow}>{isEs ? "ATRIBUCIÓN EXPLÍCITA" : "EXPLICIT ATTRIBUTION"}</p>
              <h3 id="ronald-attribution-heading" className={styles.attributionTitle}>
                {localize(c.attributionTitle, locale)}
              </h3>
              <p className={styles.attributionBody}>{localize(c.attributionBody, locale)}</p>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="ronald-facts-heading">
          <div className={styles.inner}>
            <h2 id="ronald-facts-heading" className={styles.label}>
              {localize(c.factsLabel, locale)}
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
              <p className={styles.outcomeLabel}>{localize(c.outcomeLabel, locale)}</p>
              <h2 className={styles.outcomeTitle}>{localize(c.outcomeTitle, locale)}</h2>
              <p className={styles.outcomeBody}>{localize(c.outcomeBody, locale)}</p>
            </div>
            <LimitationsPanel title={localize(c.limitationsTitle, locale)} body={localize(c.limitationsBody, locale)} />
            <ExternalLinkGroup
              title={localize(c.linksTitle, locale)}
              body={localize(c.linksBody, locale)}
              actions={[
                {
                  label: isEs ? "Ver website" : "View website",
                  href: "https://ronaldparra.com/",
                  variant: "primary",
                  external: true,
                },
                {
                  label: isEs ? "Abrir simulador" : "Open simulator",
                  href: "https://app.ronaldparra.com/",
                  variant: "secondary",
                  external: true,
                },
                {
                  label: isEs ? "Volver a proyectos" : "Back to work",
                  href: getRoutePath("work", locale),
                  variant: "secondary",
                  external: false,
                },
              ]}
            />
            <p className={styles.disclosure}>{localize(c.disclosure, locale)}</p>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
