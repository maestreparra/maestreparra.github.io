import type { ReactNode } from "react";
import styles from "./EvidenceDisclosure.module.css";

export interface EvidenceDisclosureProps {
  collapsedLabel: string;
  expandedLabel: string;
  children: ReactNode;
}

/**
 * Progressive-disclosure wrapper for additional evidence (P13, Section 8.1).
 * Uses native <details>/<summary> so the collapsed/expanded state, keyboard
 * operation, and focus handling all come from browser semantics rather than
 * custom JS — no route change, no modal, no client-side persistence,
 * analytics, or network side effects. Content stays server-rendered inside
 * the DOM at all times; only its visibility is toggled, so nothing is
 * deleted to shorten the page.
 */
export function EvidenceDisclosure({ collapsedLabel, expandedLabel, children }: EvidenceDisclosureProps) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <span className={styles.collapsedLabel}>{collapsedLabel}</span>
        <span className={styles.expandedLabel}>{expandedLabel}</span>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
