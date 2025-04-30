import { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.log("Ошибка получения геолокации: ", error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );

    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.log("Ошибка отслеживания местоположения: ", error);
      },
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return { userLocation, setUserLocation };
};
