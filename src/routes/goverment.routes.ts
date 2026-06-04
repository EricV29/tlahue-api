import { Router } from "express";
import {
  getGoverment,
  createGoverment,
  updateGoverment,
  deleteGoverment,
} from "../controllers/goverment.controller.js";
import { requireApiKey } from "../middleware/auth.js";

const router: Router = Router();

router.get("/", getGoverment);
router.post("/", requireApiKey, createGoverment);
router.put("/:id", requireApiKey, updateGoverment);
router.delete("/:id", requireApiKey, deleteGoverment);

export default router;
