import localFont from "next/font/local";

export const newsreader = localFont({
  src: [
    {
      path: "../app/fonts/newsreader-latin.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../app/fonts/newsreader-italic-latin.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  preload: true,
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

export const plexSans = localFont({
  src: "../app/fonts/ibm-plex-sans-latin.woff2",
  variable: "--font-plex-sans",
  display: "swap",
  weight: "100 700",
  style: "normal",
  preload: true,
  fallback: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

export const plexMono = localFont({
  src: [
    {
      path: "../app/fonts/ibm-plex-mono-400-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/ibm-plex-mono-500-latin.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["Consolas", "Courier New", "monospace"],
});
