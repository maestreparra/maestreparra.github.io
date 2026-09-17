import type { Metadata } from "next";
import { WorkIndexTemplate } from "@/components/core/WorkIndexTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { assertPublishableProjects } from "@/lib/publication";

export const metadata: Metadata = buildRouteMetadata("work", "en");

export default function WorkEnPage() {
  assertPublishableProjects();
  return <WorkIndexTemplate locale="en" />;
}
