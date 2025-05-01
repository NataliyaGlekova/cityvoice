import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  login: z.string(),
});

export const registreFormSchema = z.object({
  email: z
    .string()
    .email("Введите корректный email")
    .min(1, "Email обязателен"),
  name: z.string().min(1, "Имя обязательно"),
  hashedPass: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .min(1, "Пароль обязателен"),
});

export const authApiResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

export const loginFormSchema = z.object({
  login: z.string().min(1, "Login обязателен"),
  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .min(1, "Пароль обязателен"),
});
