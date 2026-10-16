import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { LearningModule } from '@/data/learning/types';
import { fetchLearningModules } from '@/data/api/logic';
import { useStore } from '@/store/stores';
import { Palette } from '@/constants/theme';
import { ModuleCard } from '@/components/learn/ModuleCard';
import { LessonModal } from '@/components/learn/LessonModal';
import { styles } from '@/components/learn/learn.styles';

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const storeModules = useStore((state) => state.learningModules);
  const [loading, setLoading] = useState(storeModules.length === 0);
  const [modules, setModules] = useState<LearningModule[]>(storeModules);

  const loadModulesFromBackend = async () => {
    try {
      const data = await fetchLearningModules();
      if (Array.isArray(data) && data.length > 0) {
        setModules(data);
        useStore.getState().setLearningModules(data);
      }
    } catch (err) {
      console.warn('[LearnScreen] Failed loading modules from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModulesFromBackend();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadModulesFromBackend();
    setRefreshing(false);
  };

  // Quiz state for the modal
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [claimedModules, setClaimedModules] = useState<Record<string, boolean>>({});

  const filteredModules = modules;

  const handleOpenModule = (mod: LearningModule) => {
    setActiveModule(mod);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setQuizSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleClaimReward = (modId: string, _xpReward: number) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setClaimedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Palette.forestGreen}
          />
        }
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

        {loading && modules.length === 0 ? (
          <View style={{ paddingVertical: 60, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={Palette.forestGreen} />
            <Text style={{ marginTop: 12, color: Palette.muted, fontSize: 13, fontWeight: '500' }}>
              Loading interactive modules from backend...
            </Text>
          </View>
        ) : (
          <View style={styles.modulesList}>
            {filteredModules.map((mod, idx) => (
              <ModuleCard
                key={mod.id}
                module={mod}
                index={idx}
                isCompleted={Boolean(claimedModules[mod.id])}
                onPress={handleOpenModule}
              />
            ))}
          </View>
        )}
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
