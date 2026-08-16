import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#171412",
        charcoal: "#1F1B18",
        steel: "#2B2622",
        ember: "#FF6B35",
        emberDeep: "#C0451E",
        emberGlow: "#FFB84D",
        cream: "#F2ECE3",
        fog: "#A69C8F",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        rise: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(-420px)", opacity: "0" },
        },
      },
      animation: {
        rise: "rise 4s infinite ease-in",
      },
    },
  },
  plugins: [],
};

export default config;
