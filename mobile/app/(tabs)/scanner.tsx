import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette, Spacing, Radii } from '@/constants/theme';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [flash, setflash] = useState(false);

  const takenPhoto = async () => {
    if (!cameraRef.current) {
      console.warn('The camera is not ready');
      return;
    }
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      if (photo?.uri) {
        console.log('Captured photo:', photo.uri);
        router.push({
          pathname: '/results',
          params: { imageUri: photo.uri },
        });
      }
    } catch (error) {
      console.error('Failed to capture photo:', error);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + Spacing.xl }]}>
      <CameraView 
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject} 
        facing="back"  
        flash={flash ? 'on' : 'off'}
      />

      {/* Top Bar with Flash Toggle */}
      <View style={styles.topBar}>
        <Pressable 
          onPress={() => setflash(!flash)} 
          style={({ pressed }) => [
            styles.circleBtn,
            flash && styles.circleBtnActive,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.circleBtnText, flash && { color: Palette.gold }]}>
            turn On
          </Text>
        </Pressable>
      </View>

      {/* Center Viewfinder Target Frame */}
      <View style={styles.viewfinder}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* Bottom Shutter Capture Button */}
      <View style={styles.bottomBar}>
        <Pressable 
          onPress={takenPhoto}
          style={({ pressed }) => [styles.shutterRing, pressed && styles.shutterPressed]}
          accessibilityRole="button"
          accessibilityLabel="Take photo"
        >
          <View style={styles.shutterInner} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.ink,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    alignItems: 'flex-start',
    zIndex: 10,
  },
  circleBtn: {
    width: 48,
    height: 48,
    borderRadius: Radii.pill,
    backgroundColor: 'rgba(23, 33, 31, 0.65)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtnActive: {
    backgroundColor: Palette.mossDark,
    borderColor: Palette.gold,
  },
  circleBtnText: {
    fontSize: 20,
    color: Palette.paper,
  },
  viewfinder: {
    width: 270,
    height: 270,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderColor: Palette.paper,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3.5,
    borderLeftWidth: 3.5,
    borderTopLeftRadius: Radii.sm,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopRightRadius: Radii.sm,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3.5,
    borderLeftWidth: 3.5,
    borderBottomLeftRadius: Radii.sm,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3.5,
    borderRightWidth: 3.5,
    borderBottomRightRadius: Radii.sm,
  },
  bottomBar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  shutterRing: {
    width: 80,
    height: 80,
    borderRadius: Radii.pill,
    borderWidth: 4,
    borderColor: Palette.paper,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 62,
    height: 62,
    borderRadius: Radii.pill,
    backgroundColor: Palette.coral,
  },
  shutterPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.85,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
});
