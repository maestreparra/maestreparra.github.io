import type { Metadata } from "next";
import { HomeTemplate } from "@/components/home/HomeTemplate";
import { buildRouteMetadata } from "@/lib/metadata";
import { assertPublishableProjects } from "@/lib/publication";

export const metadata: Metadata = buildRouteMetadata("home", "en");

export default function HomeEnPage() {
  assertPublishableProjects();
  return <HomeTemplate locale="en" />;
}
