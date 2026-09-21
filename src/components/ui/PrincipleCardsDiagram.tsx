import styles from "./PrincipleCardsDiagram.module.css";

export interface PrincipleCardsDiagramProps {
  centralStatement: string;
  principles: string[];
}

export function PrincipleCardsDiagram({ centralStatement, principles }: PrincipleCardsDiagramProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.central}>{centralStatement}</p>
      <ul className={styles.principles}>
        {principles.map((principle) => (
          <li className={styles.principle} key={principle}>
            {principle}
          </li>
        ))}
      </ul>
    </div>
  );
}
