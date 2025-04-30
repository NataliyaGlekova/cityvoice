import { PlacesList } from "@/widget/places-list/PlacesList";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { View } from "react-native";

export default function CategoryList() {
  const { category } = useLocalSearchParams();
  console.log("Category:", category);

  return (
    <View style={{ flex: 1 }}>
      <PlacesList category={category} />;
    </View>
  );
}
