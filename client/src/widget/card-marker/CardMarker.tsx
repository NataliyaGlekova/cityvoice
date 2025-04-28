import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AudioPlayer } from "../player/AudioPlayer";

export type CardMarkerProps = {
  imageUrl: string;
  name: string;
  description: string;
  rating: number;
  location: string;
  setIsModalVisible: (value: boolean) => void;
} | null;

const CardMarker = (props: CardMarkerProps) => {

  if (!props) return null;
  const { imageUrl, name, description, rating, location, setIsModalVisible } =
    props;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {rating}</Text>
        </View>
      </View>
      <AudioPlayer audioSource={require("../../../assets/audio/test.mp3")} />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setIsModalVisible(false)} // Закрытие модального окна
      >
        <Text style={styles.closeButtonText}>Закрыть</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 380,
    height: 600,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CardMarker;
