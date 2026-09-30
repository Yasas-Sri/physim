import type { LearnerState } from "@/lib/types/learner";

// Understanding in the duotone (NewDesign.md §2): teal for mastery, amber for
// the one thing to watch (misconception risk = a gap).
function Bar({ label, value, gap }: { label: string; value: number; gap?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="text-ink-soft">{label}</span>
        <span className="tabular font-mono text-mono-sm text-ink-soft">{value.toFixed(2)}</span>
      </div>
      <div className="h-1.5 w-full rounded-pill bg-paper-line">
        <div
          className={"h-full rounded-pill " + (gap ? "bg-gap" : "bg-signal")}
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </div>
    </div>
  );
}

export function MasterySummary({ state }: { state: LearnerState }) {
  return (
    <div className="flex flex-col gap-3 rounded-panel border border-paper-line bg-paper-panel p-4">
      <p className="text-sm font-medium text-ink-soft">Where you stand</p>
      <Bar label="Conceptual" value={state.conceptual} />
      <Bar label="Causal reasoning" value={state.causal} />
      <Bar label="Explanation" value={state.explanation} />
      <Bar label="Misconception risk" value={state.misconception_risk} gap />
    </div>
  );
}
