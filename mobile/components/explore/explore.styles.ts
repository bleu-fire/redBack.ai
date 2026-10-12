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
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  headerTextGroup: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  title: {
    fontFamily: Typography.display,
    fontSize: 26,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    height: 46,
    marginTop: Spacing.xs,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.ink,
    height: '100%',
  },
  clearBtn: {
    padding: Spacing.xs,
  },
  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  resultsCount: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
    fontWeight: '600',
  },
  resetFiltersBtn: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  resetFiltersText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.coral,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: Spacing.md,
    marginTop: Spacing.xs,
  },
});
