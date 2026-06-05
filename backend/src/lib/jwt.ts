import jwt from "jsonwebtoken";
import type { AuthUser } from "../types";

const secret = process.env.JWT_SECRET!;
const expiresIn = "7d";

export function signToken(payload: AuthUser): string {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, secret) as AuthUser;
}
