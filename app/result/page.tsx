"use client";

import { useEffect, useRef, useState } from "react";
import { Stage } from "@/components/Stage/Stage";
import { BackgroundDecor } from "@/components/BackgroundDecor/BackgroundDecor";
import { BrandHeader } from "@/components/BrandHeader/BrandHeader";
import { IdCard } from "@/components/Card/IdCard";
import { PfpFrame } from "@/components/Frame/PfpFrame";
import { CtaButton } from "@/components/Inputs/CtaButton";
import { BuilderFields, BUILDER_FIELDS_KEY, BUILDER_PHOTO_KEY } from "@/types/builder";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileResult } from "./MobileResult";
import styles from "./result.module.css";

export default function ResultPage() {
  const [fields, setFields] = useState<BuilderFields>({ name: "", stack: "" });
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const storedFields = sessionStorage.getItem(BUILDER_FIELDS_KEY);
    if (storedFields) setFields(JSON.parse(storedFields));

    const storedPhoto = sessionStorage.getItem(BUILDER_PHOTO_KEY);
    if (storedPhoto) setPhotoDataUrl(storedPhoto);
  }, []);

  async function handleShare() {
    const text = encodeURIComponent(
      "🤖 AI Builder reporting for Hacker House Goa.\n\nSee you in October! 🌴\n\nhttps://hhgoacardbuilder.netlify.app/\n#FrameInGoa #HackerHouseGoa"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <MobileResult
        fields={fields}
        photoDataUrl={photoDataUrl}
        onShare={handleShare}
      />
    );
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <Stage ref={stageRef} ariaLabel="Your generated Hacker House Goa 2026 builder card">
      <BackgroundDecor palmOffsetVariant />
      <BrandHeader />

      <IdCard fields={fields} photoDataUrl={photoDataUrl} />
      <PfpFrame photoDataUrl={photoDataUrl} />

      <p className={styles.message}>You&rsquo;re all set to explore the abyss</p>

      <CtaButton
        type="button"
        label="share on x"
        labelLeft={398}
        onClick={handleShare}
        data-capture-ignore=""
      />
    </Stage>
  );
}
