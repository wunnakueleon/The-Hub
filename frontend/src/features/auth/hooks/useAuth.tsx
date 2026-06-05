import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Role, User } from "../../../types";
import { setToken, clearToken } from "../../../lib/api-client";
import * as authApi from "../api";
import type { LoginInput, RegisterInput } from "../types";

const USER_KEY = "hub_user";

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

interface AuthContextValue {
  user: User | null;
  isAuthed: boolean;
  role: Role | null;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  // Persist token (via api-client) + a cached user for refresh continuity.
  // TODO(step 11): rehydrate from GET /api/profile instead of cached user.
  const persist = useCallback((nextUser: User, token: string) => {
    setToken(token);
    setUser(nextUser);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    } catch {
      // storage unavailable — session continues in memory
    }
  }, []);

  const login = useCallback(
    async (input: LoginInput) => {
      const { token, user: u } = await authApi.login(input);
      persist(u, token);
    },
    [persist],
  );

  const signup = useCallback(
    async (input: RegisterInput) => {
      const { token, user: u } = await authApi.register(input);
      persist(u, token);
    },
    [persist],
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthed: !!user,
    role: user?.role ?? null,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
