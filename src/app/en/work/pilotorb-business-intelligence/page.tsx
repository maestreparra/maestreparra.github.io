import type { Metadata } from "next";
import { PilotOrbCaseStudyTemplate } from "@/components/case-study/PilotOrbCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildPilotOrbStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("pilotorb", "en");

export default function PilotOrbEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildPilotOrbStructuredData("en") }}
      />
      <PilotOrbCaseStudyTemplate locale="en" />
    </>
  );
}
