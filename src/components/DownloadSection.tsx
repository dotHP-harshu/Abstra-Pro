"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Star,
  Terminal,
  ShieldCheck,
  Copy,
  Check,
  Package,
  BadgeCheck,
} from "lucide-react";
import Reveal from "./Reveal";
import {
  fadeUp,
  scaleIn,
  viewportOnce,
  RELEASES_URL,
  GITHUB_URL,
} from "@/lib/motion";
import {
  APK,
  APK_LABEL_VERSION,
  APK_LABEL_SIZE,
  APK_DOWNLOAD_URL,
} from "@/lib/apk";

const FACTS = [
  "Android 7.0+",
  "Fully offline",
  "No account",
  "No network permission",
  "On-device AI",
];

const INSTALL_STEPS = [
  "Download the APK below.",
  "Open it and allow installing from your browser if asked.",
  "Wait for installation to finish, then open Abstra Pro.",
];

export default function DownloadSection() {
  const [copied, setCopied] = useState(false);

  const copySha = async () => {
    if (!APK.sha256) return;
    try {
      await navigator.clipboard.writeText(APK.sha256);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the raw hash is still selectable below */
    }
  };

  const chip = [
    APK_LABEL_VERSION,
    APK_LABEL_SIZE,
    `Android ${APK.minAndroid}+`,
  ].filter(Boolean) as string[];

  return (
    <section
      id="download"
      className="relative scroll-mt-24 overflow-hidden border-t border-[rgba(252,228,234,0.06)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 110%, rgba(229,129,158,0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center md:px-8 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
        >
          <h2 className="text-[clamp(2.2rem,5.4vw,3.6rem)] font-bold leading-[1.02]">
            Your music is waiting
            <br />
            right where you left it.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed">
            Abstra Pro is a separate app from Abstra, with its own release
            cadence. Built to run entirely on your device.
          </p>
        </motion.div>

        {APK_DOWNLOAD_URL ? (
          <>
            <Reveal variants={fadeUp} className="mt-8">
              <div className="mx-auto flex flex-wrap items-center justify-center gap-2 text-[12.5px]">
                {chip.map((c, i) => (
                  <span
                    key={c}
                    className="flex items-center gap-1.5 rounded-full border border-[rgba(252,228,234,0.1)] bg-[rgba(252,228,234,0.04)] px-3 py-1 text-[#C79AAE]"
                  >
                    {i === 0 && (
                      <BadgeCheck size={12} style={{ color: "#E5819E" }} />
                    )}
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
            >
              <a
                href={APK_DOWNLOAD_URL}
                download={APK.fileName}
                className="btn btn-primary text-[16px]"
                data-cta="download"
              >
                <Download size={17} strokeWidth={2.2} /> Download APK
              </a>
              {/* <a
                href={GITHUB_URL}
                className="btn btn-secondary text-[15px]"
                target="_blank"
                rel="noreferrer"
              >
                <Star size={15} /> Star on GitHub
              </a> */}
            </Reveal>

            {/* Install steps */}
            <Reveal variants={fadeUp} className="mt-12">
              <ol className="mx-auto max-w-md space-y-2.5 text-left">
                {INSTALL_STEPS.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 text-[14px] leading-relaxed text-[#C79AAE]"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[rgba(252,228,234,0.12)] font-display text-[11px] font-bold text-[#E5819E]">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* SHA-256 verification */}
            {/* {APK.sha256 ? (
              <Reveal variants={fadeUp} className="mt-9">
                <div
                  className="mx-auto max-w-xl rounded-2xl border border-[rgba(252,228,234,0.08)] p-4"
                  style={{ background: "rgba(29,26,45,0.5)" }}
                >
                  <button
                    type="button"
                    onClick={copySha}
                    className="flex w-full items-center gap-2 text-left text-[12.5px] font-medium text-[#C79AAE] transition-colors hover:text-[#FCE4EA]"
                    aria-label="Copy SHA-256 checksum"
                  >
                    <ShieldCheck size={14} style={{ color: "#BC8390" }} />
                    <span className="shrink-0">SHA-256</span>
                    <code className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-[#766080]">
                      {APK.sha256}
                    </code>
                    {copied ? (
                      <Check size={13} style={{ color: "#7ED8B4" }} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-[#766080]">
                    Compare the checksum before installing — it should match{" "}
                    <code className="font-mono">{APK.fileName}</code> exactly.
                  </p>
                </div>
              </Reveal>
            ) : null} */}

            <Reveal variants={fadeUp} className="mt-9">
              <ul className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-[#766080]">
                {FACTS.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="mt-6 flex items-center justify-center gap-1.5 text-[12.5px] text-[#766080]">
                <Package size={13} style={{ color: "#BC8390" }} />
                New versions are published here as they&apos;re built.
              </p>
            </Reveal>
          </>
        ) : (
          <Reveal
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href={RELEASES_URL}
              className="btn btn-primary text-[16px]"
              data-cta="download"
            >
              <Download size={17} strokeWidth={2.2} /> Download APK
            </a>
            {/* <a
              href={GITHUB_URL}
              className="btn btn-secondary text-[15px]"
              target="_blank"
              rel="noreferrer"
            >
              <Star size={15} /> Star on GitHub
            </a> */}
          </Reveal>
        )}

        {/* <Reveal variants={fadeUp} className="mt-12">
          <p className="flex items-center justify-center gap-1.5 text-[12.5px] text-[#766080]">
            <Terminal size={13} style={{ color: "#BC8390" }} />
            Distributed as a signed APK — no accounts, no telemetry, no trackers.
          </p>
        </Reveal> */}
      </div>
    </section>
  );
}
