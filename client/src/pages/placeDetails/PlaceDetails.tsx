import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, ScrollView } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import placesData from "../../../assets/places.json"; // Импорт данных о местах

// Типизация данных для мест
type Place = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  rating: number;
  location: string;
  lat: number;
  lon: number;
};

export function PlaceDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeId } = route.params as { placeId: number };

  const [place, setPlace] = useState<Place | undefined>(undefined);

  useEffect(() => {
    // Найдем место по ID
    const foundPlace = placesData.find((p) => p.id === placeId);
    setPlace(foundPlace);
  }, [placeId]);

  if (!place) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.location}>{place.location}</Text>
      <Text style={styles.rating}>★ {place.rating}</Text>
      <Text style={styles.description}>{place.description}</Text>

      <Button title="Назад" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: "#FFD700",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
});
