import { type Request, type Response } from "express";
import { db } from "../db/index.js";
import { goverment } from "../db/schema.js";
import { eq } from "drizzle-orm";
import {
  createOfficialSchema,
  updateOfficialSchema,
} from "../schemas/goverment.schema.js";
import { logger } from "../utils/logger.js";

//* GET

// All goverments
export const getGoverment = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(goverment);
    res.json({ data: result, message: "ok" });
  } catch (error) {
    logger.error("Error getting officials", { error });
    res.status(500).json({ data: null, message: "Error getting goverment" });
  }
};

//* POST

// Create goverment
export const createGoverment = async (req: Request, res: Response) => {
  const parsed = createOfficialSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ data: null, message: parsed.error.issues });

  try {
    const result = await db.insert(goverment).values(parsed.data).returning();
    res.status(201).json({ data: result[0], message: "Official created" });
  } catch (error) {
    logger.error("Error creating officials", { error });
    res.status(500).json({ data: null, message: "Error creating Official" });
  }
};

// Update goverment
export const updateGoverment = async (req: Request, res: Response) => {
  const parsed = updateOfficialSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ data: null, message: parsed.error.issues });

  try {
    const { id } = req.params;
    const result = await db
      .update(goverment)
      .set(parsed.data)
      .where(eq(goverment.id, Number(id)))
      .returning();

    if (result.length === 0)
      return res
        .status(404)
        .json({ data: null, message: "Official not found" });

    res.json({ data: result[0], message: "Official updated" });
  } catch (error) {
    logger.error("Error updating official", { error });
    res.status(500).json({ data: null, message: "Error updating Official" });
  }
};

// Delete goverment
export const deleteGoverment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await db
      .select()
      .from(goverment)
      .where(eq(goverment.id, Number(id)));
    if (existing.length === 0)
      return res
        .status(404)
        .json({ data: null, message: "Official not found" });

    await db.delete(goverment).where(eq(goverment.id, Number(id)));
    res.json({ data: null, message: "Official deleted" });
  } catch (error) {
    logger.error("Error deleting official", { error });
    res.status(500).json({ data: null, message: "Error deleting goverment" });
  }
};
