import React from 'react';
import { View, Text } from 'react-native';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { ClinicalThreatProfile } from '@/data/speciesData';
import { styles } from './ActionProtocolsSection.styles';

interface ActionThreatTabProps {
  threat: ClinicalThreatProfile;
  isHighDanger: boolean;
  isMediumDanger: boolean;
}

export const ActionThreatTab: React.FC<ActionThreatTabProps> = ({
  threat,
  isHighDanger,
  isMediumDanger,
}) => {
  return (
    <View style={styles.actionBodyBlock}>
      <View
        style={[
          styles.assessmentCard,
          isHighDanger
            ? styles.assessmentCardDanger
            : isMediumDanger
            ? styles.assessmentCardModerate
            : styles.assessmentCardSafe,
        ]}
      >
        <View style={styles.assessmentHeaderRow}>
          <View style={styles.assessmentHeaderLeft}>
            <View style={styles.assessmentIconCircle}>
              {isHighDanger ? (
                <ShieldAlert size={20} color={Palette.danger} strokeWidth={2.4} />
              ) : isMediumDanger ? (
                <AlertTriangle size={20} color={Palette.amber} strokeWidth={2.4} />
              ) : (
                <ShieldCheck size={20} color={Palette.moss} strokeWidth={2.4} />
              )}
            </View>
            <View style={styles.assessmentTitleGroup}>
              <Text style={styles.assessmentEyebrow}>THREAT VERDICT</Text>
              <Text style={styles.assessmentVerdictTitle}>
                {isHighDanger ? 'Medically Significant' : isMediumDanger ? 'Moderate Hazard' : 'Harmless Ally'}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.assessmentScoreBadge,
              isHighDanger
                ? styles.assessmentScoreBadgeDanger
                : isMediumDanger
                ? styles.assessmentScoreBadgeModerate
                : styles.assessmentScoreBadgeSafe,
            ]}
          >
            <Text
              style={[
                styles.assessmentScoreBadgeText,
                isHighDanger
                  ? styles.assessmentScoreBadgeTextDanger
                  : isMediumDanger
                  ? styles.assessmentScoreBadgeTextModerate
                  : styles.assessmentScoreBadgeTextSafe,
              ]}
            >
              Level {threat.score}/5
            </Text>
          </View>
        </View>

        <Text style={styles.assessmentExplanationText}>{threat.humanRisk}</Text>
      </View>
    </View>
  );
};
