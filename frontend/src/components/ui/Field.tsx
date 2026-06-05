import type { ReactNode } from "react";
import { useId } from "react";
import { cn } from "../../lib/cn";

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  // Render-prop receives the id to wire up the control's htmlFor/aria
  children: (id: string) => ReactNode;
}

export function Field({ label, hint, error, required, className, children }: FieldProps) {
  const id = useId();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink-700">
        {label}
        {required && <span className="ml-0.5 text-coral-500">*</span>}
      </label>

      {children(id)}

      {error ? (
        <p className="text-xs text-coral-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}
