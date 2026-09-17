import styles from "./ButtonLink.module.css";

export interface ButtonLinkProps {
  href: string;
  children: string;
  variant?: "primary" | "secondary";
  className?: string;
}

/**
 * Every href in this slice is either an external profile link or an
 * in-page anchor on the current locale's Home — never a different Next.js
 * route — so a plain <a> is used throughout. next/link's prefetch would
 * otherwise fetch the current route's RSC payload as an avoidable network
 * side effect.
 */
export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const variantClass = variant === "secondary" ? styles.secondary : styles.primary;
  const classes = [styles.button, variantClass, className].filter(Boolean).join(" ");
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a href={href} className={classes} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer noopener" : undefined}>
      {children}
    </a>
  );
}
