// Literal token hex values for WebGL — three.js materials need colour literals,
// not CSS vars. Mirrors the NewDesign.md §2 palette; keep in sync with globals.css.
export const PALETTE = {
  ink: "#161B22",
  graphite: "#55606E", // --ink-soft
  line: "#DCE3EB", // --paper-line
  signal: "#3FC7B4", // teal — your measurement / velocity
  gap: "#FFA733", // amber — divergence / gap
  surface: "#FFFFFF", // --paper-panel
  paper: "#EDF1F5",
  // Lab (dark instrument) — bodies use labText so they read on the void.
  labVoid: "#10141A",
  labPanel: "#171D26",
  labLine: "#2B3542",
  labText: "#C9D3E0",
  labTextDim: "#7B8794",
} as const;
