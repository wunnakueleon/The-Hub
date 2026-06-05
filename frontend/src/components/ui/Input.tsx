import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icons/Icon";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconName;
  invalid?: boolean;
}

const base =
  "h-11 w-full rounded-md border bg-white text-sm text-ink-900 placeholder:text-ink-400 " +
  "transition-colors focus-visible:outline-2 focus-visible:outline-offset-1";

export function Input({ icon, invalid, className, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
          <Icon name={icon} size={18} />
        </span>
      )}
      <input
        className={cn(
          base,
          icon ? "pl-10 pr-3" : "px-3",
          invalid
            ? "border-coral-500 focus-visible:outline-coral-500"
            : "border-sand-300 focus-visible:outline-jade-500",
          className,
        )}
        aria-invalid={invalid}
        {...props}
      />
    </div>
  );
}
