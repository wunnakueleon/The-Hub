import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { formatDateRange, spotsLeft } from "../../../lib/format";
import { ROUTES } from "../../../lib/constants";
import { Stat, CapacityBar, Badge, Button } from "../../../components/ui";
import { Icon } from "../../../components/icons/Icon";
import { useAdminStats } from "../hooks/useAdminStats";

export function AdminDashboard() {
  const { stats, loading, error } = useAdminStats();

  if (loading) return <p className="text-ink-500">Loading dashboard…</p>;
  if (error || !stats) return <p className="text-coral-600">{error}</p>;

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon="calendar" value={stats.publishedEvents} label="Published events" />
        <Stat icon="ticket" value={stats.totalBookings} label="Bookings across all events" />
        <Stat icon="gauge" value={`${stats.fillRate}%`} label="Overall fill rate" />
        <Stat icon="users" value={stats.totalUsers} label="Registered developers" />
      </div>

      <h3 className="mb-4 font-display text-2xl text-jade-900">Upcoming at a glance</h3>
      <div className="grid gap-3">
        {stats.events.map((e) => {
          const left = spotsLeft(e.capacity, e.booked);
          return (
            <div
              key={e.id}
              className="grid grid-cols-1 items-center gap-4 rounded-lg border border-sand-200/60 bg-white p-4 shadow-sm sm:grid-cols-[1.4fr_1fr_120px_auto]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="truncate font-bold text-jade-900">{e.name}</span>
                  {!e.published && <Badge tone="neutral">Draft</Badge>}
                </div>
                <div className="mt-1 flex flex-wrap gap-3.5 text-xs text-ink-400">
                  <span className="flex items-center gap-1.5">
                    <Icon name="calendar" size={13} /> {formatDateRange(e.startDate, e.endDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="map-pin" size={13} /> {e.island}
                  </span>
                </div>
              </div>
              <div className="max-w-[200px]">
                <CapacityBar capacity={e.capacity} booked={e.booked} />
              </div>
              <div className={cn("text-sm font-semibold", left === 0 ? "text-coral-600" : "text-ink-500")}>
                {left === 0 ? "Full" : `${left} spots left`}
              </div>
              <Link to={ROUTES.adminEventRegs(e.id)} className="justify-self-end">
                <Button variant="outline" size="sm">
                  View <Icon name="arrow-right" size={14} />
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
