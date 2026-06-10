import { type Request, type Response } from "express";
import { db } from "../db/index.js";
import { categories } from "../db/schema.js";

//* GET

// All categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(categories);
    res.json({ data: result, message: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Error getting categories" });
  }
};
