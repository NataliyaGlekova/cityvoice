import { View, Text, TouchableOpacity } from "react-native";

interface MapPlaceholderProps {
  onPlacePress: (placeId: string) => void;
}

export function MapPlaceholder({ onPlacePress }: MapPlaceholderProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Text>Yandex Map Placeholder</Text>
      <TouchableOpacity onPress={() => onPlacePress("1")}>
        <Text style={{ color: "blue", marginTop: 16 }}>Go to Place 1</Text>
      </TouchableOpacity>
    </View>
  );
}
