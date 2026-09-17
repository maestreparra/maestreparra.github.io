import styles from "./FactGrid.module.css";

export interface FactGridItem {
  value: string;
  label: string;
}

export interface FactGridProps {
  facts: FactGridItem[];
}

export function FactGrid({ facts }: FactGridProps) {
  return (
    <dl className={styles.grid}>
      {facts.map((fact) => (
        <div className={styles.fact} key={fact.label}>
          <dt className={styles.value}>{fact.value}</dt>
          <dd className={styles.label}>{fact.label}</dd>
        </div>
      ))}
    </dl>
  );
}
