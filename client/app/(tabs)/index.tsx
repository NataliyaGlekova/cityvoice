import { fetchPlaces } from "@/entities/place/model/placeThunks";
import { MapPage } from "@/pages/map";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function MapScreen() {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.markers.places);
  useEffect(() => {
    void dispatch(fetchPlaces());
  }, []);

  if (places?.length === 0) return <ActivityIndicator />;
  return (
    <View style={{ flex: 1 }}>
      <MapPage />
    </View>
  );
}
