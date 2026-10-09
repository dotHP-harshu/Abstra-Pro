"use client";

import { useMemo } from "react";

type WaveformProps = {
  playing: boolean;
  barCount?: number;
  className?: string;
  color1?: string;
  color2?: string;
};

/** Faithful CSS recreation of WaveformVisualizer.kt — 28 bars,
 *  sine-driven, palette-tinted. Static (low) when idle. */
export default function Waveform({
  playing,
  barCount = 28,
  className,
  color1,
  color2,
}: WaveformProps) {
  const bars = useMemo(() => {
    const heights: number[] = [];
    for (let i = 0; i < barCount; i++) {
      const fraction = i / barCount;
      // Deterministic pseudo-wave mirroring the app's sin(fraction * 4π) envelope
      const wave = Math.sin(fraction * Math.PI * 6) * 0.35 + 0.55;
      // round to dodge server/client float drift (hydration mismatch)
      heights.push(Math.min(1, Math.max(0.14, wave)));
      heights[i] = Math.round(heights[i] * 200) / 200;
    }
    return heights;
  }, [barCount]);

  return (
    <div
      aria-hidden="true"
      className={`waveform m ${playing ? "playing" : ""} ${className ?? ""}`}
      style={
        color1
          ? ({ "--w1": color1, "--w2": color2 ?? color1 } as React.CSSProperties)
          : undefined
      }
    >
      {bars.map((h, i) => (
        <i
          key={i}
          style={{ "--h": h, "--d": `${(i % 7) * 0.18}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
