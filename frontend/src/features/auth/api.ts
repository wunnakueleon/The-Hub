import { api } from "../../lib/api-client";
import type { AuthResponse } from "../../types";
import type { LoginInput, RegisterInput } from "./types";

// auth: false — these endpoints are public and must not send a stale token.
export function login(input: LoginInput) {
  return api.post<AuthResponse>("/api/auth/login", input, { auth: false });
}

export function register(input: RegisterInput) {
  return api.post<AuthResponse>("/api/auth/register", input, { auth: false });
}

export function resetPassword(email: string) {
  return api.post<{ message: string }>(
    "/api/auth/reset-password",
    { email },
    { auth: false },
  );
}
