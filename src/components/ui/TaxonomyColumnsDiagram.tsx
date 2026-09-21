import styles from "./TaxonomyColumnsDiagram.module.css";

export interface TaxonomyColumn {
  label: string;
  children: string[];
}

export interface TaxonomyColumnsDiagramProps {
  columns: TaxonomyColumn[];
}

export function TaxonomyColumnsDiagram({ columns }: TaxonomyColumnsDiagramProps) {
  return (
    <ul className={styles.columns}>
      {columns.map((column) => (
        <li className={styles.column} key={column.label}>
          <p className={styles.label}>{column.label}</p>
          <ul className={styles.items}>
            {column.children.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
