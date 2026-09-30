// A single turn in the Probe conversation (NewDesign.md §6.7). The AI student
// speaks in Fraunces from a paper bubble with a small student glyph; the learner
// replies in sans, right-aligned, teal-bordered. Presentational only.
function StudentGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  );
}

export function StudentTurn({ role, text }: { role: "student" | "learner"; text: string }) {
  if (role === "learner") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[68ch] rounded-panel border border-signal bg-signal-wash px-4 py-3 text-base text-ink">
          {text}
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border border-signal bg-paper-panel text-signal-ink">
        <StudentGlyph />
      </span>
      <p className="max-w-[68ch] rounded-panel border border-paper-line bg-paper-panel px-4 py-3 font-display text-lead text-ink">
        {text}
      </p>
    </div>
  );
}
