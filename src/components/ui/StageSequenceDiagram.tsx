import styles from "./StageSequenceDiagram.module.css";

export interface StageSequenceStage {
  label: string;
  children: string[];
}

export interface StageSequenceDiagramProps {
  stages: [StageSequenceStage, StageSequenceStage, StageSequenceStage];
}

export function StageSequenceDiagram({ stages }: StageSequenceDiagramProps) {
  return (
    <ol className={styles.sequence}>
      {stages.map((stage, index) => (
        <li className={styles.stage} key={stage.label}>
          <div className={styles.card}>
            <p className={styles.number} aria-hidden="true">
              {index + 1}
            </p>
            <p className={styles.label}>{stage.label}</p>
            <ul className={styles.items}>
              {stage.children.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {index < stages.length - 1 && (
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
