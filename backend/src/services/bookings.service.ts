import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/error-handler";

// A booking occupies a bed unless it's merely waitlisted or cancelled.
const OCCUPYING = ["confirmed", "pending"];

const bookingInclude = {
  event: { select: { name: true, island: true, startDate: true, endDate: true } },
  room: { select: { name: true, type: true, price: true } },
} as const;

type BookingWithRelations = {
  id: string;
  ref: string;
  eventId: string;
  status: string;
  guests: number;
  diet: string;
  notes: string | null;
  createdAt: Date;
  event: { name: string; island: string; startDate: Date; endDate: Date };
  room: { name: string; type: string; price: number };
};

export interface BookingDTO {
  id: string;
  ref: string;
  eventId: string;
  event: { name: string; island: string; startDate: string; endDate: string };
  room: { name: string; type: string; price: number };
  status: string;
  guests: number;
  diet: string;
  notes?: string;
  createdAt: string;
}

function toBooking(b: BookingWithRelations): BookingDTO {
  return {
    id: b.id,
    ref: b.ref,
    eventId: b.eventId,
    event: {
      name: b.event.name,
      island: b.event.island,
      startDate: b.event.startDate.toISOString(),
      endDate: b.event.endDate.toISOString(),
    },
    room: { name: b.room.name, type: b.room.type, price: b.room.price },
    status: b.status,
    guests: b.guests,
    diet: b.diet,
    notes: b.notes ?? undefined,
    createdAt: b.createdAt.toISOString(),
  };
}

function generateRef(island: string): string {
  // Initials of the island name, e.g. "Koh Yao Noi, Phang Nga Bay" -> "KYN"
  const prefix =
    island
      .split(",")[0]
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase() || "HUB";
  const num = Math.floor(Math.random() * 9);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HUB-${prefix}${num}-${rand}`;
}

async function uniqueRef(island: string): Promise<string> {
  for (let i = 0; i < 6; i++) {
    const ref = generateRef(island);
    const clash = await prisma.booking.findUnique({ where: { ref } });
    if (!clash) return ref;
  }
  // Astronomically unlikely; fail loudly rather than risk a duplicate.
  throw new AppError(500, "Could not generate a booking reference. Please try again.");
}

export async function createBooking(
  userId: string,
  input: { eventId: string; roomId: string; guests?: number; diet?: string; notes?: string },
): Promise<BookingDTO> {
  const event = await prisma.event.findUnique({
    where: { id: input.eventId },
    include: { rooms: { select: { id: true } } },
  });
  if (!event || !event.published) {
    throw new AppError(404, "Event not found");
  }

  const roomExists = event.rooms.some((r) => r.id === input.roomId);
  if (!roomExists) {
    throw new AppError(400, "That room is not available for this retreat.");
  }

  // One active booking per user per event.
  const existing = await prisma.booking.findFirst({
    where: { userId, eventId: event.id, status: { not: "cancelled" } },
  });
  if (existing) {
    throw new AppError(409, "You already have a booking for this retreat.");
  }

  const occupied = await prisma.booking.count({
    where: { eventId: event.id, status: { in: OCCUPYING } },
  });
  const status = occupied < event.capacity ? "confirmed" : "waitlisted";

  const ref = await uniqueRef(event.island);

  const booking = await prisma.booking.create({
    data: {
      ref,
      userId,
      eventId: event.id,
      roomId: input.roomId,
      status,
      guests: input.guests ?? 1,
      diet: input.diet ?? "None",
      notes: input.notes || null,
    },
    include: bookingInclude,
  });

  return toBooking(booking);
}

export async function getMyBookings(userId: string): Promise<BookingDTO[]> {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: bookingInclude,
  });
  return bookings.map(toBooking);
}

export async function cancelBooking(userId: string, bookingId: string): Promise<BookingDTO> {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  // 404 (not 403) when it isn't the caller's booking — don't reveal it exists.
  if (!booking || booking.userId !== userId) {
    throw new AppError(404, "Booking not found");
  }

  if (booking.status === "cancelled") {
    const fresh = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: bookingInclude,
    });
    return toBooking(fresh as BookingWithRelations);
  }

  const wasConfirmed = booking.status === "confirmed";

  const updated = await prisma.$transaction(async (tx) => {
    const cancelled = await tx.booking.update({
      where: { id: bookingId },
      data: { status: "cancelled" },
      include: bookingInclude,
    });

    // Cancelling a confirmed booking frees a bed — promote the oldest
    // waitlisted booking for this event, if capacity now allows.
    if (wasConfirmed) {
      const event = await tx.event.findUnique({
        where: { id: booking.eventId },
        select: { capacity: true },
      });
      const occupied = await tx.booking.count({
        where: { eventId: booking.eventId, status: { in: OCCUPYING } },
      });

      if (event && occupied < event.capacity) {
        const next = await tx.booking.findFirst({
          where: { eventId: booking.eventId, status: "waitlisted" },
          orderBy: { createdAt: "asc" },
        });
        if (next) {
          await tx.booking.update({
            where: { id: next.id },
            data: { status: "confirmed" },
          });
        }
      }
    }

    return cancelled;
  });

  return toBooking(updated);
}
