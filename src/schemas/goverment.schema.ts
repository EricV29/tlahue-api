import { z } from "zod";

export const createOfficialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  degree: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  image: z.string().min(1, "Image is required"),
  textSvg: z.string().min(1, "Text svg is required"),
});

export const updateOfficialSchema = createOfficialSchema.partial();

export type CreateOfficialInput = z.infer<typeof createOfficialSchema>;
export type UpdateOfficialInput = z.infer<typeof updateOfficialSchema>;
