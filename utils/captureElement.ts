/**
 * Captures a DOM element as a PNG data URL using html2canvas.
 * Defaults to window.devicePixelRatio so output is pixel-perfect
 * on the current display.
 *
 * @param el             - The element to capture
 * @param scale          - Pixel ratio multiplier; defaults to devicePixelRatio
 * @param ignoreSelector - Optional CSS selector — matching elements are excluded
 * @returns              - A `data:image/png;base64,...` string
 */
export async function captureElementAsPng(
  el: HTMLElement,
  scale?: number,
  ignoreSelector?: string
): Promise<string> {
  const { default: html2canvas } = await import("html2canvas");

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio ?? 2 : 2;

  const canvas = await html2canvas(el, {
    scale: scale ?? dpr,
    useCORS: true,
    allowTaint: false,
    backgroundColor: null,
    logging: false,
    ignoreElements: ignoreSelector
      ? (element) => {
          try { return (element as Element).matches(ignoreSelector); }
          catch { return false; }
        }
      : undefined,
  });

  return canvas.toDataURL("image/png");
}

/**
 * Triggers a browser download of a data URL as a named PNG file.
 */
export function downloadPng(dataUrl: string, filename: string): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

