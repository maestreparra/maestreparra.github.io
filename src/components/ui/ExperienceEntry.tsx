import styles from "./ExperienceEntry.module.css";

export interface ExperienceEntryProps {
  company: string;
  role: string;
  summary: string;
}

export function ExperienceEntry({ company, role, summary }: ExperienceEntryProps) {
  return (
    <li className={styles.entry}>
      <p className={styles.company}>{company}</p>
      <p className={styles.role}>{role}</p>
      <p className={styles.summary}>{summary}</p>
    </li>
  );
}
