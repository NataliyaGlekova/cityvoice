import { View, Platform } from 'react-native';
import { Colors } from '@/shared/styles/Colors';
import { useColorScheme } from '@/shared/hooks/useColorScheme';

export function TabBarBackground() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'ios'
            ? 'rgba(255, 255, 255, 0.8)' // Полупрозрачный фон для эффекта размытия
            : Colors[colorScheme ?? 'light'].background,
      }}
    />
  );
}