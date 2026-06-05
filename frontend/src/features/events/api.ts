import { api } from "../../lib/api-client";
import type { Event, EventSummary } from "../../types";

// Public endpoints — no auth token needed.
export function listEvents() {
  return api.get<EventSummary[]>("/api/events", { auth: false });
}

export function getEvent(id: string) {
  return api.get<Event>(`/api/events/${id}`, { auth: false });
}
