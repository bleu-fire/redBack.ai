import { StyleSheet } from 'react-native';
import { Palette, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  scrollContent: {
    gap: Spacing.lg,
  },
});
