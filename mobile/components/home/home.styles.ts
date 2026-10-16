import { StyleSheet } from 'react-native';
import { Palette, Spacing, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxxl + 20,
    gap: Spacing.lg,
  },
  headerBlock: {
    gap: 6,
    marginTop: Spacing.xs,
  },
  greetingTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 26,
    color: Palette.ink,
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  greetingName: {
    color: Palette.coral,
  },
});
