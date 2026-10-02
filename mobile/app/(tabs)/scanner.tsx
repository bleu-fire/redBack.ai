import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Palette, Typography } from '@/constants/theme';

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spider Camera Scanner</Text>
      <Text style={styles.subtitle}>Take a photo to identify species</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.canvas,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontFamily: Typography.display,
    fontSize: 24,
    fontWeight: '800',
    color: Palette.ink,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.muted,
    marginTop: 8,
    textAlign: 'center',
  },
});
