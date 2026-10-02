import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Palette, Radii, Typography } from '@/constants/theme';

export interface FeaturedSpeciesCardProps {
  id?: string;
  name?: string;
  scientificName?: string;
  status?: string;
  image?: any;
  onPress?: () => void;
}

export function FeaturedSpeciesCard({
  id = 'redback-spider',
  name = 'Redback spider',
  scientificName = 'Latrodectus hasselti',
  status = 'Venomous',
  image = require('@/assets/images/spider-3d.png'),
  onPress,
}: FeaturedSpeciesCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/species/${id}` as any);
    }
  };

  const isVenomous = status.toLowerCase().includes('venom');
  const badgeBg = isVenomous ? Palette.coralSoft : '#EAF2EC';
  const badgeColor = isVenomous ? Palette.danger : '#2D5A43';

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${scientificName}`}
    >
      <Image source={image} style={styles.thumbnail} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.scientificName}>{scientificName}</Text>
        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
          <View style={[styles.badgeDot, { backgroundColor: badgeColor }]} />
          <Text style={[styles.badgeText, { color: badgeColor }]}>{status}</Text>
        </View>
      </View>

      <ChevronRight size={20} color={Palette.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.paper,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  name: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '700',
    color: Palette.ink,
    marginBottom: 2,
  },
  scientificName: {
    fontFamily: Typography.display,
    fontSize: 12.5,
    fontStyle: 'italic',
    color: Palette.muted,
    marginBottom: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.coralSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
    gap: 5,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Palette.danger,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.danger,
  },
  pressed: {
    opacity: 0.94,
    backgroundColor: Palette.surfaceSubtle,
  },
});

export default FeaturedSpeciesCard;
