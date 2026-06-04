import { type Request, type Response } from "express";
import { db } from "../db/index.js";
import { events } from "../db/schema.js";
import { eq, sql } from "drizzle-orm";

//* GET

// All events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(events);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error getting events" });
  }
};

// Event by month
export const getEventByMonth = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;
    const result = await db
      .select()
      .from(events)
      .where(
        sql`EXTRACT(MONTH FROM ${events.startDate}) = ${Number(month)} 
        AND EXTRACT(YEAR FROM ${events.startDate}) = ${Number(year)}`,
      );
    if (result.length === 0)
      return res.status(404).json({ error: "Events not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error getting event" });
  }
};

//* POST

// Create event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const eventData = {
      ...req.body,
      startDate: req.body.startDate ? new Date(req.body.startDate) : null,
      endDate: req.body.endDate ? new Date(req.body.endDate) : null,
    };
    const result = await db.insert(events).values(eventData).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating event" });
  }
};

// Update event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db
      .update(events)
      .set(req.body)
      .where(eq(events.id, Number(id)))
      .returning();
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating event" });
  }
};

// Delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(events).where(eq(events.id, Number(id)));
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
};
