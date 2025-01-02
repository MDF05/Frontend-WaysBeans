import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  id: z.number().optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
