import { Link } from "react-router-dom";
import type { Booking } from "../../../types";
import { cn } from "../../../lib/cn";
import { formatDate, formatDateRange } from "../../../lib/format";
import { ROUTES } from "../../../lib/constants";
import { Button, StatusBadge } from "../../../components/ui";
import { Icon } from "../../../components/icons/Icon";
import { KarstScene } from "../../../components/icons/KarstScene";
import type { BookingStatus } from "../../../types";

export function BookingCard({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: (booking: Booking) => void;
}) {
  const cancelled = booking.status === "cancelled";

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-5 rounded-lg border border-sand-200/60 bg-white p-4 shadow-sm sm:grid-cols-[150px_1fr_auto]",
        cancelled && "opacity-60",
      )}
    >
      <div className="relative h-28 overflow-hidden rounded-md">
        <KarstScene className="absolute inset-0 h-full w-full" />
      </div>

      <div className="min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
          <StatusBadge status={booking.status as BookingStatus} />
          <span className="text-xs text-ink-400">Booked {formatDate(booking.createdAt)}</span>
        </div>
        <h3 className="font-display text-xl text-jade-900">{booking.event.name}</h3>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-ink-500">
          <span className="flex items-center gap-1.5">
            <Icon name="calendar" size={14} /> {formatDateRange(booking.event.startDate, booking.event.endDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="bed" size={14} /> {booking.room.name}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="ticket" size={14} /> {booking.ref}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link to={ROUTES.eventDetail(booking.eventId)}>
          <Button variant="outline" size="sm" fullWidth>
            View retreat
          </Button>
        </Link>
        {!cancelled && (
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="text-coral-600 hover:bg-coral-200/40"
            onClick={() => onCancel(booking)}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
