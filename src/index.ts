import express, { type NextFunction } from "express";
import type { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { morganMiddleware } from "./middleware/morgan.js";
import rateLimit from "express-rate-limit";
import eventsRoutes from "./routes/events.routes.js";
import govermentRoutes from "./routes/goverment.routes.js";
import imagesRoutes from "./routes/image.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import { logger } from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  }),
);

app.use(helmet());
app.use(morganMiddleware);

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res) => {
      logger.warn(`Rate limit exceeded: ${req.ip}`);
      res.status(429).json({ data: null, message: "Too many requests" });
    },
    message: { error: "Too many requests, please try again later" },
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "TlahueWeb API 🚀" });
});

app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/goverment", govermentRoutes);
app.use("/api/v1/images", imagesRoutes);
app.use("/api/v1/categories", categoriesRoutes);

// Ruta no encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({ data: null, message: "Route not found" });
});

// Manejo global de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { stack: err.stack });
  res
    .status(500)
    .json({ data: null, message: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
