import type { Locale } from "./locales";

export const siteOrigin = "https://maestreparra.github.io";

export function getAbsoluteUrl(path: string): string {
  return `${siteOrigin}${path}`;
}

/**
 * The single typed registry for every public, indexable route. Each key
 * owns its localized paths and template so navigation, locale switching,
 * and metadata all reference one source instead of ad-hoc strings.
 */
export type PublicRouteKey = "home" | "about" | "work" | "contact" | "vitalink" | "bm-envios";

export interface PublicRouteEntry {
  key: PublicRouteKey;
  paths: Record<Locale, string>;
  indexable: true;
  template: "home" | "editorial-profile" | "project-index" | "contact-links" | "case-study";
}

export const publicRoutes: Record<PublicRouteKey, PublicRouteEntry> = {
  home: {
    key: "home",
    paths: { es: "/es/", en: "/en/" },
    indexable: true,
    template: "home",
  },
  about: {
    key: "about",
    paths: { es: "/es/sobre-mi/", en: "/en/about/" },
    indexable: true,
    template: "editorial-profile",
  },
  work: {
    key: "work",
    paths: { es: "/es/proyectos/", en: "/en/work/" },
    indexable: true,
    template: "project-index",
  },
  contact: {
    key: "contact",
    paths: { es: "/es/contacto/", en: "/en/contact/" },
    indexable: true,
    template: "contact-links",
  },
  vitalink: {
    key: "vitalink",
    paths: { es: "/es/proyectos/vitalink-digital-ecosystem/", en: "/en/work/vitalink-digital-ecosystem/" },
    indexable: true,
    template: "case-study",
  },
  "bm-envios": {
    key: "bm-envios",
    paths: { es: "/es/proyectos/bm-envios-digital-experience/", en: "/en/work/bm-envios-digital-experience/" },
    indexable: true,
    template: "case-study",
  },
};

export const publicRouteKeys = Object.keys(publicRoutes) as PublicRouteKey[];

/**
 * The primary-navigation subset of publicRoutes (Architecture Amendment 1).
 * Contact renders separately as its own CTA, and the two Case Study routes
 * are reachable from Work cards and case-study internal links, not from the
 * global Header — this keeps that navigation-only distinction typed instead
 * of relying on `Exclude<PublicRouteKey, "contact">`, which silently drifts
 * every time a new non-navigation public route is added to the registry.
 */
export const primaryNavigationRouteKeys = ["home", "work", "about"] as const satisfies readonly PublicRouteKey[];

export type PrimaryNavigationRouteKey = (typeof primaryNavigationRouteKeys)[number];

export function getRoutePath(routeKey: PublicRouteKey, locale: Locale): string {
  return publicRoutes[routeKey].paths[locale];
}

/**
 * Builds the equivalent URL for any public route in the target locale,
 * preserving the query string and fragment.
 */
export function buildRouteSwitchHref(
  routeKey: PublicRouteKey,
  targetLocale: Locale,
  currentSearch: string,
  currentHash: string,
): string {
  return `${getRoutePath(routeKey, targetLocale)}${currentSearch}${currentHash}`;
}

/**
 * Convenience delegate to the "home" entry of the single route registry.
 * Kept as a named helper because the root resolver and the bilingual 404
 * (both outside this correction's allowlist) call it directly.
 */
export function getHomePath(locale: Locale): string {
  return getRoutePath("home", locale);
}

/**
 * Home anchor targets for in-page sections that have no standalone route
 * (e.g. Home's Experience section, or Home's own internal navigation
 * before a section has its own page). This registry is intentionally
 * separate from publicRoutes: an anchor is a fragment on an existing route,
 * not a route of its own.
 */
export const homeAnchors = {
  hero: "hero",
  selectedWork: "selected-work",
  experience: "experience",
  method: "method",
  footer: "footer",
} as const;

export type HomeAnchorKey = keyof typeof homeAnchors;

export function getHomeAnchorHref(locale: Locale, anchor: HomeAnchorKey): string {
  return `${getHomePath(locale)}#${homeAnchors[anchor]}`;
}

/** Home's #experience anchor, reachable from any page (no standalone route). */
export function getHomeExperienceAnchorHref(locale: Locale): string {
  return getHomeAnchorHref(locale, "experience");
}
