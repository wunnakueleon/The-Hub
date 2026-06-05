import type { ApiError } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL as string;

// ─── Token storage ─────────────────────────────────────────────────────────
// Token is kept in memory (XSS-resistant) and persisted in localStorage
// for page-refresh continuity. If you move to HttpOnly cookies on the
// backend, remove these two functions entirely.

let _token: string | null = null;

export function getToken(): string | null {
  if (_token) return _token;
  try {
    _token = localStorage.getItem("hub_token");
  } catch {
    // localStorage blocked (private browsing / storage quota) — stay in memory
  }
  return _token;
}

export function setToken(token: string): void {
  _token = token;
  try {
    localStorage.setItem("hub_token", token);
  } catch {
    // ignore storage errors — session continues in memory
  }
}

export function clearToken(): void {
  _token = null;
  try {
    localStorage.removeItem("hub_token");
  } catch {
    // ignore
  }
}

// ─── Core fetch wrapper ────────────────────────────────────────────────────

export type ApiClientError = Error & {
  status: number;
  issues?: ApiError["issues"];
};

export function isApiClientError(err: unknown): err is ApiClientError {
  return err instanceof Error && err.name === "ApiClientError";
}

function makeApiError(
  status: number,
  message: string,
  issues?: ApiError["issues"],
): ApiClientError {
  const err = new Error(message) as ApiClientError;
  err.name = "ApiClientError";
  err.status = status;
  err.issues = issues;
  return err;
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean; // attach Bearer token (default: true)
};

export async function request<T>(
  path: string,
  { method = "GET", body, auth = true }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 401 → token is invalid or expired; clear it so the app re-prompts login
  if (res.status === 401) {
    clearToken();
  }

  if (!res.ok) {
    let payload: Partial<ApiError> = {};
    try {
      payload = (await res.json()) as ApiError;
    } catch {
      // non-JSON error body — use a generic message so we never surface
      // raw server internals (stack traces, SQL errors, etc.) to the UI
    }
    throw makeApiError(
      res.status,
      payload.error ?? "Something went wrong. Please try again.",
      payload.issues,
    );
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// ─── Convenience methods ───────────────────────────────────────────────────

export const api = {
  get:    <T>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...opts, method: "GET" }),

  post:   <T>(path: string, body: unknown, opts?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...opts, method: "POST", body }),

  put:    <T>(path: string, body: unknown, opts?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...opts, method: "PUT", body }),

  patch:  <T>(path: string, body: unknown, opts?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...opts, method: "PATCH", body }),

  delete: <T>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...opts, method: "DELETE" }),
};
