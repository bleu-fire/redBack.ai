import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MapPin } from 'lucide-react-native';
import { Palette, Typography } from '@/constants/theme';

interface SpeciesGridCardProps {
  id?: string;
  name: string;
  scientificName: string;
  badgeText: string;
  badgeType?: 'danger' | 'moss' | 'gold';
  region?: 'Morocco' | 'Australia';
  image: any;
  onPress?: () => void;
}

/**
 * Helper to obtain the soft pastel badge colors conforming
 * to the naturalist 'Active This Season' card vibe.
 */
function getBadgeTheme(badgeText: string, badgeType?: string) {
  if (badgeText === 'Deadly' || badgeText === 'Venomous') {
    return { bg: '#FEECE9', color: '#D9383A' };
  }
  if (badgeText === 'Danger') {
    return { bg: '#EAF7EE', color: '#28813C' };
  }
  if (badgeText === 'Protected' || badgeText === 'Rare' || badgeType === 'gold') {
    return { bg: '#FEF3C7', color: '#B45309' };
  }
  return { bg: '#EAF7EE', color: '#28813C' };
}

/**
 * Reusable Species Grid Card
 * Conforming strictly to the 'Active This Season' editorial naturalist card vibe:
 * - High-resolution specimen photo with smooth curved top
 * - Metadata row with regional MapPin and soft status pill
 * - Bold serif common name
 * - Italic scientific name
 * - Clean 20dp rounded surface with subtle ambient shadow
 */
export function SpeciesGridCard({
  id,
  name,
  scientificName,
  badgeText,
  badgeType = 'moss',
  region,
  image,
  onPress,
}: SpeciesGridCardProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) {
      onPress();
    } else if (id) {
      router.push(`/species/${id}` as any);
    }
  };

  const badgeTheme = getBadgeTheme(badgeText, badgeType);

  // Resolve image source
  const imageSource =
    typeof image === 'string'
      ? { uri: image }
      : image || require('@/assets/images/spider-bg.png');

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${scientificName}`}
    >
      {/* Spider Photo Container */}
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
      </View>

      {/* Card Information */}
      <View style={styles.cardBody}>
        {/* Row 1: Region & Status Badge */}
        <View style={styles.metaRow}>
          <View style={styles.regionTag}>
            <MapPin size={11} color={Palette.muted} />
            <Text style={styles.regionTagText} numberOfLines={1}>
              {region || 'Morocco'}
            </Text>
          </View>
          <View style={[styles.badgePill, { backgroundColor: badgeTheme.bg }]}>
            <Text style={[styles.badgePillText, { color: badgeTheme.color }]}>
              {badgeText}
            </Text>
          </View>
        </View>

        {/* Row 2: Common Name (Serif Headline) */}
        <Text style={styles.cardTitle} numberOfLines={1}>
          {name.replace(/\s*\([\u0600-\u06FF\s\/\-]+\)/g, '').trim()}
        </Text>

        {/* Row 3: Scientific Name (Italic Serif / Secondary) */}
        <Text style={styles.cardScientific} numberOfLines={1}>
          {scientificName}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: '#EAE4DC',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
    borderColor: Palette.moss,
  },
  imageWrapper: {
    width: '100%',
    height: 122,
    backgroundColor: Palette.surfaceSubtle,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    paddingHorizontal: 11,
    paddingTop: 10,
    paddingBottom: 13,
    gap: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  regionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flex: 1,
    marginRight: 4,
  },
  regionTagText: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
    fontWeight: '500',
  },
  badgePill: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 15,
    color: Palette.ink,
    letterSpacing: -0.2,
  },
  cardScientific: {
    fontFamily: Typography.displayItalic,
    fontSize: 12,
    color: Palette.muted,
  },
});

export default SpeciesGridCard;
