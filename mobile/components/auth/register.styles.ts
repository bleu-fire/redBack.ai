import { StyleSheet } from 'react-native';
import { Palette, Radii, Spacing, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    justifyContent: 'space-between',
  },
  heroSection: {
    marginBottom: Spacing.xxl,
  },
  heroTitle: {
    fontFamily: Typography.display,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.8,
  },
  heroSubtitle: {
    fontFamily: Typography.body,
    fontSize: 14,
    lineHeight: 21,
    color: Palette.muted,
    marginTop: Spacing.sm,
  },
  heroScript: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontStyle: 'italic',
    color: Palette.inkSecondary,
    marginTop: Spacing.md,
  },
  formContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  inputCard: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    height: 56,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: Spacing.md,
  },
  textInput: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 16,
    color: Palette.ink,
  },
  eyeToggle: {
    padding: Spacing.xs,
  },
  registerButton: {
    marginTop: Spacing.sm,
    height: 54,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.lg,
  },
  footerText: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.muted,
  },
  footerLink: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.coral,
  },
});
