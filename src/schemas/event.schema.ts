import { z } from "zod";

const baseEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  link: z.string().url("Invalid URL").optional().nullable(),
});

export const createEventSchema = baseEventSchema.refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate);
    }
    return true;
  },
  { message: "startDate must be before endDate", path: ["endDate"] },
);

export const updateEventSchema = baseEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
