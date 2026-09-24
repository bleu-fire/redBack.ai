import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Palette, Radii, Typography } from '@/constants/theme';

export interface BadgeProps {
  label: string;
  variant?: 'venomous' | 'common' | 'match' | 'popular' | 'neutral';
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = 'neutral',
  icon,
  style,
}: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      <Text style={[styles.text, styles[`text_${variant}` as keyof typeof styles]]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
  },
  venomous: {
    backgroundColor: Palette.coralSoft,
  },
  common: {
    backgroundColor: Palette.mossSoft,
  },
  match: {
    backgroundColor: '#1E352C',
  },
  popular: {
    backgroundColor: Palette.goldSoft,
  },
  neutral: {
    backgroundColor: Palette.surfaceSubtle,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  iconContainer: {
    marginRight: 5,
  },
  text: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  text_venomous: {
    color: Palette.danger,
  },
  text_common: {
    color: Palette.moss,
  },
  text_match: {
    color: Palette.paper,
  },
  text_popular: {
    color: Palette.gold,
  },
  text_neutral: {
    color: Palette.muted,
  },
});
