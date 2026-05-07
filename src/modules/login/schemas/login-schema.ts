import { z } from "zod";


export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;

export type Errors = Partial<Record<keyof LoginData, string>>;
