import type React from "react";
import { type Href, useRouter } from "expo-router";
import { TouchableOpacity, Pressable, StyleSheet, Text, View } from "react-native";
import { Palette } from "@/constants/theme";
import type { LucideIcon } from "lucide-react-native";

// 1. Navigation / Action Button (used for Login, Register, screen links)
export function NavButton({
  name,
  path,
  onPress,
  variant = 'primary',
}: {
  name: string;
  path?: Href;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
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
    <TouchableOpacity
      style={[
        styles.navButton,
        variant === 'secondary' && styles.navButtonSecondary,
      ]}
      onPress={handlePress}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.navButtonText,
            variant === 'secondary' && styles.navButtonTextSecondary,
          ]}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Aliases so both <Buttons /> and <ButtonComponent /> work everywhere
export const Buttons = NavButton;
export const ButtonComponent = NavButton;
export default NavButton;

// 2. Icon Button (used for headers, close buttons, action bars)
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

// 3. Primary Button (standard theme button with text children)
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

// 4. Onboarding Button (full-width pill button with arrow container)
export function OnboardingButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.onboardingButton} onPress={onPress}>
      <Text style={styles.onboardingButtonText}>{label}</Text>
      <View style={styles.onboardingArrow}>
        <Text style={styles.onboardingArrowText}>→</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Nav Button styles
  navButton: {
    backgroundColor: '#0cc97b',
    height: 50,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0cc97b',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  navButtonTextSecondary: {
    color: '#0cc97b',
  },

  // Icon Button styles
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

  // Primary Button styles
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

  // Onboarding Button styles
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
