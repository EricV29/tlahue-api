import { type Request, type Response } from "express";
import { db } from "../db/index.js";
import { goverment } from "../db/schema.js";
import { eq } from "drizzle-orm";

//* GET

// All goverments
export const getGoverment = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(goverment);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error getting goverment" });
  }
};

//* POST

// Create goverment
export const createGoverment = async (req: Request, res: Response) => {
  try {
    const result = await db.insert(goverment).values(req.body).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error creating goverment" });
  }
};

// Update goverment
export const updateGoverment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db
      .update(goverment)
      .set(req.body)
      .where(eq(goverment.id, Number(id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating goverment" });
  }
};

// Delete goverment
export const deleteGoverment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(goverment).where(eq(goverment.id, Number(id)));
    res.json({ message: "Goverment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting goverment" });
  }
};
