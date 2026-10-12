import { StyleSheet } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  protocolSection: {
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  protocolSectionHeader: {
    gap: 2,
  },
  protocolSectionEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1.1,
  },
  protocolSectionTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.3,
  },

  // Results Page Tactile Card Style
  protocolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xxl,
    borderWidth: 1.5,
    borderColor: '#E4DDD3',
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  protocolCardDont: {
    borderColor: Palette.ink,
    borderBottomColor: '#000000',
  },
  protocolCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F3EFE6',
  },
  protocolHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  protocolIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  protocolIconCircleDont: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  protocolCardTitle: {
    fontFamily: Typography.display,
    fontSize: 14.5,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.2,
  },
  protocolBadgeDo: {
    backgroundColor: '#EAE6DE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  protocolBadgeDoText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: 0.8,
  },
  protocolBadgeDont: {
    backgroundColor: Palette.danger,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  protocolBadgeDontText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  protocolItemsList: {
    gap: 0,
  },
  protocolRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 9,
  },
  protocolRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3EFE6',
  },
  protocolIndexPill: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F3EFE6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  protocolIndexText: {
    fontFamily: Typography.body,
    fontSize: 10.5,
    fontWeight: '800',
    color: Palette.ink,
  },
  protocolIndexPillDont: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  protocolIndexTextDont: {
    fontFamily: Typography.body,
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  protocolTextCol: {
    flex: 1,
    gap: 2,
  },
  protocolLeadText: {
    fontFamily: Typography.display,
    fontSize: 13.5,
    fontWeight: '700',
    color: Palette.ink,
    lineHeight: 18,
  },
  protocolDetailText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
    lineHeight: 17,
  },
});
