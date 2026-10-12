import React from 'react';
import { View, Text } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { getLookAlike, getIdentifiedTraits } from '@/data/lookAlikeData';
import { styles } from './results.styles';

interface EvidenceComparisonCardProps {
  speciesName: string;
  scientificName?: string;
  confidence?: string;
}

export const EvidenceComparisonCard: React.FC<EvidenceComparisonCardProps> = ({
  speciesName,
  scientificName = 'Latrodectus hasselti',
  confidence = '82%',
}) => {
  const lookAlike = getLookAlike(speciesName);
  const identifiedTraits = getIdentifiedTraits(speciesName);

  return (
    <View style={styles.evidenceCard}>
      {/* 1. Card Header with Match Confidence */}
      <View style={styles.evidenceHeaderRow}>
        <Text style={styles.evidenceHeaderTitle}>Identification & Look-Alike</Text>
        <View style={styles.confidencePill}>
          <Sparkles size={11} color={Colors.forestGreen} />
          <Text style={styles.confidencePillText}>{confidence} Match</Text>
        </View>
      </View>

      {/* 2. Balanced 2-Column Comparison with 1px Vertical Divider */}
      <View style={styles.comparisonGridRow}>
        {/* Left: Identified Specimen */}
        <View style={styles.comparisonCol}>
          <View style={[styles.colRoleBadge, styles.colRoleBadgeMatch]}>
            <Text style={styles.colRoleTextMatch}>IDENTIFIED</Text>
          </View>
          <Text style={styles.speciesTitle} numberOfLines={2}>
            {speciesName}
          </Text>
          <Text style={styles.scientificText} numberOfLines={1}>
            {scientificName}
          </Text>
          <View style={styles.traitsWrap}>
            {identifiedTraits.map((t, idx) => (
              <View key={idx} style={styles.traitRow}>
                <Text style={styles.traitBullet}>•</Text>
                <Text style={styles.traitText} numberOfLines={1}>
                  {t.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 1px Vertical Divider */}
        <View style={styles.comparisonDivider} />

        {/* Right: Similar Look-Alike */}
        <View style={styles.comparisonCol}>
          <View style={[styles.colRoleBadge, styles.colRoleBadgeLookalike]}>
            <Text style={styles.colRoleTextLookalike}>LOOK-ALIKE</Text>
          </View>
          <Text style={styles.speciesTitle} numberOfLines={2}>
            {lookAlike.name}
          </Text>
          <Text style={styles.scientificText} numberOfLines={1}>
            {lookAlike.scientificName}
          </Text>
          <View style={styles.traitsWrap}>
            {lookAlike.traits.map((trait, idx) => (
              <View key={idx} style={styles.traitRow}>
                <Text style={styles.traitBullet}>•</Text>
                <Text style={styles.traitText} numberOfLines={1}>
                  {trait}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

    </View>
  );
};
