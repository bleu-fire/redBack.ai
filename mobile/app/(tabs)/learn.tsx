import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Clock,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  X,
  Check,
  ChevronRight,
  HelpCircle,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import {
  LEARNING_MODULES,
  LearningModule,
  ProtocolRule,
} from '@/data/learningData';

type FilterCategory = 'All' | 'Safety' | 'Morocco' | 'Anatomy' | 'Webs';

function getProtocolParts(
  item: ProtocolRule | string
): { lead: string; detail: string } {
  if (typeof item === 'object' && item && 'lead' in item) {
    return { lead: item.lead, detail: item.detail || '' };
  }
  const str = String(item).replace(/^[•\-\*]\s*/, '').trim();
  const colonIdx = str.indexOf(':');
  if (colonIdx > 0 && colonIdx < 40) {
    return {
      lead: str.slice(0, colonIdx).trim(),
      detail: str.slice(colonIdx + 1).trim(),
    };
  }
  if (/^NEVER\s+/i.test(str)) {
    const after = str.replace(/^NEVER\s+/i, '');
    const parenIdx = after.indexOf('(');
    if (parenIdx > 0) {
      return {
        lead: `Never ${after.slice(0, parenIdx).trim()}`,
        detail: after.slice(parenIdx).replace(/[\(\)]/g, '').trim(),
      };
    }
    return { lead: `Never ${after}`, detail: '' };
  }
  return { lead: str, detail: '' };
}

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [userXp, setUserXp] = useState(320);
  const [streakDays] = useState(5);

  // Quiz state for the modal
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [claimedModules, setClaimedModules] = useState<Record<string, boolean>>({});

  const featuredModule = LEARNING_MODULES.find((m) => m.isFeatured) || LEARNING_MODULES[0];

  const filteredModules = LEARNING_MODULES.filter((m) => {
    if (selectedCategory === 'All') return true;
    return m.category === selectedCategory;
  });

  const handleOpenModule = (mod: LearningModule) => {
    setActiveModule(mod);
    // Don't reset quiz answers if already answered
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setQuizSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleClaimReward = (modId: string, xpReward: number) => {
    if (!claimedModules[modId]) {
      setUserXp((prev) => prev + xpReward);
      setClaimedModules((prev) => ({ ...prev, [modId]: true }));
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Naturalist Academy Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>FIELD ACADEMY</Text>
            <Text style={styles.headerTitle}>Arachnology Path</Text>
          </View>

          <View style={styles.headerPills}>
            <View style={styles.streakPill}>
              <Text style={styles.streakText}>{streakDays}d streak</Text>
            </View>
            <View style={styles.xpPill}>
              <Text style={styles.xpText}>{userXp} XP</Text>
            </View>
          </View>
        </View>

        {/* 2. Level 1: Field Observer Progression Hero Card (Matching Design Board Screen 8) */}
        <View style={styles.levelHeroCard}>
          <View style={styles.levelHeroHeader}>
            <View style={styles.levelHeroBadge}>
              <Text style={styles.levelHeroBadgeText}>ACTIVE CURRICULUM</Text>
            </View>
            <Text style={styles.levelHeroStepCount}>3 / 5 Competencies</Text>
          </View>

          <Text style={styles.levelHeroTitle}>Level 1: Field Observer</Text>
          <Text style={styles.levelHeroDesc}>
            Learn to safely observe, compare morphological traits, and identify spiders without contact.
          </Text>

          {/* Progress Bar */}
          <View style={styles.levelProgressTrack}>
            <View style={[styles.levelProgressFill, { width: '60%' }]} />
          </View>

          <View style={styles.levelHeroFooter}>
            <Text style={styles.levelHeroFooterText}>60% Complete • Next: Photo Tips for ID</Text>
            <Pressable
              onPress={() => handleOpenModule(featuredModule)}
              style={styles.continueLevelBtn}
            >
              <Text style={styles.continueLevelBtnText}>Continue</Text>
              <ChevronRight size={14} color="#FFFFFF" strokeWidth={2.5} />
            </Pressable>
          </View>
        </View>

        {/* 3. Category Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {[
            { label: 'All Modules', value: 'All' as FilterCategory },
            { label: 'First Aid & Safety', value: 'Safety' as FilterCategory },
            { label: 'Morocco Biomes', value: 'Morocco' as FilterCategory },
            { label: 'Anatomy', value: 'Anatomy' as FilterCategory },
            { label: 'Web Typology', value: 'Webs' as FilterCategory },
          ].map((chip) => {
            const isSelected = selectedCategory === chip.value;
            return (
              <Pressable
                key={chip.value}
                onPress={() => setSelectedCategory(chip.value)}
                style={[styles.chip, isSelected && styles.chipSelected]}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {chip.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* 4. Section: Step-by-Step Competencies (Roadmap from Design Board) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Level 1 Competencies</Text>
          <Text style={styles.sectionSubtitle}>
            {filteredModules.length} lessons
          </Text>
        </View>

        <View style={styles.modulesList}>
          {filteredModules.map((mod, idx) => (
            <Pressable
              key={mod.id}
              onPress={() => handleOpenModule(mod)}
              style={({ pressed }) => [styles.moduleCard, pressed && styles.cardPressed]}
            >
              <View style={styles.moduleHeaderRow}>
                <View style={styles.moduleIndexBadge}>
                  <Text style={styles.moduleIndexText}>#{idx + 1}</Text>
                </View>
                <View style={styles.moduleCategoryTag}>
                  <Text style={styles.moduleCategoryText}>{mod.categoryBadge}</Text>
                </View>
                <View style={styles.moduleXpPill}>
                  <Text style={styles.moduleXpText}>+{mod.xpReward} XP</Text>
                </View>
              </View>

              <Text style={styles.moduleTitle}>{mod.title}</Text>
              <Text style={styles.moduleSubtitle} numberOfLines={2}>{mod.subtitle}</Text>

              {/* Progress and Duration row with thin divider */}
              <View style={styles.moduleFooter}>
                <View style={styles.progressBarWrapper}>
                  <View style={styles.progressBarTrack}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${mod.progress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressPercent}>{mod.progress}%</Text>
                </View>

                <View style={styles.moduleArrowCircle}>
                  <ChevronRight size={16} color="#6B7280" />
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* 4B. Locked Level 2 Teaser (Design Board Screen 8) */}
        <View style={styles.lockedLevelCard}>
          <View style={styles.lockedLevelHeader}>
            <Text style={styles.lockedLevelTag}>LOCKED</Text>
            <Text style={styles.lockedLevelReq}>Requires Level 1 Completion</Text>
          </View>
          <Text style={styles.lockedLevelTitle}>Level 2: Field Identifier</Text>
          <Text style={styles.lockedLevelDesc}>
            Advanced chelicerae classification, ocular diagnostic patterns, and toxic spider differential diagnosis.
          </Text>
        </View>

        {/* 5. Field Quick-Safety Hotline Card */}
        <View style={styles.hotlineCard}>
          <View style={styles.hotlineIconWrapper}>
            <ShieldAlert size={24} color={Palette.danger} />
          </View>
          <View style={styles.hotlineContent}>
            <Text style={styles.hotlineTitle}>Poison Control Hotlines</Text>
            <Text style={styles.hotlineNumbers}>
              🇲🇦 Morocco: <Text style={styles.hotlineBold}>0537-68-64-64</Text> (CAPM 24/7)
            </Text>
            <Text style={styles.hotlineNumbers}>
              🇦🇺 Australia: <Text style={styles.hotlineBold}>13 11 26</Text> (Poisons Info)
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* --- 6. Interactive Lesson & Quiz Reader Modal --- */}
      <Modal
        visible={Boolean(activeModule)}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setActiveModule(null)}
      >
        {activeModule && (
          <View style={styles.modalBackdrop}>
            {/* Tap backdrop to dismiss */}
            <Pressable
              style={styles.modalBackdropPressable}
              onPress={() => setActiveModule(null)}
              accessibilityLabel="Close lesson modal"
              accessibilityRole="button"
            />

            {/* Bottom Sheet Card with rounded top corners & border */}
            <View
              style={[
                styles.modalSheetContainer,
                { marginTop: Math.max((insets.top || 16) + 16, 48) },
              ]}
            >
              {/* Pill Drag Handle Indicator */}
              <View style={styles.modalDragHandleContainer}>
                <View style={styles.modalDragHandle} />
              </View>

              {/* Modal Navigation Topbar */}
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderLeft}>
                  <View style={styles.modalCategoryBadge}>
                    <Text style={styles.modalCategoryBadgeText}>
                      {activeModule.categoryBadge}
                    </Text>
                  </View>
                  <Text style={styles.modalReadTime}>
                    <Clock size={12} color={Palette.muted} /> {activeModule.readTime} read
                  </Text>
                </View>
                <Pressable
                  onPress={() => setActiveModule(null)}
                  style={styles.modalCloseBtn}
                  hitSlop={8}
                >
                  <X size={20} color={Palette.ink} />
                </Pressable>
              </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScroll}
            >
              {/* Lesson Title & Subtitle */}
              <Text style={styles.modalTitle}>{activeModule.title}</Text>
              <Text style={styles.modalSubtitle}>{activeModule.subtitle}</Text>

              {/* Safety Alert (if applicable) */}
              {activeModule.safetyAlert && (
                <View style={styles.alertBox}>
                  <ShieldAlert size={20} color={Palette.danger} style={{ marginTop: 2 }} />
                  <Text style={styles.alertBoxText}>{activeModule.safetyAlert}</Text>
                </View>
              )}

              {/* Key Takeaways Card */}
              <View style={styles.takeawaysCard}>
                <Text style={styles.takeawaysTitle}>Key Field Takeaways</Text>
                {activeModule.keyTakeaways.map((point, idx) => (
                  <View key={idx} style={styles.takeawayRow}>
                    <CheckCircle2 size={16} color={Palette.moss} style={{ marginTop: 2 }} />
                    <Text style={styles.takeawayText}>{point}</Text>
                  </View>
                ))}
              </View>

              {/* Lesson Content Sections */}
              {activeModule.sections.map((section, idx) => (
                <View key={idx} style={styles.sectionBlock}>
                  <Text style={styles.sectionBlockHeading}>{section.heading}</Text>
                  <Text style={styles.sectionBlockBody}>{section.content}</Text>
                  {section.bullets && (
                    <View style={styles.bulletList}>
                      {section.bullets.map((b, bIdx) => (
                        <View key={bIdx} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{b}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}

              {/* --- First-Aid Action Matrix (DOs & DONTs) --- */}
              {activeModule.dosAndDonts && (
                <View style={styles.protocolSection}>
                  <View style={styles.protocolSectionHeader}>
                    <Text style={styles.protocolSectionEyebrow}>CLINICAL PROTOCOL</Text>
                    <Text style={styles.protocolSectionTitle}>Action & Safety Standards</Text>
                  </View>

                  {/* Mandatory Protocol (DO) Card */}
                  <View style={styles.protocolCard}>
                    <View style={styles.protocolCardHeader}>
                      <View style={styles.protocolHeaderLeft}>
                        <View style={styles.protocolIconCircle}>
                          <Check size={13} color="#FFFFFF" strokeWidth={3} />
                        </View>
                        <Text style={styles.protocolCardTitle}>Mandatory Actions</Text>
                      </View>
                      <View style={styles.protocolBadgeDo}>
                        <Text style={styles.protocolBadgeDoText}>DO</Text>
                      </View>
                    </View>

                    <View style={styles.protocolItemsList}>
                      {activeModule.dosAndDonts.dos.map((rawItem, dIdx) => {
                        const { lead, detail } = getProtocolParts(rawItem);
                        const isLast =
                          dIdx === activeModule.dosAndDonts!.dos.length - 1;
                        return (
                          <View
                            key={dIdx}
                            style={[
                              styles.protocolRow,
                              !isLast && styles.protocolRowBorder,
                            ]}
                          >
                            <View style={styles.protocolIndexPill}>
                              <Text style={styles.protocolIndexText}>
                                {dIdx + 1}
                              </Text>
                            </View>
                            <View style={styles.protocolTextCol}>
                              <Text style={styles.protocolLeadText}>{lead}</Text>
                              {detail ? (
                                <Text style={styles.protocolDetailText}>
                                  {detail}
                                </Text>
                              ) : null}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>

                  {/* Prohibited Actions (DO NOT) Card */}
                  <View style={[styles.protocolCard, styles.protocolCardDont]}>
                    <View style={styles.protocolCardHeader}>
                      <View style={styles.protocolHeaderLeft}>
                        <View style={styles.protocolIconCircleDont}>
                          <X size={13} color="#FFFFFF" strokeWidth={3} />
                        </View>
                        <Text style={styles.protocolCardTitle}>
                          Critical Contraindications
                        </Text>
                      </View>
                      <View style={styles.protocolBadgeDont}>
                        <Text style={styles.protocolBadgeDontText}>DO NOT</Text>
                      </View>
                    </View>

                    <View style={styles.protocolItemsList}>
                      {activeModule.dosAndDonts.donts.map((rawItem, dIdx) => {
                        const { lead, detail } = getProtocolParts(rawItem);
                        const isLast =
                          dIdx === activeModule.dosAndDonts!.donts.length - 1;
                        return (
                          <View
                            key={dIdx}
                            style={[
                              styles.protocolRow,
                              !isLast && styles.protocolRowBorder,
                            ]}
                          >
                            <View style={styles.protocolIndexPillDont}>
                              <Text style={styles.protocolIndexTextDont}>
                                {dIdx + 1}
                              </Text>
                            </View>
                            <View style={styles.protocolTextCol}>
                              <Text style={styles.protocolLeadText}>{lead}</Text>
                              {detail ? (
                                <Text style={styles.protocolDetailText}>
                                  {detail}
                                </Text>
                              ) : null}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              )}

              {/* --- Interactive Knowledge Check (Quiz) --- */}
              {activeModule.quiz.length > 0 && (
                <View style={styles.quizSection}>
                  <View style={styles.quizSectionHeader}>
                    <HelpCircle size={20} color={Palette.moss} />
                    <Text style={styles.quizSectionTitle}>Knowledge Check</Text>
                  </View>
                  <Text style={styles.quizSectionSubtitle}>
                    Answer to test your knowledge and claim +{activeModule.xpReward} XP!
                  </Text>

                  {activeModule.quiz.map((q, qIndex) => {
                    const selectedOpt = quizAnswers[q.id];
                    const isAnswered = quizSubmitted[q.id];

                    return (
                      <View key={q.id} style={styles.quizCard}>
                        <Text style={styles.questionText}>
                          {qIndex + 1}. {q.question}
                        </Text>

                        <View style={styles.optionsList}>
                          {q.options.map((opt, oIndex) => {
                            const isChosen = selectedOpt === oIndex;
                            const isCorrect = q.correctIndex === oIndex;

                            let optStyle = styles.optionBtn;
                            let textStyle = styles.optionText;

                            if (isAnswered) {
                              if (isCorrect) {
                                optStyle = { ...optStyle, ...styles.optionCorrect };
                                textStyle = { ...textStyle, ...styles.optionTextCorrect };
                              } else if (isChosen && !isCorrect) {
                                optStyle = { ...optStyle, ...styles.optionWrong };
                                textStyle = { ...textStyle, ...styles.optionTextWrong };
                              }
                            } else if (isChosen) {
                              optStyle = { ...optStyle, ...styles.optionSelected };
                            }

                            return (
                              <Pressable
                                key={oIndex}
                                onPress={() => handleSelectOption(q.id, oIndex)}
                                style={optStyle}
                              >
                                <View style={styles.letterPill}>
                                  <Text style={styles.letterText}>
                                    {String.fromCharCode(65 + oIndex)}
                                  </Text>
                                </View>
                                <Text style={textStyle}>{opt}</Text>
                                {isAnswered && isCorrect && (
                                  <CheckCircle2 size={18} color={Palette.moss} style={styles.optIcon} />
                                )}
                                {isAnswered && isChosen && !isCorrect && (
                                  <XCircle size={18} color={Palette.danger} style={styles.optIcon} />
                                )}
                              </Pressable>
                            );
                          })}
                        </View>

                        {/* Explanation Box on Answer */}
                        {isAnswered && (
                          <View
                            style={[
                              styles.explanationBox,
                              selectedOpt === q.correctIndex
                                ? styles.explanationBoxCorrect
                                : styles.explanationBoxWrong,
                            ]}
                          >
                            <Text style={styles.explanationText}>
                              {q.explanation}
                            </Text>
                          </View>
                        )}
                      </View>
                    );
                  })}

                  {/* Reward Claim Button */}
                  <Pressable
                    onPress={() =>
                      handleClaimReward(activeModule.id, activeModule.xpReward)
                    }
                    disabled={claimedModules[activeModule.id]}
                    style={[
                      styles.claimBtn,
                      claimedModules[activeModule.id] && styles.claimBtnDisabled,
                    ]}
                  >
                    <Sparkles size={18} color="#FFFFFF" />
                    <Text style={styles.claimBtnText}>
                      {claimedModules[activeModule.id]
                        ? `Reward Claimed (+${activeModule.xpReward} XP)`
                        : `Complete Lesson & Claim +${activeModule.xpReward} XP`}
                    </Text>
                  </Pressable>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  headerEyebrow: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.moss,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: 26,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
    lineHeight: 32,
    marginTop: 2,
  },
  headerPills: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  streakPill: {
    backgroundColor: '#FDF4EB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  streakText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  xpPill: {
    backgroundColor: '#FDF4EB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  xpText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  levelHeroCard: {
    backgroundColor: '#213E34',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 3,
    borderBottomColor: '#172C25',
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  levelHeroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelHeroBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  levelHeroBadgeText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  levelHeroStepCount: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  levelHeroTitle: {
    fontFamily: Typography.display,
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  levelHeroDesc: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
  },
  levelProgressTrack: {
    height: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Radii.pill,
    overflow: 'hidden',
    marginTop: Spacing.xs,
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: Palette.gold,
    borderRadius: Radii.pill,
  },
  levelHeroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  levelHeroFooterText: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  continueLevelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.moss,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
  },
  continueLevelBtnText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  moduleIndexBadge: {
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: Palette.line,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  moduleIndexText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.ink,
  },
  lockedLevelCard: {
    backgroundColor: Palette.paper,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderStyle: 'dashed',
    padding: Spacing.md,
    gap: 4,
    opacity: 0.85,
  },
  lockedLevelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  lockedLevelTag: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.8,
  },
  lockedLevelReq: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
    fontStyle: 'italic',
  },
  lockedLevelTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '700',
    color: Palette.ink,
  },
  lockedLevelDesc: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
    lineHeight: 17,
  },
  heroContent: {
    zIndex: 2,
    gap: Spacing.xs,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  featuredBadgeText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroTitle: {
    fontFamily: Typography.display,
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  metaPillText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  coralCircleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Palette.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radii.pill,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  chipSelected: {
    backgroundColor: '#213E34',
    borderColor: '#213E34',
  },
  chipText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.muted,
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
  },
  sectionSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
  },
  modulesList: {
    gap: Spacing.sm,
  },
  moduleCard: {
    backgroundColor: Palette.paper,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: 16,
    gap: 6,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
    borderColor: Palette.moss,
  },
  moduleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moduleCategoryTag: {
    backgroundColor: '#F3F0E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  moduleCategoryText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  moduleXpPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  moduleXpText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  moduleTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '700',
    color: Palette.ink,
    marginTop: 2,
  },
  moduleSubtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    lineHeight: 18,
  },
  moduleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0ECE1',
  },
  progressBarWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 12,
  },
  progressBarTrack: {
    flex: 1,
    height: 5,
    borderRadius: Radii.pill,
    backgroundColor: '#EFECE6',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Palette.coral,
    borderRadius: Radii.pill,
  },
  progressPercent: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    width: 32,
    textAlign: 'right',
  },
  moduleArrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F3F0E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotlineCard: {
    flexDirection: 'row',
    backgroundColor: Palette.coralSoft,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: '#F7B5A8',
    padding: Spacing.md,
    gap: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  hotlineIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotlineContent: {
    flex: 1,
  },
  hotlineTitle: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.danger,
    marginBottom: 2,
  },
  hotlineNumbers: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.ink,
    lineHeight: 17,
  },
  hotlineBold: {
    fontWeight: '700',
    color: Palette.danger,
  },

  // Modal Reader Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    justifyContent: 'flex-end',
  },
  modalBackdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalSheetContainer: {
    flex: 1,
    backgroundColor: Palette.canvas,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Palette.line,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 24,
  },
  modalDragHandleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: Palette.canvas,
  },
  modalDragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D6D1C7',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  modalCategoryBadge: {
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  modalCategoryBadgeText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.moss,
  },
  modalReadTime: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
  },
  modalCloseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Palette.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.md,
  },
  modalTitle: {
    fontFamily: Typography.display,
    fontSize: 22,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
  },
  modalSubtitle: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.muted,
    lineHeight: 20,
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: Palette.coralSoft,
    borderLeftWidth: 4,
    borderLeftColor: Palette.danger,
    borderRadius: Radii.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  alertBoxText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.danger,
    lineHeight: 18,
    fontWeight: '600',
  },
  takeawaysCard: {
    backgroundColor: Palette.paper,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  takeawaysTitle: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.ink,
    marginBottom: 4,
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  takeawayText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 18,
  },
  sectionBlock: {
    backgroundColor: Palette.paper,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  sectionBlockHeading: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '700',
    color: Palette.ink,
  },
  sectionBlockBody: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.ink,
    lineHeight: 21,
  },
  bulletList: {
    gap: 4,
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletDot: {
    fontSize: 14,
    color: Palette.moss,
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 19,
  },
  // Protocol Action Matrix (DOs & DONTs)
  protocolSection: {
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  protocolSectionHeader: {
    gap: 3,
  },
  protocolSectionEyebrow: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1.1,
  },
  protocolSectionTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.3,
  },
  protocolCard: {
    backgroundColor: Palette.paper,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  protocolCardDont: {
    borderWidth: 1.5,
    borderColor: Palette.ink,
  },
  protocolCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  protocolHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  protocolIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  protocolIconCircleDont: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  protocolCardTitle: {
    fontFamily: Typography.display,
    fontSize: 15,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.2,
  },
  protocolBadgeDo: {
    backgroundColor: '#EAE6DE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  protocolBadgeDoText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: 0.8,
  },
  protocolBadgeDont: {
    backgroundColor: Palette.ink,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  protocolBadgeDontText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  protocolItemsList: {
    gap: 0,
  },
  protocolRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  protocolRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3EFE6',
  },
  protocolIndexPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F3EFE6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  protocolIndexText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.ink,
  },
  protocolIndexPillDont: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  protocolIndexTextDont: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  protocolTextCol: {
    flex: 1,
    gap: 2,
  },
  protocolLeadText: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.ink,
    lineHeight: 19,
  },
  protocolDetailText: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.muted,
    lineHeight: 18,
  },

  // Quiz section in modal
  quizSection: {
    backgroundColor: Palette.paper,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: Spacing.md,
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  quizSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  quizSectionTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '800',
    color: Palette.ink,
  },
  quizSectionSubtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
  },
  quizCard: {
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  questionText: {
    fontFamily: Typography.display,
    fontSize: 15,
    fontWeight: '700',
    color: Palette.ink,
    lineHeight: 21,
  },
  optionsList: {
    gap: Spacing.xs,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.canvas,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  optionSelected: {
    borderColor: Palette.moss,
    backgroundColor: Palette.mossSoft,
  },
  optionCorrect: {
    borderColor: Palette.moss,
    backgroundColor: Palette.mossSoft,
  },
  optionWrong: {
    borderColor: Palette.danger,
    backgroundColor: Palette.coralSoft,
  },
  letterPill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Palette.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.ink,
  },
  optionText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
  },
  optionTextCorrect: {
    color: Palette.moss,
    fontWeight: '700',
  },
  optionTextWrong: {
    color: Palette.danger,
    fontWeight: '700',
  },
  optIcon: {
    marginLeft: 4,
  },
  explanationBox: {
    padding: Spacing.sm,
    borderRadius: Radii.md,
  },
  explanationBoxCorrect: {
    backgroundColor: Palette.mossSoft,
  },
  explanationBoxWrong: {
    backgroundColor: Palette.coralSoft,
  },
  explanationText: {
    fontFamily: Typography.body,
    fontSize: 12,
    lineHeight: 17,
    color: Palette.ink,
  },
  claimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Palette.moss,
    paddingVertical: 12,
    borderRadius: Radii.pill,
    marginTop: Spacing.xs,
  },
  claimBtnDisabled: {
    backgroundColor: Palette.muted,
  },
  claimBtnText: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
