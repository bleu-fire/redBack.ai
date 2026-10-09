import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { Palette, Spacing, Radii } from "@/constants/theme";

interface TopbarProps {
  pfp?: boolean;
}

const defaultAvatar = require("@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg");

const Topbar = ({ pfp = true }: TopbarProps) => {
  const avatarSource = pfp === true ? defaultAvatar : pfp;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require("@/assets/design/redback-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => router.push("/modal" as any)}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Bell size={22} color={Palette.ink} />
          <View style={styles.notificationDot} />
        </Pressable>

        {Boolean(pfp) && (
          <Pressable
            onPress={() => router.push("/(tabs)/profile" as any)}
            style={({ pressed }) => [styles.pfpButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="User Profile"
          >
            <Image
              source={avatarSource}
              style={styles.pfpImage}
              resizeMode="cover"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Palette.canvas,
    borderBottomWidth: 1,
    borderBottomColor: Palette.lineSubtle,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  logo: {
    width: 144,
    height: 50,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  pfpButton: {
    borderRadius: Radii.pill,
    overflow: "hidden",
  },
  pfpImage: {
    width: 36,
    height: 36,
    borderRadius: Radii.pill,
    borderWidth: 1.5,
    borderColor: Palette.line,
  },
  iconButton: {
    padding: Spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.coral,
    borderWidth: 1.5,
    borderColor: Palette.paper,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});

export { Topbar };
export default Topbar;

