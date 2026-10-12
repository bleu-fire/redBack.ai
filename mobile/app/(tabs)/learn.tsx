import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LEARNING_MODULES, LearningModule } from '@/data/learningData';
import { ModuleCard } from '@/components/learn/ModuleCard';
import { LessonModal } from '@/components/learn/LessonModal';
import { styles } from '@/components/learn/learn.styles';

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);

  // Quiz state for the modal
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [claimedModules, setClaimedModules] = useState<Record<string, boolean>>({});

  const filteredModules = LEARNING_MODULES;

  const handleOpenModule = (mod: LearningModule) => {
    setActiveModule(mod);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setQuizSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleClaimReward = (modId: string, _xpReward: number) => {
    if (!claimedModules[modId]) {
      setClaimedModules((prev) => ({ ...prev, [modId]: true }));
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Naturalist Academy Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Arachnology Path</Text>
          </View>
        </View>

        {/* Section: Step-by-Step Competencies */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Level 1 Competencies</Text>
          <Text style={styles.sectionSubtitle}>
            {filteredModules.length} lessons
          </Text>
        </View>

        <View style={styles.modulesList}>
          {filteredModules.map((mod, idx) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              index={idx}
              onPress={handleOpenModule}
            />
          ))}
        </View>
      </ScrollView>

      {/* Interactive Lesson & Quiz Reader Modal */}
      <LessonModal
        activeModule={activeModule}
        topInset={insets.top}
        onClose={() => setActiveModule(null)}
        quizAnswers={quizAnswers}
        quizSubmitted={quizSubmitted}
        claimedModules={claimedModules}
        onSelectOption={handleSelectOption}
        onClaimReward={handleClaimReward}
      />
    </View>
  );
}
