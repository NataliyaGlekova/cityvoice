import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/shared/hooks/useColorScheme";
import { Provider } from "react-redux";
import { store } from "../src/shared/store";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Для поддержки жестов

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              gestureEnabled: true,
              headerBackTitle: "", // на всякий случай
              headerBackVisible: true,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, title: "" }}
            />
            <Stack.Screen
              name="place/[id]"
              options={{
                title: "Place Details",
                headerBackVisible: true,
                headerBackTitle: "", // лишним не будет
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
