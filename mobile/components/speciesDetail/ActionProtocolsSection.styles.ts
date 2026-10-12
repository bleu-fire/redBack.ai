import { StyleSheet } from 'react-native';
import { Colors, Palette, Spacing, Radii, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  actionsProtocolCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
    padding: Spacing.md + 2,
    gap: Spacing.md,
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  actionsHeader: {
    gap: 2,
  },
  actionsEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10.5,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1.2,
  },
  actionsTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 17.5,
    color: Palette.ink,
    letterSpacing: -0.3,
  },

  // 3-Way Action Tab Selector
  actionsTabRow: {
    flexDirection: 'row',
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: Colors.borderLine,
    padding: 2.5,
    borderRadius: Radii.pill,
    gap: 3,
    alignItems: 'center',
  },
  actionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 5.5,
    paddingHorizontal: 4,
    borderRadius: Radii.pill,
  },
  actionTabActive: {
    backgroundColor: Palette.ink,
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabPressed: {
    opacity: 0.85,
  },
  actionTabText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.muted,
  },
  actionTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  actionBodyBlock: {
    gap: Spacing.sm,
  },

  // ================= TAB 1: ASSESSMENT =================
  assessmentCard: {
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderRadius: 16,
    padding: Spacing.md,
    gap: 8,
  },
  assessmentCardDanger: {
    backgroundColor: Palette.coralSoft,
    borderColor: Palette.dangerBorder,
    borderBottomColor: '#F2A292',
  },
  assessmentCardModerate: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderBottomColor: '#FCD34D',
  },
  assessmentCardSafe: {
    backgroundColor: Palette.mossSoft,
    borderColor: '#C3E6CD',
    borderBottomColor: '#A3D9B1',
  },
  assessmentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  assessmentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  assessmentIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  assessmentIconCircleDanger: {
    backgroundColor: 'transparent',
  },
  assessmentIconCircleModerate: {
    backgroundColor: 'transparent',
  },
  assessmentIconCircleSafe: {
    backgroundColor: 'transparent',
  },
  assessmentTitleGroup: {
    flex: 1,
    gap: 1,
  },
  assessmentEyebrow: {
    fontFamily: Typography.body,
    fontSize: 9.5,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.8,
  },
  assessmentVerdictTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 14,
    color: Palette.ink,
    letterSpacing: -0.2,
  },
  assessmentScoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    borderWidth: 1,
  },
  assessmentScoreBadgeDanger: {
    backgroundColor: '#FDE8E4',
    borderColor: '#F7B5A8',
  },
  assessmentScoreBadgeModerate: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  assessmentScoreBadgeSafe: {
    backgroundColor: '#EBFBEE',
    borderColor: '#C3E6CD',
  },
  assessmentScoreBadgeText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  assessmentScoreBadgeTextDanger: {
    color: Palette.danger,
  },
  assessmentScoreBadgeTextModerate: {
    color: '#B45309',
  },
  assessmentScoreBadgeTextSafe: {
    color: Palette.moss,
  },
  assessmentExplanationText: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 19,
    fontWeight: '500',
  },

  // ================= TAB 2: SAFE REMOVAL =================
  removalFlowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  removalFlowCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    backgroundColor: 'transparent',
  },
  stepIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  stepTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 13.5,
    color: Palette.ink,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '600',
    color: Palette.muted,
    textAlign: 'center',
  },
  stepDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.borderLine,
  },

  // ================= TAB 3: BITE PROTOCOL =================
  firstAidCard: {
    backgroundColor: Palette.coralSoft,
    borderWidth: 1.5,
    borderColor: Palette.dangerBorder,
    borderBottomWidth: 3,
    borderBottomColor: '#F2A292',
    borderRadius: 14,
    padding: Spacing.md,
    gap: 6,
  },
  firstAidHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  firstAidIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  firstAidTitle: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.danger,
    letterSpacing: 0.6,
  },
  firstAidText: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 18,
    fontWeight: '600',
  },

  hotlineSection: {
    gap: 6,
  },
  hotlineHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  hotlinePrompt: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.8,
  },
  hotlineButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  hotlineCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1.5,
    minHeight: 48,
  },
  hotlineCallBtnMorocco: {
    backgroundColor: Palette.danger,
    borderColor: Palette.danger,
    borderBottomWidth: 3,
    borderBottomColor: '#B02525',
  },
  hotlineCallBtnAus: {
    backgroundColor: Palette.mossDark,
    borderColor: Palette.mossDark,
    borderBottomWidth: 3,
    borderBottomColor: '#12221C',
  },
  hotlineIconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  hotlineInfo: {
    flex: 1,
  },
  hotlineBtnLabel: {
    fontFamily: Typography.body,
    fontSize: 9.5,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  hotlineBtnNum: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
