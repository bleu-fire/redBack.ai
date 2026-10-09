import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { ChevronRight, Plus } from 'lucide-react-native';
import { Colors, Spacing, Radii, Typography } from '@/constants/theme';

export interface EmergencyCardProps {
  title?: string;
  subtitle?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function EmergencyCard({
  title = 'Bite Protocol',
  subtitle = 'Immediate first-aid steps',
  onPress,
  style,
}: EmergencyCardProps) {
  const handlePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel="Emergency Protocol"
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
    >
      {/* Medical Cross Icon Badge */}
      <View style={styles.crossWrap}>
        <Plus size={24} color="#FFFFFF" strokeWidth={3.5} />
      </View>

      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Outlined Emergency Badge Button */}
      <View style={styles.actionPill}>
        <Text style={styles.actionText}>Emergency</Text>
      </View>

      <ChevronRight size={18} color={Colors.crimson} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF8F6',
    borderRadius: Radii.lg,
    borderWidth: 1.5,
    borderColor: '#FAD5CF',
    borderBottomWidth: 3,
    borderBottomColor: '#F0B8B0',
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  pressed: {
    backgroundColor: '#FFEFEA',
    transform: [{ translateY: 2 }],
  },
  crossWrap: {
    width: 44,
    height: 44,
    borderRadius: Radii.md,
    backgroundColor: Colors.crimson,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.crimsonDark,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: Typography.bodyStyle.fontSize,
    fontWeight: '800',
    color: Colors.inkPrimary,
  },
  subtitle: {
    fontSize: Typography.caption.fontSize,
    color: Colors.inkMuted,
  },
  actionPill: {
    borderWidth: 1.5,
    borderColor: Colors.crimson,
    borderRadius: Radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.card,
  },
  actionText: {
    fontSize: Typography.small.fontSize,
    fontWeight: '800',
    color: Colors.crimson,
  },
});
