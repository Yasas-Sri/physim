"use client";

import { useEffect, useState } from "react";

const EASE = "cubic-bezier(.2,.7,.2,1)";

// The Reveal (NewDesign.md §8.1): the learner's predicted outcome and the
// measured one animate onto the SAME track. When they diverge, the gap lights
// amber with a "Your model vs. reality" caption. One orchestrated ~600ms move;
// under prefers-reduced-motion the global CSS collapses the transition to an
// instant before/after (§5).
export function RevealOverlay({
  predictsStop,
  realityStops,
  measuredLabel,
  onClose,
}: {
  predictsStop: boolean;
  realityStops: boolean;
  measuredLabel: string;
  onClose: () => void;
}) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const diverged = predictsStop !== realityStops;
  const predPos = predictsStop ? 0.4 : 0.92; // "it stops" sits short of "never"
  const realityPos = realityStops ? 0.5 : 0.92;
  const lo = Math.min(predPos, realityPos);
  const hi = Math.max(predPos, realityPos);

  const pct = (n: number) => `${(armed ? n : 0) * 100}%`;
  const move = { transition: `left 600ms ${EASE}`, transitionProperty: "left" } as const;

  return (
    <div className="absolute inset-x-4 bottom-4 z-20 rounded-panel border border-lab-line bg-lab-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-lab-text">
          {diverged ? (
            <span className="text-gap">▲ Your model vs. reality</span>
          ) : (
            <span className="text-signal">✓ Your model matched reality</span>
          )}
        </p>
        <button
          onClick={onClose}
          className="rounded-control border border-lab-line px-2.5 py-1 text-sm text-lab-text hover:bg-lab-panel-2"
        >
          Run again
        </button>
      </div>

      {/* Shared track: 0 → "never" */}
      <div className="relative mt-6 h-1.5 rounded-pill bg-lab-line">
        {diverged && (
          <div
            className="absolute top-0 h-1.5 rounded-pill bg-gap"
            style={{ left: pct(lo), width: `${(armed ? hi - lo : 0) * 100}%`, transition: `width 600ms ${EASE}, left 600ms ${EASE}` }}
          />
        )}
        {/* prediction marker (teal) */}
        <Marker pos={pct(predPos)} style={move} color="signal" label="your prediction" />
        {/* reality marker (teal dot; the divergence bar carries the amber) */}
        <Marker pos={pct(realityPos)} style={move} color="signal" label={measuredLabel} above />
        <span className="absolute -bottom-5 left-0 font-mono text-mono-sm text-lab-text-dim">0</span>
        <span className="absolute -bottom-5 right-0 font-mono text-mono-sm text-lab-text-dim">never</span>
      </div>
    </div>
  );
}

function Marker({
  pos,
  style,
  color,
  label,
  above,
}: {
  pos: string;
  style: React.CSSProperties;
  color: "signal" | "gap";
  label: string;
  above?: boolean;
}) {
  return (
    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: pos, ...style }}>
      <span className={`block h-3 w-3 rounded-pill ${color === "signal" ? "bg-signal" : "bg-gap"}`} />
      <span
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-mono-sm text-lab-text-dim ${above ? "bottom-4" : "top-4"}`}
      >
        {label}
      </span>
    </div>
  );
}
