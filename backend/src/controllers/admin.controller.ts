import type { Request, Response, NextFunction } from "express";
import * as adminService from "../services/admin.service";

export async function stats(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.getStats());
  } catch (err) {
    next(err);
  }
}

export async function listEvents(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.listEvents());
  } catch (err) {
    next(err);
  }
}

export async function createEvent(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(201).json(await adminService.createEvent(req.body));
  } catch (err) {
    next(err);
  }
}

export async function updateEvent(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.updateEvent(String(req.params.id), req.body));
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(req: Request, res: Response, next: NextFunction) {
  try {
    await adminService.deleteEvent(String(req.params.id));
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function registrations(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.getRegistrations(String(req.params.id)));
  } catch (err) {
    next(err);
  }
}

export async function setRegistration(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.setRegistrationStatus(String(req.params.id), req.body.status));
  } catch (err) {
    next(err);
  }
}

export async function listUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await adminService.listUsers());
  } catch (err) {
    next(err);
  }
}
