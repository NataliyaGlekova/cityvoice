import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Button, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooks';
import { fetchPlaces } from '@/entities/place/model/placeThunks';
import { Place } from '@/entities/place/model/types';
import { ScrollView } from 'react-native-gesture-handler';

export function PlacesList() {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.markers.places);
  const [sortedPlaces, setSortedPlaces] = useState<Place[]>([]);
  const [isAscending, setIsAscending] = useState(true);

  // Загрузка данных из Redux
  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  // Сортировка при изменении isAscending или places
  useEffect(() => {
    if (places) {
      const sorted = [...places].sort((a, b) => {
        return isAscending ? a.rating - b.rating : b.rating - a.rating;
      });
      setSortedPlaces(sorted);
    }
  }, [isAscending, places]);

  // Функция для сортировки
  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  // Навигация к странице места
  const handlePlacePress = (placeId: string) => {
    console.log('Navigating to /place/', placeId);
    router.push(`/place/${placeId}`);
  };


  // Обработка пустого списка
  if (!places || places.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Места не найдены</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style= {{height: 70}}/>
      <Button
        title={`Сортировать по рейтингу: ${isAscending ? 'По возрастанию' : 'По убыванию'}`}
        onPress={toggleSortOrder}
      />
      <FlatList
        data={sortedPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePlacePress(item.id)}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.rating}>★ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
      <View style= {{height: 70}}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: '#FFD700',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 16,
  },
});