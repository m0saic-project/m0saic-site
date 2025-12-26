import { BAND_HEIGHT, type Block, type Frame } from "./types";

function makeRng(seed: number) {
  let t = (seed >>> 0) || 1;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateFrames(
  seed: number,
  offsetY: number,
  windowWidth: number
): Frame[] {
  const rng = makeRng(seed);
  const frames: Frame[] = [];

  const marginX = 24;
  const marginY = 10;
  const innerWidth = 1000 - marginX * 2;
  const innerHeight = BAND_HEIGHT - marginY * 2;

  let cols: number;
  let rows = 5;

  if (windowWidth <= 480) cols = 11;
  else if (windowWidth <= 768) cols = 9;
  else if (windowWidth <= 1200) cols = 8;
  else if (windowWidth <= 1600) cols = 9;
  else {
    cols = 9;
    rows = 6;
  }

  const gapX = windowWidth <= 768 ? 12 : 16;
  const gapY = 24;

  const cellW = (innerWidth - gapX * (cols - 1)) / cols;
  const cellH = (innerHeight - gapY * (rows - 1)) / rows;

  let skipChance: number;
  if (windowWidth <= 600) skipChance = 0.04;
  else if (windowWidth <= 1200) skipChance = 0.06;
  else if (windowWidth <= 1600) skipChance = 0.08;
  else skipChance = 0.1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (rng() < skipChance) continue;

      const x = marginX + col * (cellW + gapX);
      const y = marginY + row * (cellH + gapY);

      const inset = 4;
      const outline: Block = {
        x: x + inset,
        y: y + inset + offsetY,
        w: cellW - inset * 2,
        h: cellH - inset * 2,
        r: 8,
      };

      const inner = generateSkeletonInside(outline, rng);
      frames.push({ outline, inner });
    }
  }

  return frames;
}

function generateSkeletonInside(frame: Block, rng: () => number): Block[] {
  const blocks: Block[] = [];

  const padding = 8;
  const x0 = frame.x + padding;
  const y0 = frame.y + padding;
  const w = frame.w - padding * 2;
  const h = frame.h - padding * 2;

  if (w <= 0 || h <= 0) return blocks;

  const variant = Math.floor(rng() * 3);

  if (variant === 0) {
    const titleH = h * 0.18;
    blocks.push({
      x: x0,
      y: y0,
      w: w * (0.5 + rng() * 0.4),
      h: titleH,
      r: 4,
    });

    let y = y0 + titleH + 4;
    const lineH = h * 0.12;

    for (let i = 0; i < 3; i++) {
      if (y + lineH > y0 + h) break;
      blocks.push({
        x: x0,
        y,
        w: w * (0.4 + rng() * 0.5),
        h: lineH,
        r: 3,
      });
      y += lineH + 4;
    }
  } else if (variant === 1) {
    const thumbW = w * 0.3;
    const thumbH = h * 0.6;

    blocks.push({
      x: x0,
      y: y0 + (h - thumbH) * 0.1,
      w: thumbW,
      h: thumbH,
      r: 4,
    });

    const textX = x0 + thumbW + 6;
    const textW = w - thumbW - 6;
    let y = y0;

    const lineH = h * 0.12;
    for (let i = 0; i < 4; i++) {
      if (y + lineH > y0 + h) break;
      blocks.push({
        x: textX,
        y,
        w: textW * (0.6 + rng() * 0.4),
        h: lineH,
        r: 3,
      });
      y += lineH + 4;
    }
  } else {
    const colGap = 4;
    const colW = (w - colGap) / 2;
    const rowH = h * 0.25;
    let y = y0;

    for (let rIdx = 0; rIdx < 3; rIdx++) {
      if (y + rowH > y0 + h) break;

      blocks.push({
        x: x0,
        y,
        w: colW * (0.8 + rng() * 0.2),
        h: rowH * (0.7 + rng() * 0.3),
        r: 3,
      });

      blocks.push({
        x: x0 + colW + colGap,
        y: y + rowH * 0.1,
        w: colW * (0.6 + rng() * 0.3),
        h: rowH * (0.6 + rng() * 0.3),
        r: 3,
      });

      y += rowH + 4;
    }
  }

  return blocks;
}
