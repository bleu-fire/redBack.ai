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
  let speciesName = (params.speciesName || 'Redback Spider').replace(/\s*\([\u0600-\u06FF\s\/\-]+\)/g, '').trim();
  let scientificName = params.scientificName || 'Latrodectus hasselti';
  let rawConf = params.confidence || '82';
  let confidence = rawConf.includes('%') ? rawConf : `${rawConf}%`;
  let imageUri = params.imageUri;

  if (params.identificationData) {
    try {
      const parsed = JSON.parse(params.identificationData);
      const topPrediction = parsed.data?.topPrediction || parsed.topPrediction;
      if (topPrediction) {
        speciesName = (topPrediction.commonName || speciesName).replace(/\s*\([\u0600-\u06FF\s\/\-]+\)/g, '').trim();
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
        confidence,
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
        {/* ================= LAYER 1: SPECIMEN PHOTO ================= */}
        <View style={styles.specimenCard}>
          <View style={styles.specimenImageWrapper}>
            <Image
              source={imageUri ? { uri: imageUri } : require('@/assets/images/spider-3d.png')}
              style={styles.specimenImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* ================= SPECIMEN IDENTITY ================= */}
        <View style={styles.speciesInfoBlock}>
          <View style={styles.speciesHeaderRow}>
            <View style={styles.speciesNameWrap}>
              <Text style={styles.commonName}>{speciesName}</Text>
              <Text style={styles.scientificName}>{scientificName}</Text>
            </View>
            <Text style={styles.confidenceNumber}>{confidence}</Text>
          </View>
        </View>

        {/* ================= IMMEDIATE FIELD ACTION ================= */}
        <View style={styles.actionCard}>
          <View style={styles.actionHeaderRow}>
            <Text style={styles.actionCardTitle}>Immediate Safety Triage</Text>
          </View>
          <View style={styles.actionIconsRow}>
            <View
              style={styles.actionIconWrap}
              accessibilityLabel="Keep Distance: Stay > 1 meter away"
              accessibilityRole="image"
            >
              <Move size={22} color={Colors.inkPrimary} strokeWidth={2} />
            </View>

            <View
              style={[styles.actionIconWrap, styles.actionIconWrapCrimson]}
              accessibilityLabel="Do Not Crush: Bites happen on contact"
              accessibilityRole="image"
            >
              <ShieldX size={22} color={Colors.crimson} strokeWidth={2} />
            </View>

            <View
              style={[styles.actionIconWrap, styles.actionIconWrapAmber]}
              accessibilityLabel="Bite Protocol: Firm pressure bandage"
              accessibilityRole="image"
            >
              <Bandage size={22} color={Colors.amber} strokeWidth={2} />
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
    paddingHorizontal: 10,
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
    paddingHorizontal: 10,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.lg,
  },

  // Specimen Photo Card
  specimenCard: {
    width: '100%',
    height: 240,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 10,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
  },
  specimenImageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.canvas,
  },
  specimenImage: {
    width: '100%',
    height: '100%',
  },


  speciesInfoBlock: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xxl,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
  },
  speciesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  speciesNameWrap: {
    flex: 1,
    paddingRight: Spacing.xs,
  },
  confidenceNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.forestGreen,
  },
  actionHeaderRow: {
    marginBottom: 4,
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
    borderRadius: Radii.xxl,
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
  actionIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    paddingVertical: Spacing.xs,
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconWrapCrimson: {
    backgroundColor: Colors.crimsonSoft,
  },
  actionIconWrapAmber: {
    backgroundColor: Colors.amberSoft,
  },

  // Reasoning Card
  reasoningCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xxl,
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
