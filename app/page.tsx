"use client";

import { useEffect, useState } from "react";

const BAND_HEIGHT = 600;
const INITIAL_BANDS = 6; // render a bunch right away

type Band = { id: number; seed: number };

type SkeletonFieldProps = {
  bands: Band[];
  totalHeight: number;
  windowWidth: number;
};

function SkeletonField({ bands, totalHeight, windowWidth  }: SkeletonFieldProps) {
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    const all: Frame[] = [];

    bands.forEach((band, index) => {
      const offsetY = index * BAND_HEIGHT;
      const bandFrames = generateFrames(band.seed, offsetY, windowWidth);
      all.push(...bandFrames);
    });

    setFrames(all);
  }, [bands, windowWidth]);

  return (
    <svg
      width="100%"
      height={totalHeight}
      viewBox={`0 0 1000 ${totalHeight}`}
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.14,
      }}
    >
      <g fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7">
        {frames.map((frame, i) => (
          <g key={i}>
            <rect
              x={frame.outline.x}
              y={frame.outline.y}
              width={frame.outline.w}
              height={frame.outline.h}
              rx={frame.outline.r}
              ry={frame.outline.r}
            />
            {frame.inner.map((b, j) => (
              <rect
                key={j}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx={b.r}
                ry={b.r}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}


function createBand(id: number): Band {
  return { id, seed: Math.random() * 1e9 };
}

export default function Home() {
  const [bands, setBands] = useState<Band[]>(() =>
    Array.from({ length: INITIAL_BANDS }, (_, i) => createBand(i))
  );

    // track window width for responsive background density
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

    useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add more bands as we approach the bottom – true infinite scroll
  useEffect(() => {
    function onScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      if (distanceFromBottom < BAND_HEIGHT) {
        setBands((prev) => {
          const nextId = prev.length;
          return [...prev, createBand(nextId)];
        });
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalHeight = bands.length * BAND_HEIGHT;
  const gridWidth = windowWidth ?? 1200; // sensible default

  return (
    <main
      style={{
        position: "relative",
        minHeight: totalHeight,
        backgroundColor: "#050509",
        color: "white",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      {/* BACKGROUND */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: totalHeight,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <SkeletonField
          bands={bands}
          totalHeight={totalHeight}
          windowWidth={gridWidth}
        />
      </div>


      {/* HERO – sits in the upper third-ish of the viewport */}
      <section
        style={{
          minHeight: "100vh",
          padding: "3.5rem 1.5rem 5rem", // top / sides / bottom
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // not vertically centered
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* vignette behind hero card */}
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: "60vh",
            background:
              "radial-gradient(circle, rgba(0,0,0,0.35), rgba(0,0,0,0))",
            filter: "blur(40px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            backgroundColor: "#050509",
            padding: "3rem 3.5rem",
            borderRadius: "28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 120px -20px rgba(0,0,0,0.85)",
            maxWidth: "640px",
            width: "90%",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src="/m-logo.png"
            alt="m0saic logo"
            style={{
              width: "190px",
              height: "auto",
              marginBottom: "1.25rem",
            }}
          />

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              marginBottom: "0.6rem",
            }}
          >
            m0saic
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "640px",
              margin: "0 auto 1.25rem",
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            A declarative engine for building video mosaics, grids, and
            split-screen compositions.
          </p>

          <p
            style={{
              fontSize: "0.98rem",
              maxWidth: "520px",
              margin: "0 auto",
              opacity: 0.7,
              lineHeight: 1.6,
            }}
          >
            Built for developers and creators who want precise, repeatable
            layouts without fighting a timeline.
          </p>

          <p
            style={{
              marginTop: "2.5rem",
              fontSize: "0.9rem",
              opacity: 0.45,
            }}
          >
            v1 coming soon · Made with ❤️ in NYC
          </p>
        </div>
      </section>
    </main>
  );
}

/* ---------- background skeletons ---------- */

type Block = { x: number; y: number; w: number; h: number; r: number };

type Frame = {
  outline: Block;
  inner: Block[];
};
/* ---------- layout generator ---------- */

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

function generateFrames(seed: number, offsetY: number, windowWidth: number): Frame[] {
  const rng = makeRng(seed);
  const frames: Frame[] = [];

  const marginX = 24;          // was 24 – hug the edges more
  const marginY = 10;
  const innerWidth = 1000 - marginX * 2;
  const innerHeight = BAND_HEIGHT - marginY * 2;

    // 🔹 Responsive column count – *more* columns on smaller screens
  let cols: number;
    let rows = 5;

  if (windowWidth <= 480) {
    // small phones – skinny cards
    cols = 11;
  } else if (windowWidth <= 768) {
    // large phones / small tablets
    cols = 9;
  } else if (windowWidth <= 1200) {
    // laptops
    cols = 8;
  } else if (windowWidth <= 1600) {
    // big desktops
    cols = 9;
  } else {
    // ultra-wide
    cols = 9;
    rows = 6;
  }

   const gapX = windowWidth <= 768 ? 12 : 16;         // was 20 – slightly tighter
  const gapY = 24;

  const cellW = (innerWidth - gapX * (cols - 1)) / cols;
  const cellH = (innerHeight - gapY * (rows - 1)) / rows;

    // 🔹 Responsive skipChance instead of hard-coded 0.04
  let skipChance: number;
  if (windowWidth <= 600) {
    skipChance = 0.04;    // dense on phones
  } else if (windowWidth <= 1200) {
    skipChance = 0.06;    // tablets / small laptops
  } else if (windowWidth <= 1600) {
    skipChance = 0.08;    // normal desktops
  } else {
    skipChance = 0.10;    // big/ultra-wide
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (rng() < skipChance) continue; // small skip rate for organic feel

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

  // pick a layout variant
  const variant = Math.floor(rng() * 3);

  if (variant === 0) {
    // Variant A: title bar + 3 lines
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
    // Variant B: left thumbnail + stacked text
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
    // Variant C: 2 columns of smaller tiles
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
