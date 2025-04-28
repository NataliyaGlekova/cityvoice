// import { useEffect } from "react";
// import { AppState } from "react-native";
// import YaMap from "react-native-yamap";

// export function useYaMapInit() {
//   useEffect(() => {
//     const subscription = AppState.addEventListener("change", (nextAppState) => {
//       if (nextAppState === "active") {
//         console.log("App is active, initializing YaMap");
//         YaMap.init("021c4811-7a3c-48ec-b5d8-6bd59e8e3823");
//       }
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);
// }

export function useYaMapInit() {
  console.log("Yandex Maps инициализация пропущена (режим разработки)");
  // Ничего не делаем в заглушке
}
