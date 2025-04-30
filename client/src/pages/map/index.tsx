import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";

import Map from "@/widget/yamap/Map";

export function MapPage() {
  const router = useRouter();

  const handlePlacePress = (placeId: string) => {
    router.push(`/place/${placeId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Map /> */}
      <MapPlaceholder onPlacePress={handlePlacePress} />
    </SafeAreaView>
  );
}
