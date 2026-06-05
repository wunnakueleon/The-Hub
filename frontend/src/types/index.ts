export type Role = "developer" | "admin";
export type BookingStatus = "pending" | "confirmed" | "waitlisted" | "cancelled";
export type RoomType = "shared" | "private" | "suite";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  github?: string;
  bio?: string;
  skills: string[];
  hue: number;
}

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  desc: string;
  price: number;
  sleeps: number;
  beds: number;
}

export interface Amenity {
  icon: string;
  label: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  note: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Attendee {
  name: string;
  tech: string;        // skills joined, derived from the user
  hue: number;
}

// Card-level shape returned by GET /api/events
export interface EventSummary {
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
  booked: number;       // computed: active (confirmed/pending) booking count
  published: boolean;
  heroTag?: string | null;
  priceFrom: number;    // computed: min room price
  attendees: Attendee[];
}

// Full shape returned by GET /api/events/:id
export interface Event extends EventSummary {
  rooms: Room[];
  amenities: Amenity[];
  included: string[];
  schedule: ScheduleItem[];
  faq: FAQItem[];
}

export interface Booking {
  id: string;
  ref: string;
  eventId: string;
  event: Pick<Event, "name" | "island" | "startDate" | "endDate">;
  room: Pick<Room, "name" | "type" | "price">;
  status: BookingStatus;
  guests: number;
  diet: string;
  notes?: string;
  createdAt: string;
}

// API response shapes
export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  issues?: { field: string; message: string }[];
}
