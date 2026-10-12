import { StyleSheet } from 'react-native';
import { Palette, Spacing, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  heroCard: {
    marginHorizontal: Spacing.lg,
    height: 350,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#0F1714',
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  heroNavRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navGhostBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  identitySection: {
    paddingHorizontal: Spacing.lg,
    gap: 4,
  },
  commonName: {
    fontFamily: Typography.displayBold,
    fontSize: 28,
    color: Palette.ink,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  scientificName: {
    fontFamily: Typography.displayItalic,
    fontSize: 15,
    color: Palette.muted,
  },
  metricsGhostStrip: {
    marginHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 2,
    gap: 8,
  },
  metricGhostItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  metricIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  metricGhostLabel: {
    fontFamily: Typography.body,
    fontSize: 9.5,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  metricGhostVal: {
    fontFamily: Typography.display,
    fontSize: 11.5,
    fontWeight: '700',
    color: Palette.ink,
    textAlign: 'center',
  },
});
