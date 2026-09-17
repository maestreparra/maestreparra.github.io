import styles from "./EvidenceLabel.module.css";

export interface EvidenceLabelProps {
  metric: string;
  caption: string;
}

export function EvidenceLabel({ metric, caption }: EvidenceLabelProps) {
  return (
    <div className={styles.label}>
      <p className={styles.metric}>{metric}</p>
      <p className={styles.caption}>{caption}</p>
    </div>
  );
}
