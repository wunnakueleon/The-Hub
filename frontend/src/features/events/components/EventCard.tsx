import { Link } from "react-router-dom";
import type { EventSummary } from "../../../types";
import { cn } from "../../../lib/cn";
import { baht, formatDateRange, spotsLeft } from "../../../lib/format";
import { ROUTES } from "../../../lib/constants";
import { Icon } from "../../../components/icons/Icon";
import { KarstScene } from "../../../components/icons/KarstScene";
import { Badge, CapacityBar } from "../../../components/ui";

export function EventCard({ ev, featured = false }: { ev: EventSummary; featured?: boolean }) {
  const left = spotsLeft(ev.capacity, ev.booked);
  const full = left === 0;
  const low = left <= 4 && !full;
  const detail = ROUTES.eventDetail(ev.id);

  return (
    <article
      className={cn(
        "reveal is-visible flex flex-col overflow-hidden rounded-lg border border-sand-200/60 bg-white shadow-md transition-shadow hover:shadow-lg",
        featured && "sm:col-span-2",
      )}
    >
      {/* Scenery hero */}
      <div className={cn("relative", featured ? "h-60" : "h-46")}>
        <KarstScene className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-jade-900/55" />
        <div className="absolute left-3.5 top-3.5 flex gap-2">
          {ev.heroTag && (
            <Badge tone={ev.heroTag === "Sold out" ? "coral" : "gold"}>{ev.heroTag}</Badge>
          )}
          {low && (
            <Badge tone="coral">
              <span className="h-1.5 w-1.5 rounded-full bg-current" /> Almost full
            </Badge>
          )}
        </div>
        <div className="absolute inset-x-4 bottom-3.5 flex items-center gap-2 text-sm font-medium text-white drop-shadow">
          <Icon name="map-pin" size={16} /> {ev.island}
        </div>
      </div>

      {/* Body */}
      <div className={cn("flex flex-1 flex-col gap-3.5", featured ? "p-7" : "p-5.5")}>
        <div className="flex items-center gap-2 text-sm font-semibold text-gold-600">
          <Icon name="calendar" size={15} /> {formatDateRange(ev.startDate, ev.endDate)}
        </div>
        <h3 className={cn("font-display text-jade-900", featured ? "text-3xl" : "text-2xl")}>
          {ev.name}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-500">{ev.tagline}</p>

        <CapacityBar capacity={ev.capacity} booked={ev.booked} />

        <div className="mt-1 flex items-center justify-between">
          <div>
            <span className="text-xs text-ink-400">from </span>
            <span className="font-display text-2xl font-semibold text-jade-900">
              {baht(ev.priceFrom)}
            </span>
            <span className="text-xs text-ink-400"> / week</span>
          </div>
          <div className="flex gap-2">
            <Link
              to={detail}
              className="rounded-pill bg-sand-200 px-4 py-2 text-sm font-semibold text-jade-800 transition-colors hover:bg-sand-300"
            >
              Details
            </Link>
            <Link
              to={detail}
              className="inline-flex items-center gap-1.5 rounded-pill bg-jade-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-jade-800"
            >
              {full ? "Waitlist" : "Book"} <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
