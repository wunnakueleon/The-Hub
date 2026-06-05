import { Link } from "react-router-dom";
import type { Event } from "../../../types";
import { formatDateRange } from "../../../lib/format";
import { ROUTES } from "../../../lib/constants";
import { Icon } from "../../../components/icons/Icon";
import { KarstScene } from "../../../components/icons/KarstScene";
import { Badge } from "../../../components/ui";

export function EventHero({ ev }: { ev: Event }) {
  return (
    <section className="relative flex h-[460px] items-end overflow-hidden">
      <KarstScene className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-jade-900/55" />

      <div className="site-container relative pb-10">
        <Link
          to={ROUTES.events}
          className="mb-4.5 inline-flex items-center gap-1.5 rounded-pill border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/25"
        >
          <Icon name="arrow-left" size={15} /> All retreats
        </Link>

        <div className="mb-3.5 flex flex-wrap gap-2.5">
          {ev.heroTag && (
            <Badge tone={ev.heroTag === "Sold out" ? "coral" : "gold"}>{ev.heroTag}</Badge>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/15 px-3 py-1 text-xs font-medium text-white">
            <Icon name="calendar" size={14} /> {formatDateRange(ev.startDate, ev.endDate)}
          </span>
        </div>

        <h1 className="max-w-[760px] font-display text-4xl text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          {ev.name}
        </h1>

        <div className="mt-4 flex flex-wrap gap-5 text-sm text-white">
          <span className="flex items-center gap-2">
            <Icon name="map-pin" size={17} /> {ev.island}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="leaf" size={17} /> {ev.villa}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="users" size={17} /> {ev.capacity} beds
          </span>
        </div>
      </div>
    </section>
  );
}
