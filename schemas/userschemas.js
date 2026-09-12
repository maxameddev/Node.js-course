import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),

  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(30, { message: "Password must not exceed 30 characters" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[!@#$%^&*(),.?":{}|<>_\-]/, {
      message: "Password must contain a special character"
    }),
});