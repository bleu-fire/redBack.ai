import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Palette, Radii, Typography } from '@/constants/theme';

interface LessonCardProps {
  title: string;
  subtitle?: string;
  progress?: number; // e.g. 60 for 60%
  icon: React.ReactNode;
  onPress?: () => void;
}

/**
 * Reusable Lesson Card
 * Used on the Learn tab for listing lessons with progress or status
 */
export function LessonCard({
  title,
  subtitle,
  progress,
  icon,
  onPress,
}: LessonCardProps) {
  const hasProgress = typeof progress === 'number';

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {hasProgress ? (
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        ) : (
          <Text style={styles.subtitle}>{subtitle || 'Not started'}</Text>
        )}
      </View>

      {hasProgress ? (
        <Text style={styles.progressPercentText}>{progress}%</Text>
      ) : (
        <ChevronRight size={18} color={Palette.muted} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radii.sm,
    backgroundColor: Palette.mossSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: Typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: Palette.ink,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: Palette.line,
    borderRadius: 2,
    width: '90%',
    marginTop: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Palette.moss,
    borderRadius: 2,
  },
  progressPercentText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.muted,
  },
});

export default LessonCard;
