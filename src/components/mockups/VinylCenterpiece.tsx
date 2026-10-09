/* ─────────────────────────────────────────────────────────────
   VinylRecordCenterpiece.kt — pixel-faithful SVG recreation.
   Source: app/src/main/java/dev/abstra/pro/ui/components/
           PlayerCenterpieces.kt + Illustrations.kt
   - Black LP (#19161E) with 6 groove rings + two gloss fans
   - Pink label (#FFB3D1) w/ themed album-art gradient + spindle hole
   - Turntable tonearm (top-right), ♪ + sparkle (top-left)
   - Plush teddy bear (bottom-left), floating heart gem (bottom-right)
   ───────────────────────────────────────────────────────────── */

const BOX = 280;               // app: 280dp
const VINYL_R = (BOX * 0.9) / 2; // fillMaxSize(0.90f) → r 126
const LABEL_R = VINYL_R * 0.52; // fillMaxSize(0.52f) → r 65.5

const ART_C1 = "#E5819E";
const ART_C2 = "#D7BFF3";

/** 4-point sparkle star (Illustrations.kt `SparkleStarIcon`). */
function starPath(cx: number, cy: number, r: number) {
  return [
    `M${cx} ${cy - r}`,
    `C${cx} ${cy} ${cx} ${cy} ${cx + r} ${cy}`,
    `C${cx} ${cy} ${cx} ${cy} ${cx} ${cy + r}`,
    `C${cx} ${cy} ${cx} ${cy} ${cx - r} ${cy}`,
    `C${cx} ${cy} ${cx} ${cy} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

type VinylCenterpieceProps = {
  size?: number;
  playing?: boolean;
};

export default function VinylCenterpiece({
  size = 216,
  playing = false,
}: VinylCenterpieceProps) {
  return (
    <svg
      viewBox={`0 0 ${BOX} ${BOX}`}
        width={size}
        height={size}
        role="img"
        aria-label="Spinning vinyl record player"
        style={{ overflow: "visible", maxWidth: "100%" }}
      >
        <defs>
          <clipPath id="vinyl-label-clip">
            <circle cx={BOX / 2} cy={BOX / 2} r={LABEL_R} />
          </clipPath>
          <linearGradient id="vinyl-label-art" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={ART_C1} />
            <stop offset="0.6" stopColor={ART_C2} />
            <stop offset="1" stopColor="var(--m-bg)" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Floating music notes — top-left (offset 8dp, 6dp) */}
        <text
          x={8}
          y={26}
          fontSize={26}
          fontWeight={700}
          fill="var(--m-primary-strong)"
        >
          ♪
        </text>
        <path d={starPath(38, 16, 5.4)} fill="var(--m-primary)" />

        {/* Spinning black vinyl — only the record rotates, exactly as the app */}
        <g
          className={`spin ${playing ? "is-playing" : ""}`}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            filter: "drop-shadow(0 16px 16px rgba(0,0,0,0.53))",
          }}
        >
          {/* LP body + rim */}
          <circle
            cx={BOX / 2}
            cy={BOX / 2}
            r={VINYL_R - 2}
            fill="#19161E"
            stroke="#332B3A"
            strokeWidth={4}
          />
          {/* Grooves (0.92 → 0.62 of r) */}
          {[0.92, 0.86, 0.8, 0.74, 0.68, 0.62].map((f) => (
            <circle
              key={f}
              cx={BOX / 2}
              cy={BOX / 2}
              r={VINYL_R * f}
              fill="none"
              stroke="rgba(68,56,78,0.2)"
              strokeWidth={1.5}
            />
          ))}
          {/* Glossy 4-point reflections */}
          <path
            d={`M${BOX / 2} ${BOX / 2} L${BOX / 2 + 126 * 0.45} ${BOX / 2 - 126 * 0.2} L${BOX / 2 + 126 * 0.35} ${BOX / 2 - 126 * 0.4} Z`}
            fill="rgba(255,255,255,0.157)"
          />
          <path
            d={`M${BOX / 2} ${BOX / 2} L${BOX / 2 - 126 * 0.45} ${BOX / 2 + 126 * 0.2} L${BOX / 2 - 126 * 0.35} ${BOX / 2 + 126 * 0.4} Z`}
            fill="rgba(255,255,255,0.157)"
          />
          {/* Pink center label w/ themed album art */}
          <circle
            cx={BOX / 2}
            cy={BOX / 2}
            r={LABEL_R}
            fill="#FFB3D1"
            stroke="var(--m-primary-strong)"
            strokeWidth={2.5}
          />
          <g clipPath="url(#vinyl-label-clip)">
            <rect
              x={BOX / 2 - LABEL_R}
              y={BOX / 2 - LABEL_R}
              width={LABEL_R * 2}
              height={LABEL_R * 2}
              fill="url(#vinyl-label-art)"
            />
            <circle
              cx={BOX / 2 + LABEL_R * 0.6}
              cy={BOX / 2 - LABEL_R * 0.6}
              r={LABEL_R * 0.45}
              fill="rgba(255,255,255,0.22)"
            />
            <circle
              cx={BOX / 2 - LABEL_R * 0.6}
              cy={BOX / 2 + LABEL_R * 0.6}
              r={LABEL_R * 0.35}
              fill="rgba(255,255,255,0.15)"
            />
          </g>
          {/* White note on the label (ThematicAlbumArt fallback icon) */}
          <text
            x={BOX / 2}
            y={BOX / 2 + 12}
            fontSize={36}
            fontWeight={500}
            fill="rgba(255,255,255,0.85)"
            textAnchor="middle"
          >
            ♪
          </text>
          {/* Spindle hole (16dp, white ring) */}
          <circle
            cx={BOX / 2}
            cy={BOX / 2}
            r={8}
            fill="#19161E"
            stroke="#FFFFFF"
            strokeWidth={1.5}
          />
        </g>

        {/* ── Turntable tonearm — top-right (110dp, offset 6/-4) ── */}
        <g transform={`translate(${BOX - 110 + 6}, -4)`}>
          <circle cx={110 * 0.85} cy={110 * 0.18} r={110 * 0.12} fill="#E5C8D4" />
          <circle cx={110 * 0.85} cy={110 * 0.18} r={110 * 0.07} fill="#F06FA0" />
          <path
            d={`M${110 * 0.85} ${110 * 0.18} L${110 * 0.58} ${110 * 0.55} L${110 * 0.48} ${110 * 0.82}`}
            stroke="#E8D0DC"
            strokeWidth={4.5}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M${110 * 0.48} ${110 * 0.82} L${110 * 0.38} ${110 * 0.95} L${110 * 0.3} ${110 * 0.9} L${110 * 0.42} ${110 * 0.78} Z`}
            fill="#FF85B3"
            stroke="#E14E86"
            strokeWidth={1.5}
          />
        </g>

        {/* ── Plush teddy bear — bottom-left (62dp, offset 2/4) ── */}
        <g transform={`translate(2, ${BOX - 62 + 4})`}>
          <circle cx={62 * 0.28} cy={62 * 0.28} r={62 * 0.16} fill="#F7B0CD" />
          <circle cx={62 * 0.28} cy={62 * 0.28} r={62 * 0.09} fill="#FF85B3" />
          <circle cx={62 * 0.72} cy={62 * 0.28} r={62 * 0.16} fill="#F7B0CD" />
          <circle cx={62 * 0.72} cy={62 * 0.28} r={62 * 0.09} fill="#FF85B3" />
          <circle cx={31} cy={62 * 0.52} r={62 * 0.38} fill="#FFC5DC" />
          <ellipse cx={31} cy={62 * 0.59} rx={62 * 0.14} ry={62 * 0.11} fill="#FFFFFF" />
          <ellipse cx={31} cy={62 * 0.56} rx={62 * 0.06} ry={62 * 0.04} fill="#6B223D" />
          <circle cx={62 * 0.36} cy={62 * 0.44} r={3.5} fill="#6B223D" />
          <circle cx={62 * 0.64} cy={62 * 0.44} r={3.5} fill="#6B223D" />
          <circle cx={62 * 0.35} cy={62 * 0.43} r={1.2} fill="#FFFFFF" />
          <circle cx={62 * 0.63} cy={62 * 0.43} r={1.2} fill="#FFFFFF" />
          <circle cx={62 * 0.27} cy={62 * 0.56} r={5} fill="rgba(255,77,126,0.4)" />
          <circle cx={62 * 0.73} cy={62 * 0.56} r={5} fill="rgba(255,77,126,0.4)" />
        </g>

        {/* ── Floating heart gem — bottom-right (32dp, offset 6/2) ── */}
        <g transform={`translate(${BOX - 32 + 6}, ${BOX - 32 + 2})`}>
          <path
            d="M16 25.4 C5.2 17.3 2.56 12.15 9.28 5.79 C13.85 3.9 16 10.6 16 10.6 C16 10.6 18.15 3.9 22.7 5.79 C29.44 12.15 26.7 17.3 16 25.4 Z"
            fill="#FF85B3"
            stroke="#FFFFFF"
            strokeWidth={1.2}
          />
          <circle cx={32 * 0.38} cy={32 * 0.35} r={32 * 0.12} fill="rgba(255,255,255,0.6)" />
        </g>
      </svg>
  );
}
