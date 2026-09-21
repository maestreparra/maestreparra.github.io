import type { Metadata } from "next";
import { DerivedEvidenceCaseStudyTemplate } from "@/components/case-study/DerivedEvidenceCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildDerivedEvidenceCaseStudyStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("licendi", "en");

export default function LicendiEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildDerivedEvidenceCaseStudyStructuredData("licendi", "en") }}
      />
      <DerivedEvidenceCaseStudyTemplate caseId="licendi" locale="en" />
    </>
  );
}
