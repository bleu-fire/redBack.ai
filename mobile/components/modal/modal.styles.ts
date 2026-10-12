import { StyleSheet } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },

  // ================= 1. HEADER =================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerLeft: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  title: {
    fontFamily: Typography.displayBold,
    fontSize: 24,
    color: Palette.ink,
    letterSpacing: -0.4,
  },
  unreadCountText: {
    fontFamily: Typography.body,
    fontSize: 16,
    fontWeight: '700',
    color: Palette.moss,
  },
  unreadCountTextDanger: {
    color: Palette.danger,
  },
  closeBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  closeBtnPressed: {
    opacity: 0.7,
  },

  // ================= 2. ACTION CONTROLS =================
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: 4,
    marginBottom: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Radii.pill,
  },
  actionButtonActive: {
    backgroundColor: Palette.surfaceSubtle,
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
  actionButtonText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.moss,
  },
  actionClearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Radii.pill,
  },
  actionClearText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: Palette.muted,
  },
  btnPressed: {
    opacity: 0.7,
  },

  // ================= 3. FILTER PILLS =================
  filterScrollView: {
    maxHeight: 40,
    marginBottom: Spacing.xs,
  },
  filterScrollContent: {
    paddingHorizontal: Spacing.xl,
    gap: 6,
    alignItems: 'center',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderBottomWidth: 2,
    borderBottomColor: '#D8D0C5',
  },
  filterChipActive: {
    backgroundColor: Palette.forestGreen,
    borderColor: Palette.forestGreen,
    borderBottomColor: Palette.mossDark,
  },
  filterChipPressed: {
    transform: [{ translateY: 1 }],
  },
  filterText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterCountText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: Palette.muted,
  },
  filterCountTextActive: {
    color: 'rgba(255, 255, 255, 0.85)',
  },

  // ================= 4. COMPACT & SIMPLE NOTIFICATION CARDS =================
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xxxl + 20,
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Palette.paper,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Palette.line,
    borderBottomWidth: 2,
    borderBottomColor: '#D8D0C5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 10,
  },
  cardRead: {
    backgroundColor: '#FAF8F5',
    borderColor: '#EAE4DA',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E0D8CC',
  },
  cardPressed: {
    transform: [{ translateY: 1 }],
    borderBottomWidth: 1,
  },
  iconBadge: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  cardContent: {
    flex: 1,
    gap: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  cardTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 13.5,
    color: Palette.ink,
    letterSpacing: -0.2,
    flex: 1,
  },
  cardTitleRead: {
    color: Palette.inkSecondary,
    fontFamily: Typography.body,
    fontWeight: '600',
  },
  timeAndDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.moss,
  },
  unreadDotDanger: {
    backgroundColor: Palette.danger,
  },
  timeLabel: {
    fontSize: 10.5,
    fontWeight: '500',
    color: Palette.mutedLight,
  },
  cardMessage: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.inkSecondary,
    lineHeight: 16.5,
  },
  cardMessageRead: {
    color: Palette.muted,
  },
  actionInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  actionInlineText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.moss,
  },
  actionInlineTextDanger: {
    color: Palette.danger,
  },
  dismissBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },

  // ================= 5. EMPTY STATE =================
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl + 4,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.line,
    borderBottomWidth: 2,
    borderBottomColor: '#D8D0C5',
    marginTop: Spacing.sm,
    gap: 6,
  },
  emptyIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  emptyTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 17,
    color: Palette.ink,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.muted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.sm,
    maxWidth: 270,
  },
  emptyActionsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  emptyPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.moss,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    borderBottomWidth: 2,
    borderBottomColor: Palette.mossDark,
  },
  emptyPrimaryBtnText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptySecondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderBottomWidth: 2,
    borderBottomColor: '#D8D0C5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radii.pill,
  },
  emptySecondaryBtnText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },
});
