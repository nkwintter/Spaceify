// src/screens/HomeScreenPlaceholder.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";

export default function HomeScreenPlaceholder() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Placeholder</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Moods")}
      >
        <Text style={styles.buttonText}>Ir para Moods</Text>
      </TouchableOpacity>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#00A8FF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#00A8FF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
