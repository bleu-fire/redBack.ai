import React from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { Clock, CheckCircle2, X, Sparkles } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { LearningModule } from '@/data/learningData';
import { LessonProtocolSection } from './LessonProtocolSection';
import { LessonQuizSection } from './LessonQuizSection';
import { styles } from './lessonModal.styles';

interface LessonModalProps {
  activeModule: LearningModule | null;
  topInset: number;
  onClose: () => void;
  quizAnswers: Record<string, number>;
  quizSubmitted: Record<string, boolean>;
  claimedModules: Record<string, boolean>;
  onSelectOption: (questionId: string, optionIndex: number) => void;
  onClaimReward: (moduleId: string, xpReward: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  activeModule,
  topInset,
  onClose,
  quizAnswers,
  quizSubmitted,
  claimedModules,
  onSelectOption,
  onClaimReward,
}) => {
  if (!activeModule) return null;

  const isClaimed = Boolean(claimedModules[activeModule.id]);

  return (
    <Modal
      visible={Boolean(activeModule)}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        {/* Tap backdrop to dismiss */}
        <Pressable
          style={styles.modalBackdropPressable}
          onPress={onClose}
          accessibilityLabel="Close lesson modal"
          accessibilityRole="button"
        />

        {/* Bottom Sheet Card */}
        <View
          style={[
            styles.modalSheetContainer,
            { marginTop: Math.max((topInset || 16) + 16, 48) },
          ]}
        >
          {/* Pill Drag Handle */}
          <View style={styles.modalDragHandleContainer}>
            <View style={styles.modalDragHandle} />
          </View>

          {/* Clean Navigation Bar */}
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
              onPress={onClose}
              style={styles.modalCloseBtn}
              hitSlop={8}
              accessibilityLabel="Close"
              accessibilityRole="button"
            >
              <X size={20} color={Palette.ink} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalScroll}
          >
            {/* Title & Core Summary */}
            <View style={styles.titleBlock}>
              <Text style={styles.modalTitle}>{activeModule.title}</Text>
              <Text style={styles.modalSubtitle}>{activeModule.subtitle}</Text>
            </View>

            {/* Core Field Essentials Card (Results-Page Tactile Card) */}
            <View style={styles.takeawaysCard}>
              <Text style={styles.takeawaysTitle}>Field Essentials</Text>
              {activeModule.keyTakeaways.map((point, idx) => (
                <View key={idx} style={styles.takeawayRow}>
                  <CheckCircle2 size={16} color={Palette.moss} style={{ marginTop: 2 }} />
                  <Text style={styles.takeawayText}>{point}</Text>
                </View>
              ))}
            </View>

            {/* Protocol DOs & DONTs (if present) */}
            {activeModule.dosAndDonts ? (
              <LessonProtocolSection dosAndDonts={activeModule.dosAndDonts} />
            ) : (
              /* Or Primary Overview Card */
              activeModule.sections && activeModule.sections.length > 0 && (
                <View style={styles.sectionBlock}>
                  <Text style={styles.sectionBlockHeading}>
                    {activeModule.sections[0].heading}
                  </Text>
                  <Text style={styles.sectionBlockBody}>
                    {activeModule.sections[0].content}
                  </Text>
                  {activeModule.sections[0].bullets && (
                    <View style={styles.bulletList}>
                      {activeModule.sections[0].bullets.map((b, bIdx) => (
                        <View key={bIdx} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{b}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )
            )}

            {/* Interactive Knowledge Check (Quiz) */}
            {activeModule.quiz.length > 0 && (
              <LessonQuizSection
                quiz={activeModule.quiz}
                xpReward={activeModule.xpReward}
                moduleId={activeModule.id}
                quizAnswers={quizAnswers}
                quizSubmitted={quizSubmitted}
                claimedModules={claimedModules}
                onSelectOption={onSelectOption}
                onClaimReward={onClaimReward}
              />
            )}
          </ScrollView>

          {/* Bottom Fixed Action Deck for Complete Lesson */}
          <View style={styles.modalBottomDeck}>
            <Pressable
              onPress={() => onClaimReward(activeModule.id, activeModule.xpReward)}
              style={({ pressed }) => [
                styles.completeLessonBtn,
                isClaimed ? styles.completeLessonBtnCompleted : styles.completeLessonBtnActive,
                pressed && styles.btnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={isClaimed ? 'Lesson completed' : 'Complete lesson'}
            >
              {isClaimed ? (
                <>
                  <CheckCircle2 size={19} color={Palette.forestGreen} strokeWidth={2.5} />
                  <Text style={styles.completeLessonBtnTextCompleted}>
                    Lesson Completed ✓ (+{activeModule.xpReward} XP)
                  </Text>
                </>
              ) : (
                <>
                  <Sparkles size={18} color="#FFFFFF" strokeWidth={2} />
                  <Text style={styles.completeLessonBtnTextActive}>
                    Complete Lesson & Claim +{activeModule.xpReward} XP
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
