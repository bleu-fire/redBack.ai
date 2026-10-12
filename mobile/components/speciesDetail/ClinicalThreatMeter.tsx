import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  HeartPulse,
  PawPrint,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { ClinicalThreatProfile } from '@/data/speciesData';
import { styles } from './ClinicalThreatMeter.styles';

interface ClinicalThreatMeterProps {
  threat: ClinicalThreatProfile;
  showClinicalDetails: boolean;
  onToggleClinicalDetails: () => void;
}

export const ClinicalThreatMeter: React.FC<ClinicalThreatMeterProps> = ({
  threat,
  showClinicalDetails,
  onToggleClinicalDetails,
}) => {
  const isHighDanger = threat.score >= 4;
  const isMediumDanger = threat.score >= 2 && threat.score <= 3;

  let gaugeAccentColor = Palette.moss;
  if (isHighDanger) gaugeAccentColor = Palette.danger;
  else if (isMediumDanger) gaugeAccentColor = Palette.gold;

  const isPetHighRisk =
    threat.petRisk?.toLowerCase().includes('deadly') ||
    threat.petRisk?.toLowerCase().includes('severe');

  return (
    <View style={styles.clinicalDiagnosticCard}>
      <View style={styles.clinicalHeader}>
        <View style={styles.clinicalHeaderLeft}>
          <Text style={styles.clinicalCardEyebrow}>CLINICAL THREAT METER</Text>
          <Text style={styles.clinicalCardTitle}>{threat.levelTitle}</Text>
        </View>

        <View
          style={[
            styles.clinicalScoreBadge,
            { backgroundColor: isHighDanger ? Palette.coralSoft : Palette.mossSoft },
          ]}
        >
          <Text
            style={[
              styles.clinicalScoreBadgeText,
              { color: gaugeAccentColor },
            ]}
          >
            LEVEL {threat.score} / 5
          </Text>
        </View>
      </View>

      {/* 6-Segment Visual Danger Gauge */}
      <View style={styles.gaugeBarRow}>
        {[0, 1, 2, 3, 4, 5].map((level) => {
          const isFilled = level <= threat.score;
          let segColor = '#EAE6DE';
          if (isFilled) {
            if (level >= 4) segColor = Palette.danger;
            else if (level >= 2) segColor = Palette.gold;
            else segColor = Palette.moss;
          }

          return (
            <View
              key={level}
              style={[
                styles.gaugeSegment,
                { backgroundColor: segColor },
                level === threat.score && styles.gaugeSegmentCurrent,
              ]}
            />
          );
        })}
      </View>

      {/* 3-Column Ghost Diagnostic Trio */}
      <View style={styles.compactTrioRow}>
        {/* 1. Human Risk */}
        <View style={styles.compactTrioCol}>
          <View style={styles.compactTrioIconWrap}>
            <HeartPulse
              size={20}
              color={isHighDanger ? Palette.danger : Palette.moss}
              strokeWidth={2.2}
            />
          </View>
          <Text style={styles.compactTrioLabel}>HUMAN</Text>
          <Text
            style={[styles.compactTrioVal, isHighDanger && { color: Palette.danger }]}
            numberOfLines={1}
          >
            {isHighDanger ? 'High Hazard' : isMediumDanger ? 'Caution' : 'Low Risk'}
          </Text>
        </View>

        {/* 2. Pet Risk */}
        <View style={styles.compactTrioCol}>
          <View style={styles.compactTrioIconWrap}>
            <PawPrint
              size={20}
              color={isPetHighRisk ? Palette.danger : Palette.moss}
              strokeWidth={2.2}
            />
          </View>
          <Text style={styles.compactTrioLabel}>PETS</Text>
          <Text
            style={[styles.compactTrioVal, isPetHighRisk && { color: Palette.danger }]}
            numberOfLines={1}
          >
            {isPetHighRisk ? 'High Risk' : 'Safe / Mild'}
          </Text>
        </View>

        {/* 3. Timeline */}
        <View style={styles.compactTrioCol}>
          <View style={styles.compactTrioIconWrap}>
            <Clock size={20} color={Palette.ink} strokeWidth={2.2} />
          </View>
          <Text style={styles.compactTrioLabel}>TIMELINE</Text>
          <Text style={styles.compactTrioVal} numberOfLines={1}>
            {threat.symptomTimeline?.toLowerCase().includes('1-3')
              ? '1–3h Peak'
              : threat.symptomTimeline?.toLowerCase().includes('rapid')
              ? 'Rapid'
              : 'Mild'}
          </Text>
        </View>
      </View>

      {/* Progressive Disclosure Action */}
      <Pressable
        onPress={onToggleClinicalDetails}
        style={({ pressed }) => [styles.clinicalDisclosureBtn, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={
          showClinicalDetails ? 'Hide clinical analysis' : 'View full clinical analysis'
        }
      >
        <Text style={styles.clinicalDisclosureText}>
          {showClinicalDetails ? 'Hide clinical analysis' : 'View full clinical analysis'}
        </Text>
        {showClinicalDetails ? (
          <ChevronUp size={14} color={Palette.muted} />
        ) : (
          <ChevronDown size={14} color={Palette.muted} />
        )}
      </Pressable>

      {/* Deep Details Drawer */}
      {showClinicalDetails && (
        <View style={styles.clinicalDetailsDrawer}>
          <Text style={styles.clinicalSummary}>{threat.summary}</Text>
          <View style={styles.drawerDetailRow}>
            <Text style={styles.drawerDetailLabel}>Clinical pathology:</Text>
            <Text style={styles.drawerDetailText}>{threat.humanRisk}</Text>
          </View>
          <View style={styles.drawerDetailRow}>
            <Text style={styles.drawerDetailLabel}>Veterinary impact:</Text>
            <Text style={styles.drawerDetailText}>{threat.petRisk}</Text>
          </View>
          <View style={styles.drawerDetailRow}>
            <Text style={styles.drawerDetailLabel}>Symptom timeline:</Text>
            <Text style={styles.drawerDetailText}>{threat.symptomTimeline}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
