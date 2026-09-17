import styles from "./StatusLabel.module.css";

export interface StatusLabelProps {
  label: string;
}

export function StatusLabel({ label }: StatusLabelProps) {
  return (
    <span className={styles.label}>
      <span className={styles.text}>{label}</span>
    </span>
  );
}
