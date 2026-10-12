import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Bot, ChevronRight } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants/theme';

interface AskAiNaturalistButtonProps {
  speciesName: string;
  scientificName: string;
}

export const AskAiNaturalistButton: React.FC<AskAiNaturalistButtonProps> = ({
  speciesName,
  scientificName,
}) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: '/chat',
      params: {
        speciesName,
        scientificName,
      },
    } as any);
  };

  const cleanName = speciesName.replace(/\s*\([\u0600-\u06FF\s\/\-]+\)/g, '').trim();
  const targetName = cleanName.split(' ')[0] || speciesName;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.askAiBtn, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Ask AI Naturalist about ${speciesName}`}
    >
      <View style={styles.iconBadge}>
        <Bot size={20} color="#FFFFFF" strokeWidth={2.4} />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.askAiBtnText} numberOfLines={1}>
          Ask AI Naturalist about {targetName}
        </Text>
      </View>

      <View style={styles.arrowBadge}>
        <ChevronRight size={16} color="#FFFFFF" strokeWidth={2.6} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  askAiBtn: {
    marginHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.forestGreen,
    borderWidth: 1.5,
    borderColor: '#389A4B',
    borderBottomWidth: 4.5,
    borderBottomColor: Colors.forestDark,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    minHeight: 56,
    shadowColor: Colors.forestDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 4,
  },
  pressed: {
    backgroundColor: Colors.forestDark,
    borderBottomWidth: 1.5,
    transform: [{ translateY: 3 }],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    elevation: 1,
  },
  iconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  askAiBtnText: {
    fontFamily: Typography.displayBold,
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  arrowBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
