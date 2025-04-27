import { Ionicons } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";

interface IconSymbolProps {
  name: string;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}

export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
  const iconNameMap: Record<string, string> = {
    "map.fill": "map",
    "person.fill": "person",
    "house.fill": "home",
    "paperplane.fill": "paper-plane",
  };

  return (
    <Ionicons
      name={iconNameMap[name] || "home"}
      size={size}
      color={color}
      style={style}
    />
  );
}

// сейчас заглушка с изображениями

// В текущей реализации используется заглушка с изображениями (требуется добавить файлы иконок в assets/images/).
// Рекомендуется заменить на библиотеку, например, @expo/vector-icons:
// bash
// npx expo install @expo/vector-icons
// Тогда код может выглядеть так:
// tsx

//     import { Ionicons } from '@expo/vector-icons';

//     export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
//       return <Ionicons name={name} size={size} color={color} style={style} />;
// }
