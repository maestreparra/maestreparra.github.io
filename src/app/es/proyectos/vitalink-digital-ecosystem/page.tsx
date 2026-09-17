import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildCaseStudyStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("vitalink", "es");

export default function VitaLinkEsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildCaseStudyStructuredData("vitalink", "es") }}
      />
      <CaseStudyTemplate caseId="vitalink" locale="es" />
    </>
  );
}
