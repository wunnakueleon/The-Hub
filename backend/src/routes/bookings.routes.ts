import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);

// POST  /api/bookings
// GET   /api/bookings/mine
// PATCH /api/bookings/:id

export default router;
