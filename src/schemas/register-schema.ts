import { z } from "zod"

export const registerSchema = z.object({
    email: z.string({ message: "must be string" }).email("email is required"),
    password: z.string({ message: "must be string" }).min(4, "password must be at least 4 characters"),
    name: z.string({ message: "must be string" }).min(2, "name must be at least 2 characters")
})

export type RegisterSchema = z.infer<typeof registerSchema>