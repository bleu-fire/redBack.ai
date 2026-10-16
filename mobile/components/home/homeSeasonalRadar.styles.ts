import { StyleSheet } from 'react-native';
import { Palette, Spacing, Typography } from '@/constants/theme';

export const seasonalStyles = StyleSheet.create({
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
    elevation: 1,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
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
});
