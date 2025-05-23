import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../entities/user/model/userSlice";
import placeReducer from "../entities/places/model/placesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    place: placeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
