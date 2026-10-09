import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Move,
  ShieldX,
  Bandage,
  Sparkles,
  BookOpen,
} from 'lucide-react-native';
import { Colors, Spacing, Radii, Typography, TouchTargets } from '@/constants/theme';
import { AppButton, TruncatedText } from '@/components/ui';

export default function AIResultsScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    identificationData?: string;
    speciesName?: string;
    scientificName?: string;
    confidence?: string;
    imageUri?: string;
  }>();

  const [isSaved, setIsSaved] = useState(false);
  const [selectedSubTab, setSelectedSubTab] = useState<'evidence' | 'anatomy'>('evidence');

  // Parse species info
  let speciesName = params.speciesName || 'Redback Spider';
  let scientificName = params.scientificName || 'Latrodectus hasselti';
  let confidence = params.confidence ? `${params.confidence}%` : '82%';
  let imageUri = params.imageUri;
  const isHighRisk = true; // Redback is medically significant

  if (params.identificationData) {
    try {
      const parsed = JSON.parse(params.identificationData);
      const topPrediction = parsed.data?.topPrediction || parsed.topPrediction;
      if (topPrediction) {
        speciesName = topPrediction.commonName || speciesName;
        scientificName = topPrediction.scientificName || scientificName;
        confidence = `${Math.round((topPrediction.confidence || 0.82) * 100)}%`;
      }
    } catch {
      console.warn('Failed to parse identificationData payload');
    }
  }

  const handleOpenAIChat = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/chat',
      params: {
        speciesName,
        scientificName,
      },
    } as any);
  };

  const handleToggleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsSaved(!isSaved);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 8 }]}>
      {/* 1. TOP TACTICAL HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}
          accessibilityLabel="Back"
        >
          <ArrowLeft size={20} color={Colors.inkPrimary} strokeWidth={2} />
        </Pressable>

        <Text style={styles.headerTitle}>Identification Result</Text>

        <Pressable
          onPress={handleToggleSave}
          style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}
          accessibilityLabel="Save Observation"
        >
          <Bookmark
            size={20}
            color={isSaved ? Colors.forestGreen : Colors.inkPrimary}
            fill={isSaved ? Colors.forestGreen : 'transparent'}
            strokeWidth={2}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= LAYER 1 & 2: PHOTO + CONFIDENCE BADGE ================= */}
        <View style={styles.specimenCard}>
          <Image
            source={imageUri ? { uri: imageUri } : require('@/assets/images/spider-3d.png')}
            style={styles.specimenImage}
            resizeMode="cover"
          />

          <View style={styles.specimenMetaOverlay}>
            <View style={styles.confidencePill}>
              <CheckCircle2 size={13} color={Colors.forestGreen} />
              <Text style={styles.confidenceText}>{confidence} confidence</Text>
            </View>
          </View>
        </View>

        {/* ================= LEVEL 1: SPECIMEN IDENTITY & MACRO CONFIDENCE ================= */}
        <View style={styles.speciesInfoBlock}>
          <View style={styles.levelTagRow}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>LEVEL 1 • IDENTIFICATION</Text>
            </View>
            <View style={styles.confidencePill}>
              <CheckCircle2 size={12} color={Colors.forestGreen} />
              <Text style={styles.confidenceText}>{confidence} match</Text>
            </View>
          </View>
          <Text style={styles.commonName}>{speciesName}</Text>
          <Text style={styles.scientificName}>{scientificName}</Text>
        </View>

        {/* ================= LEVEL 2: CLINICAL THREAT VERDICT (1.5-SEC TRIAGE) ================= */}
        <View style={[styles.threatBanner, isHighRisk ? styles.threatHigh : styles.threatSafe]}>
          <ShieldAlert size={20} color="#FFFFFF" strokeWidth={2.5} />
          <View style={styles.threatTextCol}>
            <View style={styles.threatLevelPill}>
              <Text style={styles.threatLevelPillText}>
                {isHighRisk ? 'LEVEL 5 HAZARD • HIGH MEDICAL RELEVANCE' : 'LEVEL 1 HAZARD • HARMLESS FIELD ALLY'}
              </Text>
            </View>
            <Text style={styles.threatSubtitle}>
              {isHighRisk
                ? 'Neurotoxic latrotoxin venom. Can cause intense muscle spasms and tachycardia. Keep safe perimeter.'
                : 'Beneficial predatory species. Completely non-venomous and harmless to humans and pets.'}
            </Text>
          </View>
        </View>

        {/* ================= LEVEL 3: IMMEDIATE FIELD ACTION (HIKER ACTION PROTOCOL) ================= */}
        <View style={styles.actionCard}>
          <View style={styles.actionHeaderRow}>
            <View style={styles.actionLevelTag}>
              <Text style={styles.actionLevelTagText}>LEVEL 3 • FIELD ACTIONS</Text>
            </View>
            <Text style={styles.actionCardTitle}>Immediate Safety Triage</Text>
          </View>
          <View style={styles.actionStepsGrid}>
            <View style={styles.actionTile}>
              <View style={styles.actionIconWrap}>
                <Move size={18} color={Colors.inkPrimary} />
              </View>
              <Text style={styles.actionTileTitle}>Keep Distance</Text>
              <Text style={styles.actionTileDesc}>Stay &gt; 1 meter away</Text>
            </View>

            <View style={styles.actionTile}>
              <View style={styles.actionIconWrap}>
                <ShieldX size={18} color={Colors.crimson} />
              </View>
              <Text style={styles.actionTileTitle}>Do Not Crush</Text>
              <Text style={styles.actionTileDesc}>Bites happen on contact</Text>
            </View>

            <View style={styles.actionTile}>
              <View style={styles.actionIconWrap}>
                <Bandage size={18} color={Colors.amber} />
              </View>
              <Text style={styles.actionTileTitle}>Bite Protocol</Text>
              <Text style={styles.actionTileDesc}>Firm pressure bandage</Text>
            </View>
          </View>

          {/* Large Crimson Emergency Action */}
          <AppButton
            title="Open Emergency First Aid Steps"
            variant="danger"
            onPress={() => router.push('/(tabs)/learn' as any)}
            style={{ width: '100%', marginTop: Spacing.xs }}
          />
        </View>

        {/* ================= LEVEL 4: REASONING & EVIDENCE (STUDENTS & TEACHERS) ================= */}
        <View style={styles.reasoningCard}>
          <View style={styles.reasoningTabs}>
            <Pressable
              onPress={() => setSelectedSubTab('evidence')}
              style={[styles.reasoningTab, selectedSubTab === 'evidence' && styles.reasoningTabActive]}
            >
              <Text
                style={[
                  styles.reasoningTabText,
                  selectedSubTab === 'evidence' && styles.reasoningTabTextActive,
                ]}
              >
                Identification Evidence
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedSubTab('anatomy')}
              style={[styles.reasoningTab, selectedSubTab === 'anatomy' && styles.reasoningTabActive]}
            >
              <Text
                style={[
                  styles.reasoningTabText,
                  selectedSubTab === 'anatomy' && styles.reasoningTabTextActive,
                ]}
              >
                Look-Alike Comparison
              </Text>
            </Pressable>
          </View>

          {selectedSubTab === 'evidence' ? (
            <View style={styles.evidenceContent}>
              <Text style={styles.evidenceEyebrow}>WHY THIS IDENTIFICATION?</Text>

              {/* Verified Traits */}
              <View style={styles.evidenceRow}>
                <CheckCircle2 size={15} color={Colors.forestGreen} />
                <Text style={styles.evidenceText}>
                  <Text style={styles.boldTrait}>Abdominal marking: </Text>
                  Distinct red/orange longitudinal stripe on dorsal surface.
                </Text>
              </View>

              <View style={styles.evidenceRow}>
                <CheckCircle2 size={15} color={Colors.forestGreen} />
                <Text style={styles.evidenceText}>
                  <Text style={styles.boldTrait}>Body structure: </Text>
                  Spherical glossy abdomen with slender front legs.
                </Text>
              </View>

              <View style={styles.evidenceRow}>
                <CheckCircle2 size={15} color={Colors.forestGreen} />
                <Text style={styles.evidenceText}>
                  <Text style={styles.boldTrait}>Posture: </Text>
                  Typical inverted cobweb-dweller suspension.
                </Text>
              </View>

              {/* Uncertainties Box with Progressive Disclosure */}
              <View style={styles.uncertainBox}>
                <HelpCircle size={14} color={Colors.amber} />
                <TruncatedText
                  numberOfLines={2}
                  style={styles.uncertainBoxText}
                  expandLabel="more context"
                  collapseLabel="less"
                >
                  Confidence would increase with a side-angle view of the leg articulation and macro spinneret structure.
                </TruncatedText>
              </View>
            </View>
          ) : (
            <View style={styles.comparisonContent}>
              <Text style={styles.evidenceEyebrow}>DISTINGUISHING LOOK-ALIKES</Text>

              <View style={styles.vsRow}>
                <View style={styles.vsCol}>
                  <Text style={styles.vsTitle}>Redback Spider</Text>
                  <Text style={styles.vsTrait}>● Red longitudinal stripe</Text>
                  <Text style={styles.vsTrait}>● Spherical pitch-black body</Text>
                  <Text style={styles.vsTrait}>● Highly venomous</Text>
                </View>

                <View style={styles.vsDivider} />

                <View style={styles.vsCol}>
                  <Text style={styles.vsTitle}>False Widow</Text>
                  <Text style={styles.vsTrait}>● Pale beige pattern</Text>
                  <Text style={styles.vsTrait}>● Brownish-purple body</Text>
                  <Text style={styles.vsTrait}>● Mild pain only</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* ================= LAYER 6: LEARNING & FIELD JOURNAL CTAS ================= */}
        <View style={styles.bottomDeckRow}>
          <AppButton
            title="Ask Naturalist AI"
            variant="secondary"
            icon={BookOpen}
            onPress={handleOpenAIChat}
            style={{ flex: 1 }}
          />

          <AppButton
            title="Save Observation"
            variant="primary"
            icon={Sparkles}
            onPress={handleToggleSave}
            style={{ flex: 1.2 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLine,
  },
  headerBtn: {
    width: TouchTargets.iconBtn,
    height: TouchTargets.iconBtn,
    borderRadius: Radii.pill,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Typography.bodyStyle.fontSize,
    fontWeight: '800',
    color: Colors.inkPrimary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.lg,
  },

  // Specimen Photo Card
  specimenCard: {
    width: '100%',
    height: 220,
    borderRadius: Radii.xl,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
  },
  specimenImage: {
    width: '100%',
    height: '100%',
  },
  specimenMetaOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  confidencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.inkPrimary,
  },

  // Threat Level Banner
  threatBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: Spacing.md,
    borderRadius: Radii.lg,
  },
  threatHigh: {
    backgroundColor: Colors.crimson,
  },
  threatSafe: {
    backgroundColor: Colors.forestGreen,
  },
  threatTextCol: {
    flex: 1,
    gap: 2,
  },
  threatTitle: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  threatSubtitle: {
    fontSize: Typography.small.fontSize,
    color: 'rgba(255, 255, 255, 0.92)',
    lineHeight: 16,
  },

  levelTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelBadge: {
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.borderLine,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  levelBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.inkMuted,
    letterSpacing: 0.8,
  },
  threatLevelPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    marginBottom: 2,
  },
  threatLevelPillText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  actionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  actionLevelTag: {
    backgroundColor: Colors.canvas,
    borderWidth: 1,
    borderColor: Colors.borderLine,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  actionLevelTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: Colors.inkMuted,
    letterSpacing: 0.7,
  },
  commonName: {
    fontSize: Typography.h2.fontSize,
    fontWeight: '800',
    color: Colors.inkPrimary,
  },
  scientificName: {
    fontSize: Typography.bodyStyle.fontSize,
    fontStyle: 'italic',
    color: Colors.inkMuted,
  },

  // Hiker Action Card
  actionCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  actionCardTitle: {
    fontSize: Typography.bodyStyle.fontSize,
    fontWeight: '800',
    color: Colors.inkPrimary,
  },
  actionStepsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionTile: {
    flex: 1,
    backgroundColor: Colors.canvas,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.borderLine,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  actionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTileTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.inkPrimary,
    textAlign: 'center',
  },
  actionTileDesc: {
    fontSize: 9.5,
    color: Colors.inkMuted,
    textAlign: 'center',
  },

  // Reasoning Card
  reasoningCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
    overflow: 'hidden',
  },
  reasoningTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLine,
    backgroundColor: Colors.canvas,
  },
  reasoningTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reasoningTabActive: {
    backgroundColor: Colors.card,
    borderBottomWidth: 2,
    borderBottomColor: Colors.forestGreen,
  },
  reasoningTabText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.inkMuted,
  },
  reasoningTabTextActive: {
    color: Colors.forestGreen,
  },
  evidenceContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  evidenceEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.inkMuted,
    letterSpacing: 1,
  },
  evidenceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  evidenceText: {
    flex: 1,
    fontSize: 13,
    color: Colors.inkPrimary,
    lineHeight: 18,
  },
  boldTrait: {
    fontWeight: '700',
  },
  uncertainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.amberSoft,
    padding: 10,
    borderRadius: Radii.md,
    marginTop: 4,
  },
  uncertainBoxText: {
    flex: 1,
    fontSize: 12,
    color: '#92400E',
  },

  // Look-Alike Comparison
  comparisonContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  vsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  vsCol: {
    flex: 1,
    gap: 6,
  },
  vsTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: Colors.inkPrimary,
  },
  vsTrait: {
    fontSize: 12,
    color: Colors.inkMuted,
    lineHeight: 16,
  },
  vsDivider: {
    width: 1,
    backgroundColor: Colors.borderLine,
  },

  // Bottom Buttons
  bottomDeckRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
});
