import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.guard";

const router = Router();

router.use(requireAuth, requireAdmin);

// GET    /api/admin/stats
// GET    /api/admin/events
// POST   /api/admin/events
// PUT    /api/admin/events/:id
// DELETE /api/admin/events/:id
// GET    /api/admin/events/:id/registrations
// PATCH  /api/admin/registrations/:id
// GET    /api/admin/users

export default router;
