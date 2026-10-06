import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Clock,
  Sparkles,
  ArrowRight,
  Compass,
  TreePine,
  Layers,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { StreakBadge, LessonCard } from '@/components/ui';

export default function LearnScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Header with Greeting and Reusable Streak Badge */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Good to see you,{"\n"}Explorer.
          </Text>
        </View>

        {/* 2. Today's Lesson Hero Card */}
        <Pressable
          onPress={() => router.push('/modal' as any)}
          style={styles.heroCard}
        >
          {/* 3D Spider Image in the background */}
          <Image
            source={require('@/assets/images/spider-3d.png')}
            style={styles.heroSpiderImage}
            resizeMode="contain"
          />

          <View style={styles.heroContent}>
            <Text style={styles.heroTag}>Today&apos;s lesson</Text>
            <Text style={styles.heroTitle}>Spider Anatomy</Text>
            <Text style={styles.heroSubtitle}>
              Explore the remarkable design behind their success.
            </Text>

            {/* Bottom Row with duration, XP, and circular Coral button */}
            <View style={styles.heroFooter}>
              <View style={styles.heroPillsRow}>
                <View style={styles.metaPill}>
                  <Clock size={12} color="#FFFFFF" />
                  <Text style={styles.metaPillText}>10 min</Text>
                </View>
                <View style={styles.metaPill}>
                  <Sparkles size={12} color={Palette.gold} />
                  <Text style={[styles.metaPillText, { color: Palette.goldSoft }]}>
                    +50 XP
                  </Text>
                </View>
              </View>

              <View style={styles.coralCircleButton}>
                <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </View>
          </View>
        </Pressable>

        {/* 3. Section Header: Continue Learning */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue learning</Text>
          <Pressable>
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>

        {/* 4. Reusable Lesson Cards */}
        {/* Lesson 1: Web building and silk (60% progress) */}
        <LessonCard
          title="Web building and silk"
          progress={60}
          icon={<Layers size={22} color={Palette.moss} />}
          onPress={() => router.push('/modal' as any)}
        />

        {/* Lesson 2: Spider senses (not started) */}
        <LessonCard
          title="Spider senses"
          subtitle="Not started"
          icon={<Compass size={22} color={Palette.moss} />}
          onPress={() => router.push('/modal' as any)}
        />

        {/* Lesson 3: Habitats and environments (not started) */}
        <LessonCard
          title="Habitats and environments"
          subtitle="Not started"
          icon={<TreePine size={22} color={Palette.moss} />}
          onPress={() => router.push('/modal' as any)}
        />
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
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: 26,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  heroCard: {
    backgroundColor: Palette.moss,
    borderRadius: Radii.xxl,
    padding: Spacing.lg,
    minHeight: 180,
    position: 'relative',
    overflow: 'hidden',
  },
  heroSpiderImage: {
    position: 'absolute',
    right: -20,
    bottom: -15,
    width: 170,
    height: 170,
    opacity: 0.9,
  },
  heroContent: {
    maxWidth: '75%',
  },
  heroTag: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: '#E6EFEA',
    marginBottom: 4,
  },
  heroTitle: {
    fontFamily: Typography.display,
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: '#E6EFEA',
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '133%',
  },
  heroPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  metaPillText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  coralCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
  },
  seeAllText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.muted,
  },
});
