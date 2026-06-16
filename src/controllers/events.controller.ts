import { type Request, type Response } from "express";
import { db } from "../db/index.js";
import { events } from "../db/schema.js";
import { eq, sql } from "drizzle-orm";
import {
  createEventSchema,
  updateEventSchema,
} from "../schemas/event.schema.js";
import { logger } from "../utils/logger.js";

//* GET

// All events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(events);
    res.json({ data: result, message: "ok" });
  } catch (error) {
    logger.error("Error getting events", { error });
    res.status(500).json({ data: null, message: "Error getting events" });
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
      return res.status(404).json({ data: null, message: "Events not found" });
    res.json({ data: result, message: "ok" });
  } catch (error) {
    logger.error("Error getting events by month", { error });
    res.status(500).json({ data: null, message: "Error getting event" });
  }
};

//* POST

// Create event
export const createEvent = async (req: Request, res: Response) => {
  const parsed = createEventSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ data: null, message: parsed.error.issues });

  try {
    const eventData = {
      ...parsed.data,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    };
    const result = await db.insert(events).values(eventData).returning();
    res.status(201).json({ data: result[0], message: "Event created" });
  } catch (error) {
    logger.error("Error creating event", { error });
    res.status(500).json({ data: null, message: "Error creating event" });
  }
};

// Update event
export const updateEvent = async (req: Request, res: Response) => {
  const parsed = updateEventSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ data: null, message: parsed.error.issues });

  try {
    const { id } = req.params;
    const { startDate, endDate, ...rest } = parsed.data;

    const result = await db
      .update(events)
      .set({
        ...rest,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      })
      .where(eq(events.id, Number(id)))
      .returning();

    if (result.length === 0)
      return res.status(404).json({ data: null, message: "Event not found" });

    res.json({ data: result[0], message: "Event updated" });
  } catch (error) {
    logger.error("Error updating event", { error });
    res.status(500).json({ data: null, message: "Error updating event" });
  }
};

// Delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await db
      .select()
      .from(events)
      .where(eq(events.id, Number(id)));
    if (existing.length === 0)
      return res.status(404).json({ data: null, message: "Event not found" });

    await db.delete(events).where(eq(events.id, Number(id)));
    res.json({ data: null, message: "Event deleted" });
  } catch (error) {
    logger.error("Error deleting event", { error });
    res.status(500).json({ data: null, message: "Error deleting event" });
  }
};
