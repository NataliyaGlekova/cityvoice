import { createSlice } from "@reduxjs/toolkit";
import { UserSliceT } from "./types";
import { login, logout, refresh } from "./userThunks";

const initialState: UserSliceT = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //Register
    // builder.addCase(register.fulfilled, (state, action) => {
    //   state.user = action.payload;
    // });
    // builder.addCase(register.rejected, (state, action) => {
    //   console.error(action.error);
    //   state.user = null;
    // });

    //Refresh
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      console.error(action.error);
      state.user = null;
    });

    //Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(logout.rejected, (_, action) => {
      console.error(action.error);
    });

    //login
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.error(action.error);
      state.user = null;
    });
  },
});

export default userSlice.reducer;
