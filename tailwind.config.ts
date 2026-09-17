import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Type scale mirrors NewDesign.md §3. Semantic keys (h1…hero, lead) plus the
    // legacy xs…3xl keys kept until components migrate.
    fontSize: {
      "mono-sm": ["var(--fs-mono-sm)", { lineHeight: "1.4" }], // 12
      xs: ["0.75rem", { lineHeight: "1.4" }], // 12 (legacy)
      sm: ["var(--fs-sm)", { lineHeight: "1.45" }], // 14
      base: ["var(--fs-base)", { lineHeight: "1.5" }], // 16
      lead: ["var(--fs-lead)", { lineHeight: "1.5" }], // 18
      lg: ["1.25rem", { lineHeight: "1.4" }], // 20 (legacy)
      h4: ["var(--fs-h4)", { lineHeight: "1.2" }], // 22
      h3: ["var(--fs-h3)", { lineHeight: "1.15" }], // 28
      xl: ["1.75rem", { lineHeight: "1.2" }], // 28 (legacy)
      h2: ["var(--fs-h2)", { lineHeight: "1.1" }], // 36
      "2xl": ["2.5rem", { lineHeight: "1.1" }], // 40 (legacy)
      h1: ["var(--fs-h1)", { lineHeight: "1.05" }], // 52
      "3xl": ["3.5rem", { lineHeight: "1.05" }], // 56 (legacy)
      hero: ["var(--fs-hero)", { lineHeight: "1.02" }], // 72
    },
    extend: {
      colors: {
        // Lab surface (dark)
        "lab-void": "var(--lab-void)",
        "lab-panel": "var(--lab-panel)",
        "lab-panel-2": "var(--lab-panel-2)",
        "lab-line": "var(--lab-line)",
        "lab-text": "var(--lab-text)",
        "lab-text-dim": "var(--lab-text-dim)",
        // Notebook surface (light)
        paper: "var(--paper)",
        "paper-panel": "var(--paper-panel)",
        "paper-line": "var(--paper-line)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        // Signal duotone
        signal: "var(--signal)",
        "signal-soft": "var(--signal-soft)",
        "signal-ink": "var(--signal-ink)",
        "signal-wash": "var(--signal-wash)",
        gap: "var(--gap)",
        "gap-soft": "var(--gap-soft)",
        "gap-ink": "var(--gap-ink)",
        "gap-wash": "var(--gap-wash)",
        // Legacy aliases (removed after component migration)
        surface: "var(--surface)",
        graphite: "var(--graphite)",
        line: "var(--line)",
        "signal-wk": "var(--signal-wk)",
      },
      borderRadius: {
        DEFAULT: "var(--r-control)", // 8px
        canvas: "var(--r-canvas)", // 16px
        panel: "var(--r-panel)", // 12px
        control: "var(--r-control)", // 8px
        pill: "var(--r-pill)", // 999px
        sm: "4px",
      },
      // Spacing: the §4 scale (4·8·12·16·24·32·48·64·96) is exactly Tailwind's
      // default 4px scale at keys 1·2·3·4·6·8·12·16·24, so no override is needed
      // (overriding would silently shift existing p-6/gap-8). The --space-* CSS
      // vars in globals.css cover any raw-CSS use.
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"], // Hanken Grotesk
        display: ["var(--font-display)", "Georgia", "serif"], // Fraunces
        mono: ["var(--font-mono)", "ui-monospace", "monospace"], // IBM Plex Mono
      },
    },
  },
  plugins: [],
};
export default config;
