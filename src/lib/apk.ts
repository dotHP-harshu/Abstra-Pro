import data from "./apk.data.json";

/**
 * The APK served directly from this website (public/downloads/).
 *
 * Values live in ./apk.data.json so the build-time validator
 * (scripts/validate-apk.mjs) and the site read the exact same source.
 *
 * When you release a new version, update BOTH:
 *   1. `app/build.gradle.kts` versionCode / versionName
 *   2. `src/lib/apk.data.json`
 * and copy the freshly built APK into `public/downloads/` with the new
 * file name. No CI involved — versions are always published by hand.
 *
 * Set `hosted` to false (and clear sha256/sizeBytes) when no APK exists yet:
 * every download CTA then falls back to GitHub Releases and the build
 * stops requiring a local file.
 */
export interface ApkMeta {
  hosted: boolean;
  versionName: string;
  versionCode: number;
  fileName: string;
  /** Download path relative to the site root. */
  path: string;
  sizeBytes: number;
  sha256: string;
  built: string;
  minAndroid: string;
}

export const APK: ApkMeta = data as ApkMeta;

export const APK_LABEL_VERSION = `v${APK.versionName}`;
export const APK_LABEL_SIZE =
  APK.sizeBytes > 0 ? `${(APK.sizeBytes / (1024 * 1024)).toFixed(1)} MB` : null;
/** Direct site download when hosted; otherwise GitHub Releases handles it. */
export const APK_DOWNLOAD_URL = APK.hosted ? APK.path : null;
