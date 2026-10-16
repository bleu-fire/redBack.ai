import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ShieldAlert, ShieldCheck, Box, PhoneCall } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { SpeciesDetail, ClinicalThreatProfile } from '@/data/speciesData';
import { ActionProtocol } from './speciesDetail.types';
import { ActionThreatTab } from './ActionThreatTab';
import { ActionRelocateTab } from './ActionRelocateTab';
import { ActionEmergencyTab } from './ActionEmergencyTab';
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
      <View style={styles.actionsHeader}>
        <Text style={styles.actionsEyebrow}>ACTION PROTOCOL</Text>
        <Text style={styles.actionsTitle}>What should you do right now?</Text>
      </View>

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
            style={[styles.actionTabText, activeAction === 'threat' && styles.actionTabTextActive]}
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
            style={[styles.actionTabText, activeAction === 'relocate' && styles.actionTabTextActive]}
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
            style={[styles.actionTabText, activeAction === 'emergency' && styles.actionTabTextActive]}
          >
            Bite Protocol
          </Text>
        </Pressable>
      </View>

      {activeAction === 'threat' && (
        <ActionThreatTab
          threat={threat}
          isHighDanger={isHighDanger}
          isMediumDanger={isMediumDanger}
        />
      )}

      {activeAction === 'relocate' && <ActionRelocateTab />}

      {activeAction === 'emergency' && (
        <ActionEmergencyTab threat={threat} onCallEmergency={onCallEmergency} />
      )}
    </View>
  );
};

export default ActionProtocolsSection;
