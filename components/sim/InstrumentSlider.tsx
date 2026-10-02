"use client";

// Instrument dial (NewDesign.md §6.4): teal fill/thumb (accent-signal), label in
// sans, value in mono. Lives on the dark lab panel. Arrow-key operable (§10).
export function InstrumentSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="flex justify-between">
        <span className="text-lab-text">{label}</span>
        <span className="tabular font-mono text-mono-sm text-lab-text-dim">
          {value.toFixed(2)}
          {unit && <span className="ml-1">{unit}</span>}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-pill bg-lab-line accent-signal"
      />
    </label>
  );
}
