import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { Colors } from "@/shared/styles/Colors";
import { useColorScheme } from "@/shared/hooks/useColorScheme";

type ThemedTextType =
  | "title"
  | "subtitle"
  | "default"
  | "defaultSemiBold"
  | "link";

interface ThemedTextProps extends TextProps {
  type?: ThemedTextType;
  style?: StyleProp<TextStyle>;
}

export function ThemedText({
  type = "default",
  style,
  children,
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme();

  const textStyles: Record<ThemedTextType, TextStyle> = {
    title: { fontSize: 28, fontWeight: "bold" },
    subtitle: { fontSize: 20, fontWeight: "600" },
    default: { fontSize: 16 },
    defaultSemiBold: { fontSize: 16, fontWeight: "600" },
    link: { fontSize: 16, color: Colors[colorScheme ?? "light"].tint },
  };

  return (
    <Text
      style={[
        { color: Colors[colorScheme ?? "light"].text },
        textStyles[type],
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
