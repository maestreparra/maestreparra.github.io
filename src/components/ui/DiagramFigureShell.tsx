import type { ReactNode } from "react";
import styles from "./DiagramFigureShell.module.css";

export interface DiagramFigureShellProps {
  reconstructionLabel: string;
  figureNumber: string;
  title: string;
  caption: string;
  textEquivalent: string;
  children: ReactNode;
}

/**
 * Shared chrome for every Licendi/MEECO derived-evidence diagram: the
 * mandatory "PORTFOLIO RECONSTRUCTION" label, figure number, localized
 * title, the diagram body (supplied by each specific diagram component),
 * a caption, and a visible text equivalent so meaning never depends on the
 * diagram rendering or on color alone.
 */
export function DiagramFigureShell({
  reconstructionLabel,
  figureNumber,
  title,
  caption,
  textEquivalent,
  children,
}: DiagramFigureShellProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.header}>
        <p className={styles.reconstruction}>{reconstructionLabel}</p>
        <h3 className={styles.title}>
          <span className={styles.figureNumber}>{figureNumber}</span> {title}
        </h3>
      </div>
      <div className={styles.body}>{children}</div>
      <figcaption className={styles.caption}>{caption}</figcaption>
      <p className={styles.textEquivalent}>{textEquivalent}</p>
    </figure>
  );
}
