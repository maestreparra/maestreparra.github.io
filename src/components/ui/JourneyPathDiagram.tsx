import styles from "./JourneyPathDiagram.module.css";

export interface JourneyPathDiagramProps {
  steps: string[];
}

export function JourneyPathDiagram({ steps }: JourneyPathDiagramProps) {
  return (
    <ol className={styles.path}>
      {steps.map((step, index) => (
        <li className={styles.step} key={step}>
          <span className={styles.number} aria-hidden="true">
            {index + 1}
          </span>
          <span className={styles.label}>{step}</span>
          {index < steps.length - 1 && (
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
