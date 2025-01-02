import { z } from "zod"

export const loginSchema = z.object({
    nameOrEmail: z.string().email("email is required"),
    password: z.string().min(4, "password must be at least 4 characters"),
})

export type LoginSchema = z.infer<typeof loginSchema>