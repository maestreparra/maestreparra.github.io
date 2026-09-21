import type { Metadata } from "next";
import { PilotOrbCaseStudyTemplate } from "@/components/case-study/PilotOrbCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildPilotOrbStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("pilotorb", "es");

export default function PilotOrbEsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildPilotOrbStructuredData("es") }}
      />
      <PilotOrbCaseStudyTemplate locale="es" />
    </>
  );
}
