import { Router } from "express";
import {
  getEvents,
  getEventByMonth,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller.js";
import { requireApiKey } from "../middleware/auth.js";

const router: Router = Router();

router.get("/", getEvents);
router.get("/month/:year/:month", getEventByMonth);
router.post("/", requireApiKey, createEvent);
router.put("/:id", requireApiKey, updateEvent);
router.delete("/:id", requireApiKey, deleteEvent);

export default router;
