import { useState } from "react";
import { Link } from "react-router-dom";
import type { Event } from "../../../types";
import { baht, spotsLeft } from "../../../lib/format";
import { ROUTES } from "../../../lib/constants";
import { Button, Card, CapacityBar } from "../../../components/ui";
import { Icon } from "../../../components/icons/Icon";
import { useAuth } from "../../auth/hooks/useAuth";
import { useMyBookings } from "../hooks/useMyBookings";
import { BookingFlow } from "./BookingFlow";

const REASSURANCE = [
  "Free cancellation up to 30 days",
  "Deposit rolls to next season",
  "Confirmation by email",
];

export function BookingPanel({ ev }: { ev: Event }) {
  const { isAuthed } = useAuth();
  const { bookings, loading, refetch } = useMyBookings();
  const [flowOpen, setFlowOpen] = useState(false);

  const full = spotsLeft(ev.capacity, ev.booked) === 0;
  const existing = isAuthed
    ? bookings.find((b) => b.eventId === ev.id && b.status !== "cancelled")
    : undefined;

  return (
    <aside className="lg:sticky lg:top-[88px]">
      <Card className="p-6 shadow-lg">
        {existing ? (
          <div className="text-center">
            <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-jade-100 text-jade-700">
              <Icon name="check-circle" size={30} />
            </span>
            <h3 className="font-display text-2xl text-jade-900">
              {existing.status === "waitlisted" ? "You're on the waitlist" : "You're going!"}
            </h3>
            <p className="mt-1.5 text-sm text-ink-500">Confirmation</p>
            <div className="my-2 font-display text-xl font-semibold tracking-wide text-gold-600">
              {existing.ref}
            </div>
            <Link to={ROUTES.myBookings}>
              <Button variant="outline" fullWidth>
                Manage booking
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm text-ink-400">from</span>
              <span className="font-display text-3xl font-semibold text-jade-900">
                {baht(ev.priceFrom)}
              </span>
              <span className="text-sm text-ink-400">/ person · week</span>
            </div>
            <p className="mt-0.5 text-xs text-ink-400">All-inclusive · no payment due today</p>

            <div className="my-4.5">
              <CapacityBar capacity={ev.capacity} booked={ev.booked} />
            </div>

            {isAuthed ? (
              <Button fullWidth size="lg" disabled={loading} onClick={() => setFlowOpen(true)}>
                {full ? "Join the waitlist" : "Reserve your spot"}
                <Icon name="arrow-right" size={18} />
              </Button>
            ) : (
              <Link to={ROUTES.signup} state={{ from: ROUTES.eventDetail(ev.id) }}>
                <Button fullWidth size="lg">
                  Create an account to book <Icon name="arrow-right" size={18} />
                </Button>
              </Link>
            )}

            <ul className="mt-4.5 grid gap-2.5">
              {REASSURANCE.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[13px] text-ink-500">
                  <Icon name="check" size={15} className="text-jade-600" /> {t}
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      {isAuthed && (
        <BookingFlow ev={ev} open={flowOpen} onClose={() => setFlowOpen(false)} onBooked={refetch} />
      )}
    </aside>
  );
}
