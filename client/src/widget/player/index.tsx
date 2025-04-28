import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { ThemedView } from '@/shared/ui/ThemedView';
import { ThemedText } from '@/shared/ui/ThemedText';
import { Button } from '@/shared/ui/Button';
import { PlaceCard } from '@/entities/place';
import { places } from '../../../assets/audio/places';
import Slider from '@react-native-community/slider';

export function PlacePage() {
  const { id } = useLocalSearchParams();
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(1); // начнем с 1, чтобы избежать деления на 0

  const place = places.find((p) => p.id === id) || {
    id,
    name: 'Unknown Place',
    description: 'No description available.',
    audio: null,
  };

  const loadAudio = async () => {
    if (!place.audio) return;

    const { sound } = await Audio.Sound.createAsync(
      place.audio,
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    soundRef.current = sound;

    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      setDurationMillis(status.durationMillis ?? 1);
    }
  };

  const onPlaybackStatusUpdate = (status: Audio.AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    if ('positionMillis' in status) {
      setPositionMillis(status.positionMillis);
    }
    if ('isPlaying' in status) {
      setIsPlaying(status.isPlaying);
    }
    if ('durationMillis' in status) {
      setDurationMillis(status.durationMillis ?? 1);
    }
  };

  const togglePlayback = async () => {
    if (!soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    }
  };

  const handleSeek = async (value: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
    }
  };

  useEffect(() => {
    loadAudio();

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
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={durationMillis}
            value={positionMillis}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#1C1C1E"
            maximumTrackTintColor="#D1D1D6"
            thumbTintColor="#000000"
          />
          <Button
            title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            onPress={togglePlayback}
          />
        </>
      )}
    </ThemedView>
  );
}
