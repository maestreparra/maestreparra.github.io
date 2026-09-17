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
  /**
   * Optional condensed mobile variants (P9 Correction Attempt 2, QA-01).
   * When omitted, every P7 caller (About/Work/Contact) renders byte-equivalent
   * output to before this change: a single text node per field. When
   * supplied, the field renders two text spans toggled by the existing
   * `.u-mobile-only` / `.u-desktop-only` breakpoint utility instead, so the
   * page keeps exactly one semantic `<h1>`/`<p>` while swapping only the
   * visible copy per breakpoint.
   */
  eyebrowMobile?: string;
  titleMobile?: string;
  introductionMobile?: string;
}

export function PageHero({
  eyebrow,
  title,
  introduction,
  headingId,
  reserveMobileHeight = false,
  eyebrowMobile,
  titleMobile,
  introductionMobile,
}: PageHeroProps) {
  const titleClassName = reserveMobileHeight ? `${styles.title} ${styles.titleReserveHeight}` : styles.title;
  const introductionClassName = reserveMobileHeight
    ? `${styles.introduction} ${styles.introductionReserveHeight}`
    : styles.introduction;

  return (
    <div className={styles.hero}>
      <p className={styles.eyebrow}>
        {eyebrowMobile !== undefined ? (
          <>
            <span className="u-mobile-only">{eyebrowMobile}</span>
            <span className="u-desktop-only">{eyebrow}</span>
          </>
        ) : (
          eyebrow
        )}
      </p>
      <h1 id={headingId} className={titleClassName}>
        {titleMobile !== undefined ? (
          <>
            <span className="u-mobile-only">{titleMobile}</span>
            <span className="u-desktop-only">{title}</span>
          </>
        ) : (
          title
        )}
      </h1>
      <p className={introductionClassName}>
        {introductionMobile !== undefined ? (
          <>
            <span className="u-mobile-only">{introductionMobile}</span>
            <span className="u-desktop-only">{introduction}</span>
          </>
        ) : (
          introduction
        )}
      </p>
    </div>
  );
}
