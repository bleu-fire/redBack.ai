import React from 'react';
import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

interface CategoryChipsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

/**
 * Reusable Category Filter Chips
 * Horizontal scrollable chips for filtering species or topics
 */
export function CategoryChips({
  categories,
  selected,
  onSelect,
}: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isSelected = selected === category;
        return (
          <Pressable
            key={category}
            onPress={() => onSelect(category)}
            style={[styles.chip, isSelected && styles.chipActive]}
          >
            <Text style={[styles.text, isSelected && styles.textActive]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  chip: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: Palette.moss,
    borderColor: Palette.moss,
  },
  text: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.ink,
  },
  textActive: {
    color: '#FFFFFF',
  },
});

export default CategoryChips;
