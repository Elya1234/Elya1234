import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        lg: "48px",
      },
    },
    extend: {
      colors: {
        "bleu-roi": "#1A2A63",
        "orange-rose": "#F3B79B",
        "orange-rose-texte": "#A8502E",
        dore: "#C9A85C",
        ivoire: "#FAF8F5",
        "gris-produit": "#F2F1EF",
        "noir-texte": "#1A1A1A",
        "gris-texte": "#6B6B6B",
        ligne: "#E5E3DF",
        "or-jaune": "#C9A85C",
        "or-rose": "#D6A895",
        "or-blanc": "#D9D6CE",
        platine: "#C7C9CC",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      fontSize: {
        xs: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        sm: ["0.8125rem", { lineHeight: "1.5" }],
        base: ["0.9375rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.5rem", { lineHeight: "1.3" }],
        "2xl": ["1.75rem", { lineHeight: "1.2" }],
        "3xl": ["2.25rem", { lineHeight: "1.15" }],
        "4xl": ["2.75rem", { lineHeight: "1.1" }],
        "5xl": ["3.5rem", { lineHeight: "1.05" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        container: "1440px",
      },
      boxShadow: {
        popover: "0 8px 32px rgba(0,0,0,.08)",
        card: "0 2px 12px rgba(0,0,0,.05)",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(.4,0,.2,1)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(.4,0,.2,1) both",
        "fade-in": "fade-in 0.3s cubic-bezier(.4,0,.2,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
