import type { Metadata } from "next";
import { RonaldParraCaseStudyTemplate } from "@/components/case-study/RonaldParraCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildRonaldParraCaseStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("ronald-parra", "es");

export default function RonaldParraEsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildRonaldParraCaseStructuredData("es") }}
      />
      <RonaldParraCaseStudyTemplate locale="es" />
    </>
  );
}
