import React, { useState } from 'react';
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
  ArrowLeft,
  MoreHorizontal,
  Ruler,
  Clock,
  Bug,
  MapPin,
  Bot,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { SegmentedTabs, QuickFactCard } from '@/components/ui';

export default function SpeciesDetailsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Overview');

  const TABS = ['Overview', 'Identification', 'Habitat', 'Behavior'];

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 8 }]}>
      {/* 1. Header with Back Arrow and More Options */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <ArrowLeft size={22} color={Palette.ink} />
        </Pressable>

        <Pressable style={styles.iconBtn}>
          <MoreHorizontal size={22} color={Palette.ink} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. Hero Spider Image Gallery with Counter Tag (1/6) */}
        <View style={styles.galleryContainer}>
          <Image
            source={require('@/assets/images/spider-bg.png')}
            style={styles.galleryImage}
            resizeMode="cover"
          />

          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>1 / 6</Text>
          </View>
        </View>

        {/* 3. Titles & Scientific Taxonomy */}
        <View style={styles.titleSection}>
          <Text style={styles.commonName}>Redback spider</Text>
          <Text style={styles.scientificName}>Latrodectus hasselti</Text>

          {/* Badges Row */}
          <View style={styles.badgesRow}>
            <View style={[styles.badgePill, { backgroundColor: Palette.coralSoft }]}>
              <Text style={[styles.badgeText, { color: Palette.danger }]}>
                ● Venomous
              </Text>
            </View>

            <View style={[styles.badgePill, { backgroundColor: Palette.mossSoft }]}>
              <Text style={[styles.badgeText, { color: Palette.moss }]}>
                ● Common
              </Text>
            </View>

            <View style={[styles.badgePill, { backgroundColor: Palette.surfaceSubtle }]}>
              <Text style={[styles.badgeText, { color: Palette.muted }]}>
                ● Active at night
              </Text>
            </View>
          </View>
        </View>

        {/* 4. Reusable Segmented Tabs (Overview, Identification, Habitat, Behavior) */}
        <SegmentedTabs
          tabs={TABS}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />

        {/* 5. Overview Paragraph */}
        <Text style={styles.overviewText}>
          The redback spider (Latrodectus hasselti) is a widely recognized species
          native to Australia. Females are black with a distinctive red stripe on
          the abdomen.
        </Text>

        {/* 6. Quick Facts 2x2 Matrix Grid using reusable QuickFactCard */}
        <View style={styles.quickFactsGrid}>
          <QuickFactCard
            icon={<Ruler size={18} color={Palette.moss} />}
            label="Size"
            value="~ 10 mm"
          />
          <QuickFactCard
            icon={<Clock size={18} color={Palette.moss} />}
            label="Lifespan"
            value="1 – 3 years"
          />
          <QuickFactCard
            icon={<Bug size={18} color={Palette.moss} />}
            label="Diet"
            value="Small insects"
          />
          <QuickFactCard
            icon={<MapPin size={18} color={Palette.moss} />}
            label="Habitat"
            value="Urban areas"
          />
        </View>

        {/* 7. Ask AI Naturalist Action */}
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/chat',
              params: {
                speciesName: 'Redback spider',
                scientificName: 'Latrodectus hasselti',
              },
            } as any)
          }
          style={({ pressed }) => [styles.aiTalkBtn, pressed && styles.pressed]}
        >
          <Bot size={20} color="#FFFFFF" />
          <Text style={styles.aiTalkBtnText}>Ask AI Naturalist about this spider</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  iconBtn: {
    padding: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  galleryContainer: {
    width: '100%',
    height: 230,
    borderRadius: Radii.lg,
    overflow: 'hidden',
    position: 'relative',
    marginTop: Spacing.xs,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  counterBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  counterText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  titleSection: {
    marginTop: Spacing.xs,
  },
  commonName: {
    fontFamily: Typography.display,
    fontSize: 26,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
  },
  scientificName: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontStyle: 'italic',
    color: Palette.muted,
    marginTop: 2,
    marginBottom: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgePill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  badgeText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
  },
  overviewText: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.inkSecondary,
    lineHeight: 22,
  },
  quickFactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginTop: Spacing.xs,
  },
  aiTalkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Palette.moss,
    borderRadius: Radii.xxl,
    height: 52,
    marginTop: Spacing.md,
  },
  aiTalkBtnText: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.88,
  },
});
