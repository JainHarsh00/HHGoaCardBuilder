import { BuilderFields } from "@/types/builder";
import styles from "./IdCard.module.css";



export function IdCard({
  fields,
  photoDataUrl,
}: {
  fields: BuilderFields;
  photoDataUrl: string | null;
}) {
  return (
    <>
      {/* Backer plate — the second card peeking out behind the front card */}
      <div className={styles.backer} aria-hidden="true">
        <div className={styles.backerPlate}>
          <span className={styles.backerTag}>#FrameInGoa</span>
        </div>
      </div>

      <article className={styles.card} aria-label="Your builder ID card">
        {/* Photo area: user photo only — no fallback asset */}
        <div className={styles.photoContainer}>
          {photoDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.userPhoto}
              src={photoDataUrl}
              alt="Your uploaded photo"
            />
          )}
        </div>

        <div className={styles.glassPanel} />
        
        <h1 className={styles.name}>{fields.name || "Your Name"}</h1>
        <p className={styles.role}>{fields.stack || "Stack"}</p>
        {fields.instagram && (
          <p className={styles.username}>@{fields.instagram.replace(/^@/, "")}</p>
        )}
        <ul className={styles.tags}>
          {[fields.mission, fields.superpower, fields.mode].map(
            (tag, i) =>
              tag ? (
                <li key={i} className={`${styles.tag} ${styles[`tag${i + 1}`]}`}>
                  <span className={styles.tagLabel}>{tag}</span>
                </li>
              ) : null
          )}
        </ul>
      </article>

      <div className={styles.pin} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.pinImg} src="/assets/pin-nail.png" alt="" />
      </div>
    </>
  );
}
