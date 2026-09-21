import type { Metadata } from "next";
import { DerivedEvidenceCaseStudyTemplate } from "@/components/case-study/DerivedEvidenceCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildDerivedEvidenceCaseStudyStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("meeco", "es");

export default function MeecoEsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildDerivedEvidenceCaseStudyStructuredData("meeco", "es") }}
      />
      <DerivedEvidenceCaseStudyTemplate caseId="meeco" locale="es" />
    </>
  );
}
