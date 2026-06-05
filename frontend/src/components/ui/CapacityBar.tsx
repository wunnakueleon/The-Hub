import { cn } from "../../lib/cn";
import { spotsLeft } from "../../lib/format";

export interface CapacityBarProps {
  capacity: number;
  booked: number;
  className?: string;
}

export function CapacityBar({ capacity, booked, className }: CapacityBarProps) {
  const left = spotsLeft(capacity, booked);
  const pct = capacity > 0 ? Math.min(100, Math.round((booked / capacity) * 100)) : 0;
  const full = left === 0;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div
        className="h-2 w-full overflow-hidden rounded-pill bg-sand-200"
        role="progressbar"
        aria-valuenow={booked}
        aria-valuemin={0}
        aria-valuemax={capacity}
        aria-label="Spots filled"
      >
        <div
          className={cn(
            "h-full rounded-pill transition-all",
            full ? "bg-coral-500" : "bg-jade-600",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-ink-500">
        {full ? "Fully booked" : `${left} spot${left === 1 ? "" : "s"} left`}
      </p>
    </div>
  );
}
