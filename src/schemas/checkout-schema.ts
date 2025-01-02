import { z } from "zod";

export const checkoutSchema = z.object({
  totalPrice: z.number(),
  userDetail: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
  }),
  products: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.string(),
      description: z.string(),
      countItem: z.string(),
      images: z.string(),
    }),
  ),
});

export type CheckOutSchema = z.infer<typeof checkoutSchema>;
