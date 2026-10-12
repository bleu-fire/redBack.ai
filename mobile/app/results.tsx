import React, { useState } from 'react';
import {
  View,
  Text,
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
  Sparkles,
  BookOpen,
} from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { AppButton } from '@/components/ui';
import { SafetyTriageCard } from '@/components/results/SafetyTriageCard';
import { EvidenceComparisonCard } from '@/components/results/EvidenceComparisonCard';
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
        <SafetyTriageCard
          onOpenFirstAid={() => router.push('/(tabs)/learn' as any)}
        />

        {/* ================= EVIDENCE & LOOK-ALIKE COMPARISON ================= */}
        <EvidenceComparisonCard
          speciesName={speciesName}
          scientificName={scientificName}
          confidence={confidence}
        />

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
