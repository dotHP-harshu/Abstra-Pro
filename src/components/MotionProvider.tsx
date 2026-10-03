"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respects the OS "reduced motion" preference for every Framer Motion
 *  animation on the page (CSS media queries already cover the pure-CSS ones). */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
