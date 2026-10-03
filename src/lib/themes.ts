// ─────────────────────────────────────────────────────────────
// Abstra Pro palettes — verbatim from
// app/src/main/java/dev/abstra/pro/ui/theme/Color.kt
// The website's default visual direction is Midnight Room.
// ─────────────────────────────────────────────────────────────

export type Palette = {
  key: string;
  name: string;
  dark: boolean;
  bgBase: string;
  bgSurface: string;
  surfaceAlt: string;
  primary: string;
  primaryStrong: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  border: string;
  heart: string;
};

export const PALETTES: Palette[] = [
  {
    key: "midnight-room",
    name: "Midnight Room",
    dark: true,
    bgBase: "#1D1A2D",
    bgSurface: "#201D30",
    surfaceAlt: "#40273F",
    primary: "#E5819E",
    primaryStrong: "#BC8390",
    textHeading: "#FCE4EA",
    textBody: "#C79AAE",
    textMuted: "#766080",
    border: "#4A3960",
    heart: "#FBB3BA",
  },
  {
    key: "cotton-candy",
    name: "Cotton Candy",
    dark: false,
    bgBase: "#FDE6EE",
    bgSurface: "#FFF0F5",
    surfaceAlt: "#FAD2E1",
    primary: "#F06FA0",
    primaryStrong: "#E14E86",
    textHeading: "#702444",
    textBody: "#B0567E",
    textMuted: "#DCA0BC",
    border: "#F5BDD3",
    heart: "#FF4D7E",
  },
  {
    key: "peach-blossom",
    name: "Peach Blossom",
    dark: false,
    bgBase: "#FDECEB",
    bgSurface: "#FDECE8",
    surfaceAlt: "#FDC8BA",
    primary: "#FD9692",
    primaryStrong: "#F26F62",
    textHeading: "#7A2E28",
    textBody: "#B35F52",
    textMuted: "#E3B8A8",
    border: "#FBCDB9",
    heart: "#FF6F5E",
  },
  {
    key: "milky-pink",
    name: "Milky Pink",
    dark: false,
    bgBase: "#FEF5F2",
    bgSurface: "#FDF1EF",
    surfaceAlt: "#FEDFDD",
    primary: "#F9A1B2",
    primaryStrong: "#EE7A91",
    textHeading: "#7A3040",
    textBody: "#B06070",
    textMuted: "#E0B8C0",
    border: "#FBD6DA",
    heart: "#F2748C",
  },
  {
    key: "night-bubble",
    name: "Night Bubble",
    dark: true,
    bgBase: "#241825",
    bgSurface: "#231B27",
    surfaceAlt: "#43283D",
    primary: "#8D517B",
    primaryStrong: "#FDC4DC",
    textHeading: "#FDEAF2",
    textBody: "#D9A8C4",
    textMuted: "#8A6B85",
    border: "#4A3548",
    heart: "#FF5FA0",
  },
  {
    key: "vintage-tape",
    name: "Vintage Tape",
    dark: true,
    bgBase: "#352423",
    bgSurface: "#462E2B",
    surfaceAlt: "#50312D",
    primary: "#B9706A",
    primaryStrong: "#6A423C",
    textHeading: "#FBDDC6",
    textBody: "#D6A692",
    textMuted: "#8C6259",
    border: "#5A3B36",
    heart: "#FBBFB0",
  },
  {
    key: "amoled-black",
    name: "Amoled Black",
    dark: true,
    bgBase: "#000000",
    bgSurface: "#101010",
    surfaceAlt: "#1C1C1E",
    primary: "#F06FA0",
    primaryStrong: "#E14E86",
    textHeading: "#FFFFFF",
    textBody: "#E0E0E0",
    textMuted: "#888888",
    border: "#282828",
    heart: "#FF4D7E",
  },
];

/** Converts every color of a palette into CSS custom properties on `--m-*`. */
export function paletteVars(p: Palette): React.CSSProperties {
  return {
    "--m-bg": p.bgBase,
    "--m-surface": p.bgSurface,
    "--m-surface-alt": p.surfaceAlt,
    "--m-primary": p.primary,
    "--m-primary-strong": p.primaryStrong,
    "--m-heading": p.textHeading,
    "--m-body": p.textBody,
    "--m-muted": p.textMuted,
    "--m-border": p.border,
    "--m-heart": p.heart,
  } as React.CSSProperties;
}

export const DEFAULT_PALETTE = PALETTES[0]; // Midnight Room
