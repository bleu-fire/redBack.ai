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
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Bot,
  Sparkles,
  MessageSquare,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { SafetyWarningCard, SegmentedTabs } from '@/components/ui';

export default function AIResultsScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    identificationData?: string;
    speciesName?: string;
    scientificName?: string;
    confidence?: string;
    imageUri?: string;
  }>();

  const [activeTab, setActiveTab] = useState('About');
  const [isSaved, setIsSaved] = useState(false);

  // Parse payload from upload route if present
  let speciesName = params.speciesName || 'Redback spider';
  let scientificName = params.scientificName || 'Latrodectus hasselti';
  let confidence = params.confidence ? `${params.confidence}%` : '96%';
  let imageUri = params.imageUri;

  if (params.identificationData) {
    try {
      const parsed = JSON.parse(params.identificationData);
      const topPrediction = parsed.data?.topPrediction || parsed.topPrediction;
      if (topPrediction) {
        speciesName = topPrediction.commonName || speciesName;
        scientificName = topPrediction.scientificName || scientificName;
        confidence = `${Math.round((topPrediction.confidence || 0.94) * 100)}%`;
      }
    } catch (e) {
      console.warn('Failed to parse identificationData payload');
    }
  }

  const TABS = ['About', 'Safety', 'Habitat', 'Similar'];

  const handleOpenAIChat = () => {
    router.push({
      pathname: '/chat',
      params: {
        speciesName,
        scientificName,
      },
    } as any);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 8 }]}>
      {/* 1. Header with Back Button, Ask AI, and Save Icon */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <ArrowLeft size={22} color={Palette.ink} />
        </Pressable>

        <View style={styles.headerRightActions}>
          <Pressable
            onPress={handleOpenAIChat}
            style={({ pressed }) => [styles.chatHeaderBtn, pressed && styles.pressed]}
          >
            <Bot size={17} color={Palette.moss} />
            <Text style={styles.chatHeaderBtnText}>Ask AI</Text>
          </Pressable>

          <Pressable
            onPress={() => setIsSaved(!isSaved)}
            style={styles.iconButton}
          >
            <Bookmark
              size={22}
              color={isSaved ? Palette.coral : Palette.ink}
              fill={isSaved ? Palette.coral : 'transparent'}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. Spider Photo Banner with AI Match Pill */}
        <View style={styles.imageBannerContainer}>
          <Image
            source={imageUri ? { uri: imageUri } : require('@/assets/images/spider-bg.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />

          {/* AI Match Floating Capsule Badge */}
          <View style={styles.aiMatchBadge}>
            <CheckCircle2 size={16} color="#FFFFFF" />
            <Text style={styles.aiMatchText}>AI IDENTIFICATION</Text>
            <Text style={styles.aiMatchPercent}>{confidence} match</Text>
          </View>
        </View>

        {/* 3. Species Titles & Scientific Name */}
        <View style={styles.titleSection}>
          <Text style={styles.speciesName}>{speciesName}</Text>
          <Text style={styles.scientificName}>{scientificName}</Text>

          {/* Badges Row */}
          <View style={styles.badgesRow}>
            <View style={[styles.badgePill, { backgroundColor: Palette.coralSoft }]}>
              <Text style={[styles.badgeText, { color: Palette.danger }]}>
                ● Venomous
              </Text>
            </View>

            <View style={[styles.badgePill, { backgroundColor: Palette.mossSoft }]}>
              <Text style={[styles.badgeText, { color: Palette.moss }]}>
                ● Common
              </Text>
            </View>

            <View style={[styles.badgePill, { backgroundColor: Palette.surfaceSubtle }]}>
              <Text style={[styles.badgeText, { color: Palette.muted }]}>
                ● Active at night
              </Text>
            </View>
          </View>
        </View>

        {/* 4. Reusable Safety Warning Card */}
        <SafetyWarningCard
          title="Safety warning"
          message="Redback spider bites can be serious. Avoid handling, keep your distance, and seek medical advice if bitten."
        />

        {/* 5. Reusable Segmented Tabs (About, Safety, Habitat, Similar) */}
        <SegmentedTabs
          tabs={TABS}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />

        {/* 6. Body Description Text */}
        <Text style={styles.bodyDescription}>
          The redback spider is a discreet but remarkable spider, commonly found
          around homes, gardens and outdoor structures across Australia.
        </Text>

        {/* 7. Ask AI Naturalist Card */}
        <View style={styles.aiChatCard}>
          <View style={styles.aiChatHeader}>
            <View style={styles.aiChatIconBadge}>
              <Bot size={22} color={Palette.moss} />
            </View>
            <View style={styles.aiChatInfo}>
              <View style={styles.aiChatBadgeRow}>
                <Text style={styles.aiChatTitle}>Talk with AI Naturalist</Text>
                <Sparkles size={14} color={Palette.gold} />
              </View>
              <Text style={styles.aiChatSubtitle}>
                Ask about Redback venom, safe relocation, or bite first aid.
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleOpenAIChat}
            style={({ pressed }) => [styles.aiChatCta, pressed && styles.pressed]}
          >
            <MessageSquare size={16} color="#FFFFFF" />
            <Text style={styles.aiChatCtaText}>Chat with AI Naturalist</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* 8. Bottom Fixed Action Buttons */}
      <View style={styles.bottomBar}>
        <Pressable
          onPress={() => setIsSaved(true)}
          style={[styles.saveButton, { flex: 1 }]}
        >
          <Bookmark size={17} color={Palette.ink} />
          <Text style={styles.saveButtonText} numberOfLines={1}>
            {isSaved ? 'Saved ✓' : 'Save'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleOpenAIChat}
          style={[styles.chatBottomBtn, { flex: 1.35 }]}
        >
          <Bot size={18} color="#FFFFFF" />
          <Text style={styles.chatBottomBtnText}>Talk to AI</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  iconButton: {
    padding: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  imageBannerContainer: {
    width: '100%',
    height: 220,
    borderRadius: Radii.lg,
    overflow: 'hidden',
    position: 'relative',
    marginTop: Spacing.xs,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  aiMatchBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(26, 46, 38, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
  },
  aiMatchText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  aiMatchPercent: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '600',
    color: '#E6EFEA',
    marginLeft: 4,
  },
  titleSection: {
    marginTop: Spacing.xs,
  },
  speciesName: {
    fontFamily: Typography.display,
    fontSize: 26,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
  },
  scientificName: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontStyle: 'italic',
    color: Palette.muted,
    marginTop: 2,
    marginBottom: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgePill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  badgeText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
  },
  bodyDescription: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.inkSecondary,
    lineHeight: 22,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    gap: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.xxl,
    height: 50,
  },
  saveButtonText: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.ink,
  },
  chatBottomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.coral,
    borderRadius: Radii.xxl,
    height: 50,
  },
  chatBottomBtnText: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chatHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radii.pill,
  },
  chatHeaderBtnText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.moss,
  },
  aiChatCard: {
    backgroundColor: Palette.mossSoft,
    borderRadius: Radii.lg,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#D2E2D8',
    marginTop: Spacing.xs,
  },
  aiChatHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  aiChatIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiChatInfo: {
    flex: 1,
  },
  aiChatBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  aiChatTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '800',
    color: Palette.ink,
  },
  aiChatSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.inkSecondary,
    lineHeight: 17,
  },
  aiChatCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.moss,
    paddingVertical: 12,
    borderRadius: Radii.pill,
    gap: 8,
  },
  aiChatCtaText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.88,
  },
});
