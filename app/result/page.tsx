"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Stage } from "@/components/Stage/Stage";
import { BackgroundDecor } from "@/components/BackgroundDecor/BackgroundDecor";
import { BrandHeader } from "@/components/BrandHeader/BrandHeader";
import { IdCard } from "@/components/Card/IdCard";
import { PfpFrame } from "@/components/Frame/PfpFrame";
import { CtaButton } from "@/components/Inputs/CtaButton";
import { BuilderFields, BUILDER_FIELDS_KEY, BUILDER_PHOTO_KEY } from "@/types/builder";
import { captureElementAsPng, downloadPng } from "@/utils/captureElement";
import styles from "./result.module.css";

export default function ResultPage() {
  const router = useRouter();
  const [fields, setFields] = useState<BuilderFields>({ name: "", stack: "" });
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  // Use a ref for the lock so flipping it doesn't re-render (and therefore
  // doesn't change button text) while html2canvas is mid-capture.
  const sharingRef = useRef(false);
  const stageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const storedFields = sessionStorage.getItem(BUILDER_FIELDS_KEY);
    const storedPhoto = sessionStorage.getItem(BUILDER_PHOTO_KEY);

    // Guard: must have gone through upload first
    if (!storedFields && !storedPhoto) {
      router.replace("/upload");
      return;
    }

    if (storedFields) setFields(JSON.parse(storedFields));
    if (storedPhoto) setPhotoDataUrl(storedPhoto);
    setReady(true);
  }, [router]);

  if (!ready) return null;

  async function handleShare() {
    if (sharingRef.current) return;
    sharingRef.current = true;

    try {
      // 1. Capture the wrapper (viewport-accurate, exactly what you see).
      //    Exclude the CTA button so it doesn't appear in the screenshot.
      if (stageRef.current) {
        const png = await captureElementAsPng(
          stageRef.current,
          undefined,           // uses window.devicePixelRatio automatically
          "[data-no-capture]" // excludes the share button
        );
        downloadPng(png, "hh-goa-card.png");
      }
    } finally {
      sharingRef.current = false;
    }

    // 2. Open X compose — user attaches the downloaded image manually
    const text = encodeURIComponent(
      "Just built my HH Goa 2026 Builder Card 🌴\nAttaching my card below — see you in Goa! #FrameInGoa #HackerHouseGoa"
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <Stage
      ariaLabel="Your generated Hacker House Goa 2026 builder card"
      captureRef={stageRef}
    >
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
        data-no-capture
      />
    </Stage>
  );
}
