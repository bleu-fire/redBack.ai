import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Palette, Radii, Typography } from '@/constants/theme';
import { ChevronRight } from 'lucide-react-native';

export interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  loading = false,
  icon,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={isOutline ? Palette.ink : Palette.paper}
          size="small"
        />
      ) : (
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <Text
            style={[
              styles.text,
              styles[`text_${variant}` as keyof typeof styles],
              styles[`text_${size}` as keyof typeof styles],
            ]}
          >
            {title}
          </Text>
          {showArrow && (
            <View
              style={[
                styles.arrowCircle,
                isPrimary && styles.arrowCirclePrimary,
                isSecondary && styles.arrowCircleSecondary,
              ]}
            >
              <ChevronRight
                size={18}
                color={isOutline ? Palette.ink : Palette.paper}
              />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radii.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: Palette.coral,
  },
  secondary: {
    backgroundColor: Palette.moss,
  },
  outline: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  danger: {
    backgroundColor: Palette.danger,
  },
  sm: {
    height: 40,
    paddingHorizontal: 16,
  },
  md: {
    height: 52,
    paddingHorizontal: 20,
  },
  lg: {
    height: 58,
    paddingHorizontal: 24,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontFamily: Typography.body,
    fontWeight: '700',
    textAlign: 'center',
  },
  text_primary: {
    color: Palette.paper,
  },
  text_secondary: {
    color: Palette.paper,
  },
  text_outline: {
    color: Palette.ink,
  },
  text_danger: {
    color: Palette.paper,
  },
  text_sm: {
    fontSize: 14,
  },
  text_md: {
    fontSize: 16,
  },
  text_lg: {
    fontSize: 18,
  },
  arrowCircle: {
    marginLeft: 'auto',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  arrowCirclePrimary: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  arrowCircleSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
