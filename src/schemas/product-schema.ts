import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  price: z.string(),
  quantity: z.string(),
  images: z.any().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
