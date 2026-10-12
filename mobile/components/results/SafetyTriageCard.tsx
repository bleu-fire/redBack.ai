import React from 'react';
import { View, Text } from 'react-native';
import { Move, ShieldX, Bandage } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { styles } from './results.styles';

interface SafetyTriageCardProps {
  onOpenFirstAid?: () => void;
}

export const SafetyTriageCard: React.FC<SafetyTriageCardProps> = () => {
  return (
    <View style={styles.actionCard}>
      <View style={styles.actionHeaderRow}>
        <Text style={styles.actionCardTitle}>Immediate Safety Triage</Text>
      </View>

      <View style={styles.actionGridRow}>
        {/* Column 1: Keep Distance */}
        <View
          style={styles.actionGridCol}
          accessibilityLabel="Keep Distance: Stay > 1 meter away"
        >
          <View style={styles.actionIconWrap}>
            <Move size={22} color={Colors.inkPrimary} strokeWidth={2.2} />
          </View>
          <Text style={styles.actionGridTitle}>Keep Distance</Text>
          <Text style={styles.actionGridSubtitle}>&gt; 1 Meter</Text>
        </View>

        {/* 1-Pixel Column Divider */}
        <View style={styles.actionGridDivider} />

        {/* Column 2: Do Not Crush */}
        <View
          style={styles.actionGridCol}
          accessibilityLabel="Do Not Crush: Bites happen on contact"
        >
          <View style={styles.actionIconWrap}>
            <ShieldX size={22} color={Colors.crimson} strokeWidth={2.2} />
          </View>
          <Text style={styles.actionGridTitle}>Do Not Crush</Text>
          <Text style={styles.actionGridSubtitle}>Zero Contact</Text>
        </View>

        {/* 1-Pixel Column Divider */}
        <View style={styles.actionGridDivider} />

        {/* Column 3: Bite Protocol */}
        <View
          style={styles.actionGridCol}
          accessibilityLabel="Bite Protocol: Firm pressure bandage"
        >
          <View style={styles.actionIconWrap}>
            <Bandage size={22} color={Colors.amber} strokeWidth={2.2} />
          </View>
          <Text style={styles.actionGridTitle}>Bite Protocol</Text>
          <Text style={styles.actionGridSubtitle}>Firm Bandage</Text>
        </View>
      </View>
    </View>
  );
};
