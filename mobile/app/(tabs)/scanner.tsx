import React, { useRef, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
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
} from 'lucide-react-native';
import { Colors, Spacing } from '@/constants/theme';
import { styles } from '@/components/scanner/scanner.styles';

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
