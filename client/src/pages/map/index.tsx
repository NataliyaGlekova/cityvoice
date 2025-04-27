import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

import { MapPlaceholder } from "@/features/map/ui";
import { ThemedView } from "@/shared/ui/ThemedView";
import { ThemedText } from "@/shared/ui/ThemedText";
import Map from "@/widget/yamap/Map";

export function MapPage() {
  const router = useRouter();

  const handlePlacePress = (placeId: string) => {
    router.push(`/place/${placeId}`);
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World</Text>
      <Map />
      {/* <MapPlaceholder onPlacePress={handlePlacePress} /> */}
    </ThemedView>
  );
}
