import styles from "./LimitationsPanel.module.css";

export interface LimitationsPanelProps {
  title: string;
  body: string;
}

export function LimitationsPanel({ title, body }: LimitationsPanelProps) {
  return (
    <div className={styles.panel}>
      <p className={styles.title}>{title}</p>
      <p className={styles.body}>{body}</p>
    </div>
  );
}
