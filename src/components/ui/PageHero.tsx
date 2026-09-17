import styles from "./PageHero.module.css";

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  introduction: string;
  headingId: string;
  /**
   * Opt-in mobile editorial whitespace matching Figma's fixed 300px title /
   * 460px introduction reservation. Measured against all three Core Pages:
   * About and Work already meet these minimums with their longer copy, but
   * forcing the reservation for Work made its total page height regress
   * from -1.4% to +11.5% versus Figma, so this stays opt-in (Contact only)
   * rather than a PageHero-wide default. See PageHero.module.css.
   */
  reserveMobileHeight?: boolean;
}

export function PageHero({ eyebrow, title, introduction, headingId, reserveMobileHeight = false }: PageHeroProps) {
  const titleClassName = reserveMobileHeight ? `${styles.title} ${styles.titleReserveHeight}` : styles.title;
  const introductionClassName = reserveMobileHeight
    ? `${styles.introduction} ${styles.introductionReserveHeight}`
    : styles.introduction;

  return (
    <div className={styles.hero}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 id={headingId} className={titleClassName}>
        {title}
      </h1>
      <p className={introductionClassName}>{introduction}</p>
    </div>
  );
}
