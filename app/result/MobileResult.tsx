"use client";

import { useState } from "react";
import { drawPfpFramePng, downloadPng } from "@/utils/canvas/captureElement";
import { BuilderFields } from "@/types/builder";
import styles from "./MobileResult.module.css";

interface MobileResultProps {
  fields: BuilderFields;
  photoDataUrl: string | null;
  onShare: () => void;
}

export function MobileResult({ fields, photoDataUrl, onShare }: MobileResultProps) {
  const [capturing, setCapturing] = useState(false);

  async function handlePfpDownload() {
    if (!photoDataUrl || capturing) return;
    setCapturing(true);
    try {
      const png = await drawPfpFramePng(photoDataUrl);
      downloadPng(png, "hh-goa-pfp.png");
    } finally {
      setCapturing(false);
    }
  }

  return (
    <div className={styles.page}>
      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.logo}
        src="/assets/hh-logo.svg"
        alt="2:41 PM Studio — Hacker House Goa 2026"
      />

      {/* ID Card */}
      <article className={styles.card} aria-label="Your builder ID card">
        <div className={styles.cardPhotoContainer}>
          {photoDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.cardUserPhoto}
              src={photoDataUrl}
              alt="Your uploaded photo"
            />
          )}
        </div>

        <div className={styles.cardGlass} />

        <h1 className={styles.cardName}>{fields.name || "Your Name"}</h1>
        <p className={styles.cardRole}>{fields.stack || "Stack"}</p>
        {fields.instagram && (
          <p className={styles.cardUsername}>
            @{fields.instagram.replace(/^@/, "")}
          </p>
        )}

        <ul className={styles.cardTags}>
          {[fields.mission, fields.superpower, fields.mode].map(
            (tag, i) =>
              tag ? (
                <li
                  key={i}
                  className={`${styles.cardTag} ${styles[`cardTag${i + 1}` as keyof typeof styles]}`}
                >
                  <span className={styles.cardTagLabel}>{tag}</span>
                </li>
              ) : null
          )}
        </ul>
      </article>

      {/* PFP Frame */}
      <article
        className={styles.pfpFrame}
        aria-label="Your circular profile picture — tap to download"
        onClick={handlePfpDownload}
        role="button"
        tabIndex={0}
        title="Tap to download your PFP"
        onKeyDown={(e) => e.key === "Enter" && handlePfpDownload()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.pfpFramePhoto}
          src={photoDataUrl ?? ""}
          alt="Your uploaded photo, framed"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.pfpFrameOverlay}
          src="/assets/frame.svg"
          alt=""
          aria-hidden="true"
        />
        <div className={styles.pfpDownloadHint} aria-hidden="true">
          {capturing ? "saving…" : "⬇ download pfp"}
        </div>
      </article>

      {/* Message */}
      <p className={styles.message}>You&rsquo;re all set to explore the abyss</p>

      {/* Share button */}
      <button type="button" className={styles.shareBtn} onClick={onShare}>
        share on x
      </button>
    </div>
  );
}
