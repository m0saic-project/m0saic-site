"use client";

import { useEffect, useMemo, useState } from "react";
import { BAND_HEIGHT, INITIAL_BANDS, type Band } from "./types";

function createBand(id: number): Band {
  return { id, seed: Math.random() * 1e9 };
}

export function useInfiniteBands(opts?: {
  enabled?: boolean;
  initialBands?: number;
}) {
  const enabled = opts?.enabled ?? true;
  const initialBands = opts?.initialBands ?? INITIAL_BANDS;

  const [bands, setBands] = useState<Band[]>(() =>
    Array.from({ length: initialBands }, (_, i) => createBand(i))
  );

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled]);

  const totalHeight = useMemo(() => bands.length * BAND_HEIGHT, [bands.length]);
  const gridWidth = windowWidth ?? 1200;

  return { bands, totalHeight, gridWidth };
}
