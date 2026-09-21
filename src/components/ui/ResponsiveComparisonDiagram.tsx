import styles from "./ResponsiveComparisonDiagram.module.css";

export interface ResponsiveComparisonDiagramProps {
  desktopLabel: string;
  mobileLabel: string;
  changes: string[];
}

export function ResponsiveComparisonDiagram({ desktopLabel, mobileLabel, changes }: ResponsiveComparisonDiagramProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.silhouettes}>
        <div className={styles.silhouette}>
          <div className={styles.desktopShape} aria-hidden="true" />
          <p className={styles.silhouetteLabel}>{desktopLabel}</p>
        </div>
        <div className={styles.silhouette}>
          <div className={styles.mobileShape} aria-hidden="true" />
          <p className={styles.silhouetteLabel}>{mobileLabel}</p>
        </div>
      </div>
      <ul className={styles.changes}>
        {changes.map((change) => (
          <li key={change}>{change}</li>
        ))}
      </ul>
    </div>
  );
}
