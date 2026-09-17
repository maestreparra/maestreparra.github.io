import type { Metadata } from "next";
import { ContactTemplate } from "@/components/core/ContactTemplate";
import { buildRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildRouteMetadata("contact", "es");

export default function ContactEsPage() {
  return <ContactTemplate locale="es" />;
}
