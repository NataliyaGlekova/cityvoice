// screens/PlaceDetails.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export function PlaceDetails() {
  const navigation = useNavigation(); // Хук для навигации
  const route = useRoute(); // Хук для доступа к параметрам маршрута
  const { placeId } = route.params;

  const place = placesData.find((p) => p.id === placeId);

  if (!place) return null;

  return (
    <View style={styles.container}>
      {/* Кнопка назад */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>
      
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.location}>{place.location}</Text>
      <Text style={styles.rating}>★ {place.rating}</Text>
      <Text style={styles.description}>{place.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: 'blue',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  location: {
    fontSize: 18,
    color: '#666',
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginVertical: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 12,
  },
});
