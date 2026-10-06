import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Palette, Radii, Typography } from '@/constants/theme';

interface QuickFactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

/**
 * Reusable Quick Fact Card
 * Used in the 2x2 facts grid on species details (Size, Lifespan, Diet, Habitat)
 */
export function QuickFactCard({ icon, label, value }: QuickFactCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBadge}>{icon}</View>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Palette.mossSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  label: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
  },
  value: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: Palette.ink,
    marginTop: 2,
  },
});

export default QuickFactCard;
