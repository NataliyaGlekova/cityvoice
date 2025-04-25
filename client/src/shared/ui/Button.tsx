import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: 12, backgroundColor: '#007AFF', borderRadius: 8, alignItems: 'center', marginTop: 16 }}>
      <Text style={{ color: '#fff', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  );
}