// src/pages/placeDetails/PlaceDetails.tsx
import React from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Button,
  View,
} from "react-native";
import { useAppSelector } from "@/shared/hooks/hooks";
import { router } from "expo-router";
import CommentsWidget from "@/widget/comments-widget/CommentsWidget";
import { AudioPlayer } from "../../widget/player/AudioPlayer";
import { audioMap } from "../../shared/utils/audioMap";

export default function PlaceDetails() {
  const place = useAppSelector((state) => state.markers.activePlace);

  if (!place) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Место не выбрано</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.location}>{place.location}</Text>
      <Text style={styles.rating}>★ {place.rating}</Text>
      <Text style={styles.description}>{place.description}</Text>
      <AudioPlayer
        audioSource={audioMap[place.name]}
        showCard={false}
        place={place}
      />
      <CommentsWidget foundPlace={place} />
      {/* Аудиоплеер */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  location: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  rating: {
    fontSize: 18,
    color: "#FFD700",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 12,
  },
});
