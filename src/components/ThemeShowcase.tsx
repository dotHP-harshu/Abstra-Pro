"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { PlayerPhone } from "./HeroPhone";
import { PALETTES, type Palette } from "@/lib/themes";
import { fadeUp, scaleIn, viewportOnce } from "@/lib/motion";

export default function ThemeShowcase() {
  const [active, setActive] = useState<Palette>(PALETTES[0]);

  return (
    <section id="themes" className="relative scroll-mt-24 overflow-hidden border-t border-[rgba(252,228,234,0.06)]">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_380px] lg:gap-10">
          {/* Copy + swatches */}
          <div className="order-2 lg:order-1">
            <Reveal className="max-w-lg">
              <p className="section-label mb-4">Personalization</p>
              <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-bold leading-tight">
                A player that dresses
                <br />
                for every hour.
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed">
                Seven handcrafted palettes, from soft pastels to pure AMOLED
                black. Three player designs. Customizable name and typography
                styles on your home greeting. Pick a theme and watch the whole
                player respond.
              </p>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              className="mt-9"
            >
              <div className="flex flex-wrap gap-3" role="group" aria-label="App themes">
                {PALETTES.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    aria-pressed={active.key === p.key}
                    data-active={active.key === p.key}
                    className="swatch"
                    style={{ background: `linear-gradient(135deg, ${p.primary} 30%, ${p.bgBase} 100%)` }}
                    onClick={() => setActive(p)}
                    aria-label={`Preview ${p.name} theme`}
                  />
                ))}
              </div>
              <p className="mt-3 text-[13px] font-medium" style={{ color: "#E5819E" }}>
                {active.name}
                {active.dark ? " · dark" : " · light"}
              </p>
            </motion.div>
          </div>

          {/* Re-skinned device */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={scaleIn}
            className="order-1 flex justify-center lg:order-2"
          >
            <PlayerPhone palette={active} interactive={false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
