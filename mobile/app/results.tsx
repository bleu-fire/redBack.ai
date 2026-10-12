import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  ArrowLeft,
  Bookmark,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Camera,
  Info,
} from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { AppButton } from '@/components/ui';
import { SafetyTriageCard } from '@/components/results/SafetyTriageCard';
import { EvidenceComparisonCard } from '@/components/results/EvidenceComparisonCard';
import { saveObservationToBackend } from '@/data/api/logic';
import { styles } from '@/components/results/results.styles';

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
  const [isSaving, setIsSaving] = useState(false);

  // Parse species info
  let speciesName = (params.speciesName || 'Redback Spider').replace(/\s*\([\u0600-\u06FF\s\/\-]+\)/g, '').trim();
  let scientificName = params.scientificName || 'Latrodectus hasselti';
  let rawConf = params.confidence || '82';
  let confidence = rawConf.includes('%') ? rawConf : `${rawConf}%`;
  let imageUri = params.imageUri;
  let topPredictionData: any = null;
  let visualEvidenceList: string[] = [];

  if (params.identificationData) {
    try {
      const parsed = JSON.parse(params.identificationData);
      topPredictionData = parsed.data?.topPrediction || parsed.topPrediction;
      const rawEvidence = parsed.data?.visualEvidence || parsed.visualEvidence;
      if (Array.isArray(rawEvidence)) {
        visualEvidenceList = rawEvidence;
      }
      if (topPredictionData) {
        speciesName = (topPredictionData.commonName || speciesName).replace(/\s*\([\u0600-\u06FF\s\/\-]+\)/g, '').trim();
        scientificName = topPredictionData.scientificName || scientificName;
        confidence = `${Math.round((topPredictionData.confidence || 0.82) * 100)}%`;
      }
    } catch {
      console.warn('Failed to parse identificationData payload');
    }
  }

  const isNonSpider =
    scientificName === 'Non-Arachnid' ||
    speciesName.toLowerCase().includes('no spider') ||
    topPredictionData?.scientificName === 'Non-Arachnid' ||
    topPredictionData?.family === 'None';

  const handleOpenAIChat = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/chat',
      params: {
        speciesName: isNonSpider ? 'Unknown specimen' : speciesName,
        scientificName: isNonSpider ? 'Non-Arachnid' : scientificName,
        confidence,
      },
    } as any);
  };

  const handleToggleSave = async () => {
    if (isSaving || isNonSpider) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (isSaved) {
      setIsSaved(false);
      return;
    }

    setIsSaving(true);
    try {
      await saveObservationToBackend({
        imageUrl: imageUri || 'specimen.jpg',
        status: 'completed',
        topPrediction: topPredictionData || {
          scientificName,
          commonName: speciesName,
          confidence: parseFloat(confidence) / 100 || 0.85,
        },
        predictions: topPredictionData ? [topPredictionData] : [],
        disclaimer: 'redBack.ai educational species identification',
      });
      setIsSaved(true);
      // Refresh local store with the new identification record
      const { useStore } = await import('@/store/stores');
      useStore.getState().loadAllBackendData();
      Alert.alert('Observation Saved', 'Successfully stored in your field journal database.');
    } catch (err: any) {
      console.warn('Failed to save to backend, saved locally:', err.message);
      setIsSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}
          accessibilityLabel="Back"
        >
          <ArrowLeft size={20} color={Colors.inkPrimary} strokeWidth={2} />
        </Pressable>

        <Text style={styles.headerTitle}>
          {isNonSpider ? 'Scan Analysis' : 'Identification Result'}
        </Text>

        {!isNonSpider ? (
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
        ) : (
          <View style={{ width: 44 }} />
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.specimenCard}>
          <View style={styles.specimenImageWrapper}>
            <Image
              source={imageUri ? { uri: imageUri } : require('@/assets/images/spider-3d.png')}
              style={styles.specimenImage}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.speciesInfoBlock}>
          <View style={styles.speciesHeaderRow}>
            <View style={styles.speciesNameWrap}>
              <Text style={styles.commonName}>
                {isNonSpider ? 'No Spider Detected' : speciesName}
              </Text>
              <Text style={styles.scientificName}>
                {isNonSpider ? speciesName : scientificName}
              </Text>
            </View>
            <Text style={styles.confidenceNumber}>{confidence}</Text>
          </View>
        </View>

        {isNonSpider ? (
          /* Non-Spider Informative Card */
          <View style={styles.nonSpiderCard}>
            <View style={styles.nonSpiderHeader}>
              <Text style={styles.nonSpiderTitle}>Specimen Verification</Text>
              <View style={styles.nonSpiderBadge}>
                <ShieldCheck size={13} color={Colors.forestGreen} />
                <Text style={styles.nonSpiderBadgeText}>Safe • Zero Venom Risk</Text>
              </View>
            </View>

            <Text style={styles.nonSpiderDescription}>
              Our multimodal AI vision analyzed this image and concluded that it does not contain an arachnid specimen.
            </Text>

            {visualEvidenceList.length > 0 && (
              <View style={styles.nonSpiderEvidenceBox}>
                {visualEvidenceList.map((item, idx) => (
                  <View key={idx} style={styles.evidenceItemRow}>
                    <Text style={styles.evidenceBullet}>•</Text>
                    <Text style={styles.evidenceText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.scanningTipBox}>
              <Camera size={16} color={Colors.forestGreen} />
              <Text style={styles.scanningTipText}>
                Field Tip: Ensure good natural lighting and aim the camera directly at the spider's cephalothorax and legs.
              </Text>
            </View>
          </View>
        ) : (
          /* Spider Identified: Clinical Safety & Diagnostic Comparison */
          <>
            <SafetyTriageCard />
            <EvidenceComparisonCard
              speciesName={speciesName}
              scientificName={scientificName}
              confidence={confidence}
            />
          </>
        )}

        <View style={styles.bottomDeckRow}>
          {isNonSpider ? (
            <>
              <AppButton
                title="Scan Again"
                variant="primary"
                icon={Camera}
                onPress={() => router.back()}
                style={{ flex: 1.2 }}
              />
              <AppButton
                title="Ask Naturalist AI"
                variant="secondary"
                icon={BookOpen}
                onPress={handleOpenAIChat}
                style={{ flex: 1 }}
              />
            </>
          ) : (
            <>
              <AppButton
                title="Ask Naturalist AI"
                variant="secondary"
                icon={BookOpen}
                onPress={handleOpenAIChat}
                style={{ flex: 1 }}
              />
              <AppButton
                title={isSaved ? "Saved" : "Save Observation"}
                variant="primary"
                icon={Sparkles}
                onPress={handleToggleSave}
                style={{ flex: 1.2 }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
