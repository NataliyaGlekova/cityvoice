import { z } from "zod";
import { loginFormSchema, registreFormSchema, userSchema } from "./schema";

export type UserT = z.infer<typeof userSchema>;
export type RegisterFormT = z.infer<typeof registreFormSchema>;
export type LoginFormT = z.infer<typeof loginFormSchema>;

export type UserSliceT = {
  user: UserT | null;
};
