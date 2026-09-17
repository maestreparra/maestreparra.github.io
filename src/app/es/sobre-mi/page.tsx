import type { Metadata } from "next";
import { AboutTemplate } from "@/components/core/AboutTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { buildAboutStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildRouteMetadata("about", "es");

export default function AboutEsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildAboutStructuredData("es") }}
      />
      <AboutTemplate locale="es" />
    </>
  );
}
