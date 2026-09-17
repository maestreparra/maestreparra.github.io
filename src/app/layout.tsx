import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maestreparra.github.io"),
};

/**
 * next/font/google downloads and self-hosts these families at build time —
 * the static export makes no runtime request to Google Fonts. Weights match
 * the tokens actually used in styles/tokens.css (Manrope 400/500/600/700,
 * IBM Plex Mono 500).
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

/**
 * Single root layout for the whole static export. The <html lang> is fixed
 * at build time to "es" (the default locale, D-005); the postbuild script
 * (scripts/fix-locale-lang.mjs) rewrites it to "en" on the generated
 * /en/ output only, since Next's App Router has no per-route root layout
 * mechanism that avoids duplicate/nested <html> tags in a static export.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
