import styles from "./RelatedEngagementDiagram.module.css";

export interface RelatedEngagementDiagramProps {
  contextStatement: string;
  projects: [string, string];
  legalNote: string;
}

export function RelatedEngagementDiagram({ contextStatement, projects, legalNote }: RelatedEngagementDiagramProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.context}>{contextStatement}</p>
      <div className={styles.projects}>
        {projects.map((project) => (
          <p className={styles.project} key={project}>
            {project}
          </p>
        ))}
      </div>
      <p className={styles.legalNote}>{legalNote}</p>
    </div>
  );
}
