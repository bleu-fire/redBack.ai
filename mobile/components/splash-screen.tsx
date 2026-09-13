import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';

interface SplashScreenProps {
  onFinish?: () => void;
  duration?: number;
  logoVariant?: 'white' | 'original';
}

export default function CustomSplashScreen({
  onFinish,
  duration = 1800,
  logoVariant = 'white',
}: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const screenFadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in and scale up logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Fade out entire splash screen after duration
    const timer = setTimeout(() => {
      Animated.timing(screenFadeAnim, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }).start(() => {
        if (onFinish) {
          onFinish();
        }
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, fadeAnim, onFinish, scaleAnim, screenFadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: screenFadeAnim }]}>
      <StatusBar style="light" backgroundColor="#E84B3C" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={
            logoVariant === 'original'
              ? require('@/assets/design/redback-logo.png')
              : require('@/assets/design/redback-logo-white.png')
          }
          style={styles.logo}
          contentFit="contain"
          transition={200}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E84B3C',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 30,
  },
  logo: {
    width: 280,
    height: 120,
  },
});
