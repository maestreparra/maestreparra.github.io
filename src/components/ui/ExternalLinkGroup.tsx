import { ButtonLink } from "./ButtonLink";
import styles from "./ExternalLinkGroup.module.css";

export interface ExternalLinkGroupAction {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external: boolean;
}

export interface ExternalLinkGroupProps {
  title: string;
  body: string;
  actions: ExternalLinkGroupAction[];
}

/**
 * External actions get safe new-tab semantics; internal actions (e.g. the
 * Contact CTA) navigate in place, per the P9 contract's Work-card and
 * case-study link boundary (Section 14).
 */
export function ExternalLinkGroup({ title, body, actions }: ExternalLinkGroupProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.copy}>
        <p className={styles.title}>{title}</p>
        <p className={styles.body}>{body}</p>
      </div>
      <div className={styles.actions}>
        {actions.map((action) =>
          action.external ? (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noreferrer noopener"
              className={`${styles.button} ${action.variant === "primary" ? styles.primary : styles.secondary}`}
            >
              {action.label}
            </a>
          ) : (
            <ButtonLink key={action.label} href={action.href} variant={action.variant}>
              {action.label}
            </ButtonLink>
          ),
        )}
      </div>
    </div>
  );
}
