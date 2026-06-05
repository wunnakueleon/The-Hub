import type { Request, Response, NextFunction } from "express";
import * as bookingsService from "../services/bookings.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await bookingsService.createBooking(req.user!.id, req.body);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

export async function mine(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await bookingsService.getMyBookings(req.user!.id));
  } catch (err) {
    next(err);
  }
}

export async function cancel(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await bookingsService.cancelBooking(req.user!.id, String(req.params.id));
    res.json(booking);
  } catch (err) {
    next(err);
  }
}
