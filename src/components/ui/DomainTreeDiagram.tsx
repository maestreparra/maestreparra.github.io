import styles from "./DomainTreeDiagram.module.css";

export interface DomainTreeBranch {
  label: string;
  children: string[];
}

export interface DomainTreeDiagramProps {
  root: string;
  branches: DomainTreeBranch[];
}

export function DomainTreeDiagram({ root, branches }: DomainTreeDiagramProps) {
  return (
    <div className={styles.tree}>
      <p className={styles.root}>{root}</p>
      <ul className={styles.branches}>
        {branches.map((branch) => (
          <li className={styles.branch} key={branch.label}>
            <p className={styles.branchLabel}>{branch.label}</p>
            <ul className={styles.children}>
              {branch.children.map((child) => (
                <li key={child}>{child}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
