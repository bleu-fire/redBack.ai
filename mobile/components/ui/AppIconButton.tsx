import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Radii, TouchTargets } from '@/constants/theme';

export interface AppIconButtonProps {
  icon: any;
  onPress: () => void;
  variant?: 'default' | 'danger' | 'ghost';
  size?: number;
  iconSize?: number;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel: string;
}

export function AppIconButton({
  icon: IconComponent,
  onPress,
  variant = 'default',
  size = TouchTargets.iconBtn,
  iconSize = 20,
  disabled = false,
  style,
  accessibilityLabel,
}: AppIconButtonProps) {
  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const getIconColor = () => {
    if (variant === 'danger') return '#FFFFFF';
    return Colors.inkPrimary;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size, borderRadius: Radii.md },
        styles[variant],
        pressed && styles[`${variant}Pressed` as keyof typeof styles],
        disabled && styles.disabled,
        style,
      ]}
    >
      <IconComponent size={iconSize} color={getIconColor()} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
  },
  defaultPressed: {
    backgroundColor: '#F5EFE6',
    transform: [{ translateY: 2 }],
  },
  danger: {
    backgroundColor: Colors.crimson,
    borderWidth: 1.5,
    borderColor: '#EE4A4A',
    borderBottomWidth: 3,
    borderBottomColor: Colors.crimsonDark,
  },
  dangerPressed: {
    backgroundColor: Colors.crimsonDark,
    transform: [{ translateY: 2 }],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostPressed: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  disabled: {
    opacity: 0.5,
  },
});
