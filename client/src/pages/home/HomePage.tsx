// HomePage.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "1",
    title: "Интересные места",
    description: "Подборка красивых мест для посещения.",
  },
  { id: "2", title: "Где поесть?", description: "Подборка вкусных мест." },
  {
    id: "3",
    title: "Интересные факты",
    description: "Подборка интересных фактов.",
  },
];

const Item = ({ title, description, id }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>City Voice</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            description={item.description}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
