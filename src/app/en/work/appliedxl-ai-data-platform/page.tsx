import type { Metadata } from "next";
import { AppliedXLCaseStudyTemplate } from "@/components/case-study/AppliedXLCaseStudyTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildAppliedXLStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("appliedxl", "en");

export default function AppliedXLEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildAppliedXLStructuredData("en") }}
      />
      <AppliedXLCaseStudyTemplate locale="en" />
    </>
  );
}
