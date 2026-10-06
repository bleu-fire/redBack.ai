import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Palette, Typography } from '@/constants/theme';

interface SegmentedTabsProps {
  tabs: string[];
  activeTab: string;
  onSelect: (tab: string) => void;
}

/**
 * Reusable Segmented Underlined Tabs
 * Flat tabs with coral indicator line on active tab
 */
export function SegmentedTabs({
  tabs,
  activeTab,
  onSelect,
}: SegmentedTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Pressable
            key={tab}
            onPress={() => onSelect(tab)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Palette.coral,
  },
  text: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Palette.muted,
  },
  textActive: {
    color: Palette.ink,
    fontWeight: '700',
  },
});

export default SegmentedTabs;
