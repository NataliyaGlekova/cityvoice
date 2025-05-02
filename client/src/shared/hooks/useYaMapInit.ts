import { useEffect, useState } from "react";
import { AppState } from "react-native";
import YaMap from "react-native-yamap";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setIsYamapReady } from "@/entities/place/model/placeSlice";

export function useYaMapInit() {
  const dispatch = useAppDispatch();
  const isYamapReady = useAppSelector(state => state.markers.isYamapReady);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        console.log("App is active, initializing YaMap");
        YaMap.init("021c4811-7a3c-48ec-b5d8-6bd59e8e3823")
          .then(() => {
            console.log("YaMap initialized successfully!");
            dispatch(setIsYamapReady(true)); // Сигнал о готовности карты
          })
          .catch((error) => {
            console.error("Failed to initialize YaMap:", error);
          });
      }
    });

    return () => {
      console.log('YaMap initialization cleanup');
      
      subscription.remove();
    };
  }, []);

  return isYamapReady; // Возвращаем состояние готовности
}

// export function useYaMapInit() {
//   console.log("Yandex Maps инициализация пропущена (режим разработки)");
//   // Ничего не делаем в заглушке
// }
