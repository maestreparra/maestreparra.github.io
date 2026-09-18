import type { Locale } from "@/i18n/locales";
import { localize } from "@/content/home";
import { contactContent } from "@/content/core-pages";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { ContactLink } from "@/components/ui/ContactLink";
import { DirectContactDialog } from "@/components/ui/DirectContactDialog";
import styles from "./ContactTemplate.module.css";

export interface ContactTemplateProps {
  locale: Locale;
}

export function ContactTemplate({ locale }: ContactTemplateProps) {
  const isEs = locale === "es";
  const c = contactContent;

  return (
    <>
      <a className="skip-link" href="#main-content">
        {isEs ? "Saltar al contenido principal" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale} currentRouteKey="contact" />
      <main id="main-content">
        <section className={styles.section}>
          <div className={styles.inner}>
            <PageHero
              headingId="contact-heading"
              eyebrow={localize(c.eyebrow, locale)}
              title={localize(c.title, locale)}
              introduction={localize(c.introduction, locale)}
              reserveMobileHeight
            />
          </div>
        </section>

        <section className={styles.linksSection} aria-labelledby="links-heading">
          <div className={styles.linksInner}>
            <h2 id="links-heading" className={styles.heading}>
              {localize(c.linksHeading, locale)}
            </h2>
            <p className={styles.body}>{localize(c.linksBody, locale)}</p>
            <div className={styles.linkGrid}>
              {c.links.map((link) => (
                <ContactLink
                  key={link.id}
                  label={localize(link.label, locale)}
                  detail={localize(link.detail, locale)}
                  href={link.href}
                />
              ))}
              <DirectContactDialog locale={locale} content={c.directContact} />
            </div>
          </div>
        </section>

        <section className={styles.privacySection}>
          <div className={styles.privacy}>
            <h2 className={styles.heading}>{localize(c.privacyHeading, locale)}</h2>
            <p className={styles.body}>{localize(c.privacyBody, locale)}</p>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
