import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import eventsRoutes from "./routes/events.routes";
import bookingsRoutes from "./routes/bookings.routes";
import profileRoutes from "./routes/profile.routes";
import adminRoutes from "./routes/admin.routes";
import { errorHandler } from "./middleware/error-handler";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:5173" }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/events", eventsRoutes);
  app.use("/api/bookings", bookingsRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(errorHandler);

  return app;
}
