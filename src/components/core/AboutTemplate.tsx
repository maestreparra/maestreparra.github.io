import type { Locale } from "@/i18n/locales";
import { localize } from "@/content/home";
import { aboutContent } from "@/content/core-pages";
import { getRoutePath } from "@/i18n/routes";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { CapabilityItem } from "@/components/ui/CapabilityItem";
import { ExperienceEntry } from "@/components/ui/ExperienceEntry";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./AboutTemplate.module.css";

export interface AboutTemplateProps {
  locale: Locale;
}

export function AboutTemplate({ locale }: AboutTemplateProps) {
  const isEs = locale === "es";
  const c = aboutContent;

  return (
    <>
      <a className="skip-link" href="#main-content">
        {isEs ? "Saltar al contenido principal" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale} currentRouteKey="about" />
      <main id="main-content">
        <section className={styles.section}>
          <div className={styles.inner}>
            <PageHero
              headingId="about-heading"
              eyebrow={localize(c.eyebrow, locale)}
              title={localize(c.title, locale)}
              introduction={localize(c.introduction, locale)}
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="perspective-heading">
          <div className={styles.inner}>
            <h2 id="perspective-heading" className={styles.heading}>
              {localize(c.perspectiveHeading, locale)}
            </h2>
            <p className={styles.body}>{localize(c.perspectiveBody, locale)}</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="capabilities-heading">
          <div className={styles.inner}>
            <h2 id="capabilities-heading" className={styles.heading}>
              {localize(c.capabilitiesHeading, locale)}
            </h2>
            <ul className={styles.capabilityGrid}>
              {c.capabilities.map((capability) => (
                <CapabilityItem key={capability.id} label={localize(capability.label, locale)} />
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="experience-heading">
          <div className={styles.inner}>
            <h2 id="experience-heading" className={styles.heading}>
              {localize(c.experienceHeading, locale)}
            </h2>
            <ul className={styles.experienceGrid}>
              {c.experience.map((entry) => (
                <ExperienceEntry
                  key={entry.id}
                  company={localize(entry.company, locale)}
                  role={localize(entry.role, locale)}
                  summary={localize(entry.summary, locale)}
                />
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.principle}>
            <h2 className={styles.heading}>{localize(c.principleTitle, locale)}</h2>
            <p className={styles.body}>{localize(c.principleBody, locale)}</p>
            <ButtonLink href={getRoutePath("contact", locale)} variant="secondary">
              {localize(c.principleCta, locale)}
            </ButtonLink>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
