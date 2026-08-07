"use client";

import { ChangeEvent, useState } from "react";
import styles from "./PhotoUploader.module.css";

export function PhotoUploader({
  onPhotoSelected,
  showError,
}: {
  onPhotoSelected: (file: File) => void;
  showError?: boolean;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    onPhotoSelected(file);
  }

  return (
    <section className={styles.panel} aria-label="Upload your photo">
      <p className={styles.title}>mog us here</p>

      <label
        className={`${styles.dropzone} ${showError ? styles.dropzoneError : ""}`}
        htmlFor="photo-input"
      >
        {!previewUrl && <span className={styles.hint}>upload image</span>}
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.preview}
            src={previewUrl}
            alt="Your uploaded photo preview"
          />
        )}
        <input
          className={styles.input}
          type="file"
          id="photo-input"
          name="photo"
          accept="image/jpeg,image/png,image/heic,image/heif"
          aria-label="Upload your photo"
          aria-required="true"
          onChange={handleChange}
        />
      </label>

      {showError && (
        <p className={styles.errorMsg} role="alert">
          Please upload a photo before continuing.
        </p>
      )}
    </section>
  );
}
