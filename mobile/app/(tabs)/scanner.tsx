import React, { useRef, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Zap, ZapOff, Image as ImageIcon, ArrowLeft, Camera, Plus } from 'lucide-react-native';
import { Colors, Spacing } from '@/constants/theme';
import { uploadSpiderImage } from '@/data/api/logic';
import { styles } from '@/components/scanner/scanner.styles';

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [flash, setFlash] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const processAndIdentify = async (uri: string) => {
    setIsProcessing(true);
    try {
      const response = await uploadSpiderImage(uri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.push({
        pathname: '/results',
        params: { imageUri: uri, identificationData: JSON.stringify(response) },
      });
    } catch (error: any) {
      console.warn('Backend identification offline, navigating with photo:', error?.message);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      router.push({ pathname: '/results', params: { imageUri: uri } });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTakePhoto = async () => {
    if (!cameraRef.current || isProcessing) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });
      if (photo?.uri) {
        await processAndIdentify(photo.uri);
      } else {
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('Failed to capture photo:', error);
      setIsProcessing(false);
      Alert.alert(
        'Camera Busy',
        'Could not capture image. You can try again or choose from your gallery.',
        [
          { text: 'OK', style: 'cancel' },
          { text: 'Gallery', onPress: () => handlePickFromGallery() },
        ]
      );
    }
  };

  const handlePickFromGallery = async () => {
    if (isProcessing) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]?.uri) {
        await processAndIdentify(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Failed to pick image from gallery:', error);
      setIsProcessing(false);
    }
  };

  if (!permission) {
    return (
      <View style={[styles.permissionScreen, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={Colors.forestGreen} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.permissionScreen, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIconBadge}>
            <Camera size={36} color={Colors.forestGreen} />
          </View>
          <Text style={styles.permissionTitle}>Field Camera Access</Text>
          <Text style={styles.permissionSubtitle}>
            redBack.ai requires camera permissions to capture specimen morphology and danger levels.
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
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        enableTorch={flash}
        facing="back"
        mode="picture"
        onCameraReady={() => setIsCameraReady(true)}
      />

      <View style={[styles.topHud, { paddingTop: insets.top + Spacing.sm }]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.hudIconButton, pressed && styles.pressed]}
          accessibilityLabel="Back"
        >
          <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </Pressable>

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

      <View style={styles.viewfinderContainer} pointerEvents="none">
        <View style={styles.reticleBox}>
          <View style={[styles.reticleCorner, styles.cornerTL]} />
          <View style={[styles.reticleCorner, styles.cornerTR]} />
          <View style={[styles.reticleCorner, styles.cornerBL]} />
          <View style={[styles.reticleCorner, styles.cornerBR]} />
        </View>
      </View>

      <View style={[styles.bottomDeck, { paddingBottom: insets.bottom + Spacing.lg }]}>
        <Pressable
          onPress={handlePickFromGallery}
          disabled={isProcessing}
          style={({ pressed }) => [styles.sideDeckButton, pressed && styles.pressed]}
          accessibilityLabel="Import from Gallery"
        >
          <ImageIcon size={22} color="#FFFFFF" strokeWidth={2} />
        </Pressable>

        <Pressable
          onPress={handleTakePhoto}
          disabled={isProcessing || !isCameraReady}
          accessibilityLabel="Capture Specimen Photo"
          style={({ pressed }) => [styles.shutterOuterRing, pressed && styles.shutterPressed]}
        >
          <View style={styles.shutterInnerCircle}>
            {isProcessing ? <ActivityIndicator size="small" color="#FFFFFF" /> : null}
          </View>
        </Pressable>

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
