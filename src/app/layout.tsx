import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abstra-pro.vercel.app"),
  alternates: { canonical: "/" },
  title: "Abstra Pro — Your music. Your way.",
  description:
    "A music player designed around your library, your listening habits, and your experience. 10-band equalizer, AI smart mixes, synced lyrics, and seven handcrafted themes — all fully offline.",
  keywords: [
    "Abstra Pro",
    "music player",
    "Android music player",
    "offline music",
    "equalizer",
    "synced lyrics",
  ],
  openGraph: {
    title: "Abstra Pro — Your music. Your way.",
    description:
      "An Android music player built around your library. Offline, on-device, handcrafted.",
    type: "website",
    siteName: "Abstra Pro",
    url: "https://abstra-pro.vercel.app",
  },
  twitter: {
    card: "summary",
    title: "Abstra Pro — Your music. Your way.",
    description:
      "An Android music player built around your library. Offline, on-device, handcrafted.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1D1A2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
