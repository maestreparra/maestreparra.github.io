import type { Metadata } from "next";
import { AboutTemplate } from "@/components/core/AboutTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildAboutStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("about", "en");

export default function AboutEnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildAboutStructuredData("en") }}
      />
      <AboutTemplate locale="en" />
    </>
  );
}
