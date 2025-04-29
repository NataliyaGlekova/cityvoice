// src/pages/placeDetails/PlaceDetails.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router'; // Импорт expo-router
import placesData from '../../../assets/places.json';

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
  const { id } = useLocalSearchParams(); // Получаем id из URL
  const placeId = Number(id); // Преобразуем строку в число

  const [place, setPlace] = useState<Place | undefined>(undefined);

  useEffect(() => {
    console.log('Received placeId:', placeId); // Для отладки
    const foundPlace = placesData.find((p) => p.id === placeId);
    setPlace(foundPlace);
  }, [placeId]);

  if (!place) {
    return <Text>Место не найдено</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.location}>{place.location}</Text>
      <Text style={styles.rating}>★ {place.rating}</Text>
      <Text style={styles.description}>{place.description}</Text>
      <Button title="Назад" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
});