import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { router } from 'expo-router';
import { Camera, ArrowRight, Clock, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Palette, Radii, Typography } from '@/constants/theme';

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
              <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
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
      {/* 3D Spider resting in natural background */}
      <Image
        source={image}
        style={styles.discoverySpiderImage}
        resizeMode="cover"
      />

      {/* Smooth linear gradient overlay from transparent to dark moss */}
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
              <Camera size={22} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Base Card Styles
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },

  // 1. Discovery Styles
  discoveryCard: {
    height: 200,
    backgroundColor: '#1C2E26',
    justifyContent: 'flex-end',
  },
  discoverySpiderImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  discoveryGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  discoveryBottomContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  discoveryTextContainer: {
    flex: 1,
    paddingRight: 14,
  },
  discoveryTitle: {
    fontFamily: Typography.display,
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  discoverySubtitle: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: '#E6EFEA',
    lineHeight: 17,
  },
  shutterActionGroup: {
    alignItems: 'center',
    gap: 3,
  },
  cameraShutterButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Palette.forestGreen,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderBottomWidth: 4,
    borderBottomColor: Palette.forestGreenDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Palette.forestGreenDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },

  // 2. Lesson Styles
  lessonCard: {
    backgroundColor: Palette.moss,
    padding: 20,
    minHeight: 180,
  },
  lessonContent: {
    zIndex: 2,
    maxWidth: '75%',
  },
  lessonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '133%',
    marginTop: 14,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  metaPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  coralCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 3. Spotlight Styles
  spotlightCard: {
    backgroundColor: '#1C2E25',
    paddingVertical: 18,
    paddingHorizontal: 16,
    minHeight: 175,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotlightContent: {
    flex: 1.1,
    zIndex: 2,
    paddingRight: 8,
  },
  spotlightTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8BA096',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  spotlightSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: '#C5C9C8',
    lineHeight: 16,
    marginBottom: 14,
  },
  whitePillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FDEBE7',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
  },
  pillBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },

  // Shared Typography & Artwork
  sideSpiderArt: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 175,
    height: 175,
    zIndex: 1,
  },
  tag: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: '#E6EFEA',
    marginBottom: 4,
  },
  title: {
    fontFamily: Typography.display,
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  titleLarge: {
    fontFamily: Typography.display,
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: '#E6EFEA',
    lineHeight: 17,
  },
});

export default HeroCard;
