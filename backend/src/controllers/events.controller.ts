import type { Request, Response, NextFunction } from "express";
import * as eventsService from "../services/events.service";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await eventsService.listEvents());
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await eventsService.getEventById(String(req.params.id)));
  } catch (err) {
    next(err);
  }
}
