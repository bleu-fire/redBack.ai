import type React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Palette } from "@/constants/theme";

export function PrimaryButton({
  children,
  onPress,
  secondary = false,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  secondary?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.primaryButton, secondary && styles.secondaryButton]}
    >
      <Text style={[styles.primaryText, secondary && styles.secondaryText]}>
        {children}
      </Text>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  primaryButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: Palette.coral,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  secondaryButton: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  primaryText: { color: Palette.paper, fontSize: 15, fontWeight: "800" },
  secondaryText: { color: Palette.ink },
});

