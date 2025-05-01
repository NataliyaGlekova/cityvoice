import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormT } from "./types";
import userService from "../api/userService";

// export const register = createAsyncThunk(
//   "user/register",
//   (data: RegisterFormT) => userService.register(data)
// );

export const refresh = createAsyncThunk("user/refresh", () =>
  userService.refresh()
);

export const logout = createAsyncThunk("user/logout", () =>
  userService.logout()
);

export const login = createAsyncThunk("user/login", (data: LoginFormT) => {
  return userService.login(data);
});
