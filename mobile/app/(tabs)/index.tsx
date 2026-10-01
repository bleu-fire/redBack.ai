import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page (Tabs)</Text>
      <Text style={styles.subtitle}>Rak dkhlti b najā7 l l'application!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.canvas,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
  },
  title: {
      fontFamily:Typography.display,
    fontSize: 28,
    fontWeight: "900",
    color: Palette.ink,
  },
  subtitle: {
    fontSize: 16,
    color: Palette.inkSecondary ,
    marginTop: Spacing.sm,
  },
});

