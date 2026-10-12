import { StyleSheet } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: 26,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
    lineHeight: 32,
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
  },
  sectionSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
  },
  modulesList: {
    gap: Spacing.md,
  },

  // Results Page Tactile Card Style
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xxl,
    borderWidth: 1.5,
    borderColor: '#E4DDD3',
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.lg,
    gap: 8,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
    borderColor: Palette.moss,
  },
  moduleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moduleCategoryTag: {
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: Radii.pill,
  },
  moduleCategoryText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.ink,
  },
  moduleXpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  moduleXpText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
  },
  moduleTitle: {
    fontFamily: Typography.display,
    fontSize: 16.5,
    fontWeight: '800',
    color: Palette.ink,
    lineHeight: 22,
    marginTop: 2,
  },
  moduleSubtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    lineHeight: 18,
  },
  moduleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3EFE6',
  },
  moduleFooterLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 12,
  },
  progressBarTrack: {
    flex: 1,
    maxWidth: 90,
    height: 5,
    borderRadius: Radii.pill,
    backgroundColor: '#EFECE6',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Palette.coral,
    borderRadius: Radii.pill,
  },
  progressPercent: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.ink,
  },
  readTimeText: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
  },
});
