import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { styles } from './chat.styles';

interface ChatHeaderProps {
  speciesName: string;
  confidenceText: string;
  showContextBanner: boolean;
  onDismissBanner: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  speciesName,
  confidenceText,
  showContextBanner,
  onDismissBanner,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
        accessibilityRole="button"
        accessibilityLabel="Back"
      >
        <ArrowLeft size={20} color={Colors.inkPrimary} strokeWidth={2.4} />
      </Pressable>

      <View style={styles.reddyProfileWrap}>
        <View style={styles.reddyAvatarContainer}>
          <Image
            source={require('@/assets/images/spider-logo-3d.png')}
            style={styles.reddyAvatarImg}
            resizeMode="cover"
          />
          <View style={styles.onlineBadgeRing} />
        </View>
        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>Reddy</Text>
          <Text style={styles.headerSubtitle}>AI Naturalist Field Guide</Text>
        </View>
      </View>

      <View style={styles.headerRightSpacer} />
    </View>
  );
};
