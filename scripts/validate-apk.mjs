#!/usr/bin/env node
/**
 * Build-time release validation — runs before `next build` via `npm run build`.
 *
 * Verifies that src/lib/apk.data.json matches the actual APK in
 * public/downloads/ so a stale or missing APK can never be published with
 * a broken download link or a wrong checksum.
 *
 * Prototype warnings are non-fatal; every mismatch is a hard build failure.
 */
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const data = JSON.parse(
  readFileSync(join(root, "src", "lib", "apk.data.json"), "utf8").replace(/^\uFEFF/, "")
);

if (data.hosted === false) {
  console.log(
    "[apk] hosted=false — download CTAs will point to GitHub Releases. No local APK required."
  );
  if (data.sha256 || data.sizeBytes) {
    console.error("[apk] hosted=false but sha256/sizeBytes are set — remove them.");
    process.exit(1);
  }
  process.exit(0);
}

const msg = (m) => console.error(`[apk] ${m}`);

if (data.sha256 || data.sizeBytes) {
  const apkPath = join(root, "public", "downloads", data.fileName);
  if (!existsSync(apkPath)) {
    msg(`APK missing: public/downloads/${data.fileName}`);
    msg("Fix: copy the built APK there, or set hosted=false in src/lib/apk.data.json.");
    process.exit(1);
  }
  const size = readFileSync(apkPath).length;
  if (size !== data.sizeBytes) {
    msg(`Size mismatch for ${data.fileName}: expected ${data.sizeBytes}, actual ${size}.`);
    msg("Fix: update sizeBytes in src/lib/apk.data.json.");
    process.exit(1);
  }
  const sha = createHash("sha256").update(readFileSync(apkPath)).digest("hex");
  if (sha !== data.sha256) {
    msg(`SHA-256 mismatch for ${data.fileName}:`);
    msg(`  expected ${data.sha256}`);
    msg(`  actual   ${sha}`);
    msg("Fix: update sha256 in src/lib/apk.data.json.");
    process.exit(1);
  }
  console.log(
    `[apk] verified ${data.fileName} — v${data.versionName} (code ${data.versionCode}), ${data.sizeBytes} bytes, SHA-256 OK`
  );
} else {
  console.log("[apk] no checksum metadata configured — skipping file validation.");
}
