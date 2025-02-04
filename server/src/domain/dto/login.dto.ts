import { z } from "zod";

export const LoginDTO = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginDTOType = z.infer<typeof LoginDTO>;
