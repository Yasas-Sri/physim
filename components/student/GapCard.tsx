"use client";

import { Button } from "@/components/ui/button";

// The signature demo artifact (NewDesign.md §6.7): a named amber gap card with
// one soft shadow. Its content is the PRE-AUTHORED misconception-map entry
// (belief/probe/correction) plus the learner's own words as evidence — the LLM
// does not free-judge here. On close it collapses to a persistent teal chip.
export function GapCard({
  evidence,
  probe,
  correction,
  onRevise,
  onClose,
}: {
  evidence?: string;
  probe: string;
  correction?: string;
  onRevise: () => void;
  onClose: () => void;
}) {
  return (
    <div className="rounded-panel border border-paper-line border-l-4 border-l-gap bg-paper-panel p-5 shadow-[0_10px_30px_-14px_rgba(0,0,0,.35)]">
      <p className="text-sm font-semibold text-gap-ink">▲ Gap detected</p>
      {evidence && <p className="mt-2 text-base text-ink">You said: “{evidence}”</p>}
      <p className="mt-2 font-display text-h4 text-ink">{probe}</p>
      {correction && <p className="mt-2 max-w-[68ch] text-sm text-ink-soft">{correction}</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={onRevise}>
          Revise my explanation
        </Button>
        <Button variant="signal" onClick={onClose}>
          Got it — close the gap
        </Button>
      </div>
    </div>
  );
}

// The evidence chip a closed gap leaves behind (§6.7).
export function GapClosedChip({ label }: { label: string }) {
  return (
    <span className="flex w-fit items-center gap-1.5 rounded-pill border border-signal bg-signal-wash px-3 py-1 text-sm text-signal-ink">
      <span aria-hidden>✓</span> Gap closed: {label}
    </span>
  );
}
