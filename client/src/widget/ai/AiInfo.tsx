import axiosInstant from "@/shared/axiosInstant";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Markdown from "react-native-markdown-display";

export default function AiInfo() {
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchFact = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstant.post("/ai", {
        prompt: "Интересные факты об Истре",
      });
      setFact(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchFact}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Loading..." : "Интересные факты об Истре"}
        </Text>
      </TouchableOpacity>

      {fact ? (
        <View style={styles.factContainer}>
          <Markdown style={markdownStyles}>{fact}</Markdown>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  factContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "100%",
  },
});

const markdownStyles = {
  body: {
    fontSize: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 10,
  },
  list_item: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet_list_icon: {
    marginRight: 10,
  },
  ordered_list_icon: {
    marginRight: 10,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
};
