import React from 'react';
import { View, Text } from 'react-native';
import { Box, Layers, TreePine } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { styles } from './ActionProtocolsSection.styles';

export const ActionRelocateTab: React.FC = () => {
  return (
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
  );
};
