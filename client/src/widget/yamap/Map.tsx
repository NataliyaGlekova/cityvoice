import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ViewStyle,
  Modal,
  ActivityIndicator,
} from "react-native";
import YaMap, { Marker, Polyline } from "react-native-yamap";
import CardMarker from "../card-marker/CardMarker";
import placesData from "../../../assets/places.json";
import { PlaceT } from "@/entities/place/model/shema";
import { useAppSelector } from "@/shared/hooks/hooks";

import Geolocation from "@react-native-community/geolocation";

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
  const places = useAppSelector((state) => state.markers.places);

  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для отображения модального окна
  const [currentPlace, setCuurentId] = useState<Card | null>(null); // Состояние для отображения модального окна
  const [selectedPlace, setSelectedPlace] = useState<any>(null); // Состояние для выбранного места
  const [routePoints, setRoutePoints] = useState([]);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

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

  const handleBuildRoute = (destination: {
    name: string;
    coordinates: { lat: number; lon: number };
  }) => {
    if (userLocation && destination) {
      mapRef.current.findPedestrianRoutes(
        [
          { lat: userLocation.lat, lon: userLocation.lon },
          {
            lat: destination.coordinates.lat,
            lon: destination.coordinates.lon,
          },
        ],
        (routesEvent) => {
          if (routesEvent && routesEvent.routes.length > 0) {
            const firstRoute = routesEvent.routes[0];

            // Суммируем все точки из секций маршрута
            const allPoints = firstRoute.sections.reduce(
              (acc, section) => acc.concat(section.points),
              []
            );

            // Общая продолжительность маршрута
            const totalDurationMs = firstRoute.sections.reduce(
              (sum, section) => sum + section.routeInfo.durationMs,
              0
            );

            // Форматируем время пути
            const formattedDuration = formatDuration(totalDurationMs);
            console.log(`Продолжительность маршрута: ${formattedDuration}`);

            // Ставим объединённые точки в состояние
            setRoutePoints(allPoints);
          }
        },
        (error) => {
          console.error("Ошибка при поиске маршрута:", error.message);
          alert(
            "Возникла ошибка при построении маршрута. Проверьте подключение к Интернету и повторите попытку."
          );
        }
      );
    } else {
      alert("Местоположение пользователя неизвестно. Повторите попытку позже.");
    }
  };

  // Функция форматирования времени
  const formatDuration = (ms) => {
    const seconds = ms / 1000;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours ? hours + " часа " : ""}${minutes} минут`;
  };

  useEffect(() => {
    // Получаем геолокацию пользователя с флагом для принудительного использования актуальных данных
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Полученные координаты: ", latitude, longitude); // Логируем координаты
        setUserLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.log("Ошибка получения геолокации: ", error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 } // maximumAge: 0 для актуальных данных
    );

    // Отслеживание местоположения в реальном времени
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Текущие координаты: ", latitude, longitude); // Логируем координаты
        setUserLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.log("Ошибка отслеживания местоположения: ", error);
      },
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    // Очистка отслеживания при размонтировании компонента
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const cancelRoute = () => {
    setRoutePoints([]); // Очищаем массив координат маршрута
  };

  if (!places) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <YaMap
        ref={mapRef}
        initialRegion={{
          lat: userLocation?.lat || 55.91421,
          lon: userLocation?.lon || 36.859635,
          zoom: zoomLevel,
        }}
        showUserPosition={true}
        followUser={true}
        userLocationIcon={require("../../../assets/navigation.png")} // Иконка для отображения позиции пользователя
        userLocationIconScale={0.3} // Масштабирование иконки
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
        {routePoints.length > 0 && (
          <Polyline
            points={routePoints}
            strokeColor="#0000ff" // Цвет линии маршрута (синий)
            strokeWidth={5} // Толщина линии
          />
        )}
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
              coordinates={{ lat: currentPlace?.lat, lon: currentPlace?.lon }}
              setIsModalVisible={setIsModalVisible}
              onBuildRoute={handleBuildRoute}
            />
          </View>
        </Modal>
      )}
      <View style={styles.сontrols}>
        {routePoints.length > 0 && (
          <TouchableOpacity
            style={styles.cancelRouteButton}
            onPress={cancelRoute}
          >
            <Text style={styles.buttonText}>Х</Text>
          </TouchableOpacity>
        )}
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
      height: 770, // Устанавливаем фиксированную высоту для iOS
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
  сontrols: {
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
  cancelRouteButton: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255, 0, 0, 0.5)", // Красный фон
    padding: 10,
    marginTop: 5,
    borderRadius: 30,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Map;
