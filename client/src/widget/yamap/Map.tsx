import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ViewStyle,
  Modal,
} from "react-native";
import YaMap, { Marker } from "react-native-yamap";
import CardMarker from "../card-marker/CardMarker";
import placesData from "../../../assets/places.json";

type Card = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  rating: number;
  location: string;
  lat: number;
  lon: number;
};

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapRef = useRef<any>(null);

  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для отображения модального окна
  const [currentPlace, setCuurentId] = useState<Card | null>(null); // Состояние для отображения модального окна
  const [selectedPlace, setSelectedPlace] = useState<any>(null); // Состояние для выбранного места

  const places: Card[] = placesData;

  const increaseZoom = () => {
    if (mapRef.current && zoomLevel < 18) {
      const newZoom = zoomLevel + 1;
      mapRef.current.setZoom(newZoom, 0.3);
      setZoomLevel(newZoom);
    }
  };

  const decreaseZoom = () => {
    if (mapRef.current && zoomLevel > 1) {
      const newZoom = zoomLevel - 1;
      mapRef.current.setZoom(newZoom, 0.3);
      setZoomLevel(newZoom);
    }
  };

  const handleMarkerPress = (place: any) => {
    setSelectedPlace(place);
    setIsModalVisible(true); // Открываем модальное окно
  };

  return (
    <View style={styles.container}>
      <YaMap
        ref={mapRef}
        initialRegion={{
          lat: 55.91421,
          lon: 36.859635,
          zoom: zoomLevel,
        }}
        showUserPosition={true}
        style={styles.map}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            point={{ lat: place.lat, lon: place.lon }}
            source={require("../../../assets/marker-icon.png")} // Иконка маркера
            scale={0.5} // Масштабирование иконки
            onPress={() => {
              handleMarkerPress(place);

              setCuurentId(place);
            }} // Открытие модального окна при клике на маркер
          />
        ))}
      </YaMap>
      {/* Модальное окно с информацией о месте */}
      {selectedPlace && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)} // Закрытие модального окна
        >
          <View style={styles.modalBackground}>
            <CardMarker
              imageUrl={currentPlace?.imageUrl || ""}
              name={currentPlace?.name || ""}
              description={currentPlace?.description || ""}
              rating={currentPlace?.rating || 0}
              location={currentPlace?.location || ""}
              setIsModalVisible={setIsModalVisible}
            />
          </View>
        </Modal>
      )}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={increaseZoom}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={decreaseZoom}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Выравниваем содержимое по центру
    alignItems: "center", // Выравниваем содержимое по горизонтали
  },
  map: Platform.select({
    ios: {
      width: "100%",
      height: 750, // Устанавливаем фиксированную высоту для iOS
    },
    android: {
      width: "100%",
      height: "100%", // Для Android используем 100% высоты
    },
    default: {
      width: "100%",
      height: "100%", // Резервный вариант, если не удается определить платформу
    },
  }) as ViewStyle, // Указываем тип ViewStyle для предотвращения ошибки
  zoomControls: {
    position: "absolute",
    bottom: 60,
    right: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  zoomButton: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    margin: 5,
    borderRadius: 30,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  zoomText: {
    color: "#fff",
    fontSize: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнение фона
  },
  modalContent: {
    width: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Тень для модального окна
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Цвет заголовка
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
    color: "#666", // Цвет описания
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Map;
