"use client";

import PhoneFrame from "./mockups/PhoneFrame";
import HomeMockup from "./mockups/HomeMockup";
import PlayerMockup from "./mockups/PlayerMockup";
import type { Palette } from "@/lib/themes";

/** Home screen inside the device shell — used by the hero. */
export function HeroPhone(props: { palette?: Palette }) {
  return (
    <PhoneFrame {...props}>
      <HomeMockup />
    </PhoneFrame>
  );
}

/** Full player inside the device shell — used by the experience section. */
export function PlayerPhone(props: { palette?: Palette; interactive?: boolean }) {
  return (
    <PhoneFrame {...props}>
      <PlayerMockup {...props} />
    </PhoneFrame>
  );
}
