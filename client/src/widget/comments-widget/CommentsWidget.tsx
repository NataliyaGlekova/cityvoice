import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

const CommentsWidget = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Иван Иванов",
      text: "Это первый тестовый комментарий",
      timestamp: "10:30 12.05.2023",
    },
    {
      id: "2",
      author: "Петр Петров",
      text: "Второй комментарий для примера",
      timestamp: "11:45 12.05.2023",
    },
    {
      id: "3",
      author: "Анна Сидорова",
      text: "Еще один комментарий в списке",
      timestamp: "14:20 13.05.2023",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Текущий пользователь",
      text: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <View style={styles.container}>
      <Text>Комментарии:</Text>
      <View style={styles.commentsList}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.author}>{comment.author}</Text>
            <Text style={styles.text}>{comment.text}</Text>
            <Text style={styles.timestamp}>{comment.timestamp}</Text>
          </View>
        ))}
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
});

export default CommentsWidget;
