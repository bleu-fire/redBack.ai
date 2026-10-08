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
  Shield,
  HelpCircle,
  Camera,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [flash, setFlash] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Capture photo from camera
  const handleTakePhoto = async () => {
    if (!cameraRef.current || isProcessing) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

  // Pick photo from device gallery
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

  // 1. Camera Permission Loading State
  if (!permission) {
    return (
      <View style={[styles.permissionScreen, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={Palette.coral} />
      </View>
    );
  }

  // 2. Camera Permission Denied / Not Granted State
  if (!permission.granted) {
    return (
      <View style={[styles.permissionScreen, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIconBadge}>
            <Camera size={36} color={Palette.coral} />
          </View>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionSubtitle}>
            redBack.ai uses your camera for real-time arachnid identification and venom safety diagnosis.
          </Text>

          <Pressable
            onPress={() => requestPermission()}
            style={({ pressed }) => [
              styles.permissionBtn,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.permissionBtnText}>Enable Camera Access</Text>
          </Pressable>

          <Pressable
            onPress={handlePickFromGallery}
            style={({ pressed }) => [
              styles.galleryFallbackBtn,
              pressed && styles.pressed,
            ]}
          >
            <ImageIcon size={18} color={Palette.ink} />
            <Text style={styles.galleryFallbackBtnText}>
              Pick Existing Photo from Gallery
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // 3. Active Camera Scanner Interface
  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + Spacing.lg,
        },
      ]}
    >
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing="back"
        flash={flash ? 'on' : 'off'}
      />

      {/* Top Bar: Back, Reticle Status Pill, Flash Toggle */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.topCircleBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Back to Home"
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </Pressable>

        <View style={styles.visionStatusPill}>
          <View style={styles.livePulseDot} />
          <Text style={styles.visionStatusText}>AI VISION READY</Text>
        </View>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setFlash(!flash);
          }}
          style={({ pressed }) => [
            styles.topCircleBtn,
            flash && styles.topCircleBtnActive,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={flash ? 'Turn flash off' : 'Turn flash on'}
        >
          {flash ? (
            <Zap size={20} color={Palette.gold} />
          ) : (
            <ZapOff size={20} color="#FFFFFF" />
          )}
        </Pressable>
      </View>

      {/* Center Viewfinder Target Reticle */}
      <View style={styles.viewfinderContainer}>
        <View style={styles.viewfinder}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Subtle crosshair indicator */}
          <View style={styles.crosshairCenter} />
        </View>

        {/* Dynamic Distance Guidance Pill */}
        <View style={styles.guidancePill}>
          <Shield size={12} color="#D2EED8" />
          <Text style={styles.guidancePillText}>
            Keep phone ~30 cm away for safe, clear focus
          </Text>
        </View>
      </View>

      {/* Bottom Controls Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomControlsRow}>
          {/* Gallery Picker Button */}
          <Pressable
            onPress={handlePickFromGallery}
            style={({ pressed }) => [
              styles.sideActionBtn,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Pick photo from gallery"
          >
            <ImageIcon size={22} color="#FFFFFF" />
            <Text style={styles.sideActionLabel}>Gallery</Text>
          </Pressable>

          {/* Central Shutter Capture Button */}
          <Pressable
            onPress={handleTakePhoto}
            disabled={isProcessing}
            style={({ pressed }) => [
              styles.shutterRing,
              pressed && styles.shutterPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Take photo"
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <View style={styles.shutterInner} />
            )}
          </Pressable>

          {/* Bite Emergency Shortcut */}
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push('/(tabs)/learn' as any);
            }}
            style={({ pressed }) => [
              styles.sideActionBtn,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="First-Aid protocols"
          >
            <HelpCircle size={22} color="#FFFFFF" />
            <Text style={styles.sideActionLabel}>First Aid</Text>
          </Pressable>
        </View>
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

  // 1. Permission Fallback Screen
  permissionScreen: {
    flex: 1,
    backgroundColor: Palette.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  permissionCard: {
    backgroundColor: Palette.paper,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: Spacing.xl,
    alignItems: 'center',
    textAlign: 'center',
    gap: Spacing.md,
    maxWidth: 380,
  },
  permissionIconBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  permissionTitle: {
    fontFamily: Typography.display,
    fontSize: 20,
    fontWeight: '800',
    color: Palette.ink,
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontFamily: Typography.body,
    fontSize: 13.5,
    color: Palette.muted,
    lineHeight: 20,
    textAlign: 'center',
  },
  permissionBtn: {
    width: '100%',
    backgroundColor: Palette.coral,
    paddingVertical: 14,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  permissionBtnText: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  galleryFallbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: Palette.surfaceSubtle,
    borderWidth: 1,
    borderColor: Palette.line,
    paddingVertical: 12,
    borderRadius: Radii.pill,
  },
  galleryFallbackBtnText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.ink,
  },

  // 2. Camera Top Bar
  topBar: {
    width: '100%',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  topCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(23, 33, 31, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCircleBtnActive: {
    backgroundColor: 'rgba(23, 33, 31, 0.9)',
    borderColor: Palette.gold,
  },
  visionStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(23, 33, 31, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ECA77',
  },
  visionStatusText: {
    fontFamily: Typography.body,
    fontSize: 10.5,
    fontWeight: '800',
    color: '#D2EED8',
    letterSpacing: 0.8,
  },

  // 3. Viewfinder Reticle
  viewfinderContainer: {
    alignItems: 'center',
    gap: 16,
  },
  viewfinder: {
    width: 270,
    height: 270,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#FFFFFF',
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
  crosshairCenter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  guidancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(23, 33, 31, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  guidancePillText: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: '#D2EED8',
    fontWeight: '600',
  },

  // 4. Bottom Controls Bar
  bottomBar: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
    zIndex: 10,
  },
  bottomControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sideActionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 60,
  },
  sideActionLabel: {
    fontFamily: Typography.body,
    fontSize: 10.5,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  shutterRing: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
