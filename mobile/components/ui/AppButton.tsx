import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Radii, TouchTargets } from '@/constants/theme';

export type ButtonVariant = 'primary' | 'danger' | 'secondary' | 'ghost';

export interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: any;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  icon: IconComponent,
  loading = false,
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}: AppButtonProps) {
  const handlePress = () => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && (styles[`${variant}Pressed` as keyof typeof styles] as ViewStyle),
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' || variant === 'ghost' ? Colors.forestGreen : '#FFFFFF'}
        />
      ) : (
        <View style={styles.contentRow}>
          {IconComponent && (
            <IconComponent
              size={18}
              color={variant === 'secondary' || variant === 'ghost' ? Colors.inkPrimary : '#FFFFFF'}
              strokeWidth={2}
              style={styles.iconMargin}
            />
          )}
          <Text
            style={[
              styles.baseText,
              styles[`${variant}Text` as keyof typeof styles],
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: TouchTargets.buttonHeight,
    borderRadius: Radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMargin: {
    marginRight: Spacing.sm,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },

  // 1. Primary Variant (Forest Green)
  primary: {
    backgroundColor: Colors.forestGreen,
    borderWidth: 1.5,
    borderColor: '#389A4B',
    borderBottomWidth: 3,
    borderBottomColor: Colors.forestDark,
  },
  primaryPressed: {
    backgroundColor: Colors.forestDark,
    transform: [{ translateY: 2 }],
  },
  primaryText: {
    color: '#FFFFFF',
  },

  // 2. Danger Variant (Crimson - Emergency SOS)
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
  dangerText: {
    color: '#FFFFFF',
  },

  // 3. Secondary Variant (Card Surface)
  secondary: {
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
  },
  secondaryPressed: {
    backgroundColor: '#F7F4EE',
    transform: [{ translateY: 2 }],
  },
  secondaryText: {
    color: Colors.inkPrimary,
  },

  // 4. Ghost Variant
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostPressed: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  ghostText: {
    color: Colors.forestGreen,
  },

  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: Colors.inkMuted,
  },
});
