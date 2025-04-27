import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import YaMap from "react-native-yamap"; // Импортируем YaMap

const Map = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lon: 0 }); // Начальная позиция пользователя
  const { width, height } = useWindowDimensions(); // Получаем размеры устройства

  useEffect(() => {
    YaMap.init("021c4811-7a3c-48ec-b5d8-6bd59e8e3823");
  }, []);

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     if (Platform.OS === "android") {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //       );
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         console.warn("Разрешение на геолокацию отклонено");
  //       }
  //     }
  //   };

  //   const getUserLocation = async () => {
  //     // Получаем текущие координаты пользователя
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation({ lat: latitude, lon: longitude });
  //       },
  //       (error) => {
  //         console.error("Ошибка при получении геолокации", error);
  //       },
  //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //     );
  //   };

  //   // Запрашиваем разрешения и получаем местоположение
  //   requestPermissions();
  //   getUserLocation();
  // }, []);

  return (
    <YaMap
      // userLocationIcon={{
      //   uri: "https://www.clipartmax.com/png/middle/180-1801760_pin-png.png",
      // }}
      initialRegion={{
        lat: 50,
        lon: 50,
        zoom: 10,
        azimuth: 80,
        tilt: 100,
      }}
      // style={styles.map}
      style={{ flex: 1 }}
    />
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    height: "100%",
    display: "flex", // Используем flexbox для выравнивания элементов
    justifyContent: "center", // Центрируем карту по вертикали
    alignItems: "center", // Центрируем карту по горизонтали
    backgroundColor: "#fff", // Устанавливаем фон для контейнера
  },
  map: {
    width: 300, // Ширина карты = ширина экрана
    flex: 1, // Высота карты = высота экрана
    height: 200,
  },
});

interface Point {
  lat: Number;
  lon: Number;
}

interface ScreenPoint {
  x: number;
  y: number;
}

interface MapLoaded {
  renderObjectCount: number;
  curZoomModelsLoaded: number;
  curZoomPlacemarksLoaded: number;
  curZoomLabelsLoaded: number;
  curZoomGeometryLoaded: number;
  tileMemoryUsage: number;
  delayedGeometryLoaded: number;
  fullyAppeared: number;
  fullyLoaded: number;
}

interface InitialRegion {
  lat: number;
  lon: number;
  zoom?: number;
  azimuth?: number;
  tilt?: number;
}

type MasstransitVehicles =
  | "bus"
  | "trolleybus"
  | "tramway"
  | "minibus"
  | "suburban"
  | "underground"
  | "ferry"
  | "cable"
  | "funicular";

type Vehicles = MasstransitVehicles | "walk" | "car";

interface DrivingInfo {
  time: string;
  timeWithTraffic: string;
  distance: number;
}

interface MasstransitInfo {
  time: string;
  transferCount: number;
  walkingDistance: number;
}

interface RouteInfo<T extends DrivingInfo | MasstransitInfo> {
  id: string;
  sections: {
    points: Point[];
    sectionInfo: T;
    routeInfo: T;
    routeIndex: number;
    stops: any[];
    type: string;
    transports?: any;
    sectionColor?: string;
  };
}

interface RoutesFoundEvent<T extends DrivingInfo | MasstransitInfo> {
  nativeEvent: {
    status: "success" | "error";
    id: string;
    routes: RouteInfo<T>[];
  };
}

interface CameraPosition {
  zoom: number;
  tilt: number;
  azimuth: number;
  point: Point;
  reason: "GESTURES" | "APPLICATION";
  finished: boolean;
}

type VisibleRegion = {
  bottomLeft: Point;
  bottomRight: Point;
  topLeft: Point;
  topRight: Point;
};

type YamapSuggest = {
  title: string;
  subtitle?: string;
  uri?: string;
};

type YamapCoords = {
  lon: number;
  lat: number;
};

type YamapSuggestWithCoords = {
  lon: number;
  lat: number;
  title: string;
  subtitle?: string;
  uri?: string;
};

type YandexLogoPosition = {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "bottom";
};

type YandexLogoPadding = {
  horizontal?: number;
  vertical?: number;
};

export default Map;
