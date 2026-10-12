import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight, X } from 'lucide-react-native';
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
  return (
    <>
      <View style={styles.header}>
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

      {showContextBanner && (
        <Pressable
          onPress={() => router.push('/species/latrodectus-tredecimguttatus' as any)}
          style={({ pressed }) => [
            styles.contextBannerCard,
            pressed && styles.contextPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Observation context: ${speciesName}, ${confidenceText}`}
        >
          <View style={styles.contextBannerLeft}>
            <Image
              source={require('@/assets/images/spider-3d.png')}
              style={styles.contextThumbMini}
              resizeMode="cover"
            />
            <Text style={styles.contextBannerText} numberOfLines={1}>
              {speciesName} <Text style={styles.contextMutedDot}>•</Text> {confidenceText}
            </Text>
            <ChevronRight size={14} color={Colors.forestGreen} strokeWidth={2.4} />
          </View>

          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onDismissBanner();
            }}
            style={styles.contextDismissBtn}
            accessibilityLabel="Dismiss observation header"
          >
            <X size={15} color={Colors.inkMuted} strokeWidth={2.2} />
          </Pressable>
        </Pressable>
      )}
    </>
  );
};
