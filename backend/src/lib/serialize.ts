import type { User } from "../generated/prisma/client";
import type { Role } from "../types";

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  github?: string;
  bio?: string;
  skills: string[];
  hue: number;
}

function parseSkills(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

// Strips the password hash and shapes a DB user for API responses.
export function toPublicUser(u: User): PublicUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as Role,
    github: u.github ?? undefined,
    bio: u.bio ?? undefined,
    skills: parseSkills(u.skills),
    hue: u.hue,
  };
}
