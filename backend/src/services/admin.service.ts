import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/error-handler";

const OCCUPYING = ["confirmed", "pending"];

// House defaults — new events start with a standard set of rooms so they're
// immediately bookable. Agenda/amenities can be added later.
const DEFAULT_ROOMS = [
  { type: "shared", name: "Shared Twin", desc: "Two single beds in a garden-facing room.", price: 30000, sleeps: 2, beds: 6 },
  { type: "private", name: "Private Double", desc: "King bed with en-suite and a small balcony.", price: 50000, sleeps: 1, beds: 6 },
  { type: "suite", name: "Garden Suite", desc: "Separate living room and a private plunge pool.", price: 88000, sleeps: 2, beds: 2 },
];

export interface AdminEventRow {
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
}

export interface AdminStats {
  publishedEvents: number;
  totalBookings: number;
  fillRate: number;
  totalUsers: number;
  events: AdminEventRow[];
}

export interface RegistrationRow {
  id: string;
  name: string;
  email: string;
  hue: number;
  roomName: string;
  diet: string;
  notes: string;
  status: string;
  createdAt: string;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  hue: number;
  role: string;
  joined: string;
  events: number;
}

type RowEvent = {
  id: string; name: string; island: string; villa: string;
  startDate: Date; endDate: Date; season: string; tagline: string;
  desc: string; capacity: number; published: boolean; heroTag: string | null;
  rooms: { price: number }[];
  bookings: { id: string }[];
};

function toRow(e: RowEvent): AdminEventRow {
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
    priceFrom: e.rooms.length ? Math.min(...e.rooms.map((r) => r.price)) : 0,
  };
}

const rowInclude = {
  rooms: { select: { price: true } },
  bookings: { where: { status: { in: OCCUPYING } }, select: { id: true } },
} as const;

export async function listEvents(): Promise<AdminEventRow[]> {
  const events = await prisma.event.findMany({ orderBy: { startDate: "asc" }, include: rowInclude });
  return events.map(toRow);
}

export async function getStats(): Promise<AdminStats> {
  const events = await listEvents();
  const totalBookings = events.reduce((s, e) => s + e.booked, 0);
  const totalCapacity = events.reduce((s, e) => s + e.capacity, 0);
  const totalUsers = await prisma.user.count();

  return {
    publishedEvents: events.filter((e) => e.published).length,
    totalBookings,
    fillRate: totalCapacity ? Math.round((totalBookings / totalCapacity) * 100) : 0,
    totalUsers,
    events,
  };
}

export interface EventInput {
  name: string;
  island: string;
  villa: string;
  startDate: string;
  endDate: string;
  season: string;
  tagline: string;
  desc: string;
  capacity: number;
  published?: boolean;
  heroTag?: string | null;
}

export async function createEvent(input: EventInput): Promise<AdminEventRow> {
  const event = await prisma.event.create({
    data: {
      name: input.name,
      island: input.island,
      villa: input.villa,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
      season: input.season,
      tagline: input.tagline,
      desc: input.desc,
      capacity: input.capacity,
      published: input.published ?? false,
      heroTag: input.heroTag ?? null,
      rooms: { create: DEFAULT_ROOMS },
    },
    include: rowInclude,
  });
  return toRow(event);
}

export async function updateEvent(id: string, input: Partial<EventInput>): Promise<AdminEventRow> {
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "Event not found");

  const event = await prisma.event.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.island !== undefined ? { island: input.island } : {}),
      ...(input.villa !== undefined ? { villa: input.villa } : {}),
      ...(input.startDate !== undefined ? { startDate: new Date(input.startDate) } : {}),
      ...(input.endDate !== undefined ? { endDate: new Date(input.endDate) } : {}),
      ...(input.season !== undefined ? { season: input.season } : {}),
      ...(input.tagline !== undefined ? { tagline: input.tagline } : {}),
      ...(input.desc !== undefined ? { desc: input.desc } : {}),
      ...(input.capacity !== undefined ? { capacity: input.capacity } : {}),
      ...(input.published !== undefined ? { published: input.published } : {}),
      ...(input.heroTag !== undefined ? { heroTag: input.heroTag } : {}),
    },
    include: rowInclude,
  });
  return toRow(event);
}

export async function deleteEvent(id: string): Promise<void> {
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, "Event not found");

  // Remove bookings first (no cascade on that relation); rooms/amenities/
  // included/schedule/faq cascade automatically.
  await prisma.$transaction([
    prisma.booking.deleteMany({ where: { eventId: id } }),
    prisma.event.delete({ where: { id } }),
  ]);
}

export async function getRegistrations(eventId: string): Promise<RegistrationRow[]> {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new AppError(404, "Event not found");

  const regs = await prisma.booking.findMany({
    where: { eventId },
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: { name: true, email: true, hue: true } },
      room: { select: { name: true } },
    },
  });

  return regs.map((r) => ({
    id: r.id,
    name: r.user.name,
    email: r.user.email,
    hue: r.user.hue,
    roomName: r.room.name,
    diet: r.diet,
    notes: r.notes ?? "",
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function setRegistrationStatus(id: string, status: string): Promise<RegistrationRow> {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new AppError(404, "Registration not found");

  const r = await prisma.booking.update({
    where: { id },
    data: { status },
    include: {
      user: { select: { name: true, email: true, hue: true } },
      room: { select: { name: true } },
    },
  });

  return {
    id: r.id,
    name: r.user.name,
    email: r.user.email,
    hue: r.user.hue,
    roomName: r.room.name,
    diet: r.diet,
    notes: r.notes ?? "",
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  };
}

export async function listUsers(): Promise<AdminUserRow[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    include: { bookings: { where: { status: { not: "cancelled" } }, select: { id: true } } },
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    hue: u.hue,
    role: u.role,
    joined: u.createdAt.toISOString(),
    events: u.bookings.length,
  }));
}
