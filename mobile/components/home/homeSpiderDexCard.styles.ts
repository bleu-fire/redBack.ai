import { StyleSheet } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export const dexStyles = StyleSheet.create({
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
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
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
});
