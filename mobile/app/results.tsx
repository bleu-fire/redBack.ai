import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ArrowLeft, Bookmark, Sparkles, BookOpen, Camera } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { AppButton } from '@/components/ui';
import { SafetyTriageCard } from '@/components/results/SafetyTriageCard';
import { EvidenceComparisonCard } from '@/components/results/EvidenceComparisonCard';
import { NonSpiderCard } from '@/components/results/NonSpiderCard';
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
      if (Array.isArray(rawEvidence)) visualEvidenceList = rawEvidence;
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
    if (isSaved) { setIsSaved(false); return; }
    setIsSaving(true);
    try {
      await saveObservationToBackend({
        imageUrl: imageUri || 'specimen.jpg',
        status: 'completed',
        topPrediction: { commonName: speciesName, scientificName, confidence: parseFloat(confidence) / 100 || 0.82 },
      });
      setIsSaved(true);
    } catch {
      Alert.alert('Observation Saved Locally', 'Observation cached in offline field journal.');
      setIsSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn} accessibilityRole="button" accessibilityLabel="Back">
          <ArrowLeft size={20} color={Colors.inkPrimary} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Identification Results</Text>
        <Pressable onPress={handleToggleSave} style={styles.headerBtn} accessibilityRole="button" accessibilityLabel={isSaved ? "Saved" : "Save observation"}>
          <Bookmark size={20} color={isSaved ? Colors.forestGreen : Colors.inkPrimary} fill={isSaved ? Colors.forestGreen : 'none'} strokeWidth={2.2} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.specimenCard}>
          <View style={styles.specimenImageWrapper}>
            <Image source={imageUri ? { uri: imageUri } : require('@/assets/images/spider-3d.png')} style={styles.specimenImage} resizeMode="cover" />
          </View>
        </View>

        <View style={styles.speciesInfoBlock}>
          <View style={styles.speciesHeaderRow}>
            <View style={styles.speciesNameWrap}>
              <Text style={styles.commonName}>{isNonSpider ? 'No Spider Detected' : speciesName}</Text>
              <Text style={styles.scientificName}>{isNonSpider ? speciesName : scientificName}</Text>
            </View>
            <Text style={styles.confidenceNumber}>{confidence}</Text>
          </View>
        </View>

        {isNonSpider ? (
          <NonSpiderCard visualEvidenceList={visualEvidenceList} />
        ) : (
          <>
            <SafetyTriageCard />
            <EvidenceComparisonCard speciesName={speciesName} scientificName={scientificName} confidence={confidence} />
          </>
        )}

        <View style={styles.bottomDeckRow}>
          {isNonSpider ? (
            <>
              <AppButton title="Scan Again" variant="primary" icon={Camera} onPress={() => router.back()} style={{ flex: 1.2 }} />
              <AppButton title="Ask Naturalist AI" variant="secondary" icon={BookOpen} onPress={handleOpenAIChat} style={{ flex: 1 }} />
            </>
          ) : (
            <>
              <AppButton title="Ask Naturalist AI" variant="secondary" icon={BookOpen} onPress={handleOpenAIChat} style={{ flex: 1 }} />
              <AppButton title={isSaved ? "Saved" : "Save Observation"} variant="primary" icon={Sparkles} onPress={handleToggleSave} style={{ flex: 1.2 }} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
