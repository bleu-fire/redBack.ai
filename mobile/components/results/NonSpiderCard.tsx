import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './results.styles';

interface NonSpiderCardProps {
  visualEvidenceList: string[];
}

export const NonSpiderCard: React.FC<NonSpiderCardProps> = ({ visualEvidenceList }) => {
  return (
    <View style={styles.nonSpiderCard}>
      <View style={styles.nonSpiderHeader}>
        <Text style={styles.nonSpiderTitle}>Specimen Verification</Text>
      </View>

      <Text style={styles.nonSpiderDescription}>
        Our multimodal AI vision analyzed this image and concluded that it does not contain an arachnid specimen.
      </Text>

      {visualEvidenceList.length > 0 && (
        <View style={styles.nonSpiderEvidenceBox}>
          {visualEvidenceList.map((item, idx) => (
            <View key={idx} style={styles.evidenceItemRow}>
              <Text style={styles.evidenceBullet}>•</Text>
              <Text style={styles.evidenceText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
