import { PlacesList } from "@/widget/places-list/PlacesList";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      <PlacesList category="place" />
    </View>
  );
}
