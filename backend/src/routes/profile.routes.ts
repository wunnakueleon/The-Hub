import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import * as profileController from "../controllers/profile.controller";

const router = Router();

router.use(requireAuth);

const updateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  bio: z.string().trim().max(500).optional(),
  github: z.string().trim().max(200).optional(),
  skills: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
});

router.get("/", profileController.get);
router.put("/", validate(updateSchema), profileController.update);

export default router;
