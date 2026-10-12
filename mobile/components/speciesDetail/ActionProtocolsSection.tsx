import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Box,
  Layers,
  TreePine,
  PhoneCall,
} from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { SpeciesDetail, ClinicalThreatProfile } from '@/data/speciesData';
import { ActionProtocol } from './speciesDetail.types';
import { styles } from './ActionProtocolsSection.styles';

interface ActionProtocolsSectionProps {
  species?: SpeciesDetail;
  threat: ClinicalThreatProfile;
  activeAction: ActionProtocol;
  onSelectAction: (action: ActionProtocol) => void;
  onCallEmergency: (phone: string) => void;
}

export const ActionProtocolsSection: React.FC<ActionProtocolsSectionProps> = ({
  threat,
  activeAction,
  onSelectAction,
  onCallEmergency,
}) => {
  const isHighDanger = threat.score >= 4;
  const isMediumDanger = threat.score >= 2 && threat.score <= 3;

  return (
    <View style={styles.actionsProtocolCard}>
      {/* 1. Header with Eyebrow & Naturalist Headline */}
      <View style={styles.actionsHeader}>
        <Text style={styles.actionsEyebrow}>ACTION PROTOCOL</Text>
        <Text style={styles.actionsTitle}>What should you do right now?</Text>
      </View>

      {/* 2. 3-Way Balanced Action Tab Switcher with Micro-Icons */}
      <View style={styles.actionsTabRow}>
        <Pressable
          onPress={() => onSelectAction('threat')}
          style={({ pressed }) => [
            styles.actionTab,
            activeAction === 'threat' && styles.actionTabActive,
            pressed && styles.tabPressed,
          ]}
          accessibilityRole="tab"
          accessibilityLabel="Is It Safe? threat assessment tab"
        >
          {activeAction === 'threat' ? (
            <ShieldAlert size={13} color="#FFFFFF" strokeWidth={2.2} />
          ) : (
            <ShieldCheck size={13} color={Palette.muted} strokeWidth={2} />
          )}
          <Text
            numberOfLines={1}
            style={[
              styles.actionTabText,
              activeAction === 'threat' && styles.actionTabTextActive,
            ]}
          >
            Is It Safe?
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onSelectAction('relocate')}
          style={({ pressed }) => [
            styles.actionTab,
            activeAction === 'relocate' && styles.actionTabActive,
            pressed && styles.tabPressed,
          ]}
          accessibilityRole="tab"
          accessibilityLabel="Safe Removal relocation tab"
        >
          <Box
            size={13}
            color={activeAction === 'relocate' ? '#FFFFFF' : Palette.muted}
            strokeWidth={activeAction === 'relocate' ? 2.2 : 2}
          />
          <Text
            numberOfLines={1}
            style={[
              styles.actionTabText,
              activeAction === 'relocate' && styles.actionTabTextActive,
            ]}
          >
            Safe Removal
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onSelectAction('emergency')}
          style={({ pressed }) => [
            styles.actionTab,
            activeAction === 'emergency' && styles.actionTabActive,
            pressed && styles.tabPressed,
          ]}
          accessibilityRole="tab"
          accessibilityLabel="Bite Protocol emergency first aid tab"
        >
          <PhoneCall
            size={13}
            color={activeAction === 'emergency' ? '#FFFFFF' : Palette.muted}
            strokeWidth={activeAction === 'emergency' ? 2.2 : 2}
          />
          <Text
            numberOfLines={1}
            style={[
              styles.actionTabText,
              activeAction === 'emergency' && styles.actionTabTextActive,
            ]}
          >
            Bite Protocol
          </Text>
        </Pressable>
      </View>

      {/* 3. Balanced Content Cards */}

      {/* Tab 1: Is It Safe (Assessment) */}
      {activeAction === 'threat' && (
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
                    {isHighDanger
                      ? 'Medically Significant'
                      : isMediumDanger
                      ? 'Moderate Hazard'
                      : 'Harmless Ally'}
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

            <Text style={styles.assessmentExplanationText}>
              {threat.humanRisk}
            </Text>
          </View>
        </View>
      )}

      {/* Tab 2: Safe Removal (Process) */}
      {activeAction === 'relocate' && (
        <View style={styles.actionBodyBlock}>
          <View style={styles.removalFlowRow}>
            <View style={styles.removalFlowCol}>
              <View style={styles.stepIconWrap}>
                <Box size={20} color={Palette.moss} strokeWidth={2.2} />
              </View>
              <Text style={styles.stepTitle}>1. Cover</Text>
              <Text style={styles.stepSubtitle} numberOfLines={1}>
                Jar or tub
              </Text>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.removalFlowCol}>
              <View style={styles.stepIconWrap}>
                <Layers size={20} color={Palette.moss} strokeWidth={2.2} />
              </View>
              <Text style={styles.stepTitle}>2. Slide</Text>
              <Text style={styles.stepSubtitle} numberOfLines={1}>
                Stiff card
              </Text>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.removalFlowCol}>
              <View style={styles.stepIconWrap}>
                <TreePine size={20} color={Palette.moss} strokeWidth={2.2} />
              </View>
              <Text style={styles.stepTitle}>3. Release</Text>
              <Text style={styles.stepSubtitle} numberOfLines={1}>
                Outdoors
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Tab 3: Bite Protocol (First Aid & Emergency) */}
      {activeAction === 'emergency' && (
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
              <Text style={styles.hotlinePrompt}>
                24/7 VERIFIED EMERGENCY HOTLINES
              </Text>
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
      )}
    </View>
  );
};

export default ActionProtocolsSection;
