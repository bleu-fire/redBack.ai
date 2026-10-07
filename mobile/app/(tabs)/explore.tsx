import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Leaf } from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { SpeciesGridCard } from '@/components/ui';

// Simple list of spider species for the explore grid
const SPIDER_SPECIES = [
  {
    id: 'redback-spider',
    name: 'Redback spider',
    scientificName: 'Latrodectus hasselti',
    badgeText: 'Venomous',
    badgeType: 'danger' as const,
    category: 'Venomous',
    image: require('@/assets/images/spider-3d.png'),
  },
  {
    id: 'huntsman-spider',
    name: 'Huntsman spider',
    scientificName: 'Heteropoda sp.',
    badgeText: '● Common',
    badgeType: 'moss' as const,
    category: 'Common',
    image: require('@/assets/images/spider-bg.png'),
  },
  {
    id: 'jumping-spider',
    name: 'Jumping spider',
    scientificName: 'Salticidae family',
    badgeText: '● Popular',
    badgeType: 'gold' as const,
    category: 'Jumping',
    image: require('@/assets/images/spider-logo-3d.png'),
  },
  {
    id: 'garden-orb-weaver',
    name: 'Garden orb-weaver',
    scientificName: 'Araneus diadematus',
    badgeText: '● Common',
    badgeType: 'moss' as const,
    category: 'Orb-weavers',
    image: require('@/assets/images/spider-3d.png'),
  },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.title}>Explore spiders</Text>
            <Text style={styles.subtitle}>
              Meet the extraordinary species around you.
            </Text>
          </View>

          
        </View>

        {/* 2. 2-Column Species Grid */}
        <View style={styles.grid}>
          {SPIDER_SPECIES.map((spider) => (
            <SpeciesGridCard
              key={spider.id}
              id={spider.id}
              name={spider.name}
              scientificName={spider.scientificName}
              badgeText={spider.badgeText}
              badgeType={spider.badgeType}
              image={spider.image}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginTop: 4,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: Spacing.md,
  },
});
