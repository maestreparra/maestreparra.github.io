import type { Metadata } from "next";
import { ContactTemplate } from "@/components/core/ContactTemplate";
import { buildRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildRouteMetadata("contact", "en");

export default function ContactEnPage() {
  return <ContactTemplate locale="en" />;
}
