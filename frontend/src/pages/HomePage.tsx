import { Link } from "react-router-dom";
import { useEvents } from "../features/events/hooks/useEvents";
import { EventCard } from "../features/events/components/EventCard";
import { ROUTES } from "../lib/constants";
import { Badge, SectionTitle, Avatar, AvatarStack } from "../components/ui";
import { Icon, type IconName } from "../components/icons/Icon";
import { KarstScene } from "../components/icons/KarstScene";
import { WaveDivider } from "../components/icons/WaveDivider";
import { SunMotif } from "../components/icons/SunMotif";

const VALUE_PROPS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "users",
    title: "Come alone, leave with a crew",
    body: "Most people arrive not knowing anyone. One long dinner table changes that fast.",
  },
  {
    icon: "monitor",
    title: "A villa wired for building",
    body: "Fibre, 4K monitors, standing desks and a shaded work sala — then a pool ten steps away.",
  },
  {
    icon: "leaf",
    title: "No agenda, no pressure",
    body: "Build a thing, join a project, or just rest. There is zero obligation to ship.",
  },
];

export default function HomePage() {
  const { events } = useEvents();
  const featured = events[0];
  const rest = events.slice(1);
  const people = events.flatMap((e) => e.attendees).slice(0, 9);
  const total = events.reduce((s, e) => s + e.booked, 0);

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[660px] items-end overflow-hidden">
        <KarstScene className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-jade-900/40" />
        <div className="site-container relative pb-24 pt-16">
          <div className="max-w-[720px]">
            <Badge tone="gold" className="mb-5">
              <Icon name="sparkle" size={14} /> Seasonal retreats · Southern Thailand
            </Badge>
            <h1 className="font-display text-5xl leading-[0.98] text-white drop-shadow-lg sm:text-7xl lg:text-[86px]">
              Build something
              <br />
              <span className="italic text-gold-400">by the sea.</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-xl leading-relaxed text-white/90 drop-shadow">
              A mansion on a Thai island. A handful of developers. Seven days to pair up, ship
              side-projects for the fun of it, and swim between commits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                to={ROUTES.events}
                className="inline-flex items-center gap-2 rounded-pill bg-gold-500 px-8 py-4 text-base font-semibold text-jade-900 shadow-sm transition-colors hover:bg-gold-400"
              >
                Browse retreats <Icon name="arrow-right" size={18} />
              </Link>
              <Link
                to={ROUTES.about}
                className="rounded-pill border border-white/30 bg-white/15 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
        <WaveDivider className="absolute -bottom-px left-0 h-12 w-full text-sand-50" />
      </section>

      {/* VALUE PROPS */}
      <section className="site-container grid grid-cols-1 gap-6 px-5 py-6 sm:grid-cols-3">
        {VALUE_PROPS.map((c) => (
          <div key={c.title} className="p-1">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-[13px] bg-jade-100 text-jade-700">
              <Icon name={c.icon} size={24} />
            </span>
            <h3 className="mb-2 font-display text-2xl text-jade-900">{c.title}</h3>
            <p className="text-[15px] leading-relaxed text-ink-500">{c.body}</p>
          </div>
        ))}
      </section>

      {/* UPCOMING */}
      <section className="site-container py-16 pb-5">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <SectionTitle eyebrow="Upcoming retreats" title="Pick your island & season" />
          <Link
            to={ROUTES.events}
            className="inline-flex items-center gap-1.5 rounded-pill border border-jade-700/30 px-5 py-2.5 text-sm font-semibold text-jade-700 transition-colors hover:bg-jade-100"
          >
            See all <Icon name="arrow-right" size={16} />
          </Link>
        </div>
        {events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featured && <EventCard ev={featured} featured />}
            {rest.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        )}
      </section>

      {/* WHO'S COMING */}
      <section className="relative mt-16 overflow-hidden bg-jade-900">
        <WaveDivider flip className="absolute -top-px left-0 h-12 w-full text-jade-900" />
        <div className="site-container grid grid-cols-1 items-center gap-14 py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SunMotif className="mb-4 h-16 w-16 text-gold-400/70" />
            <SectionTitle
              eyebrow="Who comes"
              title="Builders, not tourists"
              subtitle="Working developers, designers and indie hackers who like making things for the joy of it. Here's a sample of who's already booked this season."
              className="[&_h2]:text-white [&_p]:text-white/80"
            />
            <div className="mt-7 flex items-center gap-4.5">
              <AvatarStack people={people} max={6} size={46} />
              <span className="text-[15px] text-white/80">+{total} developers this year</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {people.slice(0, 6).map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3.5"
              >
                <Avatar name={p.name} hue={p.hue} size={40} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">{p.name}</div>
                  <div className="truncate text-xs text-gold-400">{p.tech}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="site-container py-20">
        <div className="relative overflow-hidden rounded-xl bg-jade-800 px-8 py-16 text-center sm:px-16">
          <SunMotif className="absolute left-1/2 top-5 h-20 w-20 -translate-x-1/2 text-gold-400/50" />
          <h2 className="relative font-display text-3xl text-white sm:text-5xl">
            Your seat at the table is waiting.
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-lg text-white/85">
            Reserve a spot in minutes. No payment due today — just claim your bed.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <Link
              to={ROUTES.signup}
              className="rounded-pill bg-gold-500 px-8 py-4 text-base font-semibold text-jade-900 transition-colors hover:bg-gold-400"
            >
              Create your account
            </Link>
            <Link
              to={ROUTES.events}
              className="rounded-pill border border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse retreats
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
