import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Topbar } from '@/components/ui';
import { HeroCard } from '@/components/ui/HeroCard';
import { useStore, StoreState } from '@/store/stores';
import { styles } from '@/components/home/home.styles';
import { HomeSpiderDexCard } from '@/components/home/HomeSpiderDexCard';
import { HomeSeasonalRadar } from '@/components/home/HomeSeasonalRadar';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const user = useStore((state: StoreState) => state.user);
  const speciesList = useStore((state: StoreState) => state.speciesList);
  const identifications = useStore((state: StoreState) => state.identifications);
  const loadAllBackendData = useStore((state: StoreState) => state.loadAllBackendData);

  const firstName = user?.name ? user.name.trim().split(' ')[0] : 'Explorer';

  useEffect(() => {
    loadAllBackendData();
  }, [loadAllBackendData]);

  const activeCatalog = speciesList || [];
  const seasonalSpecies = activeCatalog.slice(0, 6);
  const discoveredPreview = activeCatalog.slice(0, 4);

  const loggedCount = identifications?.length || 0;
  const totalSpeciesCount = activeCatalog.length > 0 ? activeCatalog.length : 1;
  const progressPercent = Math.min(100, Math.round((loggedCount / totalSpeciesCount) * 100));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Topbar pfp={require('@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg')} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBlock}>
          <Text style={styles.greetingTitle}>
            Good morning, <Text style={styles.greetingName}>{firstName}</Text>.
          </Text>
        </View>

        <HeroCard variant="discovery" />

        <HomeSpiderDexCard
          progressPercent={progressPercent}
          discoveredPreview={discoveredPreview}
        />

        <HomeSeasonalRadar seasonalSpecies={seasonalSpecies} />
      </ScrollView>
    </View>
  );
}
