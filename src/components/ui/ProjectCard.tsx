import type { PublicationStatus } from "@/content/home";
import styles from "./ProjectCard.module.css";

export interface ProjectCardProps {
  publicationStatus: PublicationStatus;
  status: string;
  title: { desktop: string; mobile: string };
  summary: { desktop: string; mobile: string };
  scope: string;
  action: string;
  href: string;
  /**
   * True for an internal case-study route: navigates in place with no
   * target/rel. False (the default) for an external repository link, which
   * opens safely in a new tab. Explicit rather than inferred from the URL
   * shape, per the P9 contract's Work-card migration boundary.
   */
  internal?: boolean;
}

function ResponsivePlain({ desktop, mobile }: { desktop: string; mobile: string }) {
  if (desktop === mobile) {
    return <>{desktop}</>;
  }
  return (
    <>
      <span className="u-mobile-only">{mobile}</span>
      <span className="u-desktop-only">{desktop}</span>
    </>
  );
}

export function ProjectCard({ publicationStatus, status, title, summary, scope, action, href, internal = false }: ProjectCardProps) {
  const isFinalRefinement = publicationStatus === "final-refinement";

  return (
    <li className={styles.card}>
      <div className={styles.signal} aria-hidden="true" />
      <p className={`${styles.status} ${isFinalRefinement ? styles.statusFinalRefinement : ""}`}>{status}</p>
      <h3 className={styles.title}>
        <ResponsivePlain desktop={title.desktop} mobile={title.mobile} />
      </h3>
      <p className={styles.summary}>
        <ResponsivePlain desktop={summary.desktop} mobile={summary.mobile} />
      </p>
      <p className={styles.scope}>{scope}</p>
      <a
        className={styles.action}
        href={href}
        target={internal ? undefined : "_blank"}
        rel={internal ? undefined : "noreferrer noopener"}
        aria-label={`${title.desktop} — ${action}`}
      >
        {action}
      </a>
    </li>
  );
}
