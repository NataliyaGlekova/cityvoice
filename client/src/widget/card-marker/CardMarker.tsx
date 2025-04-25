import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CardMarker = () => {
  const attraction = {
    name: "Истра",
    description:
      "Знаменитая металлическая башня в Париже, символ Франции. Построена в 1889 году как входная арка для Всемирной выставки. Высота составляет 330 метров.",
    imageUrl: "https://podmoskoviegid.ru/wp-content/uploads/2022/11/1-1.jpg",
    rating: 4.8,
    location: "Истра, Россия",
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: attraction.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{attraction.name}</Text>
        <Text style={styles.location}>{attraction.location}</Text>
        <Text style={styles.description}>{attraction.description}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {attraction.rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
});

export default CardMarker;
