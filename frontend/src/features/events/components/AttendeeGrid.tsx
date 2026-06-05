import type { Attendee } from "../../../types";
import { Avatar } from "../../../components/ui";

export function AttendeeGrid({ attendees }: { attendees: Attendee[] }) {
  if (attendees.length === 0) {
    return <p className="text-sm text-ink-500">Be the first to book this retreat.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {attendees.map((p, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border border-sand-200/60 bg-white p-3.5 shadow-sm"
        >
          <Avatar name={p.name} hue={p.hue} size={42} />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-jade-900">{p.name}</div>
            <div className="truncate text-xs text-ink-400">{p.tech}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
