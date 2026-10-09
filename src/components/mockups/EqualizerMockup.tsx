import { X, ChevronDown, Dices, Save } from "lucide-react";
import type { Palette } from "@/lib/themes";
import { DEFAULT_PALETTE, paletteVars } from "@/lib/themes";

const BANDS = [
  { label: "31", v: 58 },
  { label: "62", v: 54 },
  { label: "125", v: 46 },
  { label: "250", v: 42 },
  { label: "500", v: 46 },
  { label: "1k", v: 52 },
  { label: "2k", v: 56 },
  { label: "4k", v: 60 },
  { label: "8k", v: 54 },
  { label: "16k", v: 48 },
];

/** Recreation of EqualizerScreen.kt — 10-band slider column, preset bar,
 *  and the row cards for the rest of the DSP suite. */
export default function EqualizerMockup({
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
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="m grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--m-surface)" }}>
          <X size={15} style={{ color: "var(--m-heading)" }} />
        </div>
        <p className="m text-[14px] font-bold" style={{ color: "var(--m-heading)" }}>
          DSP Audio Effects
        </p>
        {/* master switch */}
        <div className="flex items-center gap-1.5">
          <div className="relative h-5 w-9 rounded-full" style={{ background: "var(--m-primary)" }}>
            <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-4">
        {/* preset bar */}
        <div
          className="m flex items-center justify-between rounded-[16px] border px-4 py-2.5"
          style={{ background: "var(--m-surface)", borderColor: "var(--m-border)" }}
        >
          <div>
            <p className="m text-[9px] font-semibold" style={{ color: "var(--m-body)" }}>
              EQ Preset
            </p>
            <p className="m text-[13px] font-bold" style={{ color: "var(--m-primary)" }}>
              Late Night
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dices size={15} style={{ color: "var(--m-primary-strong)" }} />
            <Save size={15} style={{ color: "var(--m-primary-strong)" }} />
            <ChevronDown size={15} style={{ color: "var(--m-primary-strong)" }} />
          </div>
        </div>

        {/* 10-band equalizer */}
        <div
          className="m flex-1 rounded-[16px] border px-4 py-4"
          style={{ background: "var(--m-surface)", borderColor: "var(--m-border)", minHeight: 170 }}
        >
          <div className="flex h-full items-stretch justify-between gap-1.5">
            {BANDS.map((b) => (
              <div key={b.label} className="eq-band m" style={{ minWidth: 0 }}>
                <p className="mb-1 text-[8px] font-bold" style={{ color: "var(--m-body)" }}>
                  {b.v - 50 > 0 ? "+" : ""}{b.v - 50}dB
                </p>
                <div className="eq-track m" style={{ width: "12px" }}>
                  <div className="eq-fill" style={{ "--v": `${b.v}%` } as React.CSSProperties} />
                  <div className="eq-knob" style={{ "--v": `${b.v}%` } as React.CSSProperties} />
                </div>
                <p className="eq-label m">{b.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* dsp suite rows */}
        {[
          { name: "Reverb", value: "Concert Hall" },
          { name: "Balance", value: "Center" },
          { name: "Loudness", value: "+60dB" },
        ].map((row) => (
          <div
            key={row.name}
            className="m flex items-center justify-between rounded-[14px] border px-4 py-2.5"
            style={{ background: "var(--m-surface)", borderColor: "var(--m-border)" }}
          >
            <p className="m text-[11px] font-bold" style={{ color: "var(--m-heading)" }}>
              {row.name}
            </p>
            <p className="m flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: "var(--m-muted)" }}>
              {row.value} <ChevronDown size={11} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
