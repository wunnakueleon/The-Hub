import { Router } from "express";
import { z } from "zod";
import { validate } from "../middleware/validate";
import * as authController from "../controllers/auth.controller";

const router = Router();

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.email("Enter a valid email").max(120),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
  github: z.string().trim().max(200).optional(),
  bio: z.string().trim().max(500).optional(),
  skills: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
});

const loginSchema = z.object({
  email: z.email("Enter a valid email").max(120),
  password: z.string().min(1, "Password is required").max(200),
});

const resetSchema = z.object({
  email: z.email("Enter a valid email").max(120),
});

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/reset-password", validate(resetSchema), authController.resetPassword);

export default router;
