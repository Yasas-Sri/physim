import Link from "next/link";
import type { Report } from "@/lib/report/build";
import { Button } from "@/components/ui/button";
import { MasterySeal } from "./MasterySeal";

const pct = (n: number) => `${Math.round(n * 100)}%`;

// The lab-report sheet (NewDesign.md §6.10): paper-panel, rounded-canvas, the one
// allowed soft shadow. Composed from gathered evidence, not generic praise. When
// the loop worked, the teal mastery seal stamps on.
export function ReportSheet({ report, conceptId }: { report: Report; conceptId: string }) {
  const mastered =
    (!report.topMisconception || report.topMisconception.resolved) &&
    report.transfer.some((t) => t.supported);

  return (
    <div className="rounded-canvas border border-paper-line bg-paper-panel p-8 shadow-[0_16px_48px_-20px_rgba(0,0,0,.3)]">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-ink-soft">Mastery report</p>
          <p className="mt-2 max-w-[72ch] font-display text-h3 leading-tight text-ink">
            {report.verdict}
          </p>
        </div>
        {mastered && <MasterySeal />}
      </div>

      <div className="mt-8 flex flex-col gap-8">
        <section className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-ink-soft">Prediction accuracy — before and after</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-panel border border-paper-line p-3">
              <p className="text-sm text-ink-soft">Entered</p>
              <p className="tabular mt-1 font-mono text-sm text-ink">
                explanation {pct(report.before.explanation)}
              </p>
              <p className="tabular font-mono text-sm text-ink">
                misconception risk {pct(report.before.misconceptionRisk)}
              </p>
            </div>
            <div className="rounded-panel border border-paper-line border-l-4 border-l-signal p-3">
              <p className="text-sm text-ink-soft">Now</p>
              <p className="tabular mt-1 font-mono text-sm text-ink">
                explanation {pct(report.after.explanation)}
              </p>
              <p className="tabular font-mono text-sm text-ink">
                misconception risk {pct(report.after.misconceptionRisk)}
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-ink-soft">Where you stand</h3>
          {report.scores.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="text-ink-soft">{s.label}</span>
                <span className="tabular font-mono text-mono-sm text-ink-soft">{pct(s.value)}</span>
              </div>
              <div className="h-1.5 w-full rounded-pill bg-paper-line">
                <div className="h-full rounded-pill bg-signal" style={{ width: pct(s.value) }} />
              </div>
            </div>
          ))}
        </section>

        {report.strengths.length > 0 && (
          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-ink-soft">What you showed</h3>
            <ul className="flex flex-col gap-1.5">
              {report.strengths.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-ink">
                  <span aria-hidden className="text-signal-ink">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {report.topMisconception && (
          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-ink-soft">
              {report.topMisconception.resolved ? "Gap closed" : "Still to watch"}
            </h3>
            <div
              className={
                "rounded-panel border p-3 " +
                (report.topMisconception.resolved
                  ? "border-paper-line border-l-4 border-l-signal bg-signal-wash"
                  : "border-paper-line border-l-4 border-l-gap bg-gap-wash")
              }
            >
              <p className="text-sm font-medium text-ink">
                {report.topMisconception.resolved ? "✓ " : "▲ "}
                {report.topMisconception.belief}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{report.topMisconception.correction}</p>
            </div>
          </section>
        )}

        {report.transfer.length > 0 && (
          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-ink-soft">Transfer</h3>
            <ul className="flex flex-col gap-2">
              {report.transfer.map((t, i) => (
                <li key={i} className="rounded-panel border border-paper-line p-3">
                  <p className="text-sm text-ink">{t.prompt}</p>
                  <p className={"tabular mt-1 font-mono text-mono-sm " + (t.supported ? "text-signal-ink" : "text-gap-ink")}>
                    {t.supported ? "transferred" : "didn't transfer"} · {pct(t.score)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {report.largestGap && (
          <section className="flex flex-col gap-3 border-t border-paper-line pt-6">
            <p className="text-sm text-ink-soft">Biggest remaining gap: {report.largestGap.label}.</p>
            <Link href={`/concept/${conceptId}/${report.largestGap.stage}`}>
              <Button variant="signal">Retry the largest gap</Button>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
