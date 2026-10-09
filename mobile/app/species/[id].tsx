import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Share2,
  Eye,
  Ruler,
  Clock,
  Bug,
  Bot,
  PhoneCall,
  CheckCircle2,
  HeartPulse,
  Trees,
  Compass,
  Moon,
  Sun,
  ShieldAlert,
  ShieldCheck,
  PawPrint,
  Box,
  Layers,
  TreePine,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { TruncatedText } from '@/components/ui';
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

type ScaleBenchmark = 'coin' | 'cap' | 'thumb';
type ActionProtocol = 'threat' | 'relocate' | 'emergency';

export default function SpeciesDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Interactive benchmark & action path states
  const [activeBenchmark, setActiveBenchmark] = useState<ScaleBenchmark>('coin');
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

  const handleBenchmarkSelect = (b: ScaleBenchmark) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveBenchmark(b);
  };

  const handleActionSelect = (a: ActionProtocol) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveAction(a);
  };

  const handleCallEmergency = (phone: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${phone.replace(/[\s-]/g, '')}`);
  };

  // Threat severity styling
  const isHighDanger = threat.score >= 4;
  const isMediumDanger = threat.score >= 2 && threat.score <= 3;

  let gaugeAccentColor = Palette.moss;
  if (isHighDanger) gaugeAccentColor = Palette.danger;
  else if (isMediumDanger) gaugeAccentColor = Palette.gold;

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
        {/* --- 1. Specimen Card with White Outline (Reference Design) --- */}
        <View style={styles.heroCard}>
          <Image
            source={imageSource}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['rgba(0, 0, 0, 0.45)', 'transparent', 'rgba(15, 23, 20, 0.90)']}
            locations={[0, 0.35, 1]}
            style={styles.heroGradient}
          >
            {/* Top Navigation Row */}
            <View style={styles.heroNavRow}>
              <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [
                  styles.navGhostBtn,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2.4} />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.navGhostBtn,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Share specimen"
              >
                <Share2 size={20} color="#FFFFFF" strokeWidth={2.2} />
              </Pressable>
            </View>
          </LinearGradient>
        </View>

        {/* --- 2. Specimen Identity & Nomenclature --- */}
        <View style={styles.identitySection}>
          <Text style={styles.commonName}>{species.name.replace(/\s*\([\u0600-\u06FF\s\/\-]+\)/g, '').trim()}</Text>
          <Text style={styles.scientificName}>{species.scientificName}</Text>
        </View>

        {/* --- 2B. Minimalist Ghost Icon Metrics (Card-Free / Circle-Free) --- */}
        <View style={styles.metricsGhostStrip}>
          {/* 1. Size Metric */}
          <View style={styles.metricGhostItem}>
            <View style={styles.metricIconWrap}>
              <Ruler size={20} color={Palette.moss} strokeWidth={2.2} />
            </View>
            <Text style={styles.metricGhostLabel}>SIZE</Text>
            <Text style={styles.metricGhostVal} numberOfLines={1}>
              {sizeScale.bodyMm}–{sizeScale.legSpanMm} mm
            </Text>
          </View>

          {/* 2. Habitat Metric */}
          <View style={styles.metricGhostItem}>
            <View style={styles.metricIconWrap}>
              <Trees size={20} color={Palette.moss} strokeWidth={2.2} />
            </View>
            <Text style={styles.metricGhostLabel}>HABITAT</Text>
            <Text style={styles.metricGhostVal} numberOfLines={1}>
              {species.habitat.split(',')[0]}
            </Text>
          </View>

          {/* 3. Activity Metric */}
          <View style={styles.metricGhostItem}>
            <View style={styles.metricIconWrap}>
              {species.activity?.toLowerCase().includes('diurnal') ? (
                <Sun size={20} color={Palette.gold} strokeWidth={2.2} />
              ) : (
                <Moon size={20} color={Palette.moss} strokeWidth={2.2} />
              )}
            </View>
            <Text style={styles.metricGhostLabel}>ACTIVITY</Text>
            <Text style={styles.metricGhostVal} numberOfLines={1}>
              {species.activity || 'Nocturnal'}
            </Text>
          </View>

          {/* 4. Region Metric */}
          <View style={styles.metricGhostItem}>
            <View style={styles.metricIconWrap}>
              <Compass size={20} color={Palette.moss} strokeWidth={2.2} />
            </View>
            <Text style={styles.metricGhostLabel}>REGION</Text>
            <Text style={styles.metricGhostVal} numberOfLines={1}>
              {species.region}
            </Text>
          </View>
        </View>

        {/* --- 3. GHOST CLINICAL DANGER DIAGNOSTIC (Card-Free / Borderless) --- */}
        <View style={styles.clinicalDiagnosticCard}>
          <View style={styles.clinicalHeader}>
            <View style={styles.clinicalHeaderLeft}>
              <Text style={styles.clinicalCardEyebrow}>CLINICAL THREAT METER</Text>
              <Text style={styles.clinicalCardTitle}>{threat.levelTitle}</Text>
            </View>

            <View
              style={[
                styles.clinicalScoreBadge,
                { backgroundColor: isHighDanger ? Palette.coralSoft : Palette.mossSoft },
              ]}
            >
              <Text
                style={[
                  styles.clinicalScoreBadgeText,
                  { color: gaugeAccentColor },
                ]}
              >
                LEVEL {threat.score} / 5
              </Text>
            </View>
          </View>

          {/* 6-Segment Visual Danger Gauge */}
          <View style={styles.gaugeBarRow}>
            {[0, 1, 2, 3, 4, 5].map((level) => {
              const isFilled = level <= threat.score;
              let segColor = '#EAE6DE';
              if (isFilled) {
                if (level >= 4) segColor = Palette.danger;
                else if (level >= 2) segColor = Palette.gold;
                else segColor = Palette.moss;
              }

              return (
                <View
                  key={level}
                  style={[
                    styles.gaugeSegment,
                    { backgroundColor: segColor },
                    level === threat.score && styles.gaugeSegmentCurrent,
                  ]}
                />
              );
            })}
          </View>

          {/* 3-Column Ghost Diagnostic Trio (Pure Floating Icons, No Cards, No Circles) */}
          <View style={styles.compactTrioRow}>
            {/* 1. Human Risk */}
            <View style={styles.compactTrioCol}>
              <View style={styles.compactTrioIconWrap}>
                <HeartPulse size={20} color={isHighDanger ? Palette.danger : Palette.moss} strokeWidth={2.2} />
              </View>
              <Text style={styles.compactTrioLabel}>HUMAN</Text>
              <Text
                style={[styles.compactTrioVal, isHighDanger && { color: Palette.danger }]}
                numberOfLines={1}
              >
                {isHighDanger ? 'High Hazard' : isMediumDanger ? 'Caution' : 'Low Risk'}
              </Text>
            </View>

            {/* 2. Pet Risk */}
            <View style={styles.compactTrioCol}>
              <View style={styles.compactTrioIconWrap}>
                <PawPrint
                  size={20}
                  color={
                    threat.petRisk?.toLowerCase().includes('deadly') ||
                    threat.petRisk?.toLowerCase().includes('severe')
                      ? Palette.danger
                      : Palette.moss
                  }
                  strokeWidth={2.2}
                />
              </View>
              <Text style={styles.compactTrioLabel}>PETS</Text>
              <Text
                style={[
                  styles.compactTrioVal,
                  (threat.petRisk?.toLowerCase().includes('deadly') ||
                    threat.petRisk?.toLowerCase().includes('severe')) && {
                    color: Palette.danger,
                  },
                ]}
                numberOfLines={1}
              >
                {threat.petRisk?.toLowerCase().includes('deadly') ||
                threat.petRisk?.toLowerCase().includes('severe')
                  ? 'High Risk'
                  : 'Safe / Mild'}
              </Text>
            </View>

            {/* 3. Timeline */}
            <View style={styles.compactTrioCol}>
              <View style={styles.compactTrioIconWrap}>
                <Clock size={20} color={Palette.ink} strokeWidth={2.2} />
              </View>
              <Text style={styles.compactTrioLabel}>TIMELINE</Text>
              <Text style={styles.compactTrioVal} numberOfLines={1}>
                {threat.symptomTimeline?.toLowerCase().includes('1-3')
                  ? '1–3h Peak'
                  : threat.symptomTimeline?.toLowerCase().includes('rapid')
                  ? 'Rapid'
                  : 'Mild'}
              </Text>
            </View>
          </View>

          {/* Progressive Disclosure Action: Disclose deep clinical text on tap */}
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              setShowClinicalDetails(!showClinicalDetails);
            }}
            style={({ pressed }) => [styles.clinicalDisclosureBtn, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={showClinicalDetails ? 'Hide clinical analysis' : 'View full clinical analysis'}
          >
            <Text style={styles.clinicalDisclosureText}>
              {showClinicalDetails ? 'Hide clinical analysis' : 'View full clinical analysis'}
            </Text>
            {showClinicalDetails ? (
              <ChevronUp size={14} color={Palette.muted} />
            ) : (
              <ChevronDown size={14} color={Palette.muted} />
            )}
          </Pressable>

          {/* Deep Details Drawer (Progressive Disclosure) */}
          {showClinicalDetails && (
            <View style={styles.clinicalDetailsDrawer}>
              <Text style={styles.clinicalSummary}>{threat.summary}</Text>
              <View style={styles.drawerDetailRow}>
                <Text style={styles.drawerDetailLabel}>Clinical pathology:</Text>
                <Text style={styles.drawerDetailText}>{threat.humanRisk}</Text>
              </View>
              <View style={styles.drawerDetailRow}>
                <Text style={styles.drawerDetailLabel}>Veterinary impact:</Text>
                <Text style={styles.drawerDetailText}>{threat.petRisk}</Text>
              </View>
              <View style={styles.drawerDetailRow}>
                <Text style={styles.drawerDetailLabel}>Symptom timeline:</Text>
                <Text style={styles.drawerDetailText}>{threat.symptomTimeline}</Text>
              </View>
            </View>
          )}
        </View>

        {/* --- 4. THE INTERACTIVE "REAL-LIFE SIZE SCALE" (Benchmark Simulator) --- */}
        <View style={styles.sizeScaleCard}>
          <View style={styles.sizeScaleHeader}>
            <View>
              <Text style={styles.sizeScaleEyebrow}>REAL-LIFE SCALE</Text>
              <Text style={styles.sizeScaleTitle}>Size in Real Life</Text>
            </View>
            <View style={styles.sizeScalePill}>
              <Ruler size={12} color={Palette.ink} />
              <Text style={styles.sizeScalePillText}>
                {sizeScale.bodyMm} mm body • {sizeScale.legSpanMm} mm span
              </Text>
            </View>
          </View>

          {/* Interactive Benchmark Selector Buttons */}
          <View style={styles.benchmarkSelectorRow}>
            <Pressable
              onPress={() => handleBenchmarkSelect('coin')}
              style={[
                styles.benchmarkBtn,
                activeBenchmark === 'coin' && styles.benchmarkBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.benchmarkBtnText,
                  activeBenchmark === 'coin' && styles.benchmarkBtnTextActive,
                ]}
              >
                1 Dirham / $1 Coin (25mm)
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleBenchmarkSelect('cap')}
              style={[
                styles.benchmarkBtn,
                activeBenchmark === 'cap' && styles.benchmarkBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.benchmarkBtnText,
                  activeBenchmark === 'cap' && styles.benchmarkBtnTextActive,
                ]}
              >
                Bottle Cap (30mm)
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleBenchmarkSelect('thumb')}
              style={[
                styles.benchmarkBtn,
                activeBenchmark === 'thumb' && styles.benchmarkBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.benchmarkBtnText,
                  activeBenchmark === 'thumb' && styles.benchmarkBtnTextActive,
                ]}
              >
                Human Thumb (55mm)
              </Text>
            </Pressable>
          </View>

          {/* Visual Scale Canvas */}
          <View style={styles.scaleCanvas}>
            <View style={styles.scaleObjectWrap}>
              {activeBenchmark === 'coin' && (
                <View style={styles.coinCircle}>
                  <Text style={styles.coinText}>1 DH</Text>
                  <Text style={styles.coinSubText}>25 mm</Text>
                </View>
              )}

              {activeBenchmark === 'cap' && (
                <View style={styles.capCircle}>
                  <Text style={styles.capText}>CAP</Text>
                  <Text style={styles.capSubText}>30 mm</Text>
                </View>
              )}

              {activeBenchmark === 'thumb' && (
                <View style={styles.thumbPill}>
                  <Text style={styles.thumbText}>THUMB</Text>
                  <Text style={styles.thumbSubText}>55 mm</Text>
                </View>
              )}
            </View>

            {/* Spider Visual Footprint */}
            <View style={styles.scaleSpiderWrap}>
              <View
                style={[
                  styles.scaleSpiderSilhouette,
                  {
                    width: Math.min(Math.max(sizeScale.legSpanMm * 1.8, 32), 120),
                    height: Math.min(Math.max(sizeScale.legSpanMm * 1.8, 32), 120),
                  },
                ]}
              >
                <Bug size={Math.min(Math.max(sizeScale.legSpanMm * 1.2, 22), 80)} color="#FFFFFF" />
              </View>
              <Text style={styles.scaleSpiderLabel}>
                {species.name.split(' ')[0]} ({sizeScale.legSpanMm} mm)
              </Text>
            </View>
          </View>

          <Text style={styles.scaleComparisonText}>
            {sizeScale.comparisonText}
          </Text>
        </View>

        {/* --- 5. THE 3 INSTANT ACTION PROTOCOLS (Solving Real Human Urgency) --- */}
        <View style={styles.actionsProtocolCard}>
          <Text style={styles.actionsEyebrow}>ACTION PROTOCOL</Text>
          <Text style={styles.actionsTitle}>What should you do right now?</Text>

          {/* 3-Way Action Tab Selector */}
          <View style={styles.actionsTabRow}>
            <Pressable
              onPress={() => handleActionSelect('threat')}
              style={[
                styles.actionTab,
                activeAction === 'threat' && styles.actionTabActive,
              ]}
            >
              <Text
                style={[
                  styles.actionTabText,
                  activeAction === 'threat' && styles.actionTabTextActive,
                ]}
              >
                Is It Safe?
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleActionSelect('relocate')}
              style={[
                styles.actionTab,
                activeAction === 'relocate' && styles.actionTabActive,
              ]}
            >
              <Text
                style={[
                  styles.actionTabText,
                  activeAction === 'relocate' && styles.actionTabTextActive,
                ]}
              >
                Safe Removal
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleActionSelect('emergency')}
              style={[
                styles.actionTab,
                activeAction === 'emergency' && styles.actionTabActive,
              ]}
            >
              <Text
                style={[
                  styles.actionTabText,
                  activeAction === 'emergency' && styles.actionTabTextActive,
                ]}
              >
                Bite Protocol
              </Text>
            </Pressable>
          </View>

          {/* Tab 1: Is It Safe (Household Threat Assessment) */}
          {activeAction === 'threat' && (
            <View style={styles.actionBodyBlock}>
              <View style={styles.actionVerdictRow}>
                <View
                  style={[
                    styles.actionVerdictPill,
                    isHighDanger
                      ? styles.actionVerdictPillDanger
                      : styles.actionVerdictPillSafe,
                  ]}
                >
                  {isHighDanger ? (
                    <ShieldAlert size={14} color={Palette.danger} strokeWidth={2.4} />
                  ) : (
                    <ShieldCheck size={14} color={Palette.moss} strokeWidth={2.4} />
                  )}
                  <Text
                    style={[
                      styles.actionVerdictPillText,
                      isHighDanger
                        ? styles.actionVerdictPillTextDanger
                        : styles.actionVerdictPillTextSafe,
                    ]}
                  >
                    {isHighDanger
                      ? 'MEDICALLY SIGNIFICANT'
                      : isMediumDanger
                      ? 'MODERATE HAZARD'
                      : 'HARMLESS ALLY'}
                  </Text>
                </View>
              </View>

              <Text style={styles.actionExplanationText}>
                {threat.humanRisk}
              </Text>

              <View style={styles.actionMetaContextRow}>
                <Trees size={13} color={Palette.muted} />
                <Text style={styles.actionSecondaryText}>
                  Habitat Context: {species.habitat}
                </Text>
              </View>
            </View>
          )}

          {/* Tab 2: Safe Removal (Ghost / Circle-Free Action Stepper) */}
          {activeAction === 'relocate' && (
            <View style={styles.actionBodyBlock}>
              {/* 3-Step Ghost Action Stepper */}
              <View style={styles.removalFlowRow}>
                {/* Step 1: Cover */}
                <View style={styles.removalFlowCol}>
                  <View style={styles.removalIconWrap}>
                    <Box size={24} color={Palette.moss} strokeWidth={2.2} />
                  </View>
                  <Text style={styles.removalTileTitle}>1. Cover</Text>
                  <Text style={styles.removalTileSub}>Jar or tub</Text>
                </View>

                {/* Step 2: Slide */}
                <View style={styles.removalFlowCol}>
                  <View style={styles.removalIconWrap}>
                    <Layers size={24} color={Palette.moss} strokeWidth={2.2} />
                  </View>
                  <Text style={styles.removalTileTitle}>2. Slide</Text>
                  <Text style={styles.removalTileSub}>Stiff card</Text>
                </View>

                {/* Step 3: Release */}
                <View style={styles.removalFlowCol}>
                  <View style={styles.removalIconWrap}>
                    <TreePine size={24} color={Palette.moss} strokeWidth={2.2} />
                  </View>
                  <Text style={styles.removalTileTitle}>3. Release</Text>
                  <Text style={styles.removalTileSub}>Outdoors</Text>
                </View>
              </View>

              {/* Zero Contact Safety Tip */}
              <View style={styles.removalTipBar}>
                <Info size={14} color={Palette.moss} strokeWidth={2} />
                <Text style={styles.removalTipText}>
                  Zero skin contact: Keep hands behind the cardboard barrier.
                </Text>
              </View>
            </View>
          )}

          {/* Tab 3: Bite Protocol & Direct Hotlines */}
          {activeAction === 'emergency' && (
            <View style={styles.actionBodyBlock}>
              <View style={styles.firstAidBox}>
                <View style={styles.firstAidHeaderRow}>
                  <ShieldAlert size={16} color={Palette.danger} strokeWidth={2.2} />
                  <Text style={styles.firstAidTitle}>Immediate Action Rule</Text>
                </View>
                <Text style={styles.firstAidText}>{threat.immediateAction}</Text>
              </View>

              <Text style={styles.hotlinePrompt}>
                Call 24/7 Verified Emergency Poison Center:
              </Text>

              <View style={styles.hotlineButtonsRow}>
                <Pressable
                  onPress={() => handleCallEmergency('0537-68-64-64')}
                  style={styles.hotlineCallBtn}
                >
                  <PhoneCall size={16} color="#FFFFFF" />
                  <View>
                    <Text style={styles.hotlineBtnLabel}>Morocco (CAPM)</Text>
                    <Text style={styles.hotlineBtnNum}>0537-68-64-64</Text>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => handleCallEmergency('13 11 26')}
                  style={[styles.hotlineCallBtn, styles.hotlineCallBtnAus]}
                >
                  <PhoneCall size={16} color="#FFFFFF" />
                  <View>
                    <Text style={styles.hotlineBtnLabel}>Australia Poisons</Text>
                    <Text style={styles.hotlineBtnNum}>13 11 26</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        {/* --- 6. Morphological Markers & Eye Pattern --- */}
        <View style={styles.fieldIdentityCard}>
          <Text style={styles.fieldEyebrow}>FIELD IDENTIFICATION</Text>
          <Text style={styles.fieldTitle}>Diagnostic Morphological Markers</Text>

          <View style={styles.eyePatternBox}>
            <View style={styles.eyePatternHeader}>
              <Eye size={16} color={Palette.ink} />
              <Text style={styles.eyePatternTitle}>Eye Arrangement</Text>
            </View>
            <Text style={styles.eyePatternDesc}>
              {species.morphology.eyePattern}
            </Text>
          </View>

          <View style={styles.keyFeaturesList}>
            {species.morphology.keyFeatures.map((feat, idx) => (
              <View key={idx} style={styles.featureItemRow}>
                <CheckCircle2 size={16} color={Palette.moss} style={{ marginTop: 2 }} />
                <Text style={styles.featureItemText}>{feat}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* --- 7. Look-Alike Distinction Card (Students & Field Scientists) --- */}
        {species.confusionWith && species.confusionWith.length > 0 && (
          <View style={styles.lookAlikeCard}>
            <Text style={styles.lookAlikeEyebrow}>FIELD COMPARISON</Text>
            <Text style={styles.lookAlikeTitle}>Easily Confused With</Text>
            <Text style={styles.lookAlikeDesc}>
              Common false IDs: {species.confusionWith.join(', ')}.
            </Text>
            <View style={styles.lookAlikeTipBox}>
              <Text style={styles.lookAlikeTipHeading}>Key Differentiator</Text>
              <Text style={styles.lookAlikeTipBody}>
                {species.morphology.keyFeatures[0] || 'Inspect abdominal color markers and leg articulation angles.'}
              </Text>
            </View>
          </View>
        )}

        {/* --- 8. Ask AI Naturalist Floating Trigger --- */}
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push({
              pathname: '/chat',
              params: {
                speciesName: species.name,
                scientificName: species.scientificName,
              },
            } as any);
          }}
          style={({ pressed }) => [styles.askAiBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={`Ask AI about ${species.name}`}
        >
          <Bot size={20} color="#FFFFFF" />
          <Text style={styles.askAiBtnText}>
            Ask AI Naturalist about {species.name.split(' ')[0]}
          </Text>
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
  scrollContent: {
    gap: Spacing.lg,
  },

  // Top Navigation Header
  // 1. Specimen Hero Card with White Outline (Matching Reference Card)
  heroCard: {
    marginHorizontal: Spacing.lg,
    height: 350,
    borderRadius: 26,
    borderWidth: 0,
    overflow: 'hidden',
    backgroundColor: '#0F1714',
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  heroNavRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navGhostBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  specimenImage: {
    width: '100%',
    height: '100%',
  },

  // 2. Identity Section
  identitySection: {
    paddingHorizontal: Spacing.lg,
    gap: 4,
  },
  commonName: {
    fontFamily: Typography.displayBold,
    fontSize: 28,
    color: Palette.ink,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  scientificName: {
    fontFamily: Typography.displayItalic,
    fontSize: 15,
    color: Palette.muted,
  },

  // 3. Clinical Danger Diagnostic Card (Ghost Style - No Border Lines)
  clinicalDiagnosticCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  clinicalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  clinicalHeaderLeft: {
    flex: 1,
    gap: 2,
  },
  clinicalCardEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  clinicalCardTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 16,
    color: Palette.ink,
    letterSpacing: -0.2,
  },
  clinicalScoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    borderWidth: 0,
  },
  clinicalScoreBadgeText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  gaugeBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 8,
  },
  gaugeSegment: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  gaugeSegmentCurrent: {
    transform: [{ scaleY: 1.25 }],
  },
  clinicalSummary: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 19,
  },
  compactTrioRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 8,
    marginTop: 2,
  },
  compactTrioCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  compactTrioIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  compactTrioLabel: {
    fontFamily: Typography.body,
    fontSize: 9.5,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  compactTrioVal: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.ink,
    textAlign: 'center',
  },
  clinicalDisclosureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderRadius: Radii.pill,
    borderWidth: 0,
    marginTop: 4,
  },
  clinicalDisclosureText: {
    fontFamily: Typography.body,
    fontSize: 11.5,
    fontWeight: '700',
    color: Palette.ink,
  },
  clinicalDetailsDrawer: {
    backgroundColor: Palette.canvas,
    borderRadius: 14,
    padding: Spacing.md,
    gap: 10,
    marginTop: 2,
    borderWidth: 0,
  },
  drawerDetailRow: {
    gap: 2,
  },
  drawerDetailLabel: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.muted,
  },
  drawerDetailText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.ink,
    lineHeight: 17,
  },

  // 4. Interactive Size Scale Card
  sizeScaleCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  sizeScaleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  sizeScaleEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  sizeScaleTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '800',
    color: Palette.ink,
  },
  sizeScalePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F3EFE6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  sizeScalePillText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.ink,
  },
  benchmarkSelectorRow: {
    gap: 6,
  },
  benchmarkBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Radii.md,
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  benchmarkBtnActive: {
    borderColor: Palette.moss,
    backgroundColor: Palette.mossSoft,
  },
  benchmarkBtnText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: Palette.ink,
  },
  benchmarkBtnTextActive: {
    color: Palette.moss,
    fontWeight: '800',
  },
  scaleCanvas: {
    height: 140,
    backgroundColor: '#16231E', // Dark natural stone slab
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.md,
  },
  scaleObjectWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#D4AF37', // Gold coin rim
    backgroundColor: '#38321C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '800',
    color: '#E8CA65',
  },
  coinSubText: {
    fontSize: 9,
    color: '#E8CA65',
    fontWeight: '600',
  },
  capCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: '#192C3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capText: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '800',
    color: '#82B1FF',
  },
  capSubText: {
    fontSize: 9,
    color: '#82B1FF',
    fontWeight: '600',
  },
  thumbPill: {
    width: 50,
    height: 90,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E0A899',
    backgroundColor: '#4A2A22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbText: {
    fontFamily: Typography.display,
    fontSize: 11,
    fontWeight: '800',
    color: '#F4CBC1',
  },
  thumbSubText: {
    fontSize: 9,
    color: '#F4CBC1',
    fontWeight: '600',
  },
  scaleSpiderWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  scaleSpiderSilhouette: {
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleSpiderLabel: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: '#D2EED8',
  },
  scaleComparisonText: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 18,
  },

  // 5. Action Protocols Section
  actionsProtocolCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  actionsEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  actionsTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '800',
    color: Palette.ink,
    marginTop: -4,
  },
  actionsTabRow: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: Palette.canvas,
    padding: 4,
    borderRadius: Radii.pill,
  },
  actionTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTabActive: {
    backgroundColor: Palette.ink,
  },
  actionTabText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.muted,
  },
  actionTabTextActive: {
    color: '#FFFFFF',
  },
  actionBodyBlock: {
    gap: Spacing.sm,
  },
  actionVerdictRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionVerdictPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  actionVerdictPillDanger: {
    backgroundColor: Palette.coralSoft,
  },
  actionVerdictPillSafe: {
    backgroundColor: Palette.mossSoft,
  },
  actionVerdictPillText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  actionVerdictPillTextDanger: {
    color: Palette.danger,
  },
  actionVerdictPillTextSafe: {
    color: Palette.moss,
  },
  actionExplanationText: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 19,
    fontWeight: '600',
  },
  actionMetaContextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  actionSecondaryText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
    lineHeight: 17,
  },
  removalFlowRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 8,
    marginTop: 4,
  },
  removalFlowCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  removalIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  removalTileTitle: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '800',
    color: Palette.ink,
  },
  removalTileSub: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '600',
    color: Palette.muted,
    textAlign: 'center',
  },
  removalTipBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Palette.canvas,
    borderWidth: 0,
    borderRadius: Radii.md,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  removalTipText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 11.5,
    color: Palette.muted,
    fontWeight: '600',
  },
  firstAidBox: {
    backgroundColor: '#FFF7F5',
    borderWidth: 0,
    borderRadius: Radii.md,
    padding: Spacing.sm + 2,
    gap: 6,
  },
  firstAidHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  firstAidTitle: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '800',
    color: Palette.danger,
  },
  firstAidText: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 18,
  },
  hotlinePrompt: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.muted,
    marginTop: 4,
  },
  hotlineButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  hotlineCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Palette.danger,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Radii.md,
  },
  hotlineCallBtnAus: {
    backgroundColor: '#1E352C',
  },
  hotlineBtnLabel: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  hotlineBtnNum: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // 6. Field Morphology
  fieldIdentityCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  fieldEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  fieldTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '800',
    color: Palette.ink,
  },
  eyePatternBox: {
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: 10,
    gap: 4,
  },
  eyePatternHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eyePatternTitle: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '800',
    color: Palette.ink,
  },
  eyePatternDesc: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.muted,
  },
  keyFeaturesList: {
    gap: 8,
    marginTop: 4,
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureItemText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 18,
  },

  // 7. Ask AI Naturalist Button
  askAiBtn: {
    marginHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.moss,
    borderWidth: 0,
    borderBottomWidth: 0,
    paddingVertical: 14,
    borderRadius: Radii.pill,
    minHeight: 50,
  },
  askAiBtnText: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // 2B. Minimalist Ghost Icon Metrics (Card-Free / Circle-Free)
  metricsGhostStrip: {
    marginHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 2,
    gap: 8,
  },
  metricGhostItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  metricIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  metricGhostLabel: {
    fontFamily: Typography.body,
    fontSize: 9.5,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  metricGhostVal: {
    fontFamily: Typography.display,
    fontSize: 11.5,
    fontWeight: '700',
    color: Palette.ink,
    textAlign: 'center',
  },

  // 7. Look-Alike Card
  lookAlikeCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  lookAlikeEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  lookAlikeTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '800',
    color: Palette.ink,
  },
  lookAlikeDesc: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    lineHeight: 18,
  },
  lookAlikeTipBox: {
    backgroundColor: Palette.canvas,
    borderWidth: 0,
    borderRadius: Radii.md,
    padding: 10,
    marginTop: 6,
    gap: 2,
  },
  lookAlikeTipHeading: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.moss,
  },
  lookAlikeTipBody: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 17,
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
