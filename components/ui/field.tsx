import { forwardRef, useId } from "react";

// Labeled input on --surface with a --line border. Focus ring comes from the
// global :focus-visible rule (DESIGN §5).
export const Field = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string }
>(function Field({ label, id, className = "", ...props }, ref) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={`rounded border border-line bg-surface px-3 py-2 text-base text-ink placeholder:text-graphite ${className}`}
        {...props}
      />
    </div>
  );
});
