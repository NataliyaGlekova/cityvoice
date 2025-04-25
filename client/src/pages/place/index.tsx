import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { ThemedView } from '@/shared/ui/ThemedView';
import { ThemedText } from '@/shared/ui/ThemedText';
import { Button } from '@/shared/ui/Button';
import { PlaceCard } from '@/entities/place';
import { places } from '../../../assets/audio/places'; // твой список мест

export function PlacePage() {
  const { id } = useLocalSearchParams();
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const normalizedId = Array.isArray(id) ? id[0] : id;
  const place = places.find((p) => p.id === normalizedId) || {
    id: normalizedId,
    name: 'Unknown Place',
    description: 'No description available.',
    audio: null,
  };

  const loadAndPlay = async () => {
    if (!place.audio) return;
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    const { sound } = await Audio.Sound.createAsync(place.audio);
    soundRef.current = sound;
    await sound.playAsync();
    setIsPlaying(true);
  };

  const togglePlayback = async () => {
    const sound = soundRef.current;
    if (!sound) {
      await loadAndPlay();
      return;
    }

    const status = await sound.getStatusAsync();

    if ('isPlaying' in status) {
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      console.error('Error getting audio status:', status);
    }
  };

  const rewind = async () => {
    const sound = soundRef.current;
    if (sound) {
      await sound.setPositionAsync(0);
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <PlaceCard place={place} />
      {place.audio && (
        <>
          <Button title={isPlaying ? 'Pause Audio' : 'Play Audio'} onPress={togglePlayback} />
          <Button title="Rewind" onPress={rewind} />
        </>
      )}
    </ThemedView>
  );
}
