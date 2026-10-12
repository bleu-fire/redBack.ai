import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Share2,
  Ruler,
  Trees,
  Sun,
  Moon,
  Compass,
} from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { SpeciesDetail, SizeScaleProfile } from '@/data/speciesData';
import { styles } from './SpecimenHeroCard.styles';

interface SpecimenHeroCardProps {
  species: SpeciesDetail;
  imageSource: any;
  sizeScale: SizeScaleProfile;
  onBack: () => void;
  onShare: () => void;
}

export const SpecimenHeroCard: React.FC<SpecimenHeroCardProps> = ({
  species,
  imageSource,
  sizeScale,
  onBack,
  onShare,
}) => {
  const isDiurnal = species.activity?.toLowerCase().includes('diurnal');

  return (
    <>
      {/* 1. Specimen Card with Image & Navigation */}
      <View style={styles.heroCard}>
        <Image
          source={imageSource}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <LinearGradient
          colors={['rgba(0, 0, 0, 0.45)', 'transparent', 'rgba(15, 23, 20, 0.90)']}
          locations={[0, 0.35, 1]}
          style={styles.heroGradient}
        >
          <View style={styles.heroNavRow}>
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [styles.navGhostBtn, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2.4} />
            </Pressable>

            <Pressable
              onPress={onShare}
              style={({ pressed }) => [styles.navGhostBtn, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Share specimen"
            >
              <Share2 size={20} color="#FFFFFF" strokeWidth={2.2} />
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      {/* 2. Specimen Identity & Nomenclature */}
      <View style={styles.identitySection}>
        <Text style={styles.commonName}>
          {species.name.replace(/\s*\([\u0600-\u06FF\s\/\-]+\)/g, '').trim()}
        </Text>
        <Text style={styles.scientificName}>{species.scientificName}</Text>
      </View>

      {/* 2B. Minimalist Ghost Icon Metrics */}
      <View style={styles.metricsGhostStrip}>
        {/* 1. Size Metric */}
        <View style={styles.metricGhostItem}>
          <View style={styles.metricIconWrap}>
            <Ruler size={20} color={Palette.moss} strokeWidth={2.2} />
          </View>
          <Text style={styles.metricGhostLabel}>SIZE</Text>
          <Text style={styles.metricGhostVal} numberOfLines={1}>
            {sizeScale.bodyMm}–{sizeScale.legSpanMm} mm
          </Text>
        </View>

        {/* 2. Habitat Metric */}
        <View style={styles.metricGhostItem}>
          <View style={styles.metricIconWrap}>
            <Trees size={20} color={Palette.moss} strokeWidth={2.2} />
          </View>
          <Text style={styles.metricGhostLabel}>HABITAT</Text>
          <Text style={styles.metricGhostVal} numberOfLines={1}>
            {species.habitat.split(',')[0]}
          </Text>
        </View>

        {/* 3. Activity Metric */}
        <View style={styles.metricGhostItem}>
          <View style={styles.metricIconWrap}>
            {isDiurnal ? (
              <Sun size={20} color={Palette.gold} strokeWidth={2.2} />
            ) : (
              <Moon size={20} color={Palette.moss} strokeWidth={2.2} />
            )}
          </View>
          <Text style={styles.metricGhostLabel}>ACTIVITY</Text>
          <Text style={styles.metricGhostVal} numberOfLines={1}>
            {species.activity || 'Nocturnal'}
          </Text>
        </View>

        {/* 4. Region Metric */}
        <View style={styles.metricGhostItem}>
          <View style={styles.metricIconWrap}>
            <Compass size={20} color={Palette.moss} strokeWidth={2.2} />
          </View>
          <Text style={styles.metricGhostLabel}>REGION</Text>
          <Text style={styles.metricGhostVal} numberOfLines={1}>
            {species.region}
          </Text>
        </View>
      </View>
    </>
  );
};
