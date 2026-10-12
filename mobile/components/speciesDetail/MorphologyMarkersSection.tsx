import React from 'react';
import { View, Text } from 'react-native';
import { Eye, CheckCircle2 } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { SpeciesDetail } from '@/data/speciesData';
import { styles } from './MorphologyMarkersSection.styles';

interface MorphologyMarkersSectionProps {
  morphology: SpeciesDetail['morphology'];
}

export const MorphologyMarkersSection: React.FC<MorphologyMarkersSectionProps> = ({
  morphology,
}) => {
  return (
    <View style={styles.fieldIdentityCard}>
      <Text style={styles.fieldEyebrow}>FIELD IDENTIFICATION</Text>
      <Text style={styles.fieldTitle}>Diagnostic Morphological Markers</Text>

      <View style={styles.eyePatternBox}>
        <View style={styles.eyePatternHeader}>
          <Eye size={16} color={Palette.ink} />
          <Text style={styles.eyePatternTitle}>Eye Arrangement</Text>
        </View>
        <Text style={styles.eyePatternDesc}>
          {morphology.eyePattern}
        </Text>
      </View>

      <View style={styles.keyFeaturesList}>
        {morphology.keyFeatures.map((feat, idx) => (
          <View key={idx} style={styles.featureItemRow}>
            <CheckCircle2 size={16} color={Palette.moss} style={{ marginTop: 2 }} />
            <Text style={styles.featureItemText}>{feat}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
