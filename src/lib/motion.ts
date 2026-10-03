import type { Variants } from "framer-motion";

/** Shared scroll-reveal language — one consistent system, not per-element chaos. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay },
  },
});

export const viewportOnce = { once: true, margin: "-80px" } as const;

/** Github destination used by every download CTA on the page. */
export const RELEASES_URL =
  "https://github.com/prajapatiharsh2323/abstra-pro/releases";

export const GITHUB_URL = "https://github.com/prajapatiharsh2323/abstra-pro";
