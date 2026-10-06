"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { PlayerPhone } from "./HeroPhone";
import EqualizerMockup from "./mockups/EqualizerMockup";
import LyricsMockup from "./mockups/LyricsMockup";
import { fadeUp, scaleIn, viewportOnce } from "@/lib/motion";

export default function ProductShowcase() {
  return (
    <section id="experience" className="relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="section-label mb-4">The Player</p>
          <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-bold leading-tight">
            Built to be looked at,
            <br />
            designed to disappear.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed">
            A vinyl centerpiece that spins while your music does. A palette-tinted
            waveform. Playback that stays out of the way until you want it.
            Try it — press play.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
          className="mt-16 flex justify-center"
        >
          <PlayerPhone />
        </motion.div>
        <Reveal variants={fadeUp} className="mt-5 text-center text-[13px] text-[#766080]">
          Demonstration recreation of the full player screen. Your library plays on your device.
        </Reveal>

        {/* DSP + Lyrics pair */}
        <div className="mt-24 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-8">
          <Reveal variants={scaleIn} className="lg:order-2">
            <EqualizerMockup className="mx-auto w-full max-w-[330px]" />
          </Reveal>
          <Reveal variants={fadeUp} className="max-w-lg">
            <p className="section-label mb-4">Audio controls</p>
            <h3 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-snug">
              A full DSP suite, not a toggle.
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed">
              Ten-band equalizer with presets you can save and roll randomly.
              Reverb environments, channel balance, dynamics processing, and
              loudness enhancement — all running natively on your device&apos;s audio
              stack.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-8">
          <Reveal variants={scaleIn}>
            <LyricsMockup className="mx-auto w-full max-w-[330px]" />
          </Reveal>
          <Reveal variants={fadeUp} className="max-w-lg">
            <p className="section-label mb-4">Listening experience</p>
            <h3 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-snug">
              Lyrics that keep the tempo.
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed">
              Synced lyrics scroll line by line with your track, tinted in your
              active theme. Embedded artwork and palette extraction recolor the
              whole experience around the song you&apos;re actually playing.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
