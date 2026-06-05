import { Link, useParams } from "react-router-dom";
import { useEventById } from "../features/events/hooks/useEventById";
import { EventHero } from "../features/events/components/EventHero";
import { EventDetail } from "../features/events/components/EventDetail";
import { BookingPanel } from "../features/booking/components/BookingPanel";
import { ROUTES } from "../lib/constants";
import { Button } from "../components/ui";

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
          <BookingPanel ev={event} />
        </div>
      </section>
    </>
  );
}
