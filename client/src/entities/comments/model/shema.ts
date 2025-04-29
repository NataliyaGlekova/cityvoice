import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  text: z.string(),
  name: z.string(),
  markerId: z.number(),
});
export type CommentT = z.infer<typeof commentSchema>;

export const newCommentSchema = commentSchema.omit({ id: true });
export type NewCommentT = z.infer<typeof newCommentSchema>;

export const commentArraySchema = z.array(commentSchema);
export type CommentArrayT = z.infer<typeof commentArraySchema>;

export type CommentsSliceT = {
  comments: CommentT[];
  loading: boolean;
};
