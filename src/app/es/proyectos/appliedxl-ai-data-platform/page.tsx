import type { Metadata } from "next";
import { AppliedXLCaseStudyTemplate } from "@/components/case-study/AppliedXLCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildAppliedXLStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("appliedxl", "es");

export default function AppliedXLEsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildAppliedXLStructuredData("es") }}
      />
      <AppliedXLCaseStudyTemplate locale="es" />
    </>
  );
}
