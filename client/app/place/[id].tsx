import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { useAppSelector } from "@/shared/hooks/hooks";
import PlaceDetails from "@/pages/placeDetails/PlaceDetails";

export default function PlaceDetailScreen() {
  const navigation = useNavigation();
  const place = useAppSelector((state) => state.markers.activePlace);

  useLayoutEffect(() => {
    if (place) {
      const maxLength = 20;
      const title =
        place.name.length > maxLength
          ? `${place.name.slice(0, maxLength)}...`
          : place.name;

      navigation.setOptions({ title });
    }
  }, [navigation, place]);

  return <PlaceDetails />;
}
