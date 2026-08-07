"use client";

import { useState } from "react";
import { drawPfpFramePng, downloadPng } from "@/utils/canvas/captureElement";
import styles from "./PfpFrame.module.css";

export function PfpFrame({ photoDataUrl }: { photoDataUrl: string | null }) {
  const [capturing, setCapturing] = useState(false);

  async function handleDownload() {
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
    <article
      className={`${styles.frame} ${capturing ? styles.capturing : ""}`}
      aria-label="Your circular profile picture frame — click to download"
      onClick={handleDownload}
      role="button"
      tabIndex={0}
      title="Click to download your PFP"
      onKeyDown={(e) => e.key === "Enter" && handleDownload()}
    >
      {/* User photo sits behind — clipped to the circle inside the frame */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.photo}
        src={photoDataUrl ?? ""}
        alt="Your uploaded photo, framed"
      />

      {/* frame.svg sits on top — contains all decorations with the circle cutout */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.frameOverlay}
        src="/assets/frame.svg"
        alt=""
        aria-hidden="true"
      />

      {/* Hover/download hint overlay */}
      <div className={styles.downloadHint} aria-hidden="true">
        {capturing ? "saving…" : "⬇ download pfp"}
      </div>
    </article>
  );
}
