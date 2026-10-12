import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { HelpCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { LearningModule } from '@/data/learningData';
import { styles } from './lessonQuiz.styles';

interface LessonQuizSectionProps {
  quiz: LearningModule['quiz'];
  xpReward: number;
  moduleId: string;
  quizAnswers: Record<string, number>;
  quizSubmitted: Record<string, boolean>;
  claimedModules: Record<string, boolean>;
  onSelectOption: (questionId: string, optionIndex: number) => void;
  onClaimReward: (moduleId: string, xpReward: number) => void;
}

export const LessonQuizSection: React.FC<LessonQuizSectionProps> = ({
  quiz,
  xpReward,
  moduleId,
  quizAnswers,
  quizSubmitted,
  claimedModules,
  onSelectOption,
  onClaimReward,
}) => {
  if (!quiz || quiz.length === 0) return null;

  return (
    <View style={styles.quizSection}>
      <View style={styles.quizSectionHeader}>
        <HelpCircle size={20} color={Palette.moss} />
        <Text style={styles.quizSectionTitle}>Knowledge Check</Text>
      </View>
      <Text style={styles.quizSectionSubtitle}>
        Answer to test your knowledge and claim +{xpReward} XP!
      </Text>

      {quiz.map((q, qIndex) => {
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
                    onPress={() => onSelectOption(q.id, oIndex)}
                    style={optStyle}
                  >
                    <View style={styles.letterPill}>
                      <Text style={styles.letterText}>
                        {String.fromCharCode(65 + oIndex)}
                      </Text>
                    </View>
                    <Text style={textStyle}>{opt}</Text>
                    {isAnswered && isCorrect && (
                      <CheckCircle2
                        size={18}
                        color={Palette.moss}
                        style={styles.optIcon}
                      />
                    )}
                    {isAnswered && isChosen && !isCorrect && (
                      <XCircle
                        size={18}
                        color={Palette.danger}
                        style={styles.optIcon}
                      />
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
                <Text style={styles.explanationText}>{q.explanation}</Text>
              </View>
            )}
          </View>
        );
      })}

      {/* Reward Claim Button */}
      <Pressable
        onPress={() => onClaimReward(moduleId, xpReward)}
        disabled={claimedModules[moduleId]}
        style={[
          styles.claimBtn,
          claimedModules[moduleId] && styles.claimBtnDisabled,
        ]}
      >
        <Sparkles size={18} color="#FFFFFF" />
        <Text style={styles.claimBtnText}>
          {claimedModules[moduleId]
            ? `Reward Claimed (+${xpReward} XP)`
            : `Complete Lesson & Claim +${xpReward} XP`}
        </Text>
      </Pressable>
    </View>
  );
};
