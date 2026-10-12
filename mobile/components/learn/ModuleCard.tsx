import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react-native';
import { LearningModule } from '@/data/learningData';
import { Palette } from '@/constants/theme';
import { styles } from './learn.styles';

interface ModuleCardProps {
  module: LearningModule;
  index: number;
  isCompleted?: boolean;
  onPress: (module: LearningModule) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  index,
  isCompleted = false,
  onPress,
}) => {
  const currentProgress = isCompleted ? 100 : module.progress;

  return (
    <Pressable
      onPress={() => onPress(module)}
      style={({ pressed }) => [
        styles.moduleCard,
        isCompleted && { borderColor: '#B2E2BB' },
        pressed && styles.cardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Lesson ${index + 1}: ${module.title}`}
    >
      {/* Balanced Header Row: Tag & XP Badge */}
      <View style={styles.moduleHeaderRow}>
        <View style={styles.moduleCategoryTag}>
          <Text style={styles.moduleCategoryText}>
            Lesson {index + 1} • {module.categoryBadge}
          </Text>
        </View>
        <View
          style={[
            styles.moduleXpPill,
            isCompleted && { backgroundColor: Palette.mossSoft },
          ]}
        >
          {isCompleted ? (
            <CheckCircle2 size={11} color={Palette.forestGreen} strokeWidth={2.5} />
          ) : (
            <Sparkles size={11} color="#B45309" />
          )}
          <Text
            style={[
              styles.moduleXpText,
              isCompleted && { color: Palette.forestGreen },
            ]}
          >
            {isCompleted ? `Claimed (+${module.xpReward} XP)` : `+${module.xpReward} XP`}
          </Text>
        </View>
      </View>

      {/* Clear, High-Contrast Typography */}
      <Text style={styles.moduleTitle}>{module.title}</Text>
      <Text style={styles.moduleSubtitle} numberOfLines={2}>
        {module.subtitle}
      </Text>

      {/* Clean Results-Style Footer */}
      <View style={styles.moduleFooter}>
        <View style={styles.moduleFooterLeft}>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${currentProgress}%`,
                  backgroundColor: isCompleted ? Palette.forestGreen : Palette.coral,
                },
              ]}
            />
          </View>
          <Text
            style={[
              styles.progressPercent,
              isCompleted && { color: Palette.forestGreen },
            ]}
          >
            {isCompleted ? '100% Completed' : `${currentProgress}%`}
          </Text>
          <Text style={styles.readTimeText}>• {module.readTime}</Text>
        </View>

        <ChevronRight size={16} color="#6B7280" strokeWidth={2.2} />
      </View>
    </Pressable>
  );
};
