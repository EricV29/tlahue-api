import { z } from "zod";

export const createImageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  url: z.string().min(1, "URL is required"),
  nameCreator: z.string().optional().nullable(),
  linkOrigin: z.string().url("Invalid URL").optional().nullable(),
  location: z.string().optional().nullable(),
  locationLink: z.string().url("Invalid URL").optional().nullable(),
  captureAt: z.string().optional().nullable(),
  categoryIds: z.array(z.number()).optional(),
});

export const updateImageSchema = createImageSchema.partial();

export type CreateImageInput = z.infer<typeof createImageSchema>;
export type UpdateImageInput = z.infer<typeof updateImageSchema>;
