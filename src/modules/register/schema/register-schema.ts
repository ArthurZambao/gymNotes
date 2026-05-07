import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres"),

  email: z
    .string()
    .email("Email inválido"),

  password: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres").regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      "A senha deve conter pelo menos uma letra maiúscula e um caractere especial"
    ),
});

export type RegisterData = z.infer<typeof registerSchema>;