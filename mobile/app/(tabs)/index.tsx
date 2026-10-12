import React from 'react';
import {
  View,
  Text,
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
import { Palette } from '@/constants/theme';
import { Topbar } from '@/components/ui';
import { HeroCard } from '@/components/ui/HeroCard';
import { useStore, StoreState } from '@/store/stores';
import { SPECIES_CATALOG } from '@/data/speciesData';
import { getFullImageUrl } from '@/data/api/api';
import { getSeasonalBadgeStyle } from '@/components/home/homeUtils';
import { styles } from '@/components/home/home.styles';

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
