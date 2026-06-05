import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import { AppError } from "./error-handler";

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new AppError(401, "Unauthorised"));
  }

  try {
    req.user = verifyToken(header.slice(7));
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
}
