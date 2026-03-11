import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SKM Blue Palette
        "skm-bg": "#040c1a",
        "skm-bg-raised": "#08122a",
        "skm-accent": "#00aaff",
        "skm-accent-mid": "#0044bb",
        "skm-accent-deep": "#002288",
        "skm-cyan": "#00d4ff",
        "skm-map-blue": "#1a4fff",
        "skm-rail": "#1a4a8a",
        "skm-contour": "#1e3a6e",
        "skm-divider": "#0a1a3a",
      },
      fontFamily: {
        oswald: ["var(--font-oswald)", "sans-serif"],
        barlow: ["var(--font-barlow)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        "panel-glow":
          "0 0 8px #00aaff, 0 0 20px #0044bb, 0 0 40px #002288",
        "panel-glow-hover":
          "0 0 12px #00aaff, 0 0 28px #0044bb, 0 0 56px #002288",
      },
    },
  },
  plugins: [],
};

export default config;
