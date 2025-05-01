import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { Colors } from "@/shared/styles/Colors";
import { useColorScheme } from "@/shared/hooks/useColorScheme";
import { HapticTab, IconSymbol, TabBarBackground } from "@/shared/ui";
import { useYaMapInit } from "@/shared/hooks/useYaMapInit";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useYaMapInit();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="main"
          options={{
            title: "Главная",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Карта",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="map.fill" color={color} />
            ),
          }}
        />

      </Tabs>
    </View>
  );
}
