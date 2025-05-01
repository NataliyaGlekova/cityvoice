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
  Animated,
  Easing,
} from "react-native";
import Markdown from "react-native-markdown-display";

export default function AiInfo() {
  const [facts, setFacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const fetchFact = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstant.post("/ai", {
        prompt:
          "Интересный факт об Истре короткий, рандомный, можно малоизвестный до 50 слов",
      });
      setFacts((prev) => [response.data, ...prev]);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
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

      {facts.map((fact, index) => (
        <Animated.View
          key={index}
          style={[styles.factContainer, { opacity: fadeAnim }]}
        >
          <Markdown style={markdownStyles}>{fact}</Markdown>
        </Animated.View>
      ))}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  factContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
