import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

import { MapPlaceholder } from "@/features/map/ui";
import { ThemedView } from "@/shared/ui/ThemedView";
import { ThemedText } from "@/shared/ui/ThemedText";
import Map from "@/widget/yamap/Map";
import { PlaceT } from "@/entities/place/model/shema";

export function MapPage() {
  const router = useRouter();

  const handlePlacePress = (placeId: string) => {
    router.push(`/place/${placeId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Map />
      {/* <MapPlaceholder onPlacePress={handlePlacePress} /> */}
    </SafeAreaView>
  );
}
