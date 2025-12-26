"use client";

import { useEffect, useState } from "react";
import { generateFrames } from "./generator";
import type { Frame } from "./types";
import { useInfiniteBands } from "./useInfiniteBands";

function SkeletonField(props: {
  bands: { seed: number }[];
  totalHeight: number;
  windowWidth: number;
  opacity: number;
}) {
  const { bands, totalHeight, windowWidth, opacity } = props;
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    const all: Frame[] = [];
    bands.forEach((band, index) => {
      const offsetY = index * 600;
      all.push(...generateFrames(band.seed, offsetY, windowWidth));
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
        opacity,
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

export function SkeletonBackground(props: {
  opacity?: number;
  enabledInfiniteScroll?: boolean;
}) {
  const opacity = props.opacity ?? 0.14;
  const enabledInfiniteScroll = props.enabledInfiniteScroll ?? true;

  const { bands, totalHeight, gridWidth } = useInfiniteBands({
    enabled: enabledInfiniteScroll,
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        height: totalHeight,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <SkeletonField
        bands={bands}
        totalHeight={totalHeight}
        windowWidth={gridWidth}
        opacity={opacity}
      />
    </div>
  );
}
