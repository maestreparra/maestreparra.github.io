"use client";

import { useEffect, useId, useRef } from "react";
import type { MouseEvent } from "react";
import type { Locale } from "@/i18n/locales";
import { localize } from "@/content/home";
import type { DirectContactContent } from "@/content/core-pages";
import styles from "./DirectContactDialog.module.css";

export interface DirectContactDialogProps {
  locale: Locale;
  content: DirectContactContent;
}

export function DirectContactDialog({ locale, content }: DirectContactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousBodyOverflow = useRef("");
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    return () => {
      document.body.style.overflow = previousBodyOverflow.current;
    };
  }, []);

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    previousBodyOverflow.current = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeRef.current?.focus());
  };

  const closeDialog = () => dialogRef.current?.close();

  const handleClose = () => {
    document.body.style.overflow = previousBodyOverflow.current;
    triggerRef.current?.focus();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeDialog();
  };

  return (
    <>
      <button
        ref={triggerRef}
        className={styles.trigger}
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
      >
        <span className={styles.triggerCopy}>
          <span className={styles.triggerLabel}>{localize(content.cardLabel, locale)}</span>
          <span className={styles.triggerDetail}>{localize(content.cardDetail, locale)}</span>
        </span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={handleBackdropClick}
        onClose={handleClose}
      >
        <div className={styles.panel}>
          <button
            ref={closeRef}
            className={styles.close}
            type="button"
            onClick={closeDialog}
            aria-label={localize(content.closeLabel, locale)}
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className={styles.header}>
            <p className={styles.eyebrow}>{locale === "es" ? "CONTACTO DIRECTO" : "DIRECT CONTACT"}</p>
            <h2 id={titleId} className={styles.title}>
              {localize(content.dialogTitle, locale)}
            </h2>
            <p id={descriptionId} className={styles.introduction}>
              {localize(content.dialogIntroduction, locale)}
            </p>
            <p className={styles.phone}>
              <span>{localize(content.phoneLabel, locale)}</span>
              <strong>{content.phoneDisplay}</strong>
            </p>
          </div>

          <div className={styles.actions}>
            {content.actions.map((action) => (
              <a
                key={action.id}
                className={styles.action}
                href={action.href}
                target={action.opensNewTab ? "_blank" : undefined}
                rel={action.opensNewTab ? "noreferrer noopener" : undefined}
              >
                <span className={styles.actionCopy}>
                  <span className={styles.actionLabel}>{localize(action.label, locale)}</span>
                  <span className={styles.actionDetail}>{localize(action.detail, locale)}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
