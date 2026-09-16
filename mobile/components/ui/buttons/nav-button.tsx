import type React from "react";
import { type Href, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

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

const styles = StyleSheet.create({
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
});

