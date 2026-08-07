import Image from "next/image";
import styles from "./BrandHeader.module.css";

export function BrandHeader() {
  return (
    <>
      <header className={styles.timestamp}>
        <Image src="/assets/hh-logo.svg" alt="2:41 PM Studio" fill priority sizes="196px" />
      </header>

      <div className={styles.wordmark}>
        <Image
          src="/assets/group-photo-banner.png"
          alt="Hacker House Goa wordmark"
          fill
          priority
          sizes="730px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.goaBadge}>
        <div className={styles.goaBadgeInner}>
          <Image src="/assets/goa-hindi-badge.svg" alt="Goa badge" fill sizes="81px" />
        </div>
      </div>
    </>
  );
}
