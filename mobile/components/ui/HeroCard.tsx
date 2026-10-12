import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { router } from 'expo-router';
import { Camera, ArrowRight, Clock, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Palette } from '@/constants/theme';
import { styles } from './HeroCard.styles';

export type HeroCardVariant = 'discovery' | 'lesson' | 'spotlight';

export interface HeroCardProps {
  variant?: HeroCardVariant;
  title?: string;
  subtitle?: string;
  tag?: string;
  duration?: string;
  xp?: string;
  buttonText?: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
  style?: ViewStyle;
}

const DEFAULT_SPIDER = require('@/assets/images/spider-3d.png');

export function HeroCard({
  variant = 'discovery',
  title,
  subtitle,
  tag,
  duration = '10 min',
  xp = '+50 XP',
  buttonText = 'Explore species',
  image = DEFAULT_SPIDER,
  onPress,
  style,
}: HeroCardProps) {

  // 1. LESSON CARD (Learn Tab)
  if (variant === 'lesson') {
    return (
      <Pressable
        onPress={onPress || (() => router.push('/(tabs)/learn'))}
        style={({ pressed }) => [styles.card, styles.lessonCard, style, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`${tag || "Today's lesson"}: ${title || 'Spider Anatomy'}`}
      >
        <Image source={image} style={styles.sideSpiderArt} resizeMode="contain" />

        <View style={styles.lessonContent}>
          <Text style={styles.tag}>{tag || "Today's lesson"}</Text>
          <Text style={styles.titleLarge}>{title || 'Spider Anatomy'}</Text>
          <Text style={styles.subtitle}>{subtitle || 'Explore the remarkable design behind their success.'}</Text>

          <View style={styles.lessonFooter}>
            <View style={styles.pillRow}>
              <View style={styles.metaPill}>
                <Clock size={12} color="#E6EFEA" />
                <Text style={styles.metaPillText}>{duration}</Text>
              </View>
              <View style={styles.metaPill}>
                <Sparkles size={12} color={Palette.gold} />
                <Text style={[styles.metaPillText, { color: Palette.goldSoft }]}>{xp}</Text>
              </View>
            </View>

            <View style={styles.coralCircleBtn}>
              <ArrowRight size={22} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  // 2. SPOTLIGHT CARD (Explore Tab)
  if (variant === 'spotlight') {
    return (
      <Pressable
        onPress={onPress || (() => router.push('/(tabs)/explore'))}
        style={({ pressed }) => [styles.card, styles.spotlightCard, style, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`${tag || 'SPOTLIGHT SPECIES'}: ${title || 'Redback spider'}`}
      >
        <Image source={image} style={styles.sideSpiderArt} resizeMode="contain" />

        <View style={styles.spotlightContent}>
          <Text style={styles.spotlightTag}>{tag || 'SPOTLIGHT SPECIES'}</Text>
          <Text style={styles.title}>{title || 'Redback spider'}</Text>
          <Text style={styles.spotlightSubtitle}>
            {subtitle || "Small spider. Big story. Learn about one of Australia's most fascinating species."}
          </Text>

          <View style={styles.whitePillBtn}>
            <Text style={styles.pillBtnText}>{buttonText}</Text>
            <ArrowRight size={13} color={Palette.ink} strokeWidth={2} />
          </View>
        </View>
      </Pressable>
    );
  }

  // 3. DISCOVERY CARD (Screen 3 Master UI - Identify a spider)
  return (
    <Pressable
      onPress={onPress || (() => router.push('/(tabs)/scanner' as any))}
      style={({ pressed }) => [styles.card, styles.discoveryCard, style, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={title || 'Identify a spider'}
    >
      <Image
        source={image}
        style={styles.discoverySpiderImage}
        resizeMode="cover"
      />

      <LinearGradient
        colors={['transparent', 'rgba(16, 26, 21, 0.40)', 'rgba(10, 18, 14, 0.94)']}
        locations={[0, 0.45, 1]}
        style={styles.discoveryGradient}
      >
        <View style={styles.discoveryBottomContent}>
          <View style={styles.discoveryTextContainer}>
            <Text style={styles.discoveryTitle}>{title || 'Identify a spider'}</Text>
            <Text style={styles.discoverySubtitle}>
              {subtitle || 'Take a photo to find out what spider it is.'}
            </Text>
          </View>

          <View style={styles.shutterActionGroup}>
            <View style={styles.cameraShutterButton}>
              <Camera size={26} color="#FFFFFF" strokeWidth={2.2} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export default HeroCard;
