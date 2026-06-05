export type Role = "developer" | "admin";
export type BookingStatus = "pending" | "confirmed" | "waitlisted" | "cancelled";
export type RoomType = "shared" | "private" | "suite";

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}
