"use client";

import {
  Library,
  ListMusic,
  SlidersHorizontal,
  AudioWaveform,
  Check,
} from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";
import Waveform from "./mockups/Waveform";
import { fadeUp, fadeUpSoft } from "@/lib/motion";

const FEATURES = [
  {
    icon: Library,
    title: "Music library",
    body: "Browse, search, and organize everything on your device — songs, folders, artists. Your library stays exactly where your files are.",
  },
  {
    icon: ListMusic,
    title: "Playlists",
    body: "Create collections, reorder them freely, and back them up. Built for people who actually curate.",
  },
  {
    icon: SlidersHorizontal,
    title: "Audio controls",
    body: "10-band equalizer, reverb, balance, dynamics, loudness. Presets saved locally — your sound, tuned by you.",
  },
  {
    icon: AudioWaveform,
    title: "Listening experience",
    body: "Synced lyrics, three player designs, a palette-tinted visualizer, and themes that reshape the whole app.",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative scroll-mt-24 border-t border-[rgba(252,228,234,0.06)] bg-[#1b1929]">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <Reveal className="max-w-xl">
          <p className="section-label mb-4">Features</p>
          <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-bold leading-tight">
            Four things, done thoroughly.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed">
            No feature-wall padding. The parts that matter are the parts
            you&apos;ll touch every day.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14" delay={0.07}>
          {FEATURES.map((f) => (
            <StaggerItem variants={fadeUpSoft} key={f.title}>
              <div className="feature-row">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl border border-[rgba(252,228,234,0.08)]"
                  style={{ background: "rgba(229,129,158,0.09)" }}
                >
                  <f.icon size={18} style={{ color: "#E5819E" }} strokeWidth={1.9} />
                </div>
                <div className="grid gap-x-10 gap-y-2 md:grid-cols-[240px_1fr]">
                  <h3 className="text-[17px] font-bold tracking-tight">{f.title}</h3>
                  <p className="max-w-xl text-[14.5px] leading-relaxed text-[#C79AAE]">
                    {f.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Always-on honesty line */}
        <Reveal variants={fadeUp} className="mt-10 flex items-center gap-2 text-[13px] text-[#766080]">
          <Check size={14} style={{ color: "#BC8390" }} />
          Every capability listed here ships in the current build — nothing on this page is a promise for later.
        </Reveal>

        {/* gentle visual close: waveform strip */}
        <Reveal variants={fadeUp} className="mt-16 h-16 max-w-3xl">
          <Waveform playing barCount={48} />
        </Reveal>
      </div>
    </section>
  );
}
