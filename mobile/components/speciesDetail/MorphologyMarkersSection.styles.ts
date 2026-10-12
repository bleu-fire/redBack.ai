import { StyleSheet } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  fieldIdentityCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  fieldEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  fieldTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '800',
    color: Palette.ink,
  },
  eyePatternBox: {
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: 10,
    gap: 4,
  },
  eyePatternHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eyePatternTitle: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '800',
    color: Palette.ink,
  },
  eyePatternDesc: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.muted,
  },
  keyFeaturesList: {
    gap: 8,
    marginTop: 4,
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureItemText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 18,
  },
});
