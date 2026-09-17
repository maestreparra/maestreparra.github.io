import styles from "./ProcessStep.module.css";

export interface ProcessStepProps {
  index: string;
  title: string;
  description: {
    desktop: string;
    mobile: string;
  };
}

export function ProcessStep({ index, title, description }: ProcessStepProps) {
  return (
    <li className={styles.step}>
      <p className={styles.index} aria-hidden="true">
        {index}
      </p>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>
        {description.desktop === description.mobile ? (
          description.desktop
        ) : (
          <>
            <span className="u-mobile-only">{description.mobile}</span>
            <span className="u-desktop-only">{description.desktop}</span>
          </>
        )}
      </p>
    </li>
  );
}
