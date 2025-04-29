import {
  addComment,
  fetchCommentsByID,
} from "@/entities/comments/model/commentsThunks";
import { NewCommentT } from "@/entities/comments/model/shema";
import { PlaceT } from "@/entities/place/model/shema";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

interface Props {
  foundPlace: PlaceT;
}

const CommentsWidget = ({ foundPlace }: Props) => {
  const dispatch = useAppDispatch();
  const { comments, loading } = useAppSelector((state) => state.comments);
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(5);

  useEffect(() => {
    void dispatch(fetchCommentsByID(foundPlace.id));
  }, [dispatch, foundPlace.id]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment: NewCommentT = {
      name: "Текущий пользователь",
      text: newComment,
      markerId: foundPlace.id,
    };

    dispatch(addComment(comment));
    setNewComment("");
  };

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  if (loading) return <ActivityIndicator size="large" color="#007bff" />;
  return (
    <View style={styles.container}>
      <Text>Отзывы:</Text>
      <View style={styles.commentsList}>
        {comments.slice(0, visibleComments).map((comment) => (
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.author}>{comment.name}</Text>
            <Text style={styles.text}>{comment.text}</Text>
          </View>
        ))}
        {visibleComments < comments.length && (
          <TouchableOpacity
            onPress={loadMoreComments}
            style={styles.loadMoreButton}
          >
            <Text style={styles.loadMoreText}>Показать еще</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Напишите комментарий..."
        />
        <Button title="Отправить" onPress={handleAddComment} />
      </View>
      <View style={{ height: 70 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  commentsList: {
    marginBottom: 16,
  },
  commentContainer: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  author: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  loadMoreButton: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginTop: 10,
  },
  loadMoreText: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default CommentsWidget;
