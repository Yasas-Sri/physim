import Link from "next/link";
import { STAGES, type StageSlug } from "@/lib/concepts/stages";

// The 5-step rail (NewDesign.md §6.1): a genuine sequence, so numbering is
// honest. Completed nodes fill teal, the current node is a teal ring, upcoming
// nodes are hairline. A step that surfaced a gap shows an amber dot until closed.
export function ProgressRail({
  conceptId,
  active,
  gapSteps = [],
}: {
  conceptId: string;
  active: StageSlug;
  gapSteps?: StageSlug[];
}) {
  const activeIndex = STAGES.findIndex((s) => s.slug === active);

  return (
    <nav aria-label="Concept steps" className="overflow-x-auto">
      <ol className="flex min-w-max items-start gap-0">
        {STAGES.map((s, i) => {
          const state = i < activeIndex ? "done" : i === activeIndex ? "current" : "upcoming";
          const hasGap = gapSteps.includes(s.slug);
          return (
            <li key={s.slug} className="flex items-start">
              <Link
                href={`/concept/${conceptId}/${s.slug}`}
                aria-current={state === "current" ? "step" : undefined}
                className="group flex w-24 flex-col items-center gap-1.5 text-center"
              >
                <span className="relative">
                  <span
                    className={
                      "flex h-8 w-8 items-center justify-center rounded-pill font-mono text-sm " +
                      (state === "done"
                        ? "bg-signal text-ink"
                        : state === "current"
                          ? "bg-paper-panel text-signal-ink ring-2 ring-signal"
                          : "border border-paper-line bg-paper-panel text-ink-soft")
                    }
                  >
                    {i + 1}
                  </span>
                  {hasGap && (
                    <span
                      className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-pill border border-paper bg-gap"
                      aria-label="gap found here"
                    />
                  )}
                </span>
                <span
                  className={
                    "text-sm " +
                    (state === "upcoming" ? "text-ink-soft" : "font-medium text-ink")
                  }
                >
                  {s.label}
                </span>
              </Link>
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden
                  className={
                    "mt-4 h-0.5 w-8 shrink-0 " + (i < activeIndex ? "bg-signal" : "bg-paper-line")
                  }
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
