import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

interface SpeciesGridCardProps {
  id?: string;
  name: string;
  scientificName: string;
  badgeText: string;
  badgeType?: 'danger' | 'moss' | 'gold';
  image: any;
  onPress?: () => void;
}

/**
 * Reusable Species Grid Card
 * 2-column card showing photo, common name, scientific name, and status pill
 */
export function SpeciesGridCard({
  id,
  name,
  scientificName,
  badgeText,
  badgeType = 'moss',
  image,
  onPress,
}: SpeciesGridCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (id) {
      router.push(`/species/${id}` as any);
    }
  };

  // Determine badge background and text colors
  let badgeBg = Palette.mossSoft;
  let badgeTextColor = Palette.moss;
  if (badgeType === 'danger') {
    badgeBg = Palette.coralSoft;
    badgeTextColor = Palette.danger;
  } else if (badgeType === 'gold') {
    badgeBg = Palette.goldSoft;
    badgeTextColor = Palette.gold;
  }

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      {/* Spider Photo */}
      <Image source={image} style={styles.cardImage} resizeMode="cover" />

      {/* Card Information */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.cardScientific} numberOfLines={1}>
          {scientificName}
        </Text>

        {/* Status Badge */}
        <View style={[styles.badgePill, { backgroundColor: badgeBg }]}>
          <Text style={[styles.badgePillText, { color: badgeTextColor }]}>
            {badgeText}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: Palette.surfaceSubtle,
  },
  cardBody: {
    padding: Spacing.sm,
  },
  cardTitle: {
    fontFamily: Typography.display,
    fontSize: 15,
    fontWeight: '700',
    color: Palette.ink,
  },
  cardScientific: {
    fontFamily: Typography.display,
    fontSize: 12,
    fontStyle: 'italic',
    color: Palette.muted,
    marginTop: 2,
    marginBottom: 8,
  },
  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default SpeciesGridCard;
