import type { Locale } from "@/i18n/locales";
import { getAbsoluteUrl, getRoutePath } from "@/i18n/routes";
import { homeContent } from "@/content/home";

/**
 * The approved public professional title (identical in both locales, per
 * homeContent.hero.eyebrow and the P2 SEO matrix) — not the editorial About
 * H1, which is marketing copy, not a job title fact.
 */
const APPROVED_JOB_TITLE = "Product Designer & UX Engineer";

/**
 * ProfilePage + a minimal Person entity, About-only per the P7 contract.
 * Every field is a fact already public in the approved content (name,
 * job title, About URL, and the three approved profile links) — no
 * unsupported claims, ratings, or organization/product schema.
 */
export function buildAboutStructuredData(locale: Locale): string {
  const aboutUrl = getAbsoluteUrl(getRoutePath("about", locale));

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-09-16",
    mainEntity: {
      "@type": "Person",
      name: homeContent.brandName,
      jobTitle: APPROVED_JOB_TITLE,
      url: aboutUrl,
      sameAs: [
        "https://www.linkedin.com/in/maestreparra/",
        "https://github.com/maestreparra",
        "https://www.behance.net/giomarmaestre/",
      ],
    },
  };

  // Escaping "<" prevents a literal "</script>" inside a JSON string value
  // from terminating the script context early.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
