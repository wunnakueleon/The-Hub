import { api } from "../../lib/api-client";
import type { Booking } from "../../types";
import type { CreateBookingInput } from "./types";

export function createBooking(input: CreateBookingInput) {
  return api.post<Booking>("/api/bookings", input);
}

export function getMyBookings() {
  return api.get<Booking[]>("/api/bookings/mine");
}

export function cancelBooking(id: string) {
  return api.patch<Booking>(`/api/bookings/${id}`, {});
}
