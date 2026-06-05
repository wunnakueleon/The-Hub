import { api } from "../../lib/api-client";
import type {
  AdminStats,
  AdminEventRow,
  RegistrationRow,
  AdminUserRow,
  EventInput,
  RegistrationStatus,
} from "./types";

export const getStats = () => api.get<AdminStats>("/api/admin/stats");

export const listEvents = () => api.get<AdminEventRow[]>("/api/admin/events");
export const createEvent = (input: EventInput) =>
  api.post<AdminEventRow>("/api/admin/events", input);
export const updateEvent = (id: string, input: Partial<EventInput>) =>
  api.put<AdminEventRow>(`/api/admin/events/${id}`, input);
export const deleteEvent = (id: string) => api.delete<void>(`/api/admin/events/${id}`);

export const getRegistrations = (eventId: string) =>
  api.get<RegistrationRow[]>(`/api/admin/events/${eventId}/registrations`);
export const setRegistrationStatus = (id: string, status: RegistrationStatus) =>
  api.patch<RegistrationRow>(`/api/admin/registrations/${id}`, { status });

export const listUsers = () => api.get<AdminUserRow[]>("/api/admin/users");
