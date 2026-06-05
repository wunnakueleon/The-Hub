import { api } from "../../lib/api-client";
import type { User } from "../../types";
import type { UpdateProfileInput } from "./types";

export function getProfile() {
  return api.get<User>("/api/profile");
}

export function updateProfile(input: UpdateProfileInput) {
  return api.put<User>("/api/profile", input);
}
