import type { Request, Response, NextFunction } from "express";
import { AppError } from "./error-handler";

export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (req.user?.role !== "admin") {
    return next(new AppError(403, "Forbidden"));
  }
  next();
}
