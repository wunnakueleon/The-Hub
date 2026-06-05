import type { Event } from "../../../types";
import { SectionTitle } from "../../../components/ui";
import { Icon } from "../../../components/icons/Icon";
import { AmenityGrid } from "./AmenityGrid";
import { IncludedList } from "./IncludedList";
import { ScheduleTimeline } from "./ScheduleTimeline";
import { AttendeeGrid } from "./AttendeeGrid";
import { EventFAQ } from "./EventFAQ";

// The full detail-page content (left column). The booking sidebar is
// composed alongside this on the page.
export function EventDetail({ ev }: { ev: Event }) {
  const gateway = ev.island.includes("Krabi") ? "Krabi (KBV)" : "Phuket (HKT)";

  return (
    <div className="flex flex-col gap-14">
      <div>
        <p className="font-display text-2xl italic leading-snug text-jade-800 sm:text-[28px]">
          {ev.tagline}
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-500">{ev.desc}</p>
      </div>

      <div>
        <SectionTitle eyebrow="The villa" title={ev.villa} />
        <div className="mt-5">
          <AmenityGrid amenities={ev.amenities} />
        </div>
      </div>

      <div>
        <SectionTitle eyebrow="All-inclusive" title="What's included" />
        <div className="mt-5">
          <IncludedList items={ev.included} />
        </div>
      </div>

      <div>
        <SectionTitle eyebrow="A day in the villa" title="The daily rhythm" />
        <div className="mt-6">
          <ScheduleTimeline schedule={ev.schedule} />
        </div>
      </div>

      <div>
        <SectionTitle eyebrow="Who's coming" title={`${ev.booked} builders booked`} />
        <div className="mt-5">
          <AttendeeGrid attendees={ev.attendees} />
        </div>
      </div>

      <div className="flex items-start gap-4.5 rounded-lg border border-sand-200 bg-sand-50 p-7">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[13px] bg-gold-200 text-gold-600">
          <Icon name="boat" size={24} />
        </span>
        <div>
          <h3 className="font-display text-xl text-jade-900">Getting there</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
            Fly into {gateway}. We arrange the shared van and longtail pier transfer for
            everyone — full details land in your inbox after you book.
          </p>
        </div>
      </div>

      <div>
        <SectionTitle eyebrow="Good to know" title="Frequently asked" />
        <div className="mt-5">
          <EventFAQ faq={ev.faq} />
        </div>
      </div>
    </div>
  );
}
