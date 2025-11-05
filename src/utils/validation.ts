import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
    email:z.string().refine(val=>emailRegex.test(val),{message:"Invalid email format"}),
    password:z.string().min(8, {message:"Password must be at least 8 characters"}),
    rememberMe: z.boolean().optional().default(false),
})