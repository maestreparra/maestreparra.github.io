import type { Locale } from "@/i18n/locales";
import { getAbsoluteUrl, getRoutePath, type PublicRouteKey } from "@/i18n/routes";
import { homeContent, localize } from "@/content/home";
import { caseStudies, type CaseStudyId } from "@/content/case-studies";
import { licendiMeecoCaseStudies, type LicendiMeecoCaseId } from "@/content/licendi-meeco";
import type { SingleFlowCaseContent } from "@/content/single-flow-case";
import { pilotorbCaseContent } from "@/content/pilotorb";
import { appliedxlCaseContent } from "@/content/appliedxl";

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

/**
 * CreativeWork only, per the P5 contract: no Product, Service, Offer,
 * Organization, LocalBusiness, Review, or rating schema, and no client as
 * `publisher`. `isPartOf` references the portfolio site itself rather than
 * inventing an organization for either client.
 */
export function buildDerivedEvidenceCaseStudyStructuredData(caseId: LicendiMeecoCaseId, locale: Locale): string {
  const c = licendiMeecoCaseStudies[caseId];
  const url = getAbsoluteUrl(getRoutePath(caseId, locale));

  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: localize(c.title, locale),
    description: localize(c.introduction, locale),
    url,
    inLanguage: locale,
    dateModified: "2026-09-20",
    author: {
      "@type": "Person",
      name: homeContent.brandName,
    },
    isPartOf: {
      "@type": "WebSite",
      name: homeContent.brandName,
      url: getAbsoluteUrl("/"),
    },
  };

  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * CreativeWork only, matching the same schema boundary as
 * buildDerivedEvidenceCaseStudyStructuredData: no Product, Service, Offer,
 * Organization, LocalBusiness, Review, or rating schema, and no client as
 * `publisher`. Shared by PilotOrb and AppliedXL, which document early-stage
 * discovery/design engagements rather than shipped products, so no claim
 * about a live product is made beyond the portfolio site itself.
 */
function buildSingleFlowCaseStructuredData(routeKey: PublicRouteKey, content: SingleFlowCaseContent, locale: Locale): string {
  const url = getAbsoluteUrl(getRoutePath(routeKey, locale));

  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: localize(content.title, locale),
    description: localize(content.introduction, locale),
    url,
    inLanguage: locale,
    dateModified: "2026-09-20",
    author: {
      "@type": "Person",
      name: homeContent.brandName,
    },
    isPartOf: {
      "@type": "WebSite",
      name: homeContent.brandName,
      url: getAbsoluteUrl("/"),
    },
  };

  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildPilotOrbStructuredData(locale: Locale): string {
  return buildSingleFlowCaseStructuredData("pilotorb", pilotorbCaseContent, locale);
}

export function buildAppliedXLStructuredData(locale: Locale): string {
  return buildSingleFlowCaseStructuredData("appliedxl", appliedxlCaseContent, locale);
}
