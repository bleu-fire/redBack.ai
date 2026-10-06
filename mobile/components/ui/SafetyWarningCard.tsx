import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

interface SafetyWarningCardProps {
  title?: string;
  message?: string;
}

/**
 * Reusable Safety Warning Card
 * Used across Identification Results and Species Detail screens
 */
export function SafetyWarningCard({
  title = 'Safety warning',
  message = 'Redback spider bites can be serious. Avoid handling, keep your distance, and seek medical advice if bitten.',
}: SafetyWarningCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <AlertTriangle size={18} color={Palette.danger} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.coralSoft,
    borderWidth: 1,
    borderColor: Palette.dangerBorder,
    borderRadius: Radii.md,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.danger,
  },
  message: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 18,
  },
});

export default SafetyWarningCard;
