import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);

// GET /api/profile
// PUT /api/profile

export default router;
