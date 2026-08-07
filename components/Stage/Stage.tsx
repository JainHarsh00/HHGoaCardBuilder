"use client";

import { ReactNode, RefObject } from "react";
import { useStageScale } from "@/hooks/useStageScale";
import styles from "./Stage.module.css";

export function Stage({
  children,
  ariaLabel,
  captureRef,
}: {
  children: ReactNode;
  ariaLabel: string;
  /** Ref attached to the outer wrapper — the viewport-sized element that
   *  shows exactly what the user sees (the CSS-scaled stage). Pass this
   *  to html2canvas for pixel-accurate screenshots. */
  captureRef?: RefObject<HTMLElement | null>;
}) {
  const { stageRef, scale, wrapperHeight, canvasW, canvasH } = useStageScale();

  function setWrapperRef(el: HTMLElement | null) {
    if (captureRef) (captureRef as React.MutableRefObject<HTMLElement | null>).current = el;
  }

  return (
    <main
      className={styles.wrapper}
      style={{ height: wrapperHeight }}
      ref={setWrapperRef}
    >
      <section
        ref={stageRef}
        className={styles.stage}
        aria-label={ariaLabel}
        style={{
          width: canvasW,
          height: canvasH,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </section>
    </main>
  );
}
