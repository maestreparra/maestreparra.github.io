import Image from "next/image";
import styles from "./RealEvidenceImage.module.css";

export interface RealEvidenceImageProps {
  figureNumber: string;
  title: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  provenance: string;
  className?: string;
}

/**
 * Real, agency-authorized screenshots (unlike DiagramFigureShell's
 * reconstructions) are rendered at their natural aspect ratio via explicit
 * width/height rather than a fixed figure-box height, so a single slide
 * stays legible. The figure-number header and bordered footer note mirror
 * Sol's frozen "Evidence Card" composition (Figma node 74:40) so real
 * evidence reads as the same catalog system as the reconstructed diagrams.
 */
export function RealEvidenceImage({
  figureNumber,
  title,
  src,
  alt,
  width,
  height,
  caption,
  provenance,
  className,
}: RealEvidenceImageProps) {
  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.figureNumber}>{figureNumber}</span> {title}
        </h3>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles.image}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 720px"
      />
      <figcaption className={styles.footer}>
        <p className={styles.caption}>{caption}</p>
        <p className={styles.provenance}>{provenance}</p>
      </figcaption>
    </figure>
  );
}
