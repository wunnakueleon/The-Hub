import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.guard";
import { validate } from "../middleware/validate";
import * as adminController from "../controllers/admin.controller";

const router = Router();

router.use(requireAuth, requireAdmin);

const eventCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  island: z.string().trim().min(1, "Island is required").max(120),
  villa: z.string().trim().min(1, "Villa is required").max(120),
  startDate: z.iso.date("Enter a valid start date"),
  endDate: z.iso.date("Enter a valid end date"),
  season: z.string().trim().min(1, "Season is required").max(60),
  tagline: z.string().trim().min(1, "Tagline is required").max(200),
  desc: z.string().trim().min(1, "Description is required").max(2000),
  capacity: z.number().int().min(1).max(200),
  published: z.boolean().optional(),
  heroTag: z.string().trim().max(40).nullable().optional(),
});

// Partial — supports both full edits and the publish toggle.
const eventUpdateSchema = eventCreateSchema.partial();

const registrationSchema = z.object({
  status: z.enum(["confirmed", "waitlisted", "cancelled"]),
});

router.get("/stats", adminController.stats);

router.get("/events", adminController.listEvents);
router.post("/events", validate(eventCreateSchema), adminController.createEvent);
router.put("/events/:id", validate(eventUpdateSchema), adminController.updateEvent);
router.delete("/events/:id", adminController.deleteEvent);

router.get("/events/:id/registrations", adminController.registrations);
router.patch("/registrations/:id", validate(registrationSchema), adminController.setRegistration);

router.get("/users", adminController.listUsers);

export default router;
