import { SunMotif } from "../components/icons/SunMotif";
import { Icon, type IconName } from "../components/icons/Icon";
import { Card } from "../components/ui";

const PILLARS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "leaf",
    title: "The philosophy",
    body: "We build for fun here. No KPIs, no investors in the room — just the simple pleasure of making something with people who get it.",
  },
  {
    icon: "map-pin",
    title: "The location",
    body: "Limestone karsts, warm water and slow islands in the Andaman Sea and the Gulf — Koh Yao, Lanta, Samui and Phangan, one villa at a time.",
  },
  {
    icon: "users",
    title: "The people",
    body: "Capped at the number of beds in the house. Small enough that you'll know every name by dinner on the first night.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="site-container max-w-[760px] py-20 pb-10 text-center">
        <SunMotif className="mx-auto mb-5 h-16 w-16 text-gold-500" />
        <h1 className="font-display text-4xl text-jade-900 sm:text-5xl lg:text-6xl">
          An invitation, not a conference.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-500">
          The Hub started with a simple idea: rent a beautiful house on a Thai island, invite a
          handful of developers, and see what happens when you remove deadlines, clients and
          standups for a week.
        </p>
      </section>

      <section className="site-container grid grid-cols-1 gap-7 py-8 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <Card key={p.title} className="p-7">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-gold-200 text-gold-600">
              <Icon name={p.icon} size={26} />
            </span>
            <h3 className="mb-2.5 font-display text-2xl text-jade-900">{p.title}</h3>
            <p className="text-[15px] leading-relaxed text-ink-500">{p.body}</p>
          </Card>
        ))}
      </section>
    </>
  );
}
