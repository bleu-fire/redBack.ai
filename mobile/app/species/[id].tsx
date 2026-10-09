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
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Eye,
  Ruler,
  Clock,
  Bug,
  Bot,
  PhoneCall,
  CheckCircle2,
  HeartPulse,
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
          { paddingBottom: insets.bottom + Spacing.xxxl },
        ]}
      >
        {/* --- 1. Immersive Full-Bleed Specimen Hero --- */}
        <View style={styles.heroContainer}>
          <Image
            source={imageSource}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['rgba(0, 0, 0, 0.45)', 'transparent', 'rgba(15, 23, 20, 0.95)']}
            locations={[0, 0.4, 1]}
            style={styles.heroGradient}
          >
            {/* Top Navigation Row */}
            <View style={[styles.heroNavRow, { paddingTop: insets.top || 16 }]}>
              <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [
                  styles.navCircleBtn,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <ArrowLeft size={20} color="#FFFFFF" />
              </Pressable>

              <View style={styles.heroRegionBadge}>
                <Text style={styles.heroRegionText}>
                  {species.region === 'Morocco' ? '🇲🇦 Morocco' : '🇦🇺 Australia'}
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.navCircleBtn,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Share specimen"
              >
                <Share2 size={18} color="#FFFFFF" />
              </Pressable>
            </View>

            {/* Specimen Family Tag over image bottom */}
            <View style={styles.heroBottomTagRow}>
              <View style={styles.heroFamilyBadge}>
                <Text style={styles.heroFamilyText}>
                  {species.family} • {species.genus}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* --- 2. Specimen Identity & Nomenclature --- */}
        <View style={styles.identitySection}>
          <Text style={styles.commonName}>{species.name}</Text>
          {species.arabicName ? (
            <Text style={styles.arabicName}>{species.arabicName}</Text>
          ) : null}
          <Text style={styles.scientificName}>{species.scientificName}</Text>
        </View>

        {/* --- 2B. 4-Pillar Quick Field Metrics (Size, Habitat, Activity, Diet) --- */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>SIZE</Text>
            <Text style={styles.metricVal}>{sizeScale.bodyMm}–{sizeScale.legSpanMm} mm</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>HABITAT</Text>
            <Text style={styles.metricVal} numberOfLines={1}>{species.habitat.split(',')[0]}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>ACTIVITY</Text>
            <Text style={styles.metricVal}>{species.behavior?.activity || 'Nocturnal'}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>REGION</Text>
            <Text style={styles.metricVal}>{species.region}</Text>
          </View>
        </View>

        {/* --- 3. THE 0–5 CLINICAL DANGER DIAGNOSTIC (The Hero Feature) --- */}
        <View style={styles.clinicalDiagnosticCard}>
          <View style={styles.clinicalHeader}>
            <View style={styles.clinicalHeaderLeft}>
              <View
                style={[
                  styles.clinicalIconCircle,
                  { backgroundColor: gaugeAccentColor },
                ]}
              >
                {isHighDanger ? (
                  <ShieldAlert size={16} color="#FFFFFF" strokeWidth={2.5} />
                ) : isMediumDanger ? (
                  <AlertTriangle size={16} color="#FFFFFF" strokeWidth={2.5} />
                ) : (
                  <ShieldCheck size={16} color="#FFFFFF" strokeWidth={2.5} />
                )}
              </View>
              <View>
                <Text style={styles.clinicalCardEyebrow}>CLINICAL THREAT METER</Text>
                <Text style={styles.clinicalCardTitle}>{threat.levelTitle}</Text>
              </View>
            </View>

            <View
              style={[
                styles.clinicalScoreBadge,
                { borderColor: gaugeAccentColor },
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

          <TruncatedText
            style={styles.clinicalSummary}
            numberOfLines={3}
            expandLabel="Show clinical details"
            collapseLabel="Hide details"
          >
            {threat.summary}
          </TruncatedText>

          {/* Three Concrete Clinical Anchors */}
          <View style={styles.clinicalAnchorsContainer}>
            {/* 1. Human Risk */}
            <View style={styles.clinicalAnchorRow}>
              <View style={styles.clinicalAnchorIcon}>
                <HeartPulse size={15} color={Palette.ink} />
              </View>
              <View style={styles.clinicalAnchorTextCol}>
                <Text style={styles.clinicalAnchorLabel}>Human Risk</Text>
                <Text style={styles.clinicalAnchorValue}>{threat.humanRisk}</Text>
              </View>
            </View>

            {/* 2. Pet Risk */}
            <View style={styles.clinicalAnchorRow}>
              <View style={styles.clinicalAnchorIcon}>
                <Bug size={15} color={Palette.ink} />
              </View>
              <View style={styles.clinicalAnchorTextCol}>
                <Text style={styles.clinicalAnchorLabel}>Pet & Dog / Cat Safety</Text>
                <Text style={styles.clinicalAnchorValue}>{threat.petRisk}</Text>
              </View>
            </View>

            {/* 3. Symptoms Timeline */}
            <View style={styles.clinicalAnchorRow}>
              <View style={styles.clinicalAnchorIcon}>
                <Clock size={15} color={Palette.ink} />
              </View>
              <View style={styles.clinicalAnchorTextCol}>
                <Text style={styles.clinicalAnchorLabel}>Symptom Progression</Text>
                <Text style={styles.clinicalAnchorValue}>
                  {threat.symptomTimeline}
                </Text>
              </View>
            </View>
          </View>
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
              <Text style={styles.actionSecondaryText}>
                Habitat Context: {species.habitat}
              </Text>
            </View>
          )}

          {/* Tab 2: Safe Removal (The Cup & Card Technique) */}
          {activeAction === 'relocate' && (
            <View style={styles.actionBodyBlock}>
              <Text style={styles.relocationSummary}>
                {threat.relocationAdvice}
              </Text>

              <View style={styles.relocationStepsList}>
                <View style={styles.relocationStepRow}>
                  <View style={styles.stepNumCircle}>
                    <Text style={styles.stepNumText}>1</Text>
                  </View>
                  <Text style={styles.stepDescText}>
                    Place a wide, clear plastic tub or glass jar over the spider from directly above.
                  </Text>
                </View>

                <View style={styles.relocationStepRow}>
                  <View style={styles.stepNumCircle}>
                    <Text style={styles.stepNumText}>2</Text>
                  </View>
                  <Text style={styles.stepDescText}>
                    Slowly slide a stiff piece of cardboard or junk mail under the opening.
                  </Text>
                </View>

                <View style={styles.relocationStepRow}>
                  <View style={styles.stepNumCircle}>
                    <Text style={styles.stepNumText}>3</Text>
                  </View>
                  <Text style={styles.stepDescText}>
                    Carry outside and gently tilt open at the base of garden bushes, away from house entries.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Tab 3: Bite Protocol & Direct Hotlines */}
          {activeAction === 'emergency' && (
            <View style={styles.actionBodyBlock}>
              <View style={styles.firstAidBox}>
                <Text style={styles.firstAidTitle}>Immediate Action Rule</Text>
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

  // 1. Hero Specimen Image
  heroContainer: {
    width: '100%',
    height: 360,
    position: 'relative',
    backgroundColor: '#0F1714',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  heroNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  navCircleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(23, 33, 31, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroRegionBadge: {
    backgroundColor: 'rgba(23, 33, 31, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  heroRegionText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroBottomTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroFamilyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroFamilyText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: '#DCE7E1',
    letterSpacing: 0.5,
  },

  // 2. Identity Section
  identitySection: {
    paddingHorizontal: Spacing.lg,
    gap: 4,
  },
  commonName: {
    fontFamily: Typography.display,
    fontSize: 28,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  arabicName: {
    fontFamily: Typography.display,
    fontSize: 20,
    fontWeight: '700',
    color: Palette.moss,
  },
  scientificName: {
    fontFamily: Typography.body,
    fontSize: 15,
    fontStyle: 'italic',
    color: Palette.muted,
  },

  // 3. Clinical Danger Diagnostic Card
  clinicalDiagnosticCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  clinicalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  clinicalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  clinicalIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicalCardEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  clinicalCardTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.2,
  },
  clinicalScoreBadge: {
    borderWidth: 1.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
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
  clinicalAnchorsContainer: {
    gap: 10,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Palette.line,
  },
  clinicalAnchorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  clinicalAnchorIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3EFE6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  clinicalAnchorTextCol: {
    flex: 1,
    gap: 2,
  },
  clinicalAnchorLabel: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.5,
  },
  clinicalAnchorValue: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 18,
    fontWeight: '600',
  },

  // 4. Interactive Size Scale Card
  sizeScaleCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
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
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
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
  actionSecondaryText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
    lineHeight: 17,
  },
  relocationSummary: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 19,
    fontWeight: '600',
  },
  relocationStepsList: {
    gap: 8,
    marginTop: 4,
  },
  relocationStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  stepNumCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepDescText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 18,
  },
  firstAidBox: {
    backgroundColor: '#FFF7F5',
    borderWidth: 1,
    borderColor: '#F9DCD6',
    borderRadius: Radii.md,
    padding: Spacing.sm + 2,
    gap: 4,
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 3,
    borderBottomColor: Palette.mossDark,
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

  // 2B. 4-Pillar Quick Field Metrics Grid
  metricsGrid: {
    marginHorizontal: Spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Palette.paper,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    borderRadius: Radii.md,
    padding: Spacing.sm,
    gap: 2,
  },
  metricLabel: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.8,
  },
  metricVal: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '700',
    color: Palette.ink,
  },

  // 7. Look-Alike Card
  lookAlikeCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
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
    borderWidth: 1,
    borderColor: Palette.line,
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
