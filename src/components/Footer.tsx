"use client";

import { Github } from "lucide-react";
import Logo from "./Logo";
import { GITHUB_URL, RELEASES_URL } from "@/lib/motion";
import { APK } from "@/lib/apk";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(252,228,234,0.06)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-5 py-12 md:flex-row md:px-8">
        <div className="flex items-center gap-2.5">
          <Logo size={50} />
          <div>
            <p className="font-display text-[14px] font-bold tracking-tight text-[#FCE4EA]">
              Abstra Pro
            </p>
            {/* <p className="text-[11px] text-[#766080]">
              © 2026 · Built independently from Abstra · v{APK.versionName}
            </p> */}
          </div>
        </div>

        <nav className="flex items-center gap-6 text-[13px] text-[#C79AAE]">
          <a
            href="#experience"
            className="transition-colors hover:text-[#FCE4EA]"
          >
            Experience
          </a>
          <a
            href="#features"
            className="transition-colors hover:text-[#FCE4EA]"
          >
            Features
          </a>
          <a href="#themes" className="transition-colors hover:text-[#FCE4EA]">
            Themes
          </a>
          {/* <a
            href={RELEASES_URL}
            className="flex items-center gap-1.5 transition-colors hover:text-[#FCE4EA]"
          >
            <Github size={14} /> Releases
          </a> */}
        </nav>
      </div>
    </footer>
  );
}
