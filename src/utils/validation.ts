import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{9,15}$/;
const nicRegex = /^\d{9}[vVxX]|\d{12}$/;

export const loginSchema = z.object({
    email:z.string().refine(val=>emailRegex.test(val),{message:"Invalid email format"}),
    password:z.string().min(8, {message:"Password must be at least 8 characters"}),
    rememberMe: z.boolean().optional().default(false),
})

export const signupSchema = z.object({
    email: z.string().refine(val => emailRegex.test(val), {message: "Invalid email format"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
    firstName: z.string().min(2, {message: "First name must be at least 2 characters"}),
    lastName: z.string().min(2, {message: "Last name must be at least 2 characters"}),
    nationalId: z.string().refine(val => nicRegex.test(val), {message: "Invalid NIC format (9 digits + V/X or 12 digits)"}),
    phoneNumber: z.string().refine(val => phoneRegex.test(val), {message: "Invalid phone number format"}),
})

export const employeeSignupSchema = z.object({
    email: z.string().refine(val => emailRegex.test(val), {message: "Invalid email format"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
    firstName: z.string().min(2, {message: "First name must be at least 2 characters"}),
    lastName: z.string().min(2, {message: "Last name must be at least 2 characters"}),
    nationalId: z.string().refine(val => nicRegex.test(val), {message: "Invalid NIC format (9 digits + V/X or 12 digits)"}),
    phoneNumber: z.string().refine(val => phoneRegex.test(val), {message: "Invalid phone number format"}),
    speciality: z.string().min(3, {message: "Speciality must be at least 3 characters"}),
    employeeType: z.enum(["STAFF", "MANAGER", "ADMIN"], {message: "Invalid employee type"}),
})