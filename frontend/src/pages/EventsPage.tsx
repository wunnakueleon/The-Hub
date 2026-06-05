import { useEvents } from "../features/events/hooks/useEvents";
import { EventGrid } from "../features/events/components/EventGrid";
import { KarstScene } from "../components/icons/KarstScene";
import { WaveDivider } from "../components/icons/WaveDivider";

export default function EventsPage() {
  const { events, loading, error } = useEvents();

  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-jade-900">
        <KarstScene className="absolute inset-0 h-full w-full opacity-35" />
        <div className="site-container relative py-16 pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
            Seasonal retreats
          </p>
          <h1 className="mt-3 max-w-[720px] font-display text-4xl text-white sm:text-5xl lg:text-6xl">
            Four islands. Four seasons. One villa at a time.
          </h1>
          <p className="mt-4 max-w-[540px] text-lg text-white/80">
            Each retreat is capped at the number of beds in the house. Reserve early — they fill fast.
          </p>
        </div>
        <WaveDivider className="absolute -bottom-px left-0 h-10 w-full text-sand-50" />
      </section>

      <section className="site-container py-12 pb-20">
        {loading && <p className="py-10 text-ink-500">Loading retreats…</p>}
        {error && <p className="py-10 text-coral-600">{error}</p>}
        {!loading && !error && <EventGrid events={events} />}
      </section>
    </>
  );
}
