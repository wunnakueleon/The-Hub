import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import type { Booking } from "../types";
import { ROUTES } from "../lib/constants";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useMyBookings } from "../features/booking/hooks/useMyBookings";
import { BookingCard } from "../features/booking/components/BookingCard";
import { CancelModal } from "../features/booking/components/CancelModal";
import { Button, SectionTitle } from "../components/ui";
import { Icon } from "../components/icons/Icon";

export default function MyBookingsPage() {
  const { isAuthed } = useAuth();
  const { bookings, loading, error, cancel } = useMyBookings();
  const [cancelling, setCancelling] = useState<Booking | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  if (!isAuthed) {
    return <Navigate to={ROUTES.login} replace state={{ from: ROUTES.myBookings }} />;
  }

  const upcoming = bookings.filter((b) => b.status !== "cancelled");
  const past = bookings.filter((b) => b.status === "cancelled");

  async function confirmCancel() {
    if (!cancelling) return;
    setCancelLoading(true);
    try {
      await cancel(cancelling.id);
      setCancelling(null);
    } finally {
      setCancelLoading(false);
    }
  }

  return (
    <div className="site-container max-w-[980px] py-12 pb-24">
      <SectionTitle
        eyebrow="Your account"
        title="My bookings"
        subtitle="Every retreat you've reserved, with status and confirmation codes."
      />

      {loading && <p className="py-10 text-ink-500">Loading your bookings…</p>}
      {error && <p className="py-10 text-coral-600">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <div className="mt-8 rounded-lg border border-sand-200 bg-white p-14 text-center shadow-sm">
          <span className="mx-auto mb-4 grid h-15 w-15 place-items-center rounded-full bg-sand-200 text-jade-700">
            <Icon name="ticket" size={30} />
          </span>
          <h3 className="font-display text-2xl text-jade-900">No bookings yet</h3>
          <p className="mt-2 text-ink-500">Find an island and claim your bed.</p>
          <Link to={ROUTES.events} className="mt-5 inline-block">
            <Button>Browse retreats</Button>
          </Link>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="mt-8 grid gap-4">
          {[...upcoming, ...past].map((b) => (
            <BookingCard key={b.id} booking={b} onCancel={setCancelling} />
          ))}
        </div>
      )}

      <CancelModal
        booking={cancelling}
        onClose={() => setCancelling(null)}
        onConfirm={confirmCancel}
        loading={cancelLoading}
      />
    </div>
  );
}
