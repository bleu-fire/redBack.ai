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
import * as Haptics from 'expo-haptics';
import {
  ChevronRight,
  Lock,
  MapPin,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { Topbar } from '@/components/ui';
import { HeroCard } from '@/components/ui/HeroCard';
import { useStore, StoreState } from '@/store/stores';
import { SPECIES_CATALOG } from '@/data/speciesData';
import { getFullImageUrl } from '@/data/api/api';

function getSeasonalBadgeStyle(badgeText?: string) {
  if (badgeText === 'Deadly' || badgeText === 'Venomous') {
    return { bg: '#FEECE9', color: '#D9383A' };
  }
  if (badgeText === 'Danger') {
    return { bg: '#EAF7EE', color: '#28813C' };
  }
  if (badgeText === 'Protected' || badgeText === 'Rare') {
    return { bg: '#FEF3C7', color: '#B45309' };
  }
  return { bg: '#EAF7EE', color: '#28813C' };
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const user = useStore((state: StoreState) => state.user);
  const firstName = user?.name ? user.name.trim().split(' ')[0] : 'Explorer';

  // Curated seasonal active species
  const seasonalSpecies = SPECIES_CATALOG.slice(0, 5);

  // Sample discovered preview species for the SpiderDex tracker
  const discoveredPreview = SPECIES_CATALOG.slice(0, 4);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Topbar pfp={require('@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- 1. Field Researcher Header --- */}
        <View style={styles.headerBlock}>
          <Text style={styles.greetingTitle}>
            Good morning, <Text style={styles.greetingName}>{firstName}</Text>.
          </Text>
        </View>

        {/* --- 2. Hero Discovery Card (Camera Scanner Primary Trigger) --- */}
        <HeroCard variant="discovery" />

        {/* --- 3. SpiderDex Field Collection Progress Card --- */}
        <Pressable
          onPress={() => router.push('/(tabs)/explore' as any)}
          style={({ pressed }) => [styles.dexCard, pressed && styles.cardPressed]}
          accessibilityRole="button"
          accessibilityLabel="Open SpiderDex"
        >
          <View style={styles.dexCardHeader}>
            <View>
              <Text style={styles.dexCardEyebrow}>FIELD JOURNAL</Text>
              <Text style={styles.dexCardTitle}>SpiderDex Collection</Text>
            </View>
            <View style={styles.dexPercentPill}>
              <Text style={styles.dexPercentText}>25% Logged</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.dexProgressBarBg}>
            <View style={[styles.dexProgressBarFill, { width: '25%' }]} />
          </View>

          {/* Specimen Avatars Shelf */}
          <View style={styles.dexShelfRow}>
            <View style={styles.dexAvatarsGroup}>
              {discoveredPreview.map((item, idx) => {
                const imgUrl = getFullImageUrl(item.serverImage);
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.dexAvatarWrap,
                      { marginLeft: idx === 0 ? 0 : -10 },
                    ]}
                  >
                    <Image
                      source={imgUrl ? { uri: imgUrl } : item.localImageFallback}
                      style={styles.dexAvatarImg}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}

              {/* Mystery Locked Slots */}
              <View style={[styles.dexAvatarWrap, styles.dexLockedAvatar, { marginLeft: -10 }]}>
                <Lock size={12} color={Palette.muted} />
              </View>
              <View style={[styles.dexAvatarWrap, styles.dexLockedAvatar, { marginLeft: -10 }]}>
                <Lock size={12} color={Palette.muted} />
              </View>
            </View>

            <View style={styles.dexActionHint}>
              <Text style={styles.dexActionText}>View Catalog</Text>
              <ChevronRight size={14} color={Palette.ink} />
            </View>
          </View>
        </Pressable>



        {/* --- 5. Active This Season --- */}
        <View style={styles.seasonalSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active This Season</Text>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/(tabs)/explore' as any);
              }}
              style={styles.seeAllBtn}
              accessibilityRole="button"
              accessibilityLabel="See all active seasonal species"
            >
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={13} color={Palette.muted} strokeWidth={2.2} />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.seasonalScroll}
          >
            {seasonalSpecies.map((sp) => {
              const imgUrl = getFullImageUrl(sp.serverImage);
              const badgeStyle = getSeasonalBadgeStyle(sp.badgeText);

              return (
                <Pressable
                  key={sp.id}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.push(`/species/${sp.id}` as any);
                  }}
                  style={({ pressed }) => [
                    styles.seasonalCard,
                    pressed && styles.cardPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`${sp.name}, ${sp.scientificName}`}
                >
                  <Image
                    source={imgUrl ? { uri: imgUrl } : sp.localImageFallback}
                    style={styles.seasonalCardImg}
                    resizeMode="cover"
                  />

                  <View style={styles.seasonalCardBody}>
                    <View style={styles.seasonalBadgeRow}>
                      <View style={styles.regionTag}>
                        <MapPin size={11} color={Palette.muted} />
                        <Text style={styles.regionTagText}>{sp.region}</Text>
                      </View>
                      <View
                        style={[
                          styles.toxPill,
                          { backgroundColor: badgeStyle.bg },
                        ]}
                      >
                        <Text
                          style={[
                            styles.toxPillText,
                            { color: badgeStyle.color },
                          ]}
                        >
                          {sp.badgeText}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.seasonalCardName} numberOfLines={1}>
                      {sp.name}
                    </Text>
                    <Text
                      style={styles.seasonalCardSciName}
                      numberOfLines={1}
                    >
                      {sp.scientificName}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
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
    paddingBottom: Spacing.xxxl + 20,
    gap: Spacing.lg,
  },

  // 1. Header & Metrics Bar
  headerBlock: {
    gap: 6,
    marginTop: Spacing.xs,
  },
  greetingTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 26,
    color: Palette.ink,
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  greetingName: {
    color: Palette.coral,
  },

  // 2. SpiderDex Tracker Card
  dexCard: {
    backgroundColor: Palette.paper,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  dexCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dexCardEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  dexCardTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 16,
    color: Palette.ink,
  },
  dexPercentPill: {
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  dexPercentText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.moss,
  },
  dexProgressBarBg: {
    height: 6,
    backgroundColor: '#F0ECE4',
    borderRadius: 3,
    overflow: 'hidden',
  },
  dexProgressBarFill: {
    height: '100%',
    backgroundColor: Palette.moss,
    borderRadius: 3,
  },
  dexShelfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dexAvatarsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dexAvatarWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: Palette.paper,
    overflow: 'hidden',
    backgroundColor: Palette.surfaceSubtle,
  },
  dexAvatarImg: {
    width: '100%',
    height: '100%',
  },
  dexLockedAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAE6DE',
  },
  dexActionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dexActionText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },





  // 5. Seasonal Biodiversity Radar
  seasonalSection: {
    gap: Spacing.sm + 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 22,
    color: Palette.ink,
    letterSpacing: -0.3,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
  },
  seeAllText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.muted,
  },
  seasonalScroll: {
    gap: 12,
    paddingRight: Spacing.md,
  },
  seasonalCard: {
    width: 172,
    backgroundColor: Palette.paper,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    overflow: 'hidden',
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  seasonalCardImg: {
    width: '100%',
    height: 122,
    backgroundColor: Palette.surfaceSubtle,
  },
  seasonalCardBody: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 3,
  },
  seasonalBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  regionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  regionTagText: {
    fontFamily: Typography.body,
    fontSize: 11.5,
    color: Palette.muted,
    fontWeight: '500',
  },
  toxPill: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  toxPillText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  seasonalCardName: {
    fontFamily: Typography.displayBold,
    fontSize: 15.5,
    color: Palette.ink,
    letterSpacing: -0.2,
  },
  seasonalCardSciName: {
    fontFamily: Typography.displayItalic,
    fontSize: 12,
    color: Palette.muted,
  },



  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
});
