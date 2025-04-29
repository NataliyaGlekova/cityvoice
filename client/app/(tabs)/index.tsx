import { fetchPlaces } from "@/entities/place/model/placeThunks";
import {
  PlaceArraySchema,
  PlaceSchema,
  PlaceT,
} from "@/entities/place/model/shema";
import { MapPage } from "@/pages/map";
import axiosInstant from "@/shared/axiosInstant";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { useEffect, useState } from "react";
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
