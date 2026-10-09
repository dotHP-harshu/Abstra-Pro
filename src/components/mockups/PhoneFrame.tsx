import { paletteVars, type Palette, DEFAULT_PALETTE } from "@/lib/themes";

type PhoneFrameProps = {
  palette?: Palette;
  children: React.ReactNode;
  className?: string;
};

/** Device shell. Every color inside reads from --m-* tokens set from the real
 *  app palettes (themes.ts). Status bar + dynamic island, Android-style. */
export default function PhoneFrame({
  palette = DEFAULT_PALETTE,
  children,
  className,
}: PhoneFrameProps) {
  return (
    <div
      className={`phone ${className ?? ""}`}
      style={paletteVars(palette)}
    >
      <div className="phone-screen">
        {/* Status bar */}
        <div
          className="relative z-10 flex items-center justify-between px-6 pt-3 pb-1 text-[10.5px] font-semibold"
          style={{ color: "var(--m-heading)" }}
        >
          <span className="tracking-wide">21:30</span>
          {/* dynamic island / punch-hole camera */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-3 h-[13px] w-[13px] -translate-x-1/2 rounded-full"
            style={{ background: "#0b0810", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.03)" }}
          />
          <span className="flex items-center gap-1.5" style={{ color: "var(--m-body)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M2 20h3v-6H2v6zm5 0h3V10H7v10zm5 0h3V6h-3v14zm5 0h3V2h-3v18z" />
            </svg>
            <svg width="13" height="9" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="1" y="2" width="18" height="12" rx="3.5" />
              <rect x="3.5" y="4.5" width="10" height="7" rx="2" fill="currentColor" stroke="none" />
              <path d="M21 6v4" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {children}

        {/* gesture nav bar */}
        <div
          aria-hidden="true"
          className="absolute bottom-1.5 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-full"
          style={{
            background: "color-mix(in srgb, var(--m-heading) 35%, transparent)",
          }}
        />
      </div>
    </div>
  );
}
