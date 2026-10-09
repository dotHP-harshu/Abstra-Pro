import { Music2, Sparkles, Play } from "lucide-react";

/* Deterministic demo library — mirrors the app's own demo tracks (procedural
   ThematicAlbumArt gradients, no external artwork). Illustrative only. */
const RECENT = [
  { t: "Aurora Drift", a: "Kai Nakamura", g: 1 },
  { t: "Paper Hearts", a: "Lullaby Youth", g: 2 },
  { t: "Velvet Hours", a: "Cassette Club", g: 3 },
  { t: "Neon Rain", a: "JuneScala", g: 4 },
  { t: "Glass River", a: "Mona Vale", g: 5 },
  { t: "Slow Motion", a: "Kai Nakamura", g: 6 },
  { t: "Blue Static", a: "Fieldnote", g: 2 },
];

const MIXES = [
  {
    title: "Late Night Drive",
    subtitle: "Built from your evening listening",
    bg: "linear-gradient(120deg, #8D517B, #E5819E)",
  },
  {
    title: "Discovery Mix",
    subtitle: "Deep cuts from your library",
    bg: "linear-gradient(120deg, #E5819E, #CCB0E9)",
  },
  {
    title: "Morning Calm",
    subtitle: "Soft picks for your first hour",
    bg: "linear-gradient(120deg, #B9706A, #FD9692)",
  },
];

export default function HomeMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Segmented tabs — TopSegmentedTabs.kt, Home active */}
      <div className="px-4 pt-2">
        <div className="tabs m">
          <div
            className="tabs-indicator"
            style={
              {
                "--tab-w": "calc((100% - 6px) / 5)",
                left: "3px",
              } as React.CSSProperties
            }
          />
          {["Home", "Songs", "Playlists", "Folders", "Settings"].map((t, i) => (
            <span key={t} data-active={i === 0} style={{ position: "relative", zIndex: 1 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex-1 space-y-4 overflow-hidden px-4 pb-28">
        {/* Greeting hero card (GreetingHeroCard.kt) */}
        <div
          className="m rounded-[22px] border p-4"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--m-primary) 24%, var(--m-surface)), var(--m-surface) 82%)",
            borderColor: "var(--m-border)",
            boxShadow: "0 8px 24px -12px color-mix(in srgb, var(--m-primary) 30%, transparent)",
          }}
        >
          <p
            className="font-display m text-[17px] font-bold tracking-tight"
            style={{ color: "var(--m-heading)", letterSpacing: "-0.03em" }}
          >
            Good evening
          </p>
          <p
            className="m mt-0.5 text-[13px]"
            style={{
              color: "var(--m-primary)",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.16em",
              fontWeight: 500,
            }}
          >
            Your Name
          </p>
        </div>

        {/* Recently played */}
        <div>
          <p className="m text-[9.5px] font-extrabold" style={{ color: "var(--m-heading)", letterSpacing: "0.05em" }}>
            RECENTLY PLAYED
          </p>
          <div className="-mx-4 mt-2 flex gap-3 overflow-hidden px-4">
            {RECENT.map((s, i) => (
              <div key={i} className="w-[92px] shrink-0">
                <div
                  className={`art art-g${s.g} m`}
                  style={{ aspectRatio: "1", borderRadius: 16, boxShadow: "0 8px 20px -10px color-mix(in srgb, var(--m-primary) 25%, transparent)" }}
                >
                  <Music2 size={24} strokeWidth={1.6} />
                </div>
                <p className="cut m mt-1.5 text-[10.5px] font-bold" style={{ color: "var(--m-heading)" }}>
                  {s.t}
                </p>
                <p className="cut m text-[9px]" style={{ color: "var(--m-muted)" }}>
                  {s.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Smart Mixes */}
        <div>
          <div className="flex items-center justify-between">
            <p className="m flex items-center gap-1.5 text-[9.5px] font-extrabold" style={{ color: "var(--m-heading)", letterSpacing: "0.05em" }}>
              <Sparkles size={12} style={{ color: "var(--m-primary-strong)" }} /> AI SMART MIXES
            </p>
            <p className="m text-[8.5px] font-semibold" style={{ color: "var(--m-primary-strong)" }}>
              On-Device
            </p>
          </div>
          <div className="-mx-4 mt-2 flex gap-3 overflow-hidden px-4">
            {MIXES.map((m) => (
              <div
                key={m.title}
                className="m flex h-[86px] w-[150px] shrink-0 flex-col justify-between rounded-[18px] p-3"
                style={{ background: m.bg, boxShadow: "0 10px 26px -10px rgba(0,0,0,0.4)" }}
              >
                <p className="text-[11px] font-extrabold text-white">{m.title}</p>
                <div>
                  <p className="text-[8.5px] leading-snug text-white/85">{m.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Most played */}
        <div>
          <p className="m text-[9.5px] font-extrabold" style={{ color: "var(--m-heading)", letterSpacing: "0.05em" }}>
            MOST PLAYED
          </p>
          <div className="-mx-4 mt-2 flex gap-3 overflow-hidden px-4">
            {RECENT.slice(2, 6).map((s, i) => (
              <div key={i} className="w-[92px] shrink-0">
                <div
                  className={`art art-g${s.g} m`}
                  style={{ aspectRatio: "1", borderRadius: 16, boxShadow: "0 8px 20px -10px color-mix(in srgb, var(--m-primary) 25%, transparent)" }}
                >
                  <Music2 size={24} strokeWidth={1.6} />
                </div>
                <p className="cut m mt-1.5 text-[10.5px] font-bold" style={{ color: "var(--m-heading)" }}>
                  {s.t}
                </p>
                <p className="cut m text-[9px]" style={{ color: "var(--m-muted)" }}>
                  {s.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini player (MiniPlayer.kt) */}
      <div className="miniplayer m">
        <div
          className="m relative overflow-hidden rounded-[12px]"
          style={{ width: 42, height: 42 }}
        >
          <div className="art art-g6" style={{ position: "absolute", inset: 0 }} />
          <Music2 size={15} strokeWidth={1.8} className="text-white" />
        </div>
        <div>
          <p className="cut m text-[11px] font-bold" style={{ color: "var(--m-heading)" }}>
            Aurora Drift
          </p>
          <p className="cut m text-[9px]" style={{ color: "var(--m-muted)" }}>
            Kai Nakamura
          </p>
          <div className="mini-progress">
            <i style={{ width: "38%" }} />
          </div>
        </div>
        <div
          className="grid h-9 w-9 place-items-center rounded-full"
          style={{
            background: "var(--m-primary)",
            boxShadow: "0 4px 14px -4px color-mix(in srgb, var(--m-primary) 55%, transparent)",
          }}
        >
          <Play size={14} fill="white" color="white" className="translate-x-[1px]" />
        </div>
      </div>
    </div>
  );
}
