import { StyleSheet } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

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

  // 1. Header & Metrics Bar
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

  // 2. SpiderDex Tracker Card
  dexCard: {
    backgroundColor: Palette.paper,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  dexCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dexCardEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  dexCardTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 16,
    color: Palette.ink,
  },
  dexPercentPill: {
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  dexPercentText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.moss,
  },
  dexProgressBarBg: {
    height: 6,
    backgroundColor: '#F0ECE4',
    borderRadius: 3,
    overflow: 'hidden',
  },
  dexProgressBarFill: {
    height: '100%',
    backgroundColor: Palette.moss,
    borderRadius: 3,
  },
  dexShelfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dexAvatarsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dexAvatarWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: Palette.paper,
    overflow: 'hidden',
    backgroundColor: Palette.surfaceSubtle,
  },
  dexAvatarImg: {
    width: '100%',
    height: '100%',
  },
  dexLockedAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAE6DE',
  },
  dexActionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dexActionText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },

  // 5. Seasonal Biodiversity Radar
  seasonalSection: {
    gap: Spacing.sm + 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 22,
    color: Palette.ink,
    letterSpacing: -0.3,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
  },
  seeAllText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.muted,
  },
  seasonalScroll: {
    gap: 12,
    paddingRight: Spacing.md,
  },
  seasonalCard: {
    width: 172,
    backgroundColor: Palette.paper,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    overflow: 'hidden',
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  seasonalCardImg: {
    width: '100%',
    height: 122,
    backgroundColor: Palette.surfaceSubtle,
  },
  seasonalCardBody: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 3,
  },
  seasonalBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  regionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  regionTagText: {
    fontFamily: Typography.body,
    fontSize: 11.5,
    color: Palette.muted,
    fontWeight: '500',
  },
  toxPill: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  toxPillText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  seasonalCardName: {
    fontFamily: Typography.displayBold,
    fontSize: 15.5,
    color: Palette.ink,
    letterSpacing: -0.2,
  },
  seasonalCardSciName: {
    fontFamily: Typography.displayItalic,
    fontSize: 12,
    color: Palette.muted,
  },

  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
});
