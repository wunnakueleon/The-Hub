import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/error-handler";
import { toAttendee, type PublicAttendee } from "../lib/serialize";

// A booking occupies a bed unless it's cancelled or merely waitlisted.
const ACTIVE_STATUSES = ["confirmed", "pending"];

export interface RoomDTO {
  id: string;
  type: string;
  name: string;
  desc: string;
  price: number;
  sleeps: number;
  beds: number;
}

export interface EventSummaryDTO {
  id: string;
  name: string;
  island: string;
  villa: string;
  startDate: string;
  endDate: string;
  season: string;
  tagline: string;
  desc: string;
  capacity: number;
  booked: number;
  published: boolean;
  heroTag: string | null;
  priceFrom: number;
  attendees: PublicAttendee[];
}

export interface EventDetailDTO extends EventSummaryDTO {
  rooms: RoomDTO[];
  amenities: { icon: string; label: string }[];
  included: string[];
  schedule: { time: string; title: string; note: string }[];
  faq: { question: string; answer: string }[];
}

function priceFrom(rooms: { price: number }[]): number {
  return rooms.length ? Math.min(...rooms.map((r) => r.price)) : 0;
}

export async function listEvents(): Promise<EventSummaryDTO[]> {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { startDate: "asc" },
    include: {
      rooms: { select: { price: true } },
      bookings: {
        where: { status: { in: ACTIVE_STATUSES } },
        select: { user: { select: { name: true, skills: true, hue: true } } },
      },
    },
  });

  return events.map((e) => ({
    id: e.id,
    name: e.name,
    island: e.island,
    villa: e.villa,
    startDate: e.startDate.toISOString(),
    endDate: e.endDate.toISOString(),
    season: e.season,
    tagline: e.tagline,
    desc: e.desc,
    capacity: e.capacity,
    booked: e.bookings.length,
    published: e.published,
    heroTag: e.heroTag,
    priceFrom: priceFrom(e.rooms),
    attendees: e.bookings.map((b) => toAttendee(b.user)),
  }));
}

export async function getEventById(id: string): Promise<EventDetailDTO> {
  const e = await prisma.event.findUnique({
    where: { id },
    include: {
      rooms: { orderBy: { price: "asc" } },
      amenities: true,
      included: { orderBy: { order: "asc" } },
      schedule: { orderBy: { order: "asc" } },
      faq: { orderBy: { order: "asc" } },
      bookings: {
        where: { status: { in: ACTIVE_STATUSES } },
        select: { user: { select: { name: true, skills: true, hue: true } } },
      },
    },
  });

  // 404 for missing OR unpublished — never leak draft retreats publicly.
  if (!e || !e.published) {
    throw new AppError(404, "Event not found");
  }

  return {
    id: e.id,
    name: e.name,
    island: e.island,
    villa: e.villa,
    startDate: e.startDate.toISOString(),
    endDate: e.endDate.toISOString(),
    season: e.season,
    tagline: e.tagline,
    desc: e.desc,
    capacity: e.capacity,
    booked: e.bookings.length,
    published: e.published,
    heroTag: e.heroTag,
    priceFrom: priceFrom(e.rooms),
    attendees: e.bookings.map((b) => toAttendee(b.user)),
    rooms: e.rooms.map((r) => ({
      id: r.id,
      type: r.type,
      name: r.name,
      desc: r.desc,
      price: r.price,
      sleeps: r.sleeps,
      beds: r.beds,
    })),
    amenities: e.amenities.map((a) => ({ icon: a.icon, label: a.label })),
    included: e.included.map((i) => i.text),
    schedule: e.schedule.map((s) => ({ time: s.time, title: s.title, note: s.note })),
    faq: e.faq.map((f) => ({ question: f.question, answer: f.answer })),
  };
}
