import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

interface ExploreEmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export const ExploreEmptyState: React.FC<ExploreEmptyStateProps> = ({
  searchQuery,
  onClear,
}) => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <AlertCircle size={36} color={Palette.muted} />
      </View>
      <Text style={styles.emptyTitle}>No matching species found</Text>
      <Text style={styles.emptyMessage}>
        We couldn’t find any spiders matching &ldquo;{searchQuery}&rdquo;. Try searching for
        &ldquo;black widow&rdquo;, &ldquo;huntsman&rdquo;, or &ldquo;Morocco&rdquo;.
      </Text>
      <Pressable onPress={onClear} style={styles.clearSearchBtn}>
        <Text style={styles.clearSearchBtnText}>Clear search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Palette.line,
    marginTop: Spacing.sm,
  },
  emptyIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    backgroundColor: 'transparent',
  },
  emptyTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '700',
    color: Palette.ink,
    marginBottom: 6,
  },
  emptyMessage: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: Spacing.lg,
  },
  clearSearchBtn: {
    backgroundColor: Palette.moss,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: Radii.pill,
  },
  clearSearchBtnText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
