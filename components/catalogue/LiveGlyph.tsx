import type { CSSProperties } from "react";

export type GlyphKind = "drift" | "orbit" | "swing" | "fall" | "wave";

// Maps a concept id to the glyph that hints at its sim.
export function glyphFor(conceptId: string): GlyphKind {
  switch (conceptId) {
    case "uniform-circular-motion":
    case "angular-momentum":
      return "orbit";
    case "conservation-of-energy":
      return "swing";
    case "simple-harmonic-motion":
      return "wave";
    case "free-fall":
      return "fall";
    default:
      return "drift"; // sliding/launched bodies
  }
}

// Longhand animation props (never the shorthand) so the .live-glyph class's
// paused play-state survives until the row is hovered/focused (§6.9).
const anim = (name: string, dur: string, extra: CSSProperties = {}): CSSProperties => ({
  animationName: name,
  animationDuration: dur,
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  ...extra,
});

// A minimal animated diagram; motion runs only on hover/focus of the parent .group.
export function LiveGlyph({ kind }: { kind: GlyphKind }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="text-ink-soft" fill="none" aria-hidden>
      {kind === "drift" && (
        <>
          <line x1="4" y1="34" x2="40" y2="34" stroke="currentColor" strokeWidth="1.5" />
          <circle
            className="live-glyph text-signal"
            style={anim("glyph-drift", "1.4s", { animationDirection: "alternate" })}
            cx="16"
            cy="28"
            r="4"
            fill="currentColor"
          />
        </>
      )}

      {kind === "orbit" && (
        <>
          <circle cx="22" cy="22" r="13" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 3" />
          <circle cx="22" cy="22" r="2" fill="currentColor" />
          <g className="live-glyph" style={{ ...anim("glyph-orbit", "3s", { animationTimingFunction: "linear" }), transformOrigin: "22px 22px" }}>
            <circle className="text-signal" cx="35" cy="22" r="3.5" fill="currentColor" />
          </g>
        </>
      )}

      {kind === "swing" && (
        <g className="live-glyph" style={{ ...anim("glyph-swing", "1.8s"), transformOrigin: "22px 8px" }}>
          <line x1="22" y1="8" x2="22" y2="32" stroke="currentColor" strokeWidth="1.25" />
          <circle className="text-signal" cx="22" cy="34" r="4" fill="currentColor" />
        </g>
      )}

      {kind === "fall" && (
        <g className="live-glyph" style={anim("glyph-fall", "1.1s", { animationDirection: "alternate" })}>
          <circle className="text-signal" cx="16" cy="16" r="3.5" fill="currentColor" />
          <circle className="text-signal" cx="28" cy="16" r="5" fill="currentColor" />
        </g>
      )}

      {kind === "wave" && (
        <>
          <line x1="6" y1="22" x2="10" y2="22" stroke="currentColor" strokeWidth="1.25" />
          <circle
            className="live-glyph text-signal"
            style={anim("glyph-drift", "1.2s", { animationDirection: "alternate" })}
            cx="24"
            cy="22"
            r="5"
            fill="currentColor"
          />
        </>
      )}
    </svg>
  );
}
