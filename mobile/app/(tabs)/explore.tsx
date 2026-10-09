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
import { Search, X, AlertCircle } from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { SpeciesGridCard } from '@/components/ui';
import { SPECIES_CATALOG, SpeciesDetail } from '@/data/speciesData';
import { fetchAllSpecies } from '@/data/api/logic';
import { getFullImageUrl } from '@/data/api/api';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [speciesList, setSpeciesList] = useState<SpeciesDetail[]>(SPECIES_CATALOG);

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
      }
    } catch {
      // Graceful offline fallback to rich local catalog
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
    if (!q) return speciesList;

    return speciesList.filter((spider) => {
      const nameMatch = spider.name.toLowerCase().includes(q);
      const scientificMatch = spider.scientificName.toLowerCase().includes(q);
      const familyMatch = spider.family.toLowerCase().includes(q);
      const regionMatch = spider.region.toLowerCase().includes(q);
      const descriptionMatch = spider.description.toLowerCase().includes(q);

      return nameMatch || scientificMatch || familyMatch || regionMatch || descriptionMatch;
    });
  }, [speciesList, searchQuery]);

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
            <Text style={styles.title}>Arachnid Explorer</Text>
            <Text style={styles.subtitle}>
              Verified morphological database & look-alike triage
            </Text>
          </View>

        </View>
        {/* Search Bar */}
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

        {/* Results Counter & Reset Action */}
        <View style={styles.resultsBar}>
          <Text style={styles.resultsCount}>
            Showing {filteredSpecies.length} of {speciesList.length} species
          </Text>
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              style={styles.resetFiltersBtn}
            >
              <Text style={styles.resetFiltersText}>Reset search</Text>
            </Pressable>
          )}
        </View>

        {/* 2-Column Species Grid or Empty State */}
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
              &ldquo;black widow&rdquo;, &ldquo;huntsman&rdquo;, or &ldquo;Morocco&rdquo;.
            </Text>
            <Pressable
              onPress={() => setSearchQuery('')}
              style={styles.clearSearchBtn}
            >
              <Text style={styles.clearSearchBtnText}>Clear search</Text>
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
