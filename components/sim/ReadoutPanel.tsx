export type ReadoutRow = {
  label: string;
  value: string;
  unit?: string;
  /** Emphasise the lesson's hinge line: teal for measured, amber when surprising. */
  tone?: "teal" | "amber";
};

const toneClass: Record<NonNullable<ReadoutRow["tone"]>, string> = {
  teal: "text-signal",
  amber: "text-gap",
};

// Instrument panel (NewDesign.md §6.3): dark lab-panel, mono decimal-aligned
// values, units dimmed, quiet hairline rows. The hinge line is emphasised.
export function ReadoutPanel({
  title = "Readout",
  rows,
}: {
  title?: string;
  rows: ReadoutRow[];
}) {
  return (
    <div className="rounded-panel border border-lab-line bg-lab-panel p-4">
      <p className="mb-3 text-sm font-medium text-lab-text-dim">{title}</p>
      <dl className="flex flex-col divide-y divide-lab-line">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4 py-1.5 first:pt-0 last:pb-0">
            <dt className={`text-sm ${r.tone ? "text-lab-text" : "text-lab-text-dim"}`}>{r.label}</dt>
            <dd className="tabular font-mono text-sm">
              <span className={r.tone ? toneClass[r.tone] : "text-lab-text"}>{r.value}</span>
              {r.unit && <span className="ml-1 text-lab-text-dim">{r.unit}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
