import { useState } from "react";
import type { EventSummary } from "../../../types";
import { cn } from "../../../lib/cn";
import { spotsLeft } from "../../../lib/format";
import { EventCard } from "./EventCard";

type Filter = "all" | "available" | "almost";

const TABS: { key: Filter; label: string }[] = [
  { key: "all", label: "All retreats" },
  { key: "available", label: "Spots open" },
  { key: "almost", label: "Almost full" },
];

export function EventGrid({ events }: { events: EventSummary[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = events.filter((e) => {
    const left = spotsLeft(e.capacity, e.booked);
    if (filter === "available") return left > 0;
    if (filter === "almost") return left > 0 && left <= 4;
    return true;
  });

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-2.5">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              "rounded-pill border px-4 py-2 text-sm font-semibold transition-colors",
              filter === tab.key
                ? "border-jade-700 bg-jade-700 text-white"
                : "border-sand-300 bg-white text-ink-700 hover:bg-sand-100",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ev) => (
            <EventCard key={ev.id} ev={ev} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-ink-500">No retreats match that filter right now.</p>
      )}
    </div>
  );
}
