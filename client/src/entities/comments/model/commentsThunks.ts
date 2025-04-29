import axiosInstant from "@/shared/axiosInstant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentArraySchema, commentSchema, NewCommentT } from "./shema";

export const fetchCommentsByID = createAsyncThunk(
  "comments/fetchById",
  async (id: number) => {
    try {
      const response = await axiosInstant(`comments/marker/${id}`);
      return commentArraySchema.parse(response.data);
    } catch (error) {
      throw error;
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/add",
  async (comment: NewCommentT) => {
    try {
      const response = await axiosInstant.post("/comments", comment);
      return commentSchema.parse(response.data);
    } catch (error) {
      throw error;
    }
  }
);
