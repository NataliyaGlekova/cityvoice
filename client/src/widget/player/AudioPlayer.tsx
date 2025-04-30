import Slider from "@react-native-community/slider";
import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { View, Text, StyleSheet } from "react-native";
import { ThemedView } from "@/shared/ui/ThemedView";
import { ThemedText } from "@/shared/ui/ThemedText";
import { PlaceCard } from "@/entities/place";

interface AudioPlayerProps {
  audioSource: any;
  showCard?: boolean;
  place?: {
    id: string;
    name: string;
    description: string;
  };
}

export function AudioPlayer({
  audioSource,
  showCard = false,
  place,
}: AudioPlayerProps) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0); // Изначально 0, пока аудио не загружено
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // Флаг загрузки аудио

  const updateStatus = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (status && "isLoaded" in status && status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
      setIsPlaying(status.isPlaying);
    }
  };

  useEffect(() => {
    const loadAudio = async () => {
      if (!audioSource) return;
      try {
        const { sound } = await Audio.Sound.createAsync(audioSource);
        soundRef.current = sound;
        const status = await sound.getStatusAsync();
        if (status && "isLoaded" in status && status.isLoaded) {
          setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    loadAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [audioSource]);

  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(updateStatus, 500);
    return () => clearInterval(interval);
  }, [isLoaded]);

  const togglePlayback = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if ("isPlaying" in status) {
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
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <ThemedView style={styles.container}>
      {/* {showCard && place && <PlaceCard place={place} />} */}

      {audioSource && (
        <View style={styles.playerContainer}>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={onSliderValueChange}
              minimumTrackTintColor="#000000" // Черный трек
              maximumTrackTintColor="#d3d3d3" // Серый фон
              thumbTintColor="#000000" // Черный ползунок
            />

            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          <View style={styles.playButtonContainer}>
            <Text onPress={togglePlayback} style={styles.playButton}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  playerContainer: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  sliderContainer: {
    flex: 1,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -4,
  },
  timeText: {
    fontSize: 12,
    color: "#999",
  },
  playButtonContainer: {
    backgroundColor: "#000000", // Черная кнопка
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 32,
  },
  playButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
