import { useAppDispatch } from "@/shared/hooks/hooks";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const HomePage = () => {
  const handlePlacePress = () => {
    router.push(`/placelist`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>City Voice</Text>
      </View>
      <TouchableOpacity style={styles.item} onPress={handlePlacePress}>
        <Text style={styles.title}>Места для посещения</Text>
        <Text style={styles.description}>Список мест для посещения</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/categoryList/rest")}
      >
        <Text style={styles.title}>Где поесть?</Text>
        <Text style={styles.description}>Подборка вкусных мест.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>Интересные факты</Text>
        <Text style={styles.description}>Подборка интересных фактов.</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  header: {
    backgroundColor: "#333",
    paddingVertical: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomePage;
