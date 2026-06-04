import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import eventsRoutes from "./routes/events.routes.js";
import govermentRoutes from "./routes/goverment.routes.js";
import imagesRoutes from "./routes/image.routes.js";
import categoriesRoutes from "./routes/category.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

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
  res.json({ message: "Tlahue API 🚀" });
});

app.use("/api/events", eventsRoutes);
app.use("/api/goverment", govermentRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/categories", categoriesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
