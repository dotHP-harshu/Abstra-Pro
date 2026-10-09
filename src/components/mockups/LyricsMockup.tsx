import { ChevronDown, Quote } from "lucide-react";
import type { Palette } from "@/lib/themes";
import { DEFAULT_PALETTE, paletteVars } from "@/lib/themes";

const LINES = [
  { text: "City lights blur into one long line", state: "past" },
  { text: "Every heartbeat set to rewind", state: "active" },
  { text: "We were never meant to slow down", state: "next" },
  { text: "But the morning keeps its time", state: "later" },
  { text: "And the tape keeps rolling on", state: "later" },
  { text: "Rolling on", state: "later" },
];

/** Recreation of LyricsScreen.kt — synced lyrics, active line palette-tinted. */
export default function LyricsMockup({
  palette = DEFAULT_PALETTE,
  className,
}: {
  palette?: Palette;
  className?: string;
}) {
  return (
    <div
      className={`m flex flex-col overflow-hidden rounded-[26px] border h-[520px] ${className ?? ""}`}
      style={{
        ...paletteVars(palette),
        background: "var(--m-bg)",
        borderColor: "var(--m-border)",
        boxShadow: "0 40px 90px -30px rgba(0,0,0,0.65)",
      }}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="m grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--m-surface)" }}>
          <ChevronDown size={15} style={{ color: "var(--m-heading)" }} />
        </div>
        <p className="m text-[10px] font-bold" style={{ color: "var(--m-heading)" }}>
          Aurora Drift — Kai Nakamura
        </p>
        <Quote size={13} style={{ color: "var(--m-primary)" }} />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-8 text-center">
        {LINES.map((l, i) => (
          <p
            key={i}
            className="mx-auto max-w-[240px] leading-relaxed transition-colors"
            style={{
              fontSize: l.state === "active" ? 15 : 12,
              fontWeight: l.state === "active" ? 800 : 500,
              color:
                l.state === "active"
                  ? "var(--m-primary)"
                  : l.state === "next"
                    ? "var(--m-body)"
                    : "color-mix(in srgb, var(--m-muted) 75%, transparent)",
              transition: "color 0.6s ease",
            }}
          >
            {l.text}
          </p>
        ))}
      </div>

      {/* sync progress */}
      <div className="px-6 pb-5">
        <div className="h-[3px] w-full rounded-full" style={{ background: "color-mix(in srgb, var(--m-border) 70%, transparent)" }}>
          <div className="h-full w-[34%] rounded-full" style={{ background: "var(--m-primary)" }} />
        </div>
      </div>
    </div>
  );
}
