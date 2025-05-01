import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ViewStyle,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
// import YaMap, { Marker, Point, Polyline } from "react-native-yamap";
import CardMarker from "../card-marker/CardMarker";
import { PlaceT } from "@/entities/place/model/shema";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { useYaMapInit } from "@/shared/hooks/useYaMapInit";
import {
  setActivePlace,
  setIsModalVisible,
} from "@/entities/place/model/placeSlice";
import { useUserLocation } from "@/shared/hooks/useUserLocation";

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapRef = useRef<YaMap | null>(null);

  const places = useAppSelector((state) => state.markers.places);

  // Состояние для отображения модального окна
  const dispatch = useAppDispatch();
  const isModalVisible = useAppSelector(
    (state) => state.markers.isModalVisible
  );
  // Состояние геолокации
  const { userLocation, setUserLocation } = useUserLocation();

  const [currentPlace, setCuurentId] = useState<PlaceT | null>(null); // Состояние для отображения модального окна
  const [selectedPlace, setSelectedPlace] = useState<any>(null); // Состояние для выбранного места
  const [routePoints, setRoutePoints] = useState<Point[]>([]);

  const isYamapReady = useYaMapInit();

  // Состояние масштабирования
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
    dispatch(setIsModalVisible(true));
  };

  const handleBuildRoute = (destination: {
    name: string;
    coordinates: { lat: number; lon: number };
  }) => {
    if (userLocation && destination) {
      mapRef.current?.findPedestrianRoutes(
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
            console.log(routesEvent);

            // Суммируем все точки из секций маршрута
            const allPoints = firstRoute.sections.reduce<Point[]>(
              (acc, section) => acc.concat(section.points),
              []
            );

            // Ставим объединённые точки в состояние
            setRoutePoints(allPoints);
          }
        }
      );
    } else {
      alert("Местоположение пользователя неизвестно. Повторите попытку позже.");
    }
  };

  const cancelRoute = () => {
    setRoutePoints([]); // Очищаем массив координат маршрута
  };

  const centerMapOnUser = () => {
    if (userLocation && mapRef.current) {
      const targetZoom = 10;
      mapRef.current.setCenter(
        { lat: userLocation.lat, lon: userLocation.lon },
        zoomLevel,
        1
      );
      setZoomLevel(targetZoom);
    }
  };

  if (!places) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      {isYamapReady && (
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
                dispatch(setActivePlace(place));
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
      )}
      {/* Модальное окно с информацией о месте */}
      {selectedPlace && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible} // Состояние отображения модального окна
          onRequestClose={() => dispatch(setIsModalVisible(false))} // Закрытие модального окна
        >
          <View style={styles.modalBackground}>
            <CardMarker onBuildRoute={handleBuildRoute} />
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
        <TouchableOpacity style={styles.locateButton} onPress={centerMapOnUser}>
          <Image
            source={require("../../../assets/button-nav.png")}
            style={{ width: 24, resizeMode: "contain" }}
          />
        </TouchableOpacity>
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
      height: "100%", // Устанавливаем фиксированную высоту для iOS
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
  locateButton: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,122,255,0.7)",
    padding: 10,
    marginTop: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Map;
