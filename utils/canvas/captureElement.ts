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

  const rect = el.getBoundingClientRect();

  // --- Freeze all animations at their current computed state ---
  // html2canvas doesn't animate — it takes a snapshot. If elements are mid-animation
  // or have transform/opacity driven by @keyframes, we need to pin them first.
  type Snapshot = {
    el: HTMLElement;
    animation: string;
    transition: string;
    transform: string;
    opacity: string;
  };

  const allEls = [el, ...Array.from(el.querySelectorAll("*"))] as HTMLElement[];
  const snapshots: Snapshot[] = allEls.map((node) => {
    const cs = getComputedStyle(node);
    return {
      el: node,
      animation:  node.style.animation,
      transition: node.style.transition,
      transform:  node.style.transform,
      opacity:    node.style.opacity,
    };
  });

  // Apply frozen state
  allEls.forEach((node) => {
    const cs = getComputedStyle(node);
    node.style.animation  = "none";
    node.style.transition = "none";
    // Pin to computed (post-animation) transform & opacity
    node.style.transform = cs.transform === "none" ? "" : cs.transform;
    node.style.opacity   = cs.opacity;
  });

  // Force a reflow so the browser applies the overrides before html2canvas reads the DOM
  el.getBoundingClientRect();

  const canvas = await html2canvas(el, {
    scale: scale ?? dpr,
    width: rect.width,
    height: rect.height,
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
    scrollX: 0,
    scrollY: 0,
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

  // --- Restore all animation styles ---
  snapshots.forEach(({ el: node, animation, transition, transform, opacity }) => {
    node.style.animation  = animation;
    node.style.transition = transition;
    node.style.transform  = transform;
    node.style.opacity    = opacity;
  });

  return canvas.toDataURL("image/png");
}

/**
 * Draws the PFP frame (photo + SVG overlay) onto a Canvas 2D context,
 * replicating object-fit:cover + object-position:center top exactly.
 * This bypasses html2canvas entirely, so the download is pixel-perfect.
 *
 * Frame dimensions match PfpFrame.module.css:
 *   frame 313×316 | photo circle left:3 top:0 diameter:300
 */
export async function drawPfpFramePng(
  photoDataUrl: string,
  frameSvgSrc: string = "/assets/frame.svg"
): Promise<string> {
  const W = 313;
  const H = 316;

  // circle geometry (from PfpFrame.module.css: left:3 top:0 width/height:300)
  const circleLeft = 3;
  const circleTop  = 0;
  const circleDiam = 300;
  const cx = circleLeft + circleDiam / 2;
  const cy = circleTop  + circleDiam / 2;
  const r  = circleDiam / 2;

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  const [photo, frameOverlay] = await Promise.all([
    loadImage(photoDataUrl),
    loadImage(frameSvgSrc),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // --- Draw photo clipped to circle (object-fit:cover, object-position:center top) ---
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  // Scale so the smaller dimension fills the circle (cover)
  const scale = Math.max(circleDiam / photo.naturalWidth, circleDiam / photo.naturalHeight);
  const dw = photo.naturalWidth  * scale;
  const dh = photo.naturalHeight * scale;
  const dx = circleLeft + (circleDiam - dw) / 2;   // center horizontally
  const dy = circleTop;                              // align to top (object-position:center top)

  ctx.drawImage(photo, dx, dy, dw, dh);
  ctx.restore();

  // --- Draw frame SVG on top ---
  ctx.drawImage(frameOverlay, 0, 0, W, H);

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
