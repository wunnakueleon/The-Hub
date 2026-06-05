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

export type RegistrationStatus = "confirmed" | "waitlisted" | "cancelled";
