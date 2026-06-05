import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icons/Icon";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-md border border-sand-300 bg-white pl-3 pr-10 text-sm text-ink-900",
          "transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-jade-500",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400">
        <Icon name="chevron-down" size={18} />
      </span>
    </div>
  );
}
