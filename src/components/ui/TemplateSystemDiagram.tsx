import styles from "./TemplateSystemDiagram.module.css";

export interface TemplateSystemDiagramProps {
  sharedLayersLabel: string;
  sharedLayers: string[];
  families: string[];
}

export function TemplateSystemDiagram({ sharedLayersLabel, sharedLayers, families }: TemplateSystemDiagramProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layers}>
        <p className={styles.layersLabel}>{sharedLayersLabel}</p>
        <ol className={styles.layerList}>
          {sharedLayers.map((layer) => (
            <li key={layer}>{layer}</li>
          ))}
        </ol>
      </div>
      <ul className={styles.families}>
        {families.map((family) => (
          <li className={styles.family} key={family}>
            {family}
          </li>
        ))}
      </ul>
    </div>
  );
}
