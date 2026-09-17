import type { Metadata } from "next";
import { HomeTemplate } from "@/components/home/HomeTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { assertPublishableProjects } from "@/lib/publication";

export const metadata: Metadata = buildRouteMetadata("home", "es");

export default function HomeEsPage() {
  assertPublishableProjects();
  return <HomeTemplate locale="es" />;
}
