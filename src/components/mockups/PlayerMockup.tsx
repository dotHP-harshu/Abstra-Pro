"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Timer,
  SlidersHorizontal,
  Heart,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat2,
  Play,
  Pause,
} from "lucide-react";
import Waveform from "./Waveform";
import VinylCenterpiece from "./VinylCenterpiece";
import type { Palette } from "@/lib/themes";
import { DEFAULT_PALETTE, paletteVars } from "@/lib/themes";

type PlayerMockupProps = {
  palette?: Palette;
  interactive?: boolean;
  compact?: boolean;
};

const TOTAL_SECONDS = 204; // 3:24
const TRACKS = [
  { title: "Aurora Drift", artist: "Kai Nakamura", album: "Glass Sessions" },
  { title: "Velvet Hours", artist: "Cassette Club", album: "Night Foundry" },
];

/** Faithful recreation of FullPlayerScreen.kt — vinyl centerpiece, waveform,
 *  IsolatedPlaybackSlider, transport controls. Interactive by default. */
export default function PlayerMockup({
  palette = DEFAULT_PALETTE,
  interactive = true,
  compact = false,
}: PlayerMockupProps) {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(true);
  const [track, setTrack] = useState(0);
  const [position, setPosition] = useState(38);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setPosition((p) => (p + 1) % TOTAL_SECONDS);
    }, 1000);
    return () => clearInterval(t);
  }, [playing]);

  const toggle = () => setPlaying((v) => !v);

  // track change on skip
  const skip = (dir: 1 | -1) => {
    setTrack((t) => (t + dir + TRACKS.length) % TRACKS.length);
    setPosition(0);
  };

  const s = TRACKS[track];
  const fmt = (v: number) => `${Math.floor(v / 60)}:${String(v % 60).padStart(2, "0")}`;
  const pct = (position / TOTAL_SECONDS) * 100;

  const scale = compact ? 0.92 : 1;
  const heartColor = liked ? "var(--m-heart)" : "color-mix(in srgb, var(--m-body) 70%, transparent)";

  return (
    <div
      className="flex flex-1 flex-col"
      style={{ ...paletteVars(palette), fontSize: `${scale}rem` }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-3">
        <button
          aria-label="Collapse player"
          className="m grid h-9 w-9 place-items-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--m-surface) 85%, transparent)" }}
        >
          <ChevronDown size={18} style={{ color: "var(--m-heading)" }} />
        </button>
        <div
          className="m flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold"
          style={{ background: "color-mix(in srgb, var(--m-surface) 85%, transparent)", borderColor: "var(--m-border)", color: "var(--m-heading)" }}
        >
          <Timer size={12} style={{ color: "var(--m-body)" }} /> Timer
        </div>
        <button
          aria-label="Audio effects"
          className="m grid h-9 w-9 place-items-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--m-surface) 85%, transparent)" }}
        >
          <SlidersHorizontal size={15} style={{ color: "var(--m-primary)" }} />
        </button>
      </div>

      {/* Vinyl centerpiece — VinylRecordCenterpiece.kt, exact recreation */}
      <div className={`flex flex-1 items-center justify-center ${compact ? "" : "py-2"}`}>
        <VinylCenterpiece playing={playing} size={compact ? 150 : 205} />
      </div>

      {/* Track metadata + favorite */}
      <div className="flex items-center justify-between gap-3 px-5">
        <div className="min-w-0">
          <p
            className="cut m font-bold"
            style={{ color: "var(--m-heading)", fontSize: compact ? 15 : 18, letterSpacing: "-0.01em" }}
          >
            {s.title}
          </p>
          <p className="cut m text-[11px]" style={{ color: "var(--m-body)" }}>
            {s.artist} • {s.album}
          </p>
        </div>
        <button
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={liked}
          onClick={interactive ? () => setLiked((v) => !v) : undefined}
          tabIndex={interactive ? 0 : -1}
          className="relative m grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--m-surface) 90%, transparent)" }}
        >
          <Heart
            size={17}
            fill={liked ? "var(--m-heart)" : "transparent"}
            style={{ color: heartColor, transition: "color 0.3s ease, fill 0.3s ease" }}
          />
        </button>
      </div>

      {/* Waveform */}
      <div className={`m ${compact ? "mx-5 mt-3 h-[26px]" : "mx-5 mt-4 h-[38px]"}`}>
        <Waveform playing={playing} barCount={compact ? 22 : 28} />
      </div>

      {/* Progress — IsolatedPlaybackSlider.kt */}
      <div className="px-5">
        <div className="relative h-[5px] w-full rounded-full" style={{ background: "color-mix(in srgb, var(--m-border) 75%, transparent)" }}>
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(to right, var(--m-primary-strong), var(--m-primary))",
            }}
          />
          <div
            className="absolute top-1/2 h-3.5 w-3.5 rounded-full"
            style={{
              left: `calc(${pct}% - 7px)`,
              transform: "translateY(-50%)",
              background: "var(--m-heading)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.45)",
            }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[9.5px] font-semibold" style={{ color: "var(--m-muted)" }}>
          <span>{fmt(position)}</span>
          <span>{fmt(TOTAL_SECONDS)}</span>
        </div>
      </div>

      {/* Transport controls */}
      <div className="flex items-center justify-between px-7 pb-6 pt-2">
        <button aria-label="Shuffle" className="m cursor-pointer" tabIndex={interactive ? 0 : -1}>
          <Shuffle size={compact ? 17 : 20} style={{ color: "var(--m-muted)" }} />
        </button>
        <button aria-label="Previous track" className="m cursor-pointer" tabIndex={interactive ? 0 : -1} onClick={interactive ? () => skip(-1) : undefined}>
          <SkipBack size={compact ? 22 : 27} fill="currentColor" style={{ color: "var(--m-heading)" }} />
        </button>
        <button
          aria-label={playing ? "Pause" : "Play"}
          aria-pressed={playing}
          aria-disabled={!interactive || undefined}
          onClick={interactive ? toggle : undefined}
          tabIndex={interactive ? 0 : -1}
          className="play-btn m grid h-[52px] w-[52px] cursor-pointer place-items-center rounded-full"
          style={{
            background: "var(--m-primary)",
            boxShadow: "0 12px 30px -8px color-mix(in srgb, var(--m-primary) 55%, transparent)",
            transition: "transform 0.2s ease, background-color 0.6s ease",
          }}
        >
          {playing ? (
            <Pause size={20} fill="white" color="white" />
          ) : (
            <Play size={20} fill="white" color="white" className="translate-x-[2px]" />
          )}
        </button>
        <button aria-label="Next track" className="m cursor-pointer" tabIndex={interactive ? 0 : -1} onClick={interactive ? () => skip(1) : undefined}>
          <SkipForward size={compact ? 22 : 27} fill="currentColor" style={{ color: "var(--m-heading)" }} />
        </button>
        <button aria-label="Repeat" className="m cursor-pointer" tabIndex={interactive ? 0 : -1}>
          <Repeat2 size={compact ? 17 : 20} style={{ color: "var(--m-primary)" }} />
        </button>
      </div>
    </div>
  );
}
