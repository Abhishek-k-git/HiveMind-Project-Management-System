import {email, z} from "zod";

export const checkName = z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")

export const checkEmail = z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Invalid email address"));

export const checkPassword = z
.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

export const loginSchema = z.object({
   email: checkEmail,
   password: checkPassword
})

export const registerSchema = z.object({
   name: checkName,
   email: checkEmail,
   password: checkPassword
})