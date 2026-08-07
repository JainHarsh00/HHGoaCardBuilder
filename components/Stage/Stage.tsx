"use client";

import { ReactNode, forwardRef } from "react";
import { useStageScale } from "@/hooks/useStageScale";
import styles from "./Stage.module.css";

export const Stage = forwardRef<HTMLDivElement, { children: ReactNode; ariaLabel: string }>(
  function Stage({ children, ariaLabel }, forwardedRef) {
    const { stageRef, scale, wrapperHeight, canvasW, canvasH } = useStageScale();

    // The stage node is used internally for the scale calculation AND
    // needs to be exposed to the page so it can be passed straight into
    // captureElementAsPng() — capturing the actual rendered node instead
    // of a re-constructed guess is what fixes the "wrong node" class of bug.
    function setRefs(node: HTMLDivElement | null) {
      stageRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }

    return (
      <main className={styles.wrapper} style={{ height: wrapperHeight }}>
        <section
          ref={setRefs}
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
);
