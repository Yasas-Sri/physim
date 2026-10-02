"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Presentation-only heuristic: does the learner's wording claim the puck stops?
// This only drives the visual Reveal — the real evaluation stays in the LLM
// analyze/evaluate roles. Defaults to "stops" (the common misconception).
export function predictsStop(text: string): boolean {
  const s = text.toLowerCase();
  if (/never|not stop|won'?t stop|keeps? (going|moving|sliding)|forever|infinit|doesn'?t stop/.test(s)) {
    return false;
  }
  return true;
}

// The prediction beat (NewDesign.md §6.5): a paper card floating over the lab
// header. On lock it collapses to a teal chip that stays as evidence.
export function PredictionCard({
  onLock,
  onEdit,
}: {
  onLock: (text: string, stops: boolean) => void;
  onEdit: () => void;
}) {
  const [text, setText] = useState("");
  const [locked, setLocked] = useState(false);

  if (locked) {
    return (
      <div className="flex w-fit items-center gap-2 rounded-pill border border-signal bg-signal-wash px-3 py-1.5 text-sm text-signal-ink">
        <span aria-hidden>🔒</span>
        <span className="font-medium">Your prediction — locked</span>
        <button
          className="underline underline-offset-2"
          onClick={() => {
            setLocked(false);
            onEdit();
          }}
        >
          edit
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-panel border border-paper-line bg-paper-panel p-5">
      <label htmlFor="prediction" className="font-display text-h4 text-ink">
        Before you run it: with no friction, when does the puck stop — and why?
      </label>
      <textarea
        id="prediction"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="mt-3 w-full max-w-[68ch] rounded-control border border-paper-line bg-paper-panel p-3 text-base text-ink placeholder:text-ink-soft"
        placeholder="Write your prediction before checking it against the instrument."
      />
      <div className="mt-3">
        <Button
          variant="signal"
          disabled={text.trim().length === 0}
          onClick={() => {
            setLocked(true);
            onLock(text, predictsStop(text));
          }}
        >
          Lock in prediction
        </Button>
      </div>
    </div>
  );
}
