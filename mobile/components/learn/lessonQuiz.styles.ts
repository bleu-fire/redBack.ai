import { StyleSheet } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  // Results Page Tactile Card Style
  quizSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xxl,
    borderWidth: 1.5,
    borderColor: '#E4DDD3',
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.lg,
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  quizSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  quizSectionTitle: {
    fontFamily: Typography.display,
    fontSize: 16.5,
    fontWeight: '800',
    color: Palette.ink,
  },
  quizSectionSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.muted,
  },
  quizCard: {
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F3EFE6',
  },
  questionText: {
    fontFamily: Typography.display,
    fontSize: 14.5,
    fontWeight: '700',
    color: Palette.ink,
    lineHeight: 20,
  },
  optionsList: {
    gap: 6,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  optionSelected: {
    borderColor: Palette.moss,
    backgroundColor: Palette.mossSoft,
  },
  optionCorrect: {
    borderColor: Palette.moss,
    backgroundColor: Palette.mossSoft,
  },
  optionWrong: {
    borderColor: Palette.danger,
    backgroundColor: Palette.coralSoft,
  },
  letterPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontFamily: Typography.body,
    fontSize: 10.5,
    fontWeight: '700',
    color: Palette.ink,
  },
  optionText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
  },
  optionTextCorrect: {
    color: Palette.moss,
    fontWeight: '700',
  },
  optionTextWrong: {
    color: Palette.danger,
    fontWeight: '700',
  },
  optIcon: {
    marginLeft: 4,
  },
  explanationBox: {
    padding: Spacing.sm,
    borderRadius: Radii.md,
  },
  explanationBoxCorrect: {
    backgroundColor: Palette.mossSoft,
  },
  explanationBoxWrong: {
    backgroundColor: Palette.coralSoft,
  },
  explanationText: {
    fontFamily: Typography.body,
    fontSize: 12,
    lineHeight: 17,
    color: Palette.ink,
  },
  claimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Palette.forestGreen,
    paddingVertical: 12,
    borderRadius: Radii.pill,
    marginTop: Spacing.xs,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderColor: '#1E6332',
    borderBottomColor: '#174E27',
  },
  claimBtnCompleted: {
    backgroundColor: Palette.mossSoft,
    borderColor: Palette.moss,
    borderBottomColor: '#B2E2BB',
  },
  claimBtnText: {
    fontFamily: Typography.body,
    fontSize: 13.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  claimBtnTextCompleted: {
    color: Palette.forestGreen,
  },
});
