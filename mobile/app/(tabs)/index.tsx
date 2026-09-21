import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>🎉 SUCCESS</Text>
      <Text style={styles.title}>Home Page (Tabs)</Text>
      <Text style={styles.subtitle}>Rak dkhlti b najā7 l l'application!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  badge: {
    backgroundColor: "#E84B3C",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontWeight: "800",
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#17211F",
  },
  subtitle: {
    fontSize: 16,
    color: "#6E7773",
    marginTop: 8,
  },
});

