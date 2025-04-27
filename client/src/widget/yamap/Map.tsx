import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Platform, ViewStyle } from "react-native";
import YaMap from "react-native-yamap";

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapRef = useRef<any>(null);

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
        style={styles.map} // Используем обновленный стиль
      />
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
    }
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
});

export default Map;
