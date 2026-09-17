import Image from "next/image";
import styles from "./EvidenceFigure.module.css";

export interface EvidenceFigureImage {
  src: string;
  alt: string;
  caption: string;
  heightPx: number;
}

export interface EvidenceFigureNotes {
  title: string;
  body: string;
  provenance: string;
}

export interface EvidenceFigureProps {
  mobile: EvidenceFigureImage;
  desktop: EvidenceFigureImage;
  notesMobile: EvidenceFigureNotes;
  notesDesktop: EvidenceFigureNotes;
}

/**
 * Approved evidence screenshots are full-page captures with a tall,
 * unpredictable intrinsic aspect ratio, so each breakpoint gets the frozen
 * Figma figure-box height (`heightPx`) and `object-fit: contain`, rather
 * than `height: auto`, which would otherwise let a single tall screenshot
 * dominate the whole case-study page height. `next/image` with `fill` inside
 * a fixed-height positioned wrapper (static export serves it unoptimized,
 * per next.config.ts) keeps that fixed box while adding `sizes` and
 * `decoding`/`loading` behavior the plain `<img>` version did not have.
 */
export function EvidenceFigure({ mobile, desktop, notesMobile, notesDesktop }: EvidenceFigureProps) {
  return (
    <div className={styles.figureRow}>
      <figure className={styles.figure}>
        <div className={`${styles.imageBox} ${styles.mobileOnly}`} style={{ height: mobile.heightPx }}>
          <Image src={mobile.src} alt={mobile.alt} fill sizes="342px" className={styles.image} loading="lazy" />
        </div>
        <div className={`${styles.imageBox} ${styles.desktopOnly}`} style={{ height: desktop.heightPx }}>
          <Image src={desktop.src} alt={desktop.alt} fill sizes="760px" className={styles.image} loading="lazy" />
        </div>
        <figcaption className={styles.caption}>
          <span className="u-mobile-only">{mobile.caption}</span>
          <span className="u-desktop-only">{desktop.caption}</span>
        </figcaption>
      </figure>
      <div className={styles.notesWrapMobile}>
        <div className={styles.notes}>
          <p className={styles.noteTitle}>{notesMobile.title}</p>
          <p className={styles.noteBody}>{notesMobile.body}</p>
          <p className={styles.provenance}>{notesMobile.provenance}</p>
        </div>
      </div>
      <div className={styles.notesWrapDesktop}>
        <div className={styles.notes}>
          <p className={styles.noteTitle}>{notesDesktop.title}</p>
          <p className={styles.noteBody}>{notesDesktop.body}</p>
          <p className={styles.provenance}>{notesDesktop.provenance}</p>
        </div>
      </div>
    </div>
  );
}
