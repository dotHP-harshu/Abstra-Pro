# Abstra Pro — Product Website

Single-page product site for **Abstra Pro** (Android music player). Built to extend the
app's visual identity — every color token and mockup recreation comes from the app's
own source (`app/src/main/java/dev/abstra/pro/ui/theme/Color.kt` and
`ui/components/*`).

## Stack

- **Next.js 15** (App Router, TypeScript, static export to `out/`)
- **Tailwind CSS v4** + CSS custom properties as design tokens
- **Framer Motion** — shared reveal/variant system in `src/lib/motion.ts`,
  global reduced-motion support via `MotionProvider`
- **Lucide** icons, self-hosted Inter (variable) + Space Grotesk via Fontsource
- **ESLint** (`next/core-web-vitals`) + `tsc` for type checking

## Tokens

The site's page identity is anchored on the app's **Midnight Room** theme
(`#1D1A2D` base, `#E5819E` primary, `#FCE4EA` headings). All seven app palettes
live verbatim in `src/lib/themes.ts` and power the interactive theme showcase via
`--m-*` CSS variables.

- `src/app/globals.css` — tokens, buttons, and all mockup primitives
  (phone frame, album-art gradients from `ThematicAlbumArt.kt`, segmented tabs from
  `TopSegmentedTabs.kt`, waveform from `WaveformVisualizer.kt`, vinyl centerpiece,
  10-band EQ sliders, mini player)
- `src/components/mockups/` — HTML/CSS recreations of real app screens
  (`HomeScreen.kt`, `FullPlayerScreen.kt`, `EqualizerScreen.kt`, `LyricsScreen.kt`)

Mockups contain only features that exist in the app, and use an illustrative demo
library. Album art is procedural gradient artwork — the same approach the app uses
for tracks without embedded art.

## Project structure

```
website/
├── public/
│   ├── downloads/          # APK served directly by the site
│   └── robots.txt
├── scripts/
│   └── validate-apk.mjs    # build-gate: APK ↔ metadata consistency check
├── src/
│   ├── app/                # layout, page, globals.css, icon, sitemap
│   ├── components/         # sections + motion system + mockups/
│   └── lib/                # apk.ts + apk.data.json, motion.ts, themes.ts
├── next.config.ts          # output: "export" (static site)
└── netlify.toml            # Netlify build + security headers (Vercel needs none)
```

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # validates the APK, then static-exports into out/
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run preview    # serve the exported out/ folder for local checks
```

`npm run build` always runs `scripts/validate-apk.mjs` first: it verifies the APK
actually exists in `public/downloads/` and that its size + SHA-256 match
`src/lib/apk.data.json`. A mismatch or missing file **fails the build**, so a
broken download can never be deployed. Set `hosted: false` (and clear
`sha256`/`sizeBytes`) in `apk.data.json` to fall back to GitHub Releases links.

## Publishing a new APK version (manual, no CI)

Every APK on this site is built and published **by hand** — there is no CI step.

```bash
# 1. In the app repo (D:\abstra-pro), bump versionCode/versionName in
#    app/build.gradle.kts, then build the signed release (keystore.properties
#    must exist):
.\gradlew.bat assembleRelease

# 2. Copy the output into this site:
#    app/build/outputs/apk/release/app-release.apk
#    -> public/downloads/abstra-pro-v<new-version>.apk
#    (delete the old APK from public/downloads/)

# 3. Update src/lib/apk.data.json:
#    versionName, versionCode, fileName, path, sizeBytes, sha256, built
#    Tip: `npm run build` will compute nothing for you — sizes/hash come from
#    certutil -hashfile <apk> SHA256 and (Get-Item <apk>).Length.

# 4. npm run build — the validator proves the metadata matches the file —
#    then commit and redeploy.
```

`apk.data.json` is the single source of truth — both hero and download-section
CTAs, the version chip, size display, SHA-256 block and footer version all read
from it. With `hosted: false` the site links GitHub Releases instead.

## Deployment

Static export (`out/`), no server needed.

- **Vercel:** import the repo — defaults just work (`https://abstra-pro.vercel.app`
  is the production domain and what all metadata points to).
- **Netlify:** `netlify.toml` is included (`npm run build` → publish `out/`,
  security headers, conservative caching + correct content type for
  `/downloads/*.apk`).

## Content rules observed

- Download CTA → self-hosted APK (`public/downloads/`, verified by the build),
  with GitHub Releases as automatic fallback
- Mockup content is illustrative: generic greeting placeholder, demo library, no
  invented statistics
- No fake testimonials, store listings, or promises of future releases
- Verified facts only: Android 7.0+ (`minSdk 24`), no network permission, offline by design
