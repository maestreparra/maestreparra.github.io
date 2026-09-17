import { Suspense } from "react";
import type { Locale } from "@/i18n/locales";
import { getRoutePath, primaryNavigationRouteKeys, type PrimaryNavigationRouteKey, type PublicRouteKey } from "@/i18n/routes";
import { homeContent, localize } from "@/content/home";
import { LocaleSwitchLink } from "./LocaleSwitchLink";
import styles from "./SiteHeader.module.css";

export interface SiteHeaderProps {
  locale: Locale;
  /** The route currently rendering this header, used for aria-current and locale-equivalent switching. */
  currentRouteKey: PublicRouteKey;
}

function NavItems({ locale, currentRouteKey }: { locale: Locale; currentRouteKey: PublicRouteKey }) {
  const { nav } = homeContent;
  const isEs = locale === "es";
  const navLabels: Record<PrimaryNavigationRouteKey, typeof nav.home> = {
    home: nav.home,
    work: nav.work,
    about: nav.about,
  };

  return (
    <>
      <ul className={styles.navList}>
        {primaryNavigationRouteKeys.map((routeKey) => {
          const isActive = routeKey === currentRouteKey;
          return (
            <li key={routeKey}>
              <a
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                href={getRoutePath(routeKey, locale)}
                aria-current={isActive ? "page" : undefined}
              >
                {localize(navLabels[routeKey], locale)}
              </a>
            </li>
          );
        })}
      </ul>
      <div className={styles.localeGroup} aria-label={isEs ? "Selector de idioma" : "Language switch"}>
        <Suspense fallback={<a className={styles.localeLink} href={getRoutePath(currentRouteKey, "es")}>ES</a>}>
          <LocaleSwitchLink
            targetLocale="es"
            label="ES"
            routeKey={currentRouteKey}
            className={locale === "es" ? `${styles.localeLink} ${styles.localeLinkActive}` : styles.localeLink}
          />
        </Suspense>
        <span aria-hidden="true">/</span>
        <Suspense fallback={<a className={styles.localeLink} href={getRoutePath(currentRouteKey, "en")}>EN</a>}>
          <LocaleSwitchLink
            targetLocale="en"
            label="EN"
            routeKey={currentRouteKey}
            className={locale === "en" ? `${styles.localeLink} ${styles.localeLinkActive}` : styles.localeLink}
          />
        </Suspense>
      </div>
      <a
        className={styles.talkButton}
        href={getRoutePath("contact", locale)}
        aria-current={currentRouteKey === "contact" ? "page" : undefined}
      >
        {localize(nav.contactCta, locale)}
      </a>
    </>
  );
}

export function SiteHeader({ locale, currentRouteKey }: SiteHeaderProps) {
  const { brandName } = homeContent;
  const isEs = locale === "es";
  const navLabel = isEs ? "Navegación principal" : "Primary navigation";

  return (
    <header className={styles.header}>
      <a className={styles.brand} href={getRoutePath("home", locale)}>
        {brandName}
      </a>

      {/*
        Two independent nav renderings, toggled purely by the min-width:768px
        media query in SiteHeader.module.css — never both visible/focusable
        at once. A <details> disclosure below the breakpoint reproduces the
        Figma mobile "ES/EN · Menu" affordance with no JavaScript; Chromium
        implements collapsed <details> content as content-visibility (not a
        plain `display: none`), which cannot be forced open again with CSS,
        so the desktop layout uses a separate, always-in-flow <nav> instead
        of trying to force the same disclosure open above the breakpoint.
      */}
      <details className={styles.mobileNavDisclosure}>
        <summary className={styles.navSummary} aria-label={isEs ? "Abrir menú" : "Open menu"}>
          <span className={styles.localeGroupCompact}>ES / EN</span>
          <span>{isEs ? "Menú" : "Menu"}</span>
        </summary>
        <nav className={styles.mobileNav} aria-label={navLabel}>
          <NavItems locale={locale} currentRouteKey={currentRouteKey} />
        </nav>
      </details>

      <nav className={styles.desktopNav} aria-label={navLabel}>
        <NavItems locale={locale} currentRouteKey={currentRouteKey} />
      </nav>
    </header>
  );
}
