import { ThemedView } from '@/shared/ui/ThemedView';
import { ThemedText } from '@/shared/ui/ThemedText';

export function ProfilePage() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText>This is your personal profile page.</ThemedText>
    </ThemedView>
  );
}