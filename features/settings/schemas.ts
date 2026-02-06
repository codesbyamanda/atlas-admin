import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
