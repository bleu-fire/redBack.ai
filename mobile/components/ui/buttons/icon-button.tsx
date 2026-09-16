import type React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Palette } from "@/constants/theme";
import type { LucideIcon } from "lucide-react-native";

export function IconButton({
  icon: Icon,
  onPress,
  light = false,
}: {
  icon: LucideIcon;
  onPress?: () => void;
  light?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.iconButton, light && styles.iconButtonLight]}
    >
      <Icon size={20} color={light ? Palette.ink : Palette.paper} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Palette.ink,
  },
  iconButtonLight: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
  },
});

