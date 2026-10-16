import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { AlertTriangle, PhoneCall } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { ClinicalThreatProfile } from '@/data/speciesData';
import { styles } from './ActionProtocolsSection.styles';

interface ActionEmergencyTabProps {
  threat: ClinicalThreatProfile;
  onCallEmergency: (phone: string) => void;
}

export const ActionEmergencyTab: React.FC<ActionEmergencyTabProps> = ({
  threat,
  onCallEmergency,
}) => {
  return (
    <View style={styles.actionBodyBlock}>
      <View style={styles.firstAidCard}>
        <View style={styles.firstAidHeaderRow}>
          <View style={styles.firstAidIconCircle}>
            <AlertTriangle size={17} color={Palette.danger} strokeWidth={2.4} />
          </View>
          <Text style={styles.firstAidTitle}>IMMEDIATE FIRST AID RULE</Text>
        </View>
        <Text style={styles.firstAidText}>{threat.immediateAction}</Text>
      </View>

      <View style={styles.hotlineSection}>
        <View style={styles.hotlineHeaderRow}>
          <PhoneCall size={12} color={Palette.muted} strokeWidth={2.2} />
          <Text style={styles.hotlinePrompt}>24/7 VERIFIED EMERGENCY HOTLINES</Text>
        </View>

        <View style={styles.hotlineButtonsRow}>
          <Pressable
            onPress={() => onCallEmergency('0537-68-64-64')}
            style={({ pressed }) => [
              styles.hotlineCallBtn,
              styles.hotlineCallBtnMorocco,
              pressed && styles.btnPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Call Morocco Poison Center CAPM"
          >
            <View style={styles.hotlineIconBadge}>
              <PhoneCall size={13} color="#FFFFFF" strokeWidth={2.4} />
            </View>
            <View style={styles.hotlineInfo}>
              <Text style={styles.hotlineBtnLabel} numberOfLines={1}>
                Morocco (CAPM)
              </Text>
              <Text style={styles.hotlineBtnNum} numberOfLines={1}>
                0537-68-64-64
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => onCallEmergency('13 11 26')}
            style={({ pressed }) => [
              styles.hotlineCallBtn,
              styles.hotlineCallBtnAus,
              pressed && styles.btnPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Call Australia Poisons Information"
          >
            <View style={styles.hotlineIconBadge}>
              <PhoneCall size={13} color="#FFFFFF" strokeWidth={2.4} />
            </View>
            <View style={styles.hotlineInfo}>
              <Text style={styles.hotlineBtnLabel} numberOfLines={1}>
                Australia Poisons
              </Text>
              <Text style={styles.hotlineBtnNum} numberOfLines={1}>
                13 11 26
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
