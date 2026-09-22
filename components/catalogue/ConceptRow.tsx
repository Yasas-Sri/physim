import Link from "next/link";
import type { ConceptStatus } from "@/lib/report/status";
import { LiveGlyph, glyphFor } from "./LiveGlyph";

// A catalogue-of-experiments row (NewDesign.md §6.9): live glyph, Fraunces title,
// one-line description, right-side status. The glyph animates on hover/focus only.
export function ConceptRow({
  id,
  title,
  description,
  status,
  percent,
}: {
  id: string;
  title: string;
  description: string;
  status: ConceptStatus;
  percent: number;
}) {
  return (
    <Link
      href={`/concept/${id}/lab`}
      className="group flex items-center gap-5 rounded-panel border border-paper-line bg-paper-panel p-5 hover:border-signal"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-panel border border-paper-line">
        <LiveGlyph kind={glyphFor(id)} />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-display text-h4 text-ink">{title}</span>
        <span className="truncate text-sm text-ink-soft">{description}</span>
      </span>

      <StatusMark status={status} percent={percent} />
    </Link>
  );
}

function StatusMark({ status, percent }: { status: ConceptStatus; percent: number }) {
  if (status === "mastered") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-pill border border-signal bg-signal-wash px-3 py-1 text-sm text-signal-ink">
        <span aria-hidden>✓</span> Mastered
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill"
        style={{
          background: `conic-gradient(var(--signal) ${percent * 3.6}deg, var(--paper-line) 0deg)`,
        }}
        role="img"
        aria-label={`In progress, ${percent}%`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-paper-panel font-mono text-mono-sm text-signal-ink">
          {percent}
        </span>
      </span>
    );
  }
  return <span className="shrink-0 text-sm text-ink-soft">Not started</span>;
}
