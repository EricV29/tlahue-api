import { Router } from "express";
import {
  getImages,
  createImage,
  updateImage,
  deleteImage,
  getImagesByCategory,
} from "../controllers/images.controller.js";
import { requireApiKey } from "../middleware/auth.js";

const router: Router = Router();

router.get("/", getImages);
router.get("/category/:categoryId", getImagesByCategory);
router.post("/", requireApiKey, createImage);
router.put("/:id", requireApiKey, updateImage);
router.delete("/:id", requireApiKey, deleteImage);

export default router;
