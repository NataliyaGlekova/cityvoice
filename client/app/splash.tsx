import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/main`); // перенаправляем на главный таб
    }, 2000); // 2 секунды

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>City Voice</Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
});
