// A quiet teal loader for route transitions. Under prefers-reduced-motion the
// spin is disabled by the global reset; the label still conveys progress.
export function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-24 text-sm text-ink-soft" role="status">
      <span
        aria-hidden
        className="h-5 w-5 animate-spin rounded-pill border-2 border-paper-line border-t-signal"
      />
      {label}
    </div>
  );
}
