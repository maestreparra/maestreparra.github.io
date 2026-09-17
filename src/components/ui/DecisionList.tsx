import styles from "./DecisionList.module.css";

export interface DecisionListItem {
  title: string;
  body: string;
  /** Optional condensed mobile variants (P9 Correction Attempt 2, QA-01). */
  titleMobile?: string;
  bodyMobile?: string;
}

export interface DecisionListProps {
  decisions: DecisionListItem[];
}

export function DecisionList({ decisions }: DecisionListProps) {
  return (
    <ol className={styles.list}>
      {decisions.map((decision, index) => (
        <li className={styles.item} key={decision.title}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={styles.copy}>
            <span className={styles.title}>
              {decision.titleMobile !== undefined ? (
                <>
                  <span className="u-mobile-only">{decision.titleMobile}</span>
                  <span className="u-desktop-only">{decision.title}</span>
                </>
              ) : (
                decision.title
              )}
            </span>
            <span className={styles.body}>
              {decision.bodyMobile !== undefined ? (
                <>
                  <span className="u-mobile-only">{decision.bodyMobile}</span>
                  <span className="u-desktop-only">{decision.body}</span>
                </>
              ) : (
                decision.body
              )}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}
