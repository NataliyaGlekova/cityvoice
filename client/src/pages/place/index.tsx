import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/shared/ui/ThemedView';
import { ThemedText } from '@/shared/ui/ThemedText';
// import { PlaceCard } from '@/entities/place/ui';
import { Button } from '@/shared/ui/Button';
import { PlaceCard } from '@/entities/place';

export function PlacePage() {
  const { id } = useLocalSearchParams();

  // Заглушка для данных места
  const place = {
    id: id as string,
    name: `Place ${id}`,
    description: 'This is a description of the place.',
  };

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <PlaceCard place={place} />
      <Button title="Play Audio" onPress={() => alert('Audio playback not implemented')} />
    </ThemedView>
  );
}