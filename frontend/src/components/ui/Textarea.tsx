import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ invalid, className, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "w-full rounded-md border bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400",
        "transition-colors focus-visible:outline-2 focus-visible:outline-offset-1",
        invalid
          ? "border-coral-500 focus-visible:outline-coral-500"
          : "border-sand-300 focus-visible:outline-jade-500",
        className,
      )}
      aria-invalid={invalid}
      {...props}
    />
  );
}
