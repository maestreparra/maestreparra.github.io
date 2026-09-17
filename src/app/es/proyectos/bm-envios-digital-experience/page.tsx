import type { Metadata } from "next";
import { CaseStudyTemplate } from "@/components/case-study/CaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildCaseStudyStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("bm-envios", "es");

export default function BmEnviosEsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildCaseStudyStructuredData("bm-envios", "es") }}
      />
      <CaseStudyTemplate caseId="bm-envios" locale="es" />
    </>
  );
}
