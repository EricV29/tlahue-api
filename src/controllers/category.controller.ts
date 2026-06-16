import { type Request, type Response } from "express";
import { db } from "../db/index.js";
import { categories } from "../db/schema.js";
import { logger } from "../utils/logger.js";

//* GET

// All categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(categories);
    res.json({ data: result, message: "ok" });
  } catch (error) {
    logger.error("Error getting categories", { error });
    res.status(500).json({ error: "Error getting categories" });
  }
};
