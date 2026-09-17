import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildCaseStudyStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("vitalink", "en");

export default function VitaLinkEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildCaseStudyStructuredData("vitalink", "en") }}
      />
      <CaseStudyTemplate caseId="vitalink" locale="en" />
    </>
  );
}
