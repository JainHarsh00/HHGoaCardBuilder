import Image from "next/image";
import styles from "./BackgroundDecor.module.css";

export function BackgroundDecor({
  // Figma has the palm at left:388 on the upload frame and left:390 on the
  // result frame (2px rounding between the duplicated frames) — pass true
  // on the result page to match it exactly.
  palmOffsetVariant = false,
}: {
  palmOffsetVariant?: boolean;
}) {
  return (
    <>
      <div className={`${styles.deco} ${styles.swirlTop}`}>
        <Image src="/assets/green-swirl-top.svg" alt="" fill priority sizes="606px" />
      </div>
      <div className={`${styles.deco} ${styles.swirlBottomLeft1}`}>
        <Image src="/assets/green-swirl-bottom1.svg" alt="" fill sizes="801px" />
      </div>
      <div className={`${styles.deco} ${styles.swirlBottomLeft2}`}>
        <Image src="/assets/green-swirl-bottom2.svg" alt="" fill sizes="820px" />
      </div>
      <div
        className={`${styles.deco} ${styles.palm}`}
        style={palmOffsetVariant ? { left: 390 } : undefined}
      >
        <Image src="/assets/palm-tree.png" alt="" fill sizes="332px" style={{ objectFit: "cover" }} />
      </div>
    </>
  );
}
