import { View, ViewProps } from 'react-native';
import { Colors } from '@/shared/styles/Colors';
import { useColorScheme } from '@/shared/hooks/useColorScheme';

export function ThemedView({ style, ...rest }: ViewProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[{ backgroundColor: Colors[colorScheme ?? 'light'].background }, style]}
      {...rest}
    />
  );
}