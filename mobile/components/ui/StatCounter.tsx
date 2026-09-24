import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Palette, Radii, Typography } from '@/constants/theme';
import { Binoculars, Globe, Leaf } from 'lucide-react-native';

export interface StatItem {
  count: string | number;
  label: string;
  icon?: React.ReactNode;
}

export interface StatCounterProps {
  stats?: StatItem[];
  style?: ViewStyle;
}

export function StatCounter({
  stats = [
    {
      count: '2,847',
      label: 'Spiders identified',
      icon: <Binoculars size={18} color={Palette.muted} />,
    },
    {
      count: '156',
      label: 'Species in catalog',
      icon: <Leaf size={18} color={Palette.muted} />,
    },
    {
      count: '12',
      label: 'Habitats explored',
      icon: <Globe size={18} color={Palette.muted} />,
    },
  ],
  style,
}: StatCounterProps) {
  return (
    <View style={[styles.container, style]}>
      {stats.map((item, index) => (
        <React.Fragment key={index}>
          <View style={styles.column}>
            {item.icon ? <View style={styles.iconBox}>{item.icon}</View> : null}
            <Text style={styles.count}>{item.count}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </View>
          {index < stats.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.paper,
    borderRadius: Radii.xl,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Palette.line,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    marginBottom: 6,
  },
  count: {
    fontFamily: Typography.body,
    fontSize: 20,
    fontWeight: '900',
    color: Palette.ink,
  },
  label: {
    fontFamily: Typography.body,
    fontSize: 10,
    color: Palette.muted,
    marginTop: 3,
    textAlign: 'center',
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 38,
    backgroundColor: Palette.line,
  },
});
