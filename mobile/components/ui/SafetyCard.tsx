import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Palette, Radii, Typography } from '@/constants/theme';
import { AlertTriangle, ChevronRight } from 'lucide-react-native';

export interface SafetyCardProps {
  title?: string;
  message?: string;
  showDisclosure?: boolean;
  style?: ViewStyle;
}

export function SafetyCard({
  title = 'Safety warning',
  message = 'Redback spider bites can be serious. Avoid handling, keep your distance, and seek immediate medical advice if bitten.',
  showDisclosure = true,
  style,
}: SafetyCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconBox}>
        <AlertTriangle size={24} color={Palette.danger} />
      </View>
      <View style={styles.copyBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      {showDisclosure && (
        <View style={styles.chevronBox}>
          <ChevronRight size={20} color={Palette.coral} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.coralSoft,
    borderWidth: 1,
    borderColor: Palette.dangerBorder,
    borderRadius: Radii.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(224, 72, 54, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyBox: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.body,
    fontSize: 15,
    fontWeight: '800',
    color: Palette.danger,
    marginBottom: 4,
  },
  message: {
    fontFamily: Typography.body,
    fontSize: 12,
    lineHeight: 17,
    color: Palette.ink,
  },
  chevronBox: {
    marginLeft: 4,
  },
});
