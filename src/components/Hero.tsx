"use client";

import { motion } from "framer-motion";
import { ChevronRight, Smartphone, ShieldCheck, WifiOff } from "lucide-react";
import { HeroPhone } from "./HeroPhone";
import { fadeUp, stagger, scaleIn, viewportOnce, RELEASES_URL } from "@/lib/motion";
import { APK, APK_DOWNLOAD_URL } from "@/lib/apk";
import { useMemo } from "react";

/** Low-amplitude ambient waveform strip used behind the hero. */
function AmbientWave() {
  const bars = useMemo(() => Array.from({ length: 64 }, (_, i) => ({
    h: Math.round((14 + 62 * (Math.abs(Math.sin(i * 0.23) * (1 - Math.abs(i - 32) / 40) + 0.28))) * 10) / 10,
    d: (i % 9) * 4 / 10,
  })), []);
  return (
    <div className="ambient-wave" aria-hidden="true">
      {bars.map((b, i) => (
        <i key={i} style={{ "--h": `${b.h}%`, "--d": `${b.d}s` } as React.CSSProperties} />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="page-ambience" aria-hidden="true" />
      <AmbientWave />

      <motion.div
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]"
        initial="hidden"
        animate="visible"
        variants={stagger(0.09)}
      >
        {/* Copy */}
        <div>
          <motion.p variants={fadeUp} className="section-label mb-5">
            Android Music Player
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.9rem,7.2vw,4.9rem)] font-bold leading-[0.98]"
            style={{ letterSpacing: "-0.045em" }}
          >
            Your music.
            <br />
            <span className="text-[#E5819E]">Your way.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-md text-[17px] leading-relaxed">
            A music player designed around your library, your listening habits,
            and your experience. Offline, on-device, entirely yours.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href={APK_DOWNLOAD_URL ?? RELEASES_URL}
              {...(APK_DOWNLOAD_URL ? { download: APK.fileName } : {})}
              className="btn btn-primary"
              data-cta="hero-download"
            >
              Download APK
              <ChevronRight size={16} strokeWidth={2.4} />
            </a>
            <a href="#experience" className="btn btn-secondary">
              See it in action
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#766080]"
          >
            <li className="flex items-center gap-1.5">
              <Smartphone size={14} style={{ color: "#BC8390" }} /> Android
            </li>
            <li className="flex items-center gap-1.5">
              <WifiOff size={14} style={{ color: "#BC8390" }} /> Fully offline
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck size={14} style={{ color: "#BC8390" }} /> No accounts, no telemetry
            </li>
          </motion.ul>
        </div>

        {/* Device */}
        <motion.div variants={scaleIn} className="relative flex flex-col items-center lg:items-end">
          <HeroPhone />
          <p className="mt-5 text-[12px] text-[#766080]">
            Demonstration home-screen mockup
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
