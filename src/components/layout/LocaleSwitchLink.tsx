"use client";

import { useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { buildRouteSwitchHref, type PublicRouteKey } from "@/i18n/routes";

export interface LocaleSwitchLinkProps {
  targetLocale: Locale;
  label: string;
  className?: string;
  /** The current page's route key, so the switch lands on its locale equivalent. Defaults to "home". */
  routeKey?: PublicRouteKey;
}

/**
 * A plain <a>, not next/link: every locale pair is a separate static root
 * layout (different <html lang>), so this must always be a full navigation.
 * Using Link's client-side transition/prefetch would fetch the destination's
 * RSC payload as a network side effect and leave the previous <html lang> in
 * place, which the QA matrix's "no network side effects" and "locale
 * identified programmatically" checks both forbid.
 */
export function LocaleSwitchLink({ targetLocale, label, className, routeKey = "home" }: LocaleSwitchLinkProps) {
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  const href = buildRouteSwitchHref(routeKey, targetLocale, search ? `?${search}` : "", hash);

  return (
    <a href={href} className={className} hrefLang={targetLocale} lang={targetLocale}>
      {label}
    </a>
  );
}
