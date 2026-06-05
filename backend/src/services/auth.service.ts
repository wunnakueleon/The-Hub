import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { signToken } from "../lib/jwt";
import { toPublicUser, type PublicUser } from "../lib/serialize";
import { AppError } from "../middleware/error-handler";
import type { Role } from "../types";

const BCRYPT_COST = 12;

export interface AuthResult {
  token: string;
  user: PublicUser;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function issue(user: { id: string; email: string; role: string }): string {
  return signToken({ id: user.id, email: user.email, role: user.role as Role });
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  github?: string;
  bio?: string;
  skills?: string[];
}): Promise<AuthResult> {
  const email = normalizeEmail(input.email);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, "An account with that email already exists.");
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_COST);

  const user = await prisma.user.create({
    data: {
      name: input.name.trim(),
      email,
      password: passwordHash,
      github: input.github || null,
      bio: input.bio || null,
      skills: JSON.stringify(input.skills ?? []),
      hue: Math.floor(Math.random() * 360),
    },
  });

  return { token: issue(user), user: toPublicUser(user) };
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const email = normalizeEmail(input.email);

  const user = await prisma.user.findUnique({ where: { email } });

  // Same error whether the email is unknown or the password is wrong —
  // never reveal which, to prevent account enumeration.
  if (!user) {
    // Still spend time hashing so response timing doesn't leak existence.
    await bcrypt.hash(input.password, BCRYPT_COST);
    throw new AppError(401, "Invalid email or password.");
  }

  const ok = await bcrypt.compare(input.password, user.password);
  if (!ok) {
    throw new AppError(401, "Invalid email or password.");
  }

  return { token: issue(user), user: toPublicUser(user) };
}

export async function requestPasswordReset(_email: string): Promise<void> {
  // Intentionally a no-op success: we never reveal whether an email is
  // registered. Email delivery is out of scope for this build — in
  // production this would generate a single-use token and send a link.
  return;
}
