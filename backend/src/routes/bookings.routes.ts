import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import * as bookingsController from "../controllers/bookings.controller";

const router = Router();

router.use(requireAuth);

const createSchema = z.object({
  eventId: z.string().min(1, "Event is required"),
  roomId: z.string().min(1, "Room is required"),
  guests: z.number().int().min(1).max(4).optional(),
  diet: z.string().max(60).optional(),
  notes: z.string().max(500).optional(),
});

router.post("/", validate(createSchema), bookingsController.create);
router.get("/mine", bookingsController.mine);
router.patch("/:id", bookingsController.cancel);

export default router;
