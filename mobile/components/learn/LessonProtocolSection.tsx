import React from 'react';
import { View, Text } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { ProtocolRule } from '@/data/learningData';
import { getProtocolParts } from './learnUtils';
import { styles } from './lessonProtocol.styles';

interface LessonProtocolSectionProps {
  dosAndDonts: {
    dos: (ProtocolRule | string)[];
    donts: (ProtocolRule | string)[];
  };
}

export const LessonProtocolSection: React.FC<LessonProtocolSectionProps> = ({
  dosAndDonts,
}) => {
  return (
    <View style={styles.protocolSection}>
      <View style={styles.protocolSectionHeader}>
        <Text style={styles.protocolSectionEyebrow}>CLINICAL PROTOCOL</Text>
        <Text style={styles.protocolSectionTitle}>Action & Safety Standards</Text>
      </View>

      {/* Mandatory Protocol (DO) Card */}
      <View style={styles.protocolCard}>
        <View style={styles.protocolCardHeader}>
          <View style={styles.protocolHeaderLeft}>
            <View style={styles.protocolIconCircle}>
              <Check size={16} color={Palette.forestGreen} strokeWidth={2.8} />
            </View>
            <Text style={styles.protocolCardTitle}>Mandatory Actions</Text>
          </View>
          <View style={styles.protocolBadgeDo}>
            <Text style={styles.protocolBadgeDoText}>DO</Text>
          </View>
        </View>

        <View style={styles.protocolItemsList}>
          {dosAndDonts.dos.map((rawItem, dIdx) => {
            const { lead, detail } = getProtocolParts(rawItem);
            const isLast = dIdx === dosAndDonts.dos.length - 1;
            return (
              <View
                key={dIdx}
                style={[styles.protocolRow, !isLast && styles.protocolRowBorder]}
              >
                <View style={styles.protocolIndexPill}>
                  <Text style={styles.protocolIndexText}>{dIdx + 1}</Text>
                </View>
                <View style={styles.protocolTextCol}>
                  <Text style={styles.protocolLeadText}>{lead}</Text>
                  {detail ? (
                    <Text style={styles.protocolDetailText}>{detail}</Text>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Prohibited Actions (DO NOT) Card */}
      <View style={[styles.protocolCard, styles.protocolCardDont]}>
        <View style={styles.protocolCardHeader}>
          <View style={styles.protocolHeaderLeft}>
            <View style={styles.protocolIconCircleDont}>
              <X size={16} color={Palette.danger} strokeWidth={2.8} />
            </View>
            <Text style={styles.protocolCardTitle}>
              Critical Contraindications
            </Text>
          </View>
          <View style={styles.protocolBadgeDont}>
            <Text style={styles.protocolBadgeDontText}>DO NOT</Text>
          </View>
        </View>

        <View style={styles.protocolItemsList}>
          {dosAndDonts.donts.map((rawItem, dIdx) => {
            const { lead, detail } = getProtocolParts(rawItem);
            const isLast = dIdx === dosAndDonts.donts.length - 1;
            return (
              <View
                key={dIdx}
                style={[styles.protocolRow, !isLast && styles.protocolRowBorder]}
              >
                <View style={styles.protocolIndexPillDont}>
                  <Text style={styles.protocolIndexTextDont}>{dIdx + 1}</Text>
                </View>
                <View style={styles.protocolTextCol}>
                  <Text style={styles.protocolLeadText}>{lead}</Text>
                  {detail ? (
                    <Text style={styles.protocolDetailText}>{detail}</Text>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
