import { Router } from "express";
import * as eventsController from "../controllers/events.controller";

const router = Router();

// Public — no auth required
router.get("/", eventsController.list);
router.get("/:id", eventsController.getById);

export default router;
