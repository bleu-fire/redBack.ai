import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Palette, Spacing, Typography } from '@/constants/theme';
import { HeroCard } from "@/components/ui/HeroCard";
import { StatCounter } from "@/components/ui/StatCounter";
import { FeaturedSpeciesCard } from "@/components/ui/FeaturedSpeciesCard";
import { Topbar } from "@/components/ui";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Topbar pfp={require("@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg")} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Explorer Greeting from Master UI Sheet (Screen 3) */}
        <View style={styles.greetingSection}>
          <Text style={styles.headline}>Good morning,{"\n"}Explorer.</Text>
        </View>

        {/* 1. Hero Discovery Card (Screen 3 Master UI Sheet) */}
        <HeroCard variant="discovery" />

        {/* 2. 3-Column Field Metrics Card */}
        <StatCounter
          stats={[
            { count: '2,847', label: 'Spiders identified' },
            { count: '156', label: 'Species' },
            { count: '12', label: 'Habitats' },
          ]}
        />

        {/* 3. Featured Species Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured species</Text>
          <Pressable onPress={() => router.push('/(tabs)/explore' as any)}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <FeaturedSpeciesCard
          id="redback-spider"
          name="Redback spider"
          scientificName="Latrodectus hasselti"
          status="Venomous"
          image={require('@/assets/images/spider-3d.png')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.lg,
  },
  greetingSection: {
    marginTop: Spacing.xs,
  },
  headline: {
    fontFamily: Typography.display,
    fontSize: 28,
    fontWeight: "800",
    color: Palette.ink,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
    marginBottom: -Spacing.xs,
  },
  sectionTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
  },
  seeAll: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.muted,
  },
});
