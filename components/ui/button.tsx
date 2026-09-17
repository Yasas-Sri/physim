import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "signal" | "ghost-lab";

const styles: Record<Variant, string> = {
  // Solid ink on paper — the notebook primary action.
  primary: "bg-ink text-paper hover:opacity-90",
  // Light surface with hairline border.
  secondary: "bg-paper-panel border border-paper-line text-ink hover:bg-paper",
  // Teal — the load-bearing action (Run it, Lock in prediction, Check). §6.4.
  signal: "bg-signal text-ink hover:brightness-95",
  // Ghost on the dark lab panel — hairline border, lab text.
  "ghost-lab": "bg-transparent border border-lab-line text-lab-text hover:bg-lab-panel-2",
};

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function Button({ variant = "primary", className = "", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-control px-4 py-2 text-sm font-medium transition-opacity disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  );
});
