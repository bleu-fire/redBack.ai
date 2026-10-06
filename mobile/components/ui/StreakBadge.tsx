import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { Palette, Radii, Typography } from '@/constants/theme';

interface StreakBadgeProps {
  days?: number;
  text?: string;
}

/**
 * Reusable Streak Badge Pill
 * Displays flame icon and active streak counter in solar amber
 */
export function StreakBadge({ days = 7, text }: StreakBadgeProps) {
  const displayText = text || `${days} day streak`;

  return (
    <View style={styles.badge}>
      <Flame size={16} color={Palette.gold} />
      <Text style={styles.text}>{displayText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.goldSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radii.pill,
  },
  text: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.gold,
  },
});

export default StreakBadge;
