import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, X, AlertCircle } from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { SpeciesGridCard } from '@/components/ui';
import { SPECIES_CATALOG, SpeciesDetail } from '@/data/speciesData';
import { fetchAllSpecies } from '@/data/api/logic';
import { getFullImageUrl } from '@/data/api/api';

type FilterCategory =
  | 'All'
  | 'Morocco'
  | 'Australia'
  | 'Venomous'
  | 'Harmless'
  | 'Jumping'
  | 'Orb-weaver'
  | 'Funnel-web';

const FILTER_CHIPS: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'All' },
  { label: 'Morocco', value: 'Morocco' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Venomous', value: 'Venomous' },
  { label: 'Harmless', value: 'Harmless' },
  { label: 'Jumping', value: 'Jumping' },
  { label: 'Orb-weavers', value: 'Orb-weaver' },
  { label: 'Funnel-webs', value: 'Funnel-web' },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [refreshing, setRefreshing] = useState(false);
  const [speciesList, setSpeciesList] = useState<SpeciesDetail[]>(SPECIES_CATALOG);
  const [isLiveSynced, setIsLiveSynced] = useState(false);

  // Sync with live backend catalog if accessible
  const loadSpeciesFromBackend = useCallback(async () => {
    try {
      const response = await fetchAllSpecies();
      if (response && response.data && response.data.length > 0) {
        // Merge backend data with rich local catalog
        const merged: SpeciesDetail[] = SPECIES_CATALOG.map((localItem) => {
          const matched = response.data.find(
            (bItem) =>
              bItem.scientificName.toLowerCase() === localItem.scientificName.toLowerCase() ||
              bItem.commonName.toLowerCase() === localItem.name.toLowerCase()
          );
          if (matched && matched.imageUrls && matched.imageUrls.length > 0) {
            return {
              ...localItem,
              serverImage: matched.imageUrls[0],
            };
          }
          return localItem;
        });
        setSpeciesList(merged);
        setIsLiveSynced(true);
      }
    } catch {
      // Graceful offline fallback to rich local catalog
      setIsLiveSynced(false);
    }
  }, []);

  useEffect(() => {
    loadSpeciesFromBackend();
  }, [loadSpeciesFromBackend]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSpeciesFromBackend();
    setRefreshing(false);
  };

  // Filtered and searched species
  const filteredSpecies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return speciesList.filter((spider) => {
      // Category match
      let matchesCategory = true;
      if (selectedCategory === 'Morocco') {
        matchesCategory = spider.region === 'Morocco';
      } else if (selectedCategory === 'Australia') {
        matchesCategory = spider.region === 'Australia';
      } else if (selectedCategory === 'Venomous') {
        matchesCategory = spider.toxicityLevel === 'deadly' || spider.toxicityLevel === 'danger';
      } else if (selectedCategory === 'Harmless') {
        matchesCategory = spider.toxicityLevel === 'harmless' || spider.toxicityLevel === 'mild';
      } else if (selectedCategory === 'Jumping') {
        matchesCategory = spider.category === 'Jumping' || spider.family === 'Salticidae';
      } else if (selectedCategory === 'Orb-weaver') {
        matchesCategory = spider.category === 'Orb-weaver' || spider.family === 'Araneidae';
      } else if (selectedCategory === 'Funnel-web') {
        matchesCategory = spider.category === 'Funnel-web' || spider.family.includes('Macrothel') || spider.family.includes('Atrac');
      }

      if (!matchesCategory) return false;

      // Query match
      if (!q) return true;

      const nameMatch = spider.name.toLowerCase().includes(q);
      const arabicMatch = spider.arabicName ? spider.arabicName.includes(q) : false;
      const scientificMatch = spider.scientificName.toLowerCase().includes(q);
      const familyMatch = spider.family.toLowerCase().includes(q);
      const regionMatch = spider.region.toLowerCase().includes(q);
      const descriptionMatch = spider.description.toLowerCase().includes(q);

      return nameMatch || arabicMatch || scientificMatch || familyMatch || regionMatch || descriptionMatch;
    });
  }, [speciesList, searchQuery, selectedCategory]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Palette.moss}
            colors={[Palette.coral, Palette.moss]}
          />
        }
      >
        {/* 1. Naturalist Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.eyebrow}>FIELD BESTIARY</Text>
            <Text style={styles.title}>Arachnid Explorer</Text>
            <Text style={styles.subtitle}>
              Verified morphological database & look-alike triage
            </Text>
          </View>
          {isLiveSynced && (
            <View style={styles.syncedPill}>
              <View style={styles.syncedDot} />
              <Text style={styles.syncedText}>Live Atlas</Text>
            </View>
          )}
        </View>

        {/* 2. Regional Discovery Progress Card (Adventure Naturalist progression) */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeaderRow}>
            <View style={styles.progressTitleGroup}>
              <Text style={styles.progressEyebrow}>EXPEDITION PROGRESS</Text>
              <Text style={styles.progressTitle}>Species Catalogued</Text>
            </View>
            <View style={styles.progressScorePill}>
              <Text style={styles.progressScoreText}>18 / {speciesList.length}</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.round((18 / Math.max(speciesList.length, 1)) * 100)}%` },
              ]}
            />
          </View>
          <View style={styles.progressFooterRow}>
            <Text style={styles.progressFooterText}>
              {Math.round((18 / Math.max(speciesList.length, 1)) * 100)}% of regional species verified
            </Text>
            <Text style={styles.progressRegionTag}>Morocco & Australia</Text>
          </View>
        </View>

        {/* 3. Look-Alike Comparison Banner (Screen 7 prompt alignment) */}
        <Pressable
          onPress={() => router.push('/species/latrodectus-tredecimguttatus' as any)}
          style={({ pressed }) => [styles.compareBanner, pressed && styles.cardPressed]}
        >
          <View style={styles.compareBannerLeft}>
            <View style={styles.compareBadge}>
              <Text style={styles.compareBadgeText}>TACTICAL TRIAGE</Text>
            </View>
            <Text style={styles.compareTitle}>Compare Look-Alike Pairs</Text>
            <Text style={styles.compareSubtitle}>
              Learn how to distinguish dangerous Redbacks from harmless False Widows.
            </Text>
          </View>
          <View style={styles.compareArrowCircle}>
            <Text style={styles.compareArrowText}>→</Text>
          </View>
        </Pressable>

        {/* 4. Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color={Palette.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search common name, taxa, venom level..."
            placeholderTextColor={Palette.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <X size={16} color={Palette.muted} />
            </Pressable>
          )}
        </View>

        {/* 5. Horizontal Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {FILTER_CHIPS.map((chip) => {
            const isSelected = selectedCategory === chip.value;
            return (
              <Pressable
                key={chip.value}
                onPress={() => setSelectedCategory(chip.value)}
                style={[
                  styles.chip,
                  isSelected && styles.chipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
                  ]}
                >
                  {chip.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* 6. Results Counter & Reset Action */}
        <View style={styles.resultsBar}>
          <Text style={styles.resultsCount}>
            Showing {filteredSpecies.length} of {speciesList.length} species
          </Text>
          {(searchQuery.length > 0 || selectedCategory !== 'All') && (
            <Pressable
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={styles.resetFiltersBtn}
            >
              <Text style={styles.resetFiltersText}>Reset filters</Text>
            </Pressable>
          )}
        </View>

        {/* 7. 2-Column Species Grid or Empty State */}
        {filteredSpecies.length > 0 ? (
          <View style={styles.grid}>
            {filteredSpecies.map((spider) => {
              // Priority: serverImage URL if available, else localImageFallback
              const imageUrl = spider.serverImage
                ? getFullImageUrl(spider.serverImage)
                : null;
              const finalImage = imageUrl || spider.localImageFallback;

              return (
                <SpeciesGridCard
                  key={spider.id}
                  id={spider.id}
                  name={spider.name}
                  arabicName={spider.arabicName}
                  scientificName={spider.scientificName}
                  badgeText={spider.badgeText}
                  badgeType={spider.badgeType}
                  region={spider.region}
                  image={finalImage}
                />
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <AlertCircle size={28} color={Palette.muted} />
            </View>
            <Text style={styles.emptyTitle}>No matching species found</Text>
            <Text style={styles.emptyMessage}>
              We couldn’t find any spiders matching &ldquo;{searchQuery}&rdquo;. Try searching for
              &ldquo;black widow&rdquo;, &ldquo;huntsman&rdquo;, or filter by &ldquo;Morocco&rdquo;.
            </Text>
            <Pressable
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={styles.clearSearchBtn}
            >
              <Text style={styles.clearSearchBtnText}>Clear all filters</Text>
            </Pressable>
          </View>
        )}
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
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  headerTextGroup: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  eyebrow: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.moss,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
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
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: Palette.paper,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    borderRadius: Radii.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTitleGroup: {
    gap: 2,
  },
  progressEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '700',
    color: Palette.muted,
    letterSpacing: 0.8,
  },
  progressTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '700',
    color: Palette.ink,
  },
  progressScorePill: {
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  progressScoreText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.moss,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: Radii.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Palette.moss,
    borderRadius: Radii.pill,
  },
  progressFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressFooterText: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
    fontWeight: '600',
  },
  progressRegionTag: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.ink,
    fontWeight: '700',
  },
  compareBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#213E34',
    borderRadius: Radii.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderBottomWidth: 3,
    borderBottomColor: '#172C25',
    padding: Spacing.md,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  compareBannerLeft: {
    flex: 1,
    paddingRight: Spacing.sm,
    gap: 4,
  },
  compareBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  compareBadgeText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  compareTitle: {
    fontFamily: Typography.display,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  compareSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
  },
  compareArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Palette.moss,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareArrowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  syncedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  syncedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.moss,
  },
  syncedText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.moss,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    height: 46,
    marginTop: Spacing.xs,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.ink,
    height: '100%',
  },
  clearBtn: {
    padding: Spacing.xs,
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radii.pill,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  chipSelected: {
    backgroundColor: Palette.moss,
    borderColor: Palette.moss,
  },
  chipText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.muted,
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  resultsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  resultsCount: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
    fontWeight: '600',
  },
  resetFiltersBtn: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  resetFiltersText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.coral,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: Spacing.md,
    marginTop: Spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Palette.line,
    marginTop: Spacing.sm,
  },
  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Palette.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '700',
    color: Palette.ink,
    marginBottom: 6,
  },
  emptyMessage: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: Spacing.lg,
  },
  clearSearchBtn: {
    backgroundColor: Palette.moss,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: Radii.pill,
  },
  clearSearchBtnText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
