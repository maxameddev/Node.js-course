import { z } from "zod";

const email = z.string().trim().email("Please enter a valid email address").toLowerCase();

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name must be 50 characters or less"),
  email,
  password: z.string().min(8, "Password must be at least 8 characters").max(72, "Password must be 72 characters or less"),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});
