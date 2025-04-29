import { createSlice } from "@reduxjs/toolkit";
import { CommentsSliceT } from "./shema";
import { fetchCommentsByID, addComment } from "./commentsThunks";

const initialState: CommentsSliceT = {
  comments: [],
  loading: false,
};
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentsByID.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.loading = false;
    });
  },
});

export default commentsSlice.reducer;
