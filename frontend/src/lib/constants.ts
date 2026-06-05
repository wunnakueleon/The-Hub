import type { BookingStatus } from "../types";

export const ROUTES = {
  home:            "/",
  about:           "/about",
  login:           "/login",
  signup:          "/signup",
  events:          "/events",
  eventDetail:     (id: string) => `/events/${id}`,
  myBookings:      "/my-bookings",
  profile:         "/profile",
  admin:           "/admin",
  adminEvents:     "/admin/events",
  adminEventRegs:  (id: string) => `/admin/events/${id}`,
  adminUsers:      "/admin/users",
} as const;

export interface StatusMeta {
  label: string;
  color: string; // tailwind text color class
  bg: string;    // tailwind bg color class
}

export const STATUS_META: Record<BookingStatus, StatusMeta> = {
  confirmed:  { label: "Confirmed",  color: "text-jade-700",  bg: "bg-jade-100"  },
  pending:    { label: "Pending",    color: "text-gold-600",  bg: "bg-gold-200"  },
  waitlisted: { label: "Waitlisted", color: "text-coral-600", bg: "bg-coral-200" },
  cancelled:  { label: "Cancelled",  color: "text-ink-400",   bg: "bg-sand-200"  },
};
