import type { Metadata } from "next";
import { DerivedEvidenceCaseStudyTemplate } from "@/components/case-study/DerivedEvidenceCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildDerivedEvidenceCaseStudyStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("meeco", "en");

export default function MeecoEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildDerivedEvidenceCaseStudyStructuredData("meeco", "en") }}
      />
      <DerivedEvidenceCaseStudyTemplate caseId="meeco" locale="en" />
    </>
  );
}
