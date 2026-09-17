import styles from "./ContactLink.module.css";

export interface ContactLinkProps {
  label: string;
  detail: string;
  href: string;
}

export function ContactLink({ label, detail, href }: ContactLinkProps) {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noreferrer noopener" aria-label={`${label} — ${detail}`}>
      <span className={styles.copy}>
        <span className={styles.label}>{label}</span>
        <span className={styles.detail}>{detail}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </a>
  );
}
