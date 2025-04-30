import { PlacesList } from "@/widget/places-list/PlacesList";
import { SafeAreaView } from "react-native";

export default function MainPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PlacesList category="place" />
    </SafeAreaView>
  );
}
