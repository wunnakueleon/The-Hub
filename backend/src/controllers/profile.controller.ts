import type { Request, Response, NextFunction } from "express";
import * as profileService from "../services/profile.service";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await profileService.getProfile(req.user!.id));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await profileService.updateProfile(req.user!.id, req.body));
  } catch (err) {
    next(err);
  }
}
