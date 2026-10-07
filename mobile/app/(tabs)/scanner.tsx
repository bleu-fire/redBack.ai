import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { X, Zap, Image as ImageIcon } from 'lucide-react-native';
import { Palette, Spacing, Radii } from '@/constants/theme';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { uploadSpiderImage } from '@/data/api/logic';

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [flashOn, setFlashOn] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Capture a photo, identify it with the AI vision pipeline, and open the results
  const handleCapture = async () => {
    if (isCapturing) return;

    if (!permission?.granted) {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert(
          'Camera access required',
          'Allow camera access to identify a spider from a photo.',
        );
        return;
      }
    }

    if (!isCameraReady) {
      Alert.alert(
        'Camera starting',
        'The camera is still warming up. Please try again in a moment.',
      );
      return;
    }

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.85 });

      if (!photo?.uri) {
        Alert.alert('Capture failed', 'Could not capture a photo. Please try again.');
        return;
      }

      try {
        const response = await uploadSpiderImage(photo.uri);
        router.push({
          pathname: '/results',
          params: {
            identificationData: JSON.stringify(response.data),
            imageUri: photo.uri,
          },
        });
      } catch {
        // Offline/dev fallback: keep the captured photo, results screen applies its default identification
        console.warn('[Scanner] Identification request failed, navigating with captured photo only');
        router.push({
          pathname: '/results',
          params: { imageUri: photo.uri },
        });
      }
    } catch (error) {
      console.warn('[Scanner] Photo capture failed:', error);
      Alert.alert('Capture failed', 'Something went wrong while taking the photo.');
    } finally {
      setIsCapturing(false);
    }
  };


  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
      {/* 1. Minimal Top Bar (Close & Flash) */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Close scanner"
        >
          <X size={22} color="#FFFFFF" />
        </Pressable>

        <Pressable
          onPress={() => setFlashOn(!flashOn)}
          style={({ pressed }) => [
            styles.iconBtn,
            flashOn && styles.flashActive,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Toggle flash"
        >
          <Zap size={22} color={flashOn ? Palette.gold : '#FFFFFF'} />
        </Pressable>
      </View>

      {/* 2. Clean Center Viewfinder */}
      <View style={styles.viewfinder}>
        <CameraView
          ref={cameraRef}
          style={styles.previewImage}
          facing="back"
          flash={flashOn ? 'on' : 'off'}
          onCameraReady={() => setIsCameraReady(true)}
          onMountError={({ message }) =>
            console.warn('[Scanner] Camera failed to start:', message)
          }
        />

        {/* Framing corner accents */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* 3. Simple Bottom Controls (Gallery & Shutter) */}
      <View style={styles.bottomBar}>
        {/* Gallery button */}
        <Pressable
          onPress={() => router.push('/upload')}
          style={({ pressed }) => [styles.galleryBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Choose from gallery"
        >
          <ImageIcon size={24} color="#FFFFFF" />
        </Pressable>

        {/* Shutter button */}
        <Pressable
          onPress={handleCapture}
          disabled={isCapturing}
          style={({ pressed }) => [
            styles.shutterRing,
            pressed && styles.shutterPressed,
            isCapturing && styles.shutterDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Capture photo"
          accessibilityState={{ busy: isCapturing, disabled: isCapturing }}
        >
          {isCapturing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <View style={styles.shutterInner} />
          )}
        </Pressable>

        {/* Invisible spacer for symmetrical alignment */}
        <View style={styles.spacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F1614',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
  },

  // Minimal Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  // Viewfinder
  viewfinder: {
    width: 280,
    height: 280,
    alignSelf: 'center',
    position: 'relative',
    borderRadius: Radii.lg,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#FFFFFF',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },

  // Bottom Controls
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.md,
  },
  galleryBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRing: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: Palette.coral,
  },
  spacer: {
    width: 50,
    height: 50,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
  shutterPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.85,
  },
  shutterDisabled: {
    opacity: 0.6,
  },
});
