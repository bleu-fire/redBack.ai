import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import {
  Zap,
  ZapOff,
  Image as ImageIcon,
  ArrowLeft,
  Camera,
  Plus,
  Focus,
} from 'lucide-react-native';
import { Colors, Spacing, Radii, Typography, TouchTargets } from '@/constants/theme';


export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [flash, setFlash] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<'0.5x' | '1x' | '2x'>('1x');

  // Capture photo from camera
  const handleTakePhoto = async () => {
    if (!cameraRef.current || isProcessing) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      if (photo?.uri) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.push({
          pathname: '/results',
          params: { imageUri: photo.uri },
        });
      }
    } catch (error) {
      console.error('Failed to capture photo:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Pick photo from gallery
  const handlePickFromGallery = async () => {
    if (isProcessing) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.push({
          pathname: '/results',
          params: { imageUri: result.assets[0].uri },
        });
      }
    } catch (error) {
      console.error('Failed to pick image from gallery:', error);
    }
  };

  // 1. Permission Loading State
  if (!permission) {
    return (
      <View style={[styles.permissionScreen, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={Colors.forestGreen} />
      </View>
    );
  }

  // 2. Permission Denied State
  if (!permission.granted) {
    return (
      <View style={[styles.permissionScreen, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIconBadge}>
            <Camera size={36} color={Colors.forestGreen} />
          </View>
          <Text style={styles.permissionTitle}>Field Camera Access</Text>
          <Text style={styles.permissionSubtitle}>
            redBack.ai requires camera permissions to capture specimen morphology, detect danger levels, and provide offline first-aid protocols.
          </Text>

          <Pressable
            onPress={() => requestPermission()}
            style={({ pressed }) => [styles.permissionBtn, pressed && styles.pressed]}
          >
            <Text style={styles.permissionBtnText}>Enable Camera</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* FULL SCREEN CAMERA VIEWPORT */}
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        enableTorch={flash}
        facing="back"
      />

      {/* TOP TACTICAL HUD */}
      <View style={[styles.topHud, { paddingTop: insets.top + Spacing.sm }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.hudIconButton, pressed && styles.pressed]}
          accessibilityLabel="Back"
        >
          <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </Pressable>

        {/* Minimal Location & Status Pill */}
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusPillText}>GPS: High Atlas • Offline Ready</Text>
        </View>

        {/* Flash Toggle Button */}
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setFlash(!flash);
          }}
          style={({ pressed }) => [
            styles.hudIconButton,
            flash && styles.hudIconButtonActive,
            pressed && styles.pressed,
          ]}
          accessibilityLabel="Toggle Torch"
        >
          {flash ? (
            <Zap size={20} color={Colors.gold} strokeWidth={2.5} />
          ) : (
            <ZapOff size={20} color="#FFFFFF" strokeWidth={2} />
          )}
        </Pressable>
      </View>

      {/* CENTER VIEWFINDER RETICLE */}
      <View style={styles.viewfinderContainer} pointerEvents="none">
        <View style={styles.reticleBox}>
          {/* Tactical Corner Brackets */}
          <View style={[styles.reticleCorner, styles.cornerTL]} />
          <View style={[styles.reticleCorner, styles.cornerTR]} />
          <View style={[styles.reticleCorner, styles.cornerBL]} />
          <View style={[styles.reticleCorner, styles.cornerBR]} />
        </View>

        {/* Floating Macro Guidance Text */}
        <View style={styles.guidancePill}>
          <Focus size={13} color="#FFFFFF" />
          <Text style={styles.guidanceText}>Hold steady • 20–30cm macro focus</Text>
        </View>

        {/* Optical Zoom Level Selector */}
        <View style={styles.zoomSelector}>
          {(['0.5x', '1x', '2x'] as const).map((z) => (
            <Pressable
              key={z}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setZoomLevel(z);
              }}
              style={[styles.zoomPill, zoomLevel === z && styles.zoomPillActive]}
            >
              <Text style={[styles.zoomText, zoomLevel === z && styles.zoomTextActive]}>
                {z}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* BOTTOM FIELD ACTION DECK */}
      <View style={[styles.bottomDeck, { paddingBottom: insets.bottom + Spacing.lg }]}>
        {/* Gallery Import (Tactile Button) */}
        <Pressable
          onPress={handlePickFromGallery}
          disabled={isProcessing}
          style={({ pressed }) => [styles.sideDeckButton, pressed && styles.pressed]}
          accessibilityLabel="Import from Gallery"
        >
          <ImageIcon size={22} color="#FFFFFF" strokeWidth={2} />
        </Pressable>

        {/* Mega Shutter Button (72x72dp Forest Green Double Ring) */}
        <Pressable
          onPress={handleTakePhoto}
          disabled={isProcessing}
          accessibilityLabel="Capture Specimen Photo"
          style={({ pressed }) => [
            styles.shutterOuterRing,
            pressed && styles.shutterPressed,
          ]}
        >
          <View style={styles.shutterInnerCircle}>
            {isProcessing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : null}
          </View>
        </Pressable>

        {/* Direct Emergency SOS Trigger */}
        <Pressable
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            router.push('/(tabs)/learn' as any);
          }}
          style={({ pressed }) => [styles.sosDeckButton, pressed && styles.pressed]}
          accessibilityLabel="Emergency Bite Protocol"
        >
          <Plus size={20} color="#FFFFFF" strokeWidth={3} />
          <Text style={styles.sosText}>SOS</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // HUD Top
  topHud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    zIndex: 10,
  },
  hudIconButton: {
    width: TouchTargets.iconBtn,
    height: TouchTargets.iconBtn,
    borderRadius: Radii.pill,
    backgroundColor: 'rgba(24, 32, 30, 0.65)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hudIconButtonActive: {
    backgroundColor: 'rgba(250, 176, 5, 0.25)',
    borderColor: Colors.gold,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radii.pill,
    backgroundColor: 'rgba(24, 32, 30, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.forestGreen,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  // Viewfinder
  viewfinderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  reticleBox: {
    width: 270,
    height: 270,
    position: 'relative',
  },
  reticleCorner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#FFFFFF',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3.5,
    borderLeftWidth: 3.5,
    borderTopLeftRadius: 10,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopRightRadius: 10,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3.5,
    borderLeftWidth: 3.5,
    borderBottomLeftRadius: 10,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3.5,
    borderRightWidth: 3.5,
    borderBottomRightRadius: 10,
  },

  guidancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(24, 32, 30, 0.75)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  guidanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  zoomSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(24, 32, 30, 0.65)',
    borderRadius: Radii.pill,
    padding: 3,
    gap: 4,
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  zoomPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  zoomPillActive: {
    backgroundColor: Colors.forestGreen,
  },
  zoomText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#CCCCCC',
  },
  zoomTextActive: {
    color: '#FFFFFF',
  },

  // Bottom Action Deck
  bottomDeck: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.xxl,
    zIndex: 10,
  },
  sideDeckButton: {
    width: TouchTargets.iconBtn,
    height: TouchTargets.iconBtn,
    borderRadius: Radii.md,
    backgroundColor: 'rgba(24, 32, 30, 0.8)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 3,
    borderBottomColor: '#121816',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosDeckButton: {
    width: TouchTargets.iconBtn,
    height: TouchTargets.iconBtn,
    borderRadius: Radii.md,
    backgroundColor: Colors.crimson,
    borderWidth: 1.5,
    borderColor: '#EE4A4A',
    borderBottomWidth: 3,
    borderBottomColor: Colors.crimsonDark,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  sosText: {
    fontSize: 8.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Mega Shutter
  shutterOuterRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  shutterInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.forestGreen,
    borderWidth: 1.5,
    borderColor: '#389A4B',
    borderBottomWidth: 3.5,
    borderBottomColor: Colors.forestDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterPressed: {
    transform: [{ scale: 0.94 }],
  },

  // Permissions
  permissionScreen: {
    flex: 1,
    backgroundColor: Colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  permissionCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
    padding: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.md,
    width: '100%',
  },
  permissionIconBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.sageSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionTitle: {
    fontSize: Typography.h3.fontSize,
    fontWeight: '800',
    color: Colors.inkPrimary,
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontSize: Typography.caption.fontSize,
    color: Colors.inkMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  permissionBtn: {
    backgroundColor: Colors.forestGreen,
    borderWidth: 1.5,
    borderColor: '#389A4B',
    borderBottomWidth: 3,
    borderBottomColor: Colors.forestDark,
    borderRadius: Radii.lg,
    paddingVertical: 14,
    paddingHorizontal: Spacing.xxl,
    width: '100%',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  permissionBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
});
