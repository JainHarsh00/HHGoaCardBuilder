"use client";

import { useEffect, useRef, useState } from "react";

const CANVAS_W = 1920;
const CANVAS_H = 1080;

/**
 * Scales a fixed 1920x1080 "stage" to fit the current viewport width,
 * preserving exact Figma proportions at every screen size instead of
 * reflowing the layout. Returns a ref for the stage element and the
 * wrapper height needed to avoid extra scroll space.
 */
export function useStageScale() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      const nextScale = window.innerWidth / CANVAS_W;
      setScale(nextScale);
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return {
    stageRef,
    scale,
    wrapperHeight: CANVAS_H * scale,
    canvasW: CANVAS_W,
    canvasH: CANVAS_H,
  };
}
