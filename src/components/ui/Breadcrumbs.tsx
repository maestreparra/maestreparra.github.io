import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbsProps {
  ariaLabel: string;
  /** Localized parent-crumb label ("Proyectos" / "Work"), linked to Work. */
  parentLabel: string;
  parentHref: string;
  /** Localized current-case label, marked `aria-current="page"`. */
  currentLabel: string;
  /** Visual separator between parent and current, matching the frozen mono treatment. */
  separator?: string;
  /** Optional condensed mobile variant of the current-case label (P9 Correction Attempt 2, QA-01). */
  currentLabelMobile?: string;
}

/**
 * A functional breadcrumb: the parent crumb is a real link to the localized
 * Work index, and the current crumb carries `aria-current="page"` — a
 * navigation landmark containing only plain text is not a breadcrumb
 * (P9-QA-03). The single-line mono visual treatment and separator are
 * preserved from the frozen Figma composition.
 */
export function Breadcrumbs({ ariaLabel, parentLabel, parentHref, currentLabel, separator = "/", currentLabelMobile }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumb} aria-label={ariaLabel}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <a className={styles.link} href={parentHref}>
            {parentLabel}
          </a>
        </li>
        <li className={styles.item} aria-hidden="true">
          {separator}
        </li>
        <li className={styles.item}>
          <span className={styles.current} aria-current="page">
            {currentLabelMobile !== undefined ? (
              <>
                <span className="u-mobile-only">{currentLabelMobile}</span>
                <span className="u-desktop-only">{currentLabel}</span>
              </>
            ) : (
              currentLabel
            )}
          </span>
        </li>
      </ol>
    </nav>
  );
}
