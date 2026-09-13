import type React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Palette } from "@/constants/theme";

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Palette.canvas },
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
  },
  scrollContent: { flexGrow: 1 },
});

export const layoutStyles = styles;

export function Screen({
  children,
  scroll = true,
}: {
  children: React.ReactNode;
  scroll?: boolean;
}) {
  const content = <View style={styles.screen}>{children}</View>;
  return scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
    >
      {content}
    </ScrollView>
  ) : (
    content
  );
}
