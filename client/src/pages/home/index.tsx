import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

import { MapPlaceholder } from "@/features/map/ui";
import { ThemedView } from "@/shared/ui/ThemedView";
import { ThemedText } from "@/shared/ui/ThemedText";

export function HomePage() {
  const router = useRouter();

  const handlePlacePress = (placeId: string) => {
    router.push(`/place/${placeId}`);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText type="title" style={{ padding: 16 }}>
        Map
      </ThemedText>
      <MapPlaceholder onPlacePress={handlePlacePress} />
    </ThemedView>
  );
}
