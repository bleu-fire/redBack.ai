import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { ChevronRight, ShieldAlert, CheckCircle2, MapPin } from 'lucide-react-native';
import { Colors, Spacing, Radii, Typography } from '@/constants/theme';

export interface SpeciesCardProps {
  name: string;
  scientificName: string;
  image: ImageSourcePropType;
  region?: string;
  riskLevel?: 'high' | 'warning' | 'safe';
  onPress: () => void;
  style?: ViewStyle;
}

export function SpeciesCard({
  name,
  scientificName,
  image,
  region = 'Atlas Mountains',
  riskLevel = 'safe',
  onPress,
  style,
}: SpeciesCardProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const isHighRisk = riskLevel === 'high';
  const isWarning = riskLevel === 'warning';

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`View ${name}`}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
    >
      {/* Specimen Photo Thumbnail */}
      <Image source={image} style={styles.thumbnail} resizeMode="cover" />

      {/* Specimen Meta */}
      <View style={styles.infoCol}>
        <View style={styles.titleRow}>
          <Text style={styles.commonName} numberOfLines={1}>{name}</Text>
        </View>
        <Text style={styles.scientificName} numberOfLines={1}>{scientificName}</Text>

        <View style={styles.badgeRow}>
          {isHighRisk && (
            <View style={styles.riskBadgeHigh}>
              <ShieldAlert size={11} color={Colors.crimson} />
              <Text style={styles.riskTextHigh}>High Risk</Text>
            </View>
          )}
          {isWarning && (
            <View style={styles.riskBadgeWarning}>
              <ShieldAlert size={11} color={Colors.amber} />
              <Text style={styles.riskTextWarning}>Caution</Text>
            </View>
          )}
          {!isHighRisk && !isWarning && (
            <View style={styles.riskBadgeSafe}>
              <CheckCircle2 size={11} color={Colors.forestGreen} />
              <Text style={styles.riskTextSafe}>Harmless</Text>
            </View>
          )}

          {region && (
            <View style={styles.regionBadge}>
              <MapPin size={10} color={Colors.inkMuted} />
              <Text style={styles.regionText}>{region}</Text>
            </View>
          )}
        </View>
      </View>

      <ChevronRight size={18} color={Colors.inkMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  pressed: {
    backgroundColor: '#FAF7F2',
    transform: [{ translateY: 2 }],
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: Radii.md,
    backgroundColor: '#F5EFE6',
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commonName: {
    fontFamily: Typography.displayBold,
    fontSize: 16,
    color: Colors.inkPrimary,
  },
  scientificName: {
    fontFamily: Typography.displayItalic,
    fontSize: 13,
    color: Colors.inkMuted,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  riskBadgeHigh: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.crimsonSoft,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  riskTextHigh: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.crimson,
  },
  riskBadgeWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.amberSoft,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  riskTextWarning: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.amber,
  },
  riskBadgeSafe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.sageSubtle,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  riskTextSafe: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.forestGreen,
  },
  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  regionText: {
    fontSize: 10,
    color: Colors.inkMuted,
  },
});
