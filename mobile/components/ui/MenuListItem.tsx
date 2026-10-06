import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Palette, Typography } from '@/constants/theme';

interface MenuListItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  isLast?: boolean;
}

/**
 * Reusable Menu List Item
 * Used for Profile, Settings, and Account options
 */
export function MenuListItem({
  icon,
  label,
  onPress,
  isLast = false,
}: MenuListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.item, !isLast && styles.itemBorder]}
    >
      <View style={styles.left}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <ChevronRight size={18} color={Palette.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Palette.paper,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.lineSubtle,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Palette.ink,
  },
});

export default MenuListItem;
