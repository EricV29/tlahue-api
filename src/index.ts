import express, { type NextFunction } from "express";
import type { Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import eventsRoutes from "./routes/events.routes.js";
import govermentRoutes from "./routes/goverment.routes.js";
import imagesRoutes from "./routes/image.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import { env } from "./config/env.js";

const app = express();
const PORT = env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
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
  res
    .status(500)
    .json({ data: null, message: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
