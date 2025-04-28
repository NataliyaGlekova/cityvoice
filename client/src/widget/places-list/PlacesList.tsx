import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../../navigation/types"; // Импортируем типы для навигации
import { StackNavigationProp } from '@react-navigation/stack'; // Импортируем тип для навигации
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

// Типизация навигации
type PlacesListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PlacesList'>;

export function PlacesList() {
  const [sortedPlaces, setSortedPlaces] = useState<Place[]>(placesData); // Инициализация с данными из places.json
  const [isAscending, setIsAscending] = useState(true);
  const navigation = useNavigation<PlacesListScreenNavigationProp>(); // Типизируем navigation

  // Функция для сортировки по рейтингу
  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev); // Просто переключаем порядок
  };

  // useEffect для сортировки при изменении isAscending
  useEffect(() => {
    const sorted = [...placesData].sort((a, b) => {
      if (isAscending) {
        return a.rating - b.rating; // по возрастанию
      } else {
        return b.rating - a.rating; // по убыванию
      }
    });
    setSortedPlaces(sorted); // Обновляем список мест
  }, [isAscending]);

  const handlePlacePress = (placeId: number) => {
    // Переход к экрану подробностей
    navigation.navigate('PlaceDetails', { placeId }); // Здесь передаем параметры с типом
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title={`Сортировать по рейтингу: ${isAscending ? "По возрастанию" : "По убыванию"}`}
        onPress={toggleSortOrder}
      />
      <FlatList
        data={sortedPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePlacePress(item.id)}
          >
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
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: "#FFD700",
  },
});
