import type { LocalizedValue } from "./home";
import type { RealEvidenceSlide, LicendiMeecoDecision, LicendiMeecoFact, LicendiMeecoAction } from "./licendi-meeco";

/**
 * Real evidence for a single-founder-authorized engagement with no
 * research/brand audit deck and no mobile exports: an optional brand slide
 * (usually the product wordmark — PilotOrb has one, the anonymized AppliedXL
 * case has none) plus a flat list of product screens.
 */
export interface SingleFlowRealEvidence {
  brandSectionLabel?: LocalizedValue;
  brandSlides?: RealEvidenceSlide[];
  productSectionLabel: LocalizedValue;
  productSlides: RealEvidenceSlide[];
}

/**
 * Shared shape for a documented case study whose evidence is a single real
 * product flow (no mobile/desktop pairing, no research/brand deck) and whose
 * only action is an internal "back to Work" link, since the product has no
 * verifiable public reference site.
 */
export interface SingleFlowCaseContent {
  breadcrumbParent: LocalizedValue;
  breadcrumbCurrent: LocalizedValue;
  statusLabel: LocalizedValue;
  eyebrow: LocalizedValue;
  title: LocalizedValue;
  introduction: LocalizedValue;
  roleLabel: LocalizedValue;
  role: LocalizedValue;
  scope: LocalizedValue;
  challengeSectionLabel: LocalizedValue;
  challengeTitle: LocalizedValue;
  challengeBody: LocalizedValue;
  responsibilityTitle: LocalizedValue;
  responsibilityBody: LocalizedValue;
  processSectionLabel: LocalizedValue;
  processTitle: LocalizedValue;
  decisions: LicendiMeecoDecision[];
  evidenceSectionLabel: LocalizedValue;
  evidenceTitle: LocalizedValue;
  evidenceIntro: LocalizedValue;
  realEvidence: SingleFlowRealEvidence;
  factsSectionLabel: LocalizedValue;
  facts: LicendiMeecoFact[];
  outcomeLabel: LocalizedValue;
  outcomeTitle: LocalizedValue;
  outcomeBody: LocalizedValue;
  limitationsTitle: LocalizedValue;
  limitationsBody: LocalizedValue;
  linksTitle: LocalizedValue;
  linksBody: LocalizedValue;
  actions: LicendiMeecoAction[];
  disclosure: LocalizedValue;
}
