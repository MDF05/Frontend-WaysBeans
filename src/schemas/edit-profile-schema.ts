import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string({ message: "must be string" }).min(1, "must be at least 1 character"),
  email: z.string({ message: "must be string" }).email("must be a valid email"),
  phone: z.string({ message: "must be number" }),
  gender: z.string({ message: "must be string)" }),
  address: z.string({ message: "must be string" }).min(10, "must be at least 10 characters"),
  image: z.instanceof(FileList),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
