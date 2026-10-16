import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, Linking, ActivityIndicator, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Spacing, Palette, Colors } from '@/constants/theme';
import {
  SpeciesDetail,
  ClinicalThreatProfile,
  SizeScaleProfile,
} from '@/data/species/types';
import {
  getClinicalThreat,
  getSizeScale,
} from '@/data/species/clinicalThreat';
import { getFullImageUrl } from '@/data/api/api';
import {
  ActionProtocol,
} from '@/components/speciesDetail/speciesDetail.types';
import { SpecimenHeroCard } from '@/components/speciesDetail/SpecimenHeroCard';
import { ClinicalThreatMeter } from '@/components/speciesDetail/ClinicalThreatMeter';
import { ActionProtocolsSection } from '@/components/speciesDetail/ActionProtocolsSection';
import { LookAlikeSection } from '@/components/speciesDetail/LookAlikeSection';
import { AskAiNaturalistButton } from '@/components/speciesDetail/AskAiNaturalistButton';
import { fetchSpeciesById, speciesDtoToSpeciesDetail } from '@/data/api/logic';
import { useStore } from '@/store/stores';
import { styles } from '@/components/speciesDetail/speciesDetail.styles';

export default function SpeciesDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const storeSpeciesList = useStore((state) => state.speciesList);

  // Interactive benchmark & action path states
  const [activeAction, setActiveAction] = useState<ActionProtocol>('threat');
  const [showClinicalDetails, setShowClinicalDetails] = useState<boolean>(false);
  const [liveSpecies, setLiveSpecies] = useState<SpeciesDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial species resolution from live store
  const storeMatch = useMemo(() => {
    if (!id) return null;
    return storeSpeciesList.find(
      (s) =>
        s.id === id ||
        s.id?.toString() === id ||
        s.scientificName?.toLowerCase() === id.toLowerCase() ||
        s.name?.toLowerCase() === id.toLowerCase()
    ) || null;
  }, [id, storeSpeciesList]);

  // Fetch fresh species data from backend by ID
  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const fetched = await fetchSpeciesById(id);
        if (fetched && isMounted) {
          const adapted = speciesDtoToSpeciesDetail(fetched);
          setLiveSpecies(adapted);
        }
      } catch (err) {
        console.warn('[SpeciesDetailsScreen] Failed fetching species details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const species = liveSpecies || storeMatch;

  // Clinical profile and size benchmark
  const threat: ClinicalThreatProfile = useMemo(
    () => (species ? getClinicalThreat(species) : ({} as any)),
    [species]
  );
  const sizeScale: SizeScaleProfile = useMemo(
    () => (species ? getSizeScale(species) : ({} as any)),
    [species]
  );

  // Image source resolution
  const imageSource = useMemo(() => {
    if (species?.serverImage) {
      const fullUrl = getFullImageUrl(species.serverImage);
      if (fullUrl) return { uri: fullUrl };
    }
    return species?.localImageFallback || require('@/assets/images/spider-3d.png');
  }, [species]);

  const handleActionSelect = (a: ActionProtocol) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveAction(a);
  };

  const handleCallEmergency = (phone: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${phone.replace(/[\s-]/g, '')}`);
  };

  if (!species) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center', paddingTop: insets.top }]}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color={Palette.forestGreen} />
            <Text style={{ marginTop: 12, color: Palette.muted, fontSize: 13, fontWeight: '500' }}>
              Loading specimen from live database...
            </Text>
          </>
        ) : (
          <View style={{ alignItems: 'center', padding: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.inkPrimary }}>
              Specimen not found
            </Text>
            <Text style={{ fontSize: 13, color: Palette.muted, marginTop: 8, textAlign: 'center' }}>
              This spider record is not present in the live database.
            </Text>
            <Pressable
              onPress={() => router.back()}
              style={{
                marginTop: 20,
                backgroundColor: Palette.forestGreen,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 14 }}>Go Back</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: (insets.top || 16) + Spacing.xs,
            paddingBottom: insets.bottom + Spacing.xxxl,
          },
        ]}
      >
        {/* Specimen Hero Image & Ghost Metrics */}
        <SpecimenHeroCard
          species={species}
          imageSource={imageSource}
          sizeScale={sizeScale}
          onBack={() => router.back()}
          onShare={() => {}}
        />

        {/* Clinical Danger Diagnostic Meter */}
        <ClinicalThreatMeter
          threat={threat}
          showClinicalDetails={showClinicalDetails}
          onToggleClinicalDetails={() => {
            Haptics.selectionAsync();
            setShowClinicalDetails(!showClinicalDetails);
          }}
        />

        {/* Action Protocols (Safe Assessment, Removal, First Aid) */}
        <ActionProtocolsSection
          species={species}
          threat={threat}
          activeAction={activeAction}
          onSelectAction={handleActionSelect}
          onCallEmergency={handleCallEmergency}
        />

        {/* Look-Alike Comparison Card */}
        <LookAlikeSection
          confusionWith={species.confusionWith}
          firstKeyFeature={species.morphology.keyFeatures[0]}
        />

        {/* Ask AI Naturalist Floating Trigger */}
        <AskAiNaturalistButton
          speciesName={species.name}
          scientificName={species.scientificName}
        />
      </ScrollView>
    </View>
  );
}
