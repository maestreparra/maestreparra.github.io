import type { Metadata } from "next";
import { getHomePath } from "@/i18n/routes";
import { resolverMetadata } from "@/lib/metadata";

export const metadata: Metadata = resolverMetadata;

/**
 * Static x-default resolver. No cookies, no storage, no server logic: an
 * inline script performs the immediate client-side navigation, and the
 * visible links below are the real no-JavaScript fallback.
 */
export default function LocaleRootPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(getHomePath("es"))});`,
        }}
      />
      <p>
        <a href={getHomePath("es")}>Ir al inicio en español</a>
        {" · "}
        <a href={getHomePath("en")}>Go to English home</a>
      </p>
    </>
  );
}
