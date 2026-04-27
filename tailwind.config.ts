import type { Config } from "tailwindcss";

// Using Tailwind CSS v3 (chosen over v4 to avoid setup friction — documented in DESIGN.md)
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-warm": "var(--surface-warm)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        primary: "var(--primary)",
        "primary-deep": "var(--primary-deep)",
        clay: "var(--clay)",
        olive: "var(--olive)",
        line: "var(--line)",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["3rem", { lineHeight: "1.2" }],
        h2: ["2.25rem", { lineHeight: "1.3" }],
        lead: ["1.25rem", { lineHeight: "1.6" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      borderRadius: {
        arch: "9999px 9999px 0 0",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
