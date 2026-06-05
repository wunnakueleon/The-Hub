import type { ScheduleItem } from "../../../types";
import { cn } from "../../../lib/cn";

export function ScheduleTimeline({ schedule }: { schedule: ScheduleItem[] }) {
  return (
    <div className="pl-1">
      {schedule.map((s, i) => {
        const last = i === schedule.length - 1;
        return (
          <div key={i} className={cn("grid grid-cols-[64px_1fr] gap-4.5", !last && "pb-6")}>
            <div className="pt-px text-right font-display text-[17px] font-semibold text-gold-600">
              {s.time}
            </div>
            <div className={cn("relative pl-6.5", !last && "border-l-2 border-sand-300")}>
              <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-jade-600 ring-4 ring-sand-50" />
              <div className="text-base font-semibold text-jade-900">{s.title}</div>
              <div className="mt-0.5 text-sm text-ink-500">{s.note}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
