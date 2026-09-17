import type { Locale } from "@/i18n/locales";
import { homeContent, localize, type FooterLink } from "@/content/home";
import { homeAnchors, getRoutePath, getHomeAnchorHref } from "@/i18n/routes";
import styles from "./SiteFooter.module.css";

export interface SiteFooterProps {
  locale: Locale;
}

function resolveFooterHref(link: FooterLink, locale: Locale): string {
  if (link.routeKey) {
    return getRoutePath(link.routeKey, locale);
  }
  if (link.homeAnchor) {
    return getHomeAnchorHref(locale, link.homeAnchor);
  }
  // External links always carry an explicit href.
  return link.href as string;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const { footer, brandName } = homeContent;

  return (
    <footer className={styles.footer} id={homeAnchors.footer}>
      <div className={styles.top}>
        <p className={styles.brand}>{brandName}</p>
        <ul className={styles.links}>
          {footer.links.map((link) => (
            <li key={link.id}>
              <a
                className={styles.link}
                href={resolveFooterHref(link, locale)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
              >
                {localize(link.label, locale)}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.meta}>
        <span>{localize(footer.tagline, locale)}</span>
        <span aria-hidden="true">·</span>
        <span>{localize(footer.copyright, locale)}</span>
      </p>
    </footer>
  );
}
