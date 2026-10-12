import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronRight, Sparkles } from 'lucide-react-native';
import { LearningModule } from '@/data/learningData';
import { styles } from './learn.styles';

interface ModuleCardProps {
  module: LearningModule;
  index: number;
  onPress: (module: LearningModule) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  index,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() => onPress(module)}
      style={({ pressed }) => [styles.moduleCard, pressed && styles.cardPressed]}
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
        <View style={styles.moduleXpPill}>
          <Sparkles size={11} color="#B45309" />
          <Text style={styles.moduleXpText}>+{module.xpReward} XP</Text>
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
                { width: `${module.progress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressPercent}>{module.progress}%</Text>
          <Text style={styles.readTimeText}>• {module.readTime}</Text>
        </View>

        <ChevronRight size={16} color="#6B7280" strokeWidth={2.2} />
      </View>
    </Pressable>
  );
};
