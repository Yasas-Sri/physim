// The teal wax-stamp seal (NewDesign.md §6.10) — the shareable end-state. Stamps
// on with one orchestrated motion; under prefers-reduced-motion it just appears.
export function MasterySeal() {
  return (
    <div
      className="animate-stamp flex h-24 w-24 flex-col items-center justify-center rounded-pill border-2 border-signal bg-signal-wash text-signal-ink"
      role="img"
      aria-label="Mastered"
    >
      <span aria-hidden className="text-h4 leading-none">
        ✓
      </span>
      <span className="mt-1 text-mono-sm font-semibold uppercase tracking-wide">Mastered</span>
    </div>
  );
}
