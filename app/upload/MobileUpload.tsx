"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "./MobileUpload.module.css";

interface Option {
  value: string;
  label: string;
}

interface MobileUploadProps {
  onSubmit: (fields: Record<string, string>, photoFile: File) => void;
  superpowerOptions: Option[];
  modeOptions: Option[];
}

export function MobileUpload({ onSubmit, superpowerOptions, modeOptions }: MobileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState(false);

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setPhotoFile(file);
    setPhotoError(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!photoFile) {
      setPhotoError(true);
      return;
    }
    const data = new FormData(e.currentTarget);
    const fields: Record<string, string> = {
      name:       String(data.get("name") ?? ""),
      stack:      String(data.get("stack") ?? ""),
      instagram:  String(data.get("instagram") ?? ""),
      mission:    String(data.get("mission") ?? ""),
      superpower: String(data.get("superpower") ?? ""),
      mode:       String(data.get("mode") ?? ""),
    };
    onSubmit(fields, photoFile);
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

      {/* Photo uploader */}
      <section className={styles.uploader} aria-label="Upload your photo">
        <p className={styles.uploaderTitle}>mog us here</p>
        <label
          className={`${styles.dropzone} ${photoError ? styles.dropzoneError : ""}`}
          htmlFor="mobile-photo-input"
        >
          {!previewUrl && <span className={styles.dropzoneHint}>upload image</span>}
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.dropzonePreview} src={previewUrl} alt="Photo preview" />
          )}
          <input
            className={styles.dropzoneInput}
            type="file"
            id="mobile-photo-input"
            name="photo"
            accept="image/jpeg,image/png,image/heic,image/heif"
            aria-label="Upload your photo"
            onChange={handlePhotoChange}
          />
        </label>
        {photoError && (
          <p className={styles.uploadError} role="alert">
            Please upload a photo before continuing.
          </p>
        )}
      </section>

      {/* Form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="m-name">How should we call you</label>
          <input className={styles.fieldInput} id="m-name" name="name" type="text" required />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="m-stack">Current Stack</label>
            <input className={styles.fieldInput} id="m-stack" name="stack" type="text" required />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="m-instagram">Instagram</label>
            <input className={styles.fieldInput} id="m-instagram" name="instagram" type="text" />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="m-mission">Current Mission</label>
          <input
            className={styles.fieldInput}
            id="m-mission"
            name="mission"
            type="text"
            placeholder="eg. maxxing github: mining crypto"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="m-superpower">Superpower</label>
          <select className={styles.fieldSelect} id="m-superpower" name="superpower">
            <option value="">— select —</option>
            {superpowerOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="m-mode">Builder Type</label>
          <select className={styles.fieldSelect} id="m-mode" name="mode">
            <option value="">— select —</option>
            {modeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitBtn}>
          enter the realm..
        </button>
      </form>
    </div>
  );
}
