import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, X } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { SpeciesGridCard } from '@/components/ui';
import { ExploreEmptyState } from '@/components/explore/ExploreEmptyState';
import { ActivityIndicator } from 'react-native';
import { SpeciesDetail } from '@/data/species/types';
import { fetchAllSpecies, speciesDtoToSpeciesDetail } from '@/data/api/logic';
import { getFullImageUrl } from '@/data/api/api';
import { useStore } from '@/store/stores';
import { styles } from '@/components/explore/explore.styles';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const storeSpecies = useStore((state) => state.speciesList);
  const [loading, setLoading] = useState(storeSpecies.length === 0);
  const [speciesList, setSpeciesList] = useState<SpeciesDetail[]>(storeSpecies);

  // Sync with live backend catalog
  const loadSpeciesFromBackend = useCallback(async () => {
    try {
      const response = await fetchAllSpecies();
      if (response && response.data && response.data.length > 0) {
        const liveItems: SpeciesDetail[] = response.data.map((bItem) =>
          speciesDtoToSpeciesDetail(bItem)
        );

        setSpeciesList(liveItems);
        useStore.getState().setSpeciesList(liveItems);
      }
    } catch (err) {
      console.warn('[ExploreScreen] Error fetching species from backend:', err);
    } finally {
      setLoading(false);
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

  const filteredSpecies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return speciesList;

    return speciesList.filter((spider) => {
      const nameMatch = spider.name.toLowerCase().includes(q);
      const scientificMatch = spider.scientificName.toLowerCase().includes(q);
      const familyMatch = spider.family.toLowerCase().includes(q);
      const tagMatch = spider.badgeText.toLowerCase().includes(q);
      const descMatch = spider.description.toLowerCase().includes(q);
      const habitatMatch = spider.habitat.toLowerCase().includes(q);
      return (
        nameMatch ||
        scientificMatch ||
        familyMatch ||
        tagMatch ||
        descMatch ||
        habitatMatch
      );
    });
  }, [searchQuery, speciesList]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Palette.forestGreen}
          />
        }
      >
        <View style={styles.header}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.title}>SpiderDex</Text>
            <Text style={styles.subtitle}>
              Global & Moroccan field catalog synced with AI vision
            </Text>
          </View>
        </View>

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

        {loading && speciesList.length === 0 ? (
          <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={Palette.forestGreen} />
            <Text style={{ marginTop: 12, color: Palette.muted, fontSize: 13, fontWeight: '500' }}>
              Loading field specimens from database...
            </Text>
          </View>
        ) : filteredSpecies.length > 0 ? (
          <View style={styles.grid}>
            {filteredSpecies.map((spider) => {
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
          <ExploreEmptyState
            searchQuery={searchQuery}
            onClear={() => setSearchQuery('')}
          />
        )}
      </ScrollView>
    </View>
  );
}
