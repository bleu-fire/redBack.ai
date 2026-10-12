import React, { useState, useMemo } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Spacing } from '@/constants/theme';
import {
  getSpeciesById,
  SPECIES_CATALOG,
  SpeciesDetail,
  getClinicalThreat,
  getSizeScale,
  ClinicalThreatProfile,
  SizeScaleProfile,
} from '@/data/speciesData';
import { getFullImageUrl } from '@/data/api/api';
import {
  ActionProtocol,
} from '@/components/speciesDetail/speciesDetail.types';
import { SpecimenHeroCard } from '@/components/speciesDetail/SpecimenHeroCard';
import { ClinicalThreatMeter } from '@/components/speciesDetail/ClinicalThreatMeter';
import { ActionProtocolsSection } from '@/components/speciesDetail/ActionProtocolsSection';
import { LookAlikeSection } from '@/components/speciesDetail/LookAlikeSection';
import { AskAiNaturalistButton } from '@/components/speciesDetail/AskAiNaturalistButton';
import { styles } from '@/components/speciesDetail/speciesDetail.styles';

export default function SpeciesDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Interactive benchmark & action path states
  const [activeAction, setActiveAction] = useState<ActionProtocol>('threat');
  const [showClinicalDetails, setShowClinicalDetails] = useState<boolean>(false);

  // Lookup species by ID, slug, or fallback to first catalog item
  const species: SpeciesDetail = useMemo(() => {
    if (id) {
      const found = getSpeciesById(id);
      if (found) return found;
    }
    return SPECIES_CATALOG[0];
  }, [id]);

  // Clinical profile and size benchmark
  const threat: ClinicalThreatProfile = useMemo(
    () => getClinicalThreat(species),
    [species]
  );
  const sizeScale: SizeScaleProfile = useMemo(
    () => getSizeScale(species),
    [species]
  );

  // Image source resolution
  const imageSource = useMemo(() => {
    if (species.serverImage) {
      const fullUrl = getFullImageUrl(species.serverImage);
      if (fullUrl) return { uri: fullUrl };
    }
    return species.localImageFallback;
  }, [species]);

  const handleActionSelect = (a: ActionProtocol) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveAction(a);
  };

  const handleCallEmergency = (phone: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${phone.replace(/[\s-]/g, '')}`);
  };

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
