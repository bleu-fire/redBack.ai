import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

interface SpeciesGridCardProps {
  id?: string;
  name: string;
  arabicName?: string;
  scientificName: string;
  badgeText: string;
  badgeType?: 'danger' | 'moss' | 'gold';
  region?: 'Morocco' | 'Australia';
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
  arabicName,
  scientificName,
  badgeText,
  badgeType = 'moss',
  region,
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

  // Determine badge background and text colors matching screenshot
  let badgeBg = Palette.mossSoft;
  let badgeTextColor = Palette.moss;

  if (badgeText === 'Deadly' || badgeText === 'Venomous') {
    badgeBg = Palette.coralSoft;
    badgeTextColor = Palette.danger;
  } else if (badgeText === 'Danger') {
    badgeBg = '#FEF3C7';
    badgeTextColor = '#D97706';
  } else if (badgeText === 'Protected') {
    badgeBg = '#E0E7FF';
    badgeTextColor = '#4338CA';
  } else if (badgeType === 'gold' || badgeText === 'Mild' || badgeText === 'Rare') {
    badgeBg = Palette.goldSoft;
    badgeTextColor = Palette.gold;
  }

  // Resolve image source
  const imageSource =
    typeof image === 'string'
      ? { uri: image }
      : image || require('@/assets/images/spider-bg.png');

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* Spider Photo Container with Region Tag */}
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
        {region && (
          <View style={styles.regionBadge}>
            <Text style={styles.regionText}>
              {region === 'Morocco' ? 'Morocco' : 'Australia'}
            </Text>
          </View>
        )}
      </View>

      {/* Card Information */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {name}
        </Text>
        {arabicName ? (
          <Text style={styles.cardArabic} numberOfLines={1}>
            {arabicName}
          </Text>
        ) : null}
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
    borderRadius: Radii.lg,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.9,
    borderColor: Palette.moss,
  },
  imageWrapper: {
    width: '100%',
    height: 125,
    position: 'relative',
    backgroundColor: Palette.surfaceSubtle,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  regionBadge: {
    position: 'absolute',
    top: 7,
    left: 7,
    backgroundColor: 'rgba(23, 33, 31, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  regionText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardBody: {
    padding: Spacing.sm,
  },
  cardTitle: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.ink,
  },
  cardArabic: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
    marginTop: 1,
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
