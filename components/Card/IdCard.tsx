import { BuilderFields } from "@/types/builder";
import styles from "./IdCard.module.css";

/**
 * Extracts a leading emoji from a tag string.
 * e.g. "🧠 Solves Hard Problems" → { icon: "🧠", text: "Solves Hard Problems" }
 * Falls back to { icon: "", text: fullTag } when no emoji prefix is found.
 */
function splitTag(tag: string): { icon: string; text: string } {
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u;
  const match = tag.match(emojiRegex);
  if (match) {
    return { icon: match[0].trim(), text: tag.slice(match[0].length) };
  }
  return { icon: "", text: tag };
}

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
        {/* Photo — fills the top portion of the card */}
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

        {/* Dark name banner at the photo/content boundary */}
        <div className={styles.nameBanner}>
          <h1 className={styles.name}>{fields.name || "Your Name"}</h1>
        </div>

        {/* Role / Stack */}
        <p className={styles.role}>{fields.stack || "Stack"}</p>

        {/* @handle */}
        {fields.instagram && (
          <p className={styles.username}>
            @{fields.instagram.replace(/^@/, "")}
          </p>
        )}

        {/* Tag pills */}
        <ul className={styles.tags}>
          {[fields.mission, fields.superpower, fields.mode].map((tag, i) => {
            if (!tag) return null;
            const { icon, text } = splitTag(tag);
            return (
              <li
                key={i}
                className={`${styles.tag} ${
                  styles[`tag${i + 1}` as keyof typeof styles]
                }`}
              >
                {icon && <span className={styles.tagIcon}>{icon}</span>}
                <span className={styles.tagLabel}>{text || tag}</span>
              </li>
            );
          })}
        </ul>
      </article>

      {/* Pin nail — centred on the card */}
      <div className={styles.pin} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.pinImg} src="/assets/pin-nail.png" alt="" />
      </div>
    </>
  );
}
