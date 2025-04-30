import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/hooks";
import {
  fetchCategoryPlaces,
  fetchPlaces,
} from "@/entities/place/model/placeThunks";
import { Place } from "@/entities/place/model/types";
import { setActivePlace } from "@/entities/place/model/placeSlice";
import { MaterialIcons } from "@expo/vector-icons"; // ← импорт иконок

export function PlacesList({ category }: { category: string }) {
  const dispatch = useAppDispatch();
  // const places = useAppSelector((state) => state.markers.places);
  const places = useAppSelector((state) => state.markers.activePlaces);
  const [sortedPlaces, setSortedPlaces] = useState<Place[]>([]);
  const [isAscending, setIsAscending] = useState(true);
  console.log("Зашло на страницу");

  // Загрузка данных из Redux
  useEffect(() => {
    dispatch(fetchCategoryPlaces(category));
  }, [dispatch]);

  // Сортировка при изменении isAscending или places
  useEffect(() => {
    console.log("Сортировка вызвана" + places);

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

  const handlePlacePress = (place: Place) => {
    dispatch(setActivePlace(place));
    router.push(`/place/${place.id}`);
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
    <FlatList
      style={{ flex: 1 }}
      data={sortedPlaces}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePlacePress(item)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.rating}>★ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      ListHeaderComponent={
        <View style={{ flex: 1 }}>
          {" "}
          <View />
          <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
            <MaterialIcons
              name={isAscending ? "arrow-upward" : "arrow-downward"}
              size={20}
              color="#000"
            />
            <Text style={styles.sortText}>
              Сортировка по рейтингу: {isAscending ? "по возрастанию" : "по убыванию"}
            </Text>
          </TouchableOpacity>
        </View>
      }
      ListFooterComponent={<View style={{ height: 70 }} />}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  sortText: {
    marginLeft: 6,
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 16,
  },
});
