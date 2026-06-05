import { Link, useParams } from "react-router-dom";
import { useEventById } from "../features/events/hooks/useEventById";
import { EventHero } from "../features/events/components/EventHero";
import { EventDetail } from "../features/events/components/EventDetail";
import { useAuth } from "../features/auth/hooks/useAuth";
import { baht, spotsLeft } from "../lib/format";
import { ROUTES } from "../lib/constants";
import { Button, CapacityBar, Card } from "../components/ui";
import { Icon } from "../components/icons/Icon";
import type { Event } from "../types";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { event, loading, notFound, error } = useEventById(id);

  if (loading) {
    return <div className="site-container py-28 text-center text-ink-500">Loading retreat…</div>;
  }

  if (notFound) {
    return (
      <div className="site-container py-28 text-center">
        <h1 className="font-display text-3xl text-jade-900">Retreat not found</h1>
        <p className="mt-3 text-ink-500">It may have wrapped up or been unpublished.</p>
        <Link to={ROUTES.events} className="mt-6 inline-block">
          <Button>Browse retreats</Button>
        </Link>
      </div>
    );
  }

  if (error || !event) {
    return <div className="site-container py-28 text-center text-coral-600">{error}</div>;
  }

  return (
    <>
      <EventHero ev={event} />
      <section className="site-container py-12 pb-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
          <EventDetail ev={event} />
          {/* Temporary aside — replaced by the full BookingPanel in Step 10 */}
          <ReserveAside ev={event} />
        </div>
      </section>
    </>
  );
}

function ReserveAside({ ev }: { ev: Event }) {
  const { isAuthed } = useAuth();
  const full = spotsLeft(ev.capacity, ev.booked) === 0;

  return (
    <aside className="lg:sticky lg:top-[88px]">
      <Card className="p-6 shadow-lg">
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
          <Button fullWidth size="lg" disabled title="Booking opens in the next step">
            {full ? "Join the waitlist" : "Reserve your spot"}
          </Button>
        ) : (
          <Link to={ROUTES.signup} state={{ from: ROUTES.eventDetail(ev.id) }}>
            <Button fullWidth size="lg">
              Create an account to book <Icon name="arrow-right" size={18} />
            </Button>
          </Link>
        )}

        <ul className="mt-4.5 grid gap-2.5">
          {[
            "Free cancellation up to 30 days",
            "Deposit rolls to next season",
            "Confirmation by email",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2.5 text-[13px] text-ink-500">
              <Icon name="check" size={15} className="text-jade-600" /> {t}
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
