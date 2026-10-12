import { StyleSheet } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    justifyContent: 'flex-end',
  },
  modalBackdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalSheetContainer: {
    flex: 1,
    backgroundColor: Palette.canvas,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Palette.line,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 24,
  },
  modalDragHandleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: Palette.canvas,
  },
  modalDragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D6D1C7',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  modalCategoryBadge: {
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: Radii.pill,
  },
  modalCategoryBadgeText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.moss,
  },
  modalReadTime: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
  },
  modalCloseBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modalScroll: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.md,
  },

  // Title Block
  titleBlock: {
    gap: 4,
    marginBottom: 4,
  },
  modalTitle: {
    fontFamily: Typography.display,
    fontSize: 22,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
  },
  modalSubtitle: {
    fontFamily: Typography.body,
    fontSize: 13.5,
    color: Palette.muted,
    lineHeight: 19,
  },

  // Results Page Tactile Card: Field Essentials
  takeawaysCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xxl,
    borderWidth: 1.5,
    borderColor: '#E4DDD3',
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.lg,
    gap: 10,
  },
  takeawaysTitle: {
    fontFamily: Typography.display,
    fontSize: 15,
    fontWeight: '800',
    color: Palette.ink,
    marginBottom: 2,
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  takeawayText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 18.5,
  },

  // Overview / Topic Section Block (Results Page Tactile Style)
  sectionBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xxl,
    borderWidth: 1.5,
    borderColor: '#E4DDD3',
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.lg,
    gap: 8,
  },
  sectionBlockHeading: {
    fontFamily: Typography.display,
    fontSize: 15,
    fontWeight: '800',
    color: Palette.ink,
  },
  sectionBlockBody: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 19,
  },
  bulletList: {
    gap: 6,
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    fontSize: 14,
    color: Palette.moss,
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 18,
  },

  // Bottom Fixed Action Deck for Complete Lesson
  modalBottomDeck: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Palette.line,
    backgroundColor: '#FFFFFF',
  },
  completeLessonBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 50,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1.5,
    borderBottomWidth: 3,
  },
  completeLessonBtnActive: {
    backgroundColor: Palette.forestGreen,
    borderColor: '#1E6332',
    borderBottomColor: '#174E27',
  },
  completeLessonBtnCompleted: {
    backgroundColor: Palette.mossSoft,
    borderColor: Palette.moss,
    borderBottomColor: '#B2E2BB',
  },
  completeLessonBtnTextActive: {
    fontFamily: Typography.display,
    fontSize: 14.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  completeLessonBtnTextCompleted: {
    fontFamily: Typography.display,
    fontSize: 14.5,
    fontWeight: '800',
    color: Palette.forestGreen,
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
