import React from "react";
import MapCopy from "../src/widget/yamap/MapCopy";
import { View } from "react-native";

export default function mapActivePlace() {
  return (
    <View style={{ flex: 1 }}>
      <MapCopy />;
    </View>
  );
}
