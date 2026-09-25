/** The five per-concept screens, in journey order (DESIGN §4 step sequence). */
export const STAGES = [
  { slug: "lab", label: "Explore" },
  { slug: "teach", label: "Explain" },
  { slug: "student", label: "Probe" },
  { slug: "transfer", label: "Transfer" },
  { slug: "report", label: "Report" },
] as const;

export type StageSlug = (typeof STAGES)[number]["slug"];
