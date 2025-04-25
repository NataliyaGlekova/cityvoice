import { View } from 'react-native';
import { ThemedText } from '@/shared/ui/ThemedText';
import { Place } from '../model/types';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <View style={{ padding: 16, borderRadius: 8, backgroundColor: '#f0f0f0' }}>
      <ThemedText type="subtitle">{place.name}</ThemedText>
      <ThemedText>{place.description}</ThemedText>
    </View>
  );
}