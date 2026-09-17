import styles from "./CapabilityItem.module.css";

export interface CapabilityItemProps {
  label: string;
}

export function CapabilityItem({ label }: CapabilityItemProps) {
  return (
    <li className={styles.item}>
      <span className={styles.signal} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </li>
  );
}
