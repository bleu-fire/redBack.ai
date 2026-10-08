import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  Camera,
  Compass,
  Flame,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  Lock,
  ArrowRight,
  HelpCircle,
  MapPin,
  Clock,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { Topbar } from '@/components/ui';
import { HeroCard } from '@/components/ui/HeroCard';
import { useStore, StoreState } from '@/store/stores';
import { SPECIES_CATALOG } from '@/data/speciesData';
import { getFullImageUrl } from '@/data/api/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const user = useStore((state: StoreState) => state.user);
  const firstName = user?.name ? user.name.trim().split(' ')[0] : 'Explorer';

  // Daily Challenge State
  const [dailySelected, setDailySelected] = useState<number | null>(null);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [userXp, setUserXp] = useState(320);

  const DAILY_CHALLENGE = {
    question:
      'Which medically significant spider features 13 orange-red spots and is active in Moroccan wheat fields during harvest?',
    options: [
      { text: 'Mediterranean Black Widow', correct: true },
      { text: 'Sydney Funnel-Web Spider', correct: false },
      { text: 'Moroccan Wall Jumping Spider', correct: false },
    ],
    explanation:
      'The Mediterranean Black Widow (Latrodectus tredecimguttatus) is known in Morocco as "Malmignatte", named for its 13 vivid abdominal spots.',
    xp: 25,
  };

  const handleSelectDaily = (index: number) => {
    if (dailyClaimed) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDailySelected(index);
    if (DAILY_CHALLENGE.options[index].correct) {
      setDailyClaimed(true);
      setUserXp((prev) => prev + DAILY_CHALLENGE.xp);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  // Curated seasonal active species
  const seasonalSpecies = SPECIES_CATALOG.slice(0, 5);

  // Sample discovered preview species for the SpiderDex tracker
  const discoveredPreview = SPECIES_CATALOG.slice(0, 4);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Topbar pfp={require('@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- 1. Field Researcher Header & Status Bar --- */}
        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>FIELD EXPEDITION HQ</Text>
          <Text style={styles.greetingTitle}>
            Good morning, <Text style={styles.greetingName}>{firstName}</Text>.
          </Text>

          {/* Metric Status Badges */}
          <View style={styles.statusPillsRow}>
            <View style={styles.statusPill}>
              <Compass size={13} color={Palette.moss} />
              <Text style={styles.statusPillText}>Field Observer • Lv. 2</Text>
            </View>

            <View style={[styles.statusPill, styles.streakPill]}>
              <Flame size={13} color={Palette.coral} />
              <Text style={[styles.statusPillText, { color: Palette.coral }]}>
                5d streak
              </Text>
            </View>

            <View style={[styles.statusPill, styles.xpPill]}>
              <Sparkles size={13} color={Palette.gold} />
              <Text style={[styles.statusPillText, { color: Palette.gold }]}>
                {userXp} XP
              </Text>
            </View>
          </View>
        </View>

        {/* --- 2. Hero Discovery Card (Camera Scanner Primary Trigger) --- */}
        <HeroCard variant="discovery" />

        {/* --- 3. SpiderDex Field Collection Progress Card --- */}
        <Pressable
          onPress={() => router.push('/(tabs)/explore' as any)}
          style={({ pressed }) => [styles.dexCard, pressed && styles.cardPressed]}
          accessibilityRole="button"
          accessibilityLabel="Open SpiderDex"
        >
          <View style={styles.dexCardHeader}>
            <View>
              <Text style={styles.dexCardEyebrow}>FIELD JOURNAL</Text>
              <Text style={styles.dexCardTitle}>SpiderDex Collection</Text>
            </View>
            <View style={styles.dexPercentPill}>
              <Text style={styles.dexPercentText}>25% Logged</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.dexProgressBarBg}>
            <View style={[styles.dexProgressBarFill, { width: '25%' }]} />
          </View>

          {/* Specimen Avatars Shelf */}
          <View style={styles.dexShelfRow}>
            <View style={styles.dexAvatarsGroup}>
              {discoveredPreview.map((item, idx) => {
                const imgUrl = getFullImageUrl(item.serverImage);
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.dexAvatarWrap,
                      { marginLeft: idx === 0 ? 0 : -10 },
                    ]}
                  >
                    <Image
                      source={imgUrl ? { uri: imgUrl } : item.localImageFallback}
                      style={styles.dexAvatarImg}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}

              {/* Mystery Locked Slots */}
              <View style={[styles.dexAvatarWrap, styles.dexLockedAvatar, { marginLeft: -10 }]}>
                <Lock size={12} color={Palette.muted} />
              </View>
              <View style={[styles.dexAvatarWrap, styles.dexLockedAvatar, { marginLeft: -10 }]}>
                <Lock size={12} color={Palette.muted} />
              </View>
            </View>

            <View style={styles.dexActionHint}>
              <Text style={styles.dexActionText}>View Catalog</Text>
              <ChevronRight size={14} color={Palette.ink} />
            </View>
          </View>
        </Pressable>

        {/* --- 4. Daily Field Mystery (Interactive Habit Challenge) --- */}
        <View style={styles.dailyCard}>
          <View style={styles.dailyCardHeader}>
            <View style={styles.dailyHeaderLeft}>
              <View style={styles.dailyIconBadge}>
                <HelpCircle size={15} color={Palette.ink} strokeWidth={2.5} />
              </View>
              <Text style={styles.dailyCardTitle}>Daily Mystery Challenge</Text>
            </View>
            <View style={styles.dailyRewardPill}>
              <Sparkles size={11} color={Palette.gold} />
              <Text style={styles.dailyRewardText}>+{DAILY_CHALLENGE.xp} XP</Text>
            </View>
          </View>

          <Text style={styles.dailyQuestion}>{DAILY_CHALLENGE.question}</Text>

          {/* Options List */}
          <View style={styles.dailyOptionsList}>
            {DAILY_CHALLENGE.options.map((opt, oIdx) => {
              const isSelected = dailySelected === oIdx;
              const isSubmitted = dailySelected !== null;
              const isCorrect = opt.correct;

              let btnStyle = styles.dailyOptionBtn;
              let textStyle = styles.dailyOptionText;

              if (isSubmitted) {
                if (isCorrect) {
                  btnStyle = { ...btnStyle, ...styles.dailyOptionCorrect };
                  textStyle = { ...textStyle, ...styles.dailyOptionTextCorrect };
                } else if (isSelected) {
                  btnStyle = { ...btnStyle, ...styles.dailyOptionWrong };
                  textStyle = { ...textStyle, ...styles.dailyOptionTextWrong };
                }
              }

              return (
                <Pressable
                  key={oIdx}
                  onPress={() => handleSelectDaily(oIdx)}
                  disabled={dailySubmittedLocked(dailySelected)}
                  style={btnStyle}
                >
                  <View style={styles.dailyOptionLetterPill}>
                    <Text style={styles.dailyOptionLetter}>
                      {String.fromCharCode(65 + oIdx)}
                    </Text>
                  </View>
                  <Text style={textStyle}>{opt.text}</Text>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 size={16} color={Palette.moss} />
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Explanation Banner when answered */}
          {dailySelected !== null && (
            <View
              style={[
                styles.dailyExplanationBox,
                DAILY_CHALLENGE.options[dailySelected].correct
                  ? styles.dailyExplanationSuccess
                  : styles.dailyExplanationRetry,
              ]}
            >
              <Text style={styles.dailyExplanationText}>
                {DAILY_CHALLENGE.options[dailySelected].correct ? '🎉 ' : 'ℹ️ '}
                {DAILY_CHALLENGE.explanation}
              </Text>
            </View>
          )}
        </View>

        {/* --- 5. Active This Season (Regional Biodiversity Radar) --- */}
        <View style={styles.seasonalSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>REGIONAL RADAR</Text>
              <Text style={styles.sectionTitle}>Active This Season</Text>
            </View>
            <Pressable
              onPress={() => router.push('/(tabs)/explore' as any)}
              style={styles.seeAllBtn}
            >
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={14} color={Palette.muted} />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.seasonalScroll}
          >
            {seasonalSpecies.map((sp) => {
              const imgUrl = getFullImageUrl(sp.serverImage);
              const isDanger =
                sp.badgeText === 'Deadly' || sp.badgeText === 'Venomous';

              return (
                <Pressable
                  key={sp.id}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    router.push(`/species/${sp.id}` as any);
                  }}
                  style={({ pressed }) => [
                    styles.seasonalCard,
                    pressed && styles.cardPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={sp.name}
                >
                  <Image
                    source={imgUrl ? { uri: imgUrl } : sp.localImageFallback}
                    style={styles.seasonalCardImg}
                    resizeMode="cover"
                  />

                  <View style={styles.seasonalCardBody}>
                    <View style={styles.seasonalBadgeRow}>
                      <View style={styles.regionTag}>
                        <MapPin size={10} color={Palette.muted} />
                        <Text style={styles.regionTagText}>{sp.region}</Text>
                      </View>
                      <View
                        style={[
                          styles.toxPill,
                          isDanger ? styles.toxPillDanger : styles.toxPillSafe,
                        ]}
                      >
                        <Text
                          style={[
                            styles.toxPillText,
                            isDanger
                              ? styles.toxPillTextDanger
                              : styles.toxPillTextSafe,
                          ]}
                        >
                          {sp.badgeText}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.seasonalCardName} numberOfLines={1}>
                      {sp.name}
                    </Text>
                    <Text
                      style={styles.seasonalCardSciName}
                      numberOfLines={1}
                    >
                      {sp.scientificName}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* --- 6. Emergency Offline First-Aid Protocol Bar --- */}
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push('/(tabs)/learn' as any);
          }}
          style={({ pressed }) => [
            styles.emergencyStrip,
            pressed && styles.cardPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Open Emergency First Aid Protocol"
        >
          <View style={styles.emergencyIconWrap}>
            <ShieldAlert size={20} color={Palette.danger} />
          </View>
          <View style={styles.emergencyTextCol}>
            <Text style={styles.emergencyTitle}>
              Emergency First-Aid Matrix (100% Offline)
            </Text>
            <Text style={styles.emergencySubtitle}>
              Bitten? Instant clinical protocols & 24/7 CAPM / Australia hotlines.
            </Text>
          </View>
          <ChevronRight size={18} color={Palette.danger} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

function dailySubmittedLocked(dailySelected: number | null): boolean {
  return dailySelected !== null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxxl + 20,
    gap: Spacing.lg,
  },

  // 1. Header & Metrics Bar
  headerBlock: {
    gap: 6,
    marginTop: Spacing.xs,
  },
  eyebrow: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1.2,
  },
  greetingTitle: {
    fontFamily: Typography.display,
    fontSize: 26,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  greetingName: {
    color: Palette.coral,
  },
  statusPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  streakPill: {
    borderColor: '#F9DCD6',
    backgroundColor: '#FFF7F5',
  },
  xpPill: {
    borderColor: '#FBE8C3',
    backgroundColor: '#FFFBF2',
  },
  statusPillText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },

  // 2. SpiderDex Tracker Card
  dexCard: {
    backgroundColor: Palette.paper,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  dexCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dexCardEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  dexCardTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '800',
    color: Palette.ink,
  },
  dexPercentPill: {
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  dexPercentText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.moss,
  },
  dexProgressBarBg: {
    height: 6,
    backgroundColor: '#F0ECE4',
    borderRadius: 3,
    overflow: 'hidden',
  },
  dexProgressBarFill: {
    height: '100%',
    backgroundColor: Palette.moss,
    borderRadius: 3,
  },
  dexShelfRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dexAvatarsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dexAvatarWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: Palette.paper,
    overflow: 'hidden',
    backgroundColor: Palette.surfaceSubtle,
  },
  dexAvatarImg: {
    width: '100%',
    height: '100%',
  },
  dexLockedAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAE6DE',
  },
  dexActionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dexActionText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },



  // 4. Daily Challenge Card
  dailyCard: {
    backgroundColor: Palette.paper,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  dailyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  dailyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dailyIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F3EFE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyCardTitle: {
    fontFamily: Typography.display,
    fontSize: 15,
    fontWeight: '800',
    color: Palette.ink,
  },
  dailyRewardPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: '#F9E4A9',
  },
  dailyRewardText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.gold,
  },
  dailyQuestion: {
    fontFamily: Typography.display,
    fontSize: 13.5,
    fontWeight: '700',
    color: Palette.ink,
    lineHeight: 19,
  },
  dailyOptionsList: {
    gap: 6,
  },
  dailyOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: 10,
    gap: 10,
  },
  dailyOptionCorrect: {
    borderColor: Palette.moss,
    backgroundColor: Palette.mossSoft,
  },
  dailyOptionWrong: {
    borderColor: Palette.danger,
    backgroundColor: Palette.coralSoft,
  },
  dailyOptionLetterPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EAE6DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyOptionLetter: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.ink,
  },
  dailyOptionText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
  },
  dailyOptionTextCorrect: {
    color: Palette.moss,
    fontWeight: '700',
  },
  dailyOptionTextWrong: {
    color: Palette.danger,
    fontWeight: '700',
  },
  dailyExplanationBox: {
    padding: 10,
    borderRadius: Radii.md,
    marginTop: 2,
  },
  dailyExplanationSuccess: {
    backgroundColor: Palette.mossSoft,
  },
  dailyExplanationRetry: {
    backgroundColor: Palette.coralSoft,
  },
  dailyExplanationText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.ink,
    lineHeight: 17,
  },

  // 5. Seasonal Biodiversity Radar
  seasonalSection: {
    gap: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  sectionEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '800',
    color: Palette.ink,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.muted,
  },
  seasonalScroll: {
    gap: Spacing.sm,
    paddingRight: Spacing.md,
  },
  seasonalCard: {
    width: 170,
    backgroundColor: Palette.paper,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Palette.line,
    overflow: 'hidden',
  },
  seasonalCardImg: {
    width: '100%',
    height: 110,
    backgroundColor: Palette.surfaceSubtle,
  },
  seasonalCardBody: {
    padding: 10,
    gap: 4,
  },
  seasonalBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  regionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  regionTagText: {
    fontFamily: Typography.body,
    fontSize: 10,
    color: Palette.muted,
    fontWeight: '600',
  },
  toxPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  toxPillDanger: {
    backgroundColor: Palette.coralSoft,
  },
  toxPillSafe: {
    backgroundColor: Palette.mossSoft,
  },
  toxPillText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  toxPillTextDanger: {
    color: Palette.danger,
  },
  toxPillTextSafe: {
    color: Palette.moss,
  },
  seasonalCardName: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '800',
    color: Palette.ink,
    marginTop: 2,
  },
  seasonalCardSciName: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontStyle: 'italic',
    color: Palette.muted,
  },

  // 6. Emergency Protocol Strip
  emergencyStrip: {
    backgroundColor: '#FFF7F5',
    borderWidth: 1,
    borderColor: '#F9DCD6',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Palette.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTextCol: {
    flex: 1,
    gap: 2,
  },
  emergencyTitle: {
    fontFamily: Typography.display,
    fontSize: 13,
    fontWeight: '800',
    color: Palette.danger,
  },
  emergencySubtitle: {
    fontFamily: Typography.body,
    fontSize: 11.5,
    color: '#8A483E',
    lineHeight: 16,
  },

  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
});
