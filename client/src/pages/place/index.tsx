import Slider from '@react-native-community/slider';
import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { View, Text } from 'react-native';
import { ThemedView } from '@/shared/ui/ThemedView';
import { ThemedText } from '@/shared/ui/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { places } from '../../../assets/audio/places';
import { PlaceCard } from '@/entities/place';

export function PlacePage() {
  const { id } = useLocalSearchParams();
  const place = places.find((p) => p.id === id) || {
    id,
    name: 'Unknown Place',
    description: 'No description available.',
    audio: null,
  };

  const soundRef = useRef<Audio.Sound | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const updateStatus = async () => {
    const status = await soundRef.current?.getStatusAsync();
    if (status && 'isLoaded' in status && status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 1);
      setIsPlaying(status.isPlaying);
    }
  };

  useEffect(() => {
    const interval = setInterval(updateStatus, 500);
    return () => clearInterval(interval);
  }, []);

  const loadAndPlay = async () => {
    if (!place.audio) return;
    const { sound } = await Audio.Sound.createAsync(place.audio);
    soundRef.current = sound;
    await sound.playAsync();
    setIsPlaying(true);
  };

  const togglePlayback = async () => {
    if (!soundRef.current) {
      await loadAndPlay();
      return;
    }
    const status = await soundRef.current.getStatusAsync();
    if ('isPlaying' in status) {
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const onSliderValueChange = async (value: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value * 1000);
      setPosition(value);
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <PlaceCard place={place} />

      {place.audio && (
        <View style={{ marginTop: 32 }}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={onSliderValueChange}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#FFFFFF"
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -4 }}>
            <Text style={{ fontSize: 12, color: '#999' }}>{formatTime(position)}</Text>
            <Text style={{ fontSize: 12, color: '#999' }}>{formatTime(duration)}</Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <View
              style={{
                backgroundColor: '#007AFF',
                paddingHorizontal: 32,
                paddingVertical: 12,
                borderRadius: 32,
              }}
            >
              <Text
                onPress={togglePlayback}
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ThemedView>
  );
}
