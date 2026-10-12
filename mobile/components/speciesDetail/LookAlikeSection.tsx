import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Palette, Spacing, Radii, Typography } from '@/constants/theme';

interface LookAlikeSectionProps {
  confusionWith?: string[];
  firstKeyFeature?: string;
}

export const LookAlikeSection: React.FC<LookAlikeSectionProps> = ({
  confusionWith,
  firstKeyFeature,
}) => {
  if (!confusionWith || confusionWith.length === 0) return null;

  return (
    <View style={styles.lookAlikeCard}>
      <Text style={styles.lookAlikeEyebrow}>FIELD COMPARISON</Text>
      <Text style={styles.lookAlikeTitle}>Easily Confused With</Text>
      <Text style={styles.lookAlikeDesc}>
        Common false IDs: {confusionWith.join(', ')}.
      </Text>
      <View style={styles.lookAlikeTipBox}>
        <Text style={styles.lookAlikeTipHeading}>Key Differentiator</Text>
        <Text style={styles.lookAlikeTipBody}>
          {firstKeyFeature ||
            'Inspect abdominal color markers and leg articulation angles.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lookAlikeCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Palette.paper,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
    padding: Spacing.md + 2,
    gap: Spacing.xs,
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  lookAlikeEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 1,
  },
  lookAlikeTitle: {
    fontFamily: Typography.display,
    fontSize: 17,
    fontWeight: '800',
    color: Palette.ink,
  },
  lookAlikeDesc: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    lineHeight: 18,
  },
  lookAlikeTipBox: {
    backgroundColor: Palette.canvas,
    borderRadius: Radii.md,
    padding: 10,
    marginTop: 6,
    gap: 2,
  },
  lookAlikeTipHeading: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: Palette.moss,
  },
  lookAlikeTipBody: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 17,
  },
});
