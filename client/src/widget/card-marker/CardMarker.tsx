import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AudioPlayer } from "../player/AudioPlayer";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { setIsModalVisible } from "@/entities/place/model/placeSlice";
import { audioMap } from "@/shared/utils/audioMap";

export type CardMarkerProps = {
  onBuildRoute?: (place: any) => void;
} | null;

const CardMarker = (props: CardMarkerProps) => {
  if (!props) return null;
  const { onBuildRoute } = props;

  const place = useAppSelector((state) => state.markers.activePlace);
  const coordinates = { lat: place?.lat, lon: place?.lon };
  const dispatch = useAppDispatch();

  const handlePlacePress = () => {
    router.push(`/place/${place?.id}`);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: place?.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{place?.name}</Text>
        <Text style={styles.location}>{place?.location}</Text>

        {/* Прокручиваемый блок описания */}
        <View style={styles.descriptionWrapper}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.description}>{place?.description}</Text>
          </ScrollView>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {place?.rating}</Text>
        </View>
      </View>

      <AudioPlayer audioSource={audioMap[place?.name || ""]} showCard={false} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.routeButton]}
          onPress={() => {
            if (typeof onBuildRoute === "function") {
              onBuildRoute({ name: place?.name, coordinates }); // Отправляем имя и расположение точки
            }
            dispatch(setIsModalVisible(false));
          }}
        >
          <Text style={styles.buttonText}>Маршрут</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.detailsButton]}
          onPress={() => {
            handlePlacePress();
            dispatch(setIsModalVisible(false));
          }}
        >
          <Text style={styles.buttonText}>Подробнее</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={() => dispatch(setIsModalVisible(false))}
        >
          <Text style={styles.buttonText}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 380,
    height: 650,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  descriptionWrapper: {
    maxHeight: 100,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },

  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  routeButton: {
    backgroundColor: "#4CAF50", // зелёный
  },

  closeButton: {
    backgroundColor: "#F44336", // красный
  },

  detailsButton: {
    backgroundColor: "#2196F3", // синий
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CardMarker;
