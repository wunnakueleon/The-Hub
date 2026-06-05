import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icons/Icon";

export interface StatProps {
  icon: IconName;
  value: string | number;
  label: string;
  className?: string;
}

export function Stat({ icon, value, label, className }: StatProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border border-sand-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-jade-100 text-jade-700">
        <Icon name={icon} size={20} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-2xl leading-none text-jade-900">{value}</p>
        <p className="mt-1 text-xs text-ink-500">{label}</p>
      </div>
    </div>
  );
}
