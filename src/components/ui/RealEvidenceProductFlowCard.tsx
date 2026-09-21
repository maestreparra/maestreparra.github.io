import Image from "next/image";
import styles from "./RealEvidenceProductFlowCard.module.css";

export interface RealEvidenceProductFlowImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  provenance: string;
}

export interface RealEvidenceProductFlowCardProps {
  figureNumber: string;
  title: string;
  mobile: RealEvidenceProductFlowImage;
  desktop: RealEvidenceProductFlowImage;
  noteTitle: string;
  noteBody: string;
}

/**
 * Shows mobile and desktop side by side in fixed-height, independently
 * scrollable boxes instead of swapping by breakpoint — so every visitor,
 * on any device, sees the full responsive pair at once. This follows Sol's
 * frozen "Priorización responsive" comparison card (Figma node 74:129) and
 * Gio's own two-column, boxed layout request, which keeps the page from
 * growing as long as full-height, unboxed screenshots did.
 */
export function RealEvidenceProductFlowCard({
  figureNumber,
  title,
  mobile,
  desktop,
  noteTitle,
  noteBody,
}: RealEvidenceProductFlowCardProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.figureNumber}>{figureNumber}</span> {title}
        </h3>
      </div>
      <div className={styles.columns}>
        <div className={styles.column}>
          <div className={styles.imageBox} tabIndex={0} role="group" aria-label={mobile.caption}>
            <Image src={mobile.src} alt={mobile.alt} width={mobile.width} height={mobile.height} className={styles.image} loading="lazy" sizes="340px" />
          </div>
          <p className={styles.columnCaption}>{mobile.caption}</p>
          <p className={styles.columnProvenance}>{mobile.provenance}</p>
        </div>
        <div className={styles.column}>
          <div className={styles.imageBox} tabIndex={0} role="group" aria-label={desktop.caption}>
            <Image src={desktop.src} alt={desktop.alt} width={desktop.width} height={desktop.height} className={styles.image} loading="lazy" sizes="340px" />
          </div>
          <p className={styles.columnCaption}>{desktop.caption}</p>
          <p className={styles.columnProvenance}>{desktop.provenance}</p>
        </div>
      </div>
      <figcaption className={styles.footer}>
        <p className={styles.noteTitle}>{noteTitle}</p>
        <p className={styles.noteBody}>{noteBody}</p>
      </figcaption>
    </figure>
  );
}
