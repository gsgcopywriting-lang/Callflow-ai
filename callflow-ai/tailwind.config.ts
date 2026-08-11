import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0B0D",
        surface: "#131519",
        "surface-raised": "#1A1D22",
        "surface-hover": "#20242B",
        border: {
          subtle: "#23262B",
          DEFAULT: "#2A2E35",
        },
        ink: {
          DEFAULT: "#F2F3F5",
          muted: "#9A9CA3",
          faint: "#5C6069",
        },
        signal: {
          DEFAULT: "#FF6B4A",
          soft: "#FF8A6B",
          dim: "#3A2620",
        },
        line: {
          DEFAULT: "#2DD4BF",
          dim: "#173330",
        },
        live: "#34D399",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "signal-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(255,107,74,0.16) 0%, rgba(10,11,13,0) 70%)",
        "grid-fade":
          "linear-gradient(to bottom, rgba(10,11,13,0) 0%, #0A0B0D 100%)",
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 1.5s",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
