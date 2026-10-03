"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "header" | "footer";
};

/** One shared scroll-reveal wrapper reused by every section. */
export default function Reveal({
  children,
  variants,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}

export function StaggerGroup({
  children,
  className,
  delay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div className={className} variants={variants ?? undefined}>
      {children}
    </motion.div>
  );
}
