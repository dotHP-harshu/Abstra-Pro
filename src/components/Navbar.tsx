"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { GITHUB_URL } from "@/lib/motion";
import Logo from "./Logo";

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#features", label: "Features" },
  { href: "#themes", label: "Themes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape (a11y)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(29, 26, 45, 0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : undefined,
        borderBottom: scrolled
          ? "1px solid rgba(252,228,234,0.07)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#"
          className="flex items-center gap-2.5"
          aria-label="Abstra Pro home"
        >
          <Logo size={50} />
          <span className="font-display text-[17px] font-bold tracking-tight text-[#FCE4EA]">
            Abstra Pro
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#C79AAE] transition-colors duration-200 hover:text-[#FCE4EA]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#download"
            className="btn btn-primary h-10 items-center px-5 text-sm"
          >
            <Download size={16} strokeWidth={2.2} /> Download
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(252,228,234,0.12)] text-[#FCE4EA] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t border-[rgba(252,228,234,0.07)] px-5 pb-5 pt-2 md:hidden"
          style={{
            background: "rgba(29, 26, 45, 0.95)",
            backdropFilter: "blur(16px)",
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-[15px] font-medium text-[#C79AAE]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-3 w-full justify-center"
          >
            <Download size={16} /> Download
          </a>
          <a
            href={GITHUB_URL}
            className="mt-3 block text-center text-xs text-[#766080]"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
