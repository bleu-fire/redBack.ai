import type React from "react";
import { type Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Palette } from "@/constants/theme";

export function OnboardingButton({
  label,
  onPress,
  path,
}: {
  label: string;
  onPress?: () => void;
  path?: Href;
}) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (path) {
      router.replace(path);
    }
  };

  return (
    <Pressable style={styles.onboardingButton} onPress={handlePress}>
      <Text style={styles.onboardingButtonText}>{label}</Text>
      <View style={styles.onboardingArrow}>
        <Text style={styles.onboardingArrowText}>→</Text>
      </View>
    </Pressable>
  );
}

export default OnboardingButton;

const styles = StyleSheet.create({
  onboardingButton: {
    height: 58,
    borderRadius: 19,
    backgroundColor: Palette.coral,
    paddingLeft: 22,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  onboardingButtonText: {
    color: Palette.paper,
    fontSize: 15,
    fontWeight: "900",
  },
  onboardingArrow: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C83D32",
  },
  onboardingArrowText: { color: Palette.paper, fontSize: 24, lineHeight: 25 },
});

