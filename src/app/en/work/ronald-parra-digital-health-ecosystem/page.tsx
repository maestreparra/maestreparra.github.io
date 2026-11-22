import type { Metadata } from "next";
import { RonaldParraCaseStudyTemplate } from "@/components/case-study/RonaldParraCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildRonaldParraCaseStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("ronald-parra", "en");

export default function RonaldParraEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildRonaldParraCaseStructuredData("en") }}
      />
      <RonaldParraCaseStudyTemplate locale="en" />
    </>
  );
}
