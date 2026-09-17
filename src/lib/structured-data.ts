import type { Locale } from "@/i18n/locales";
import { getAbsoluteUrl, getRoutePath } from "@/i18n/routes";
import { homeContent, localize } from "@/content/home";
import { caseStudies, type CaseStudyId } from "@/content/case-studies";

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

/**
 * CreativeWork only, per the P9 contract (Section 15): no Product, Service,
 * Offer, Review, rating, or client Organization schema. Every field is an
 * approved public fact already rendered on the page (title, introduction,
 * canonical URL, and the byline).
 */
export function buildCaseStudyStructuredData(caseId: CaseStudyId, locale: Locale): string {
  const c = caseStudies[caseId];
  const url = getAbsoluteUrl(getRoutePath(caseId, locale));

  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: localize(c.title, locale),
    description: localize(c.introduction, locale),
    url,
    inLanguage: locale,
    dateModified: "2026-09-17",
    author: {
      "@type": "Person",
      name: homeContent.brandName,
    },
  };

  return JSON.stringify(data).replace(/</g, "\\u003c");
}
