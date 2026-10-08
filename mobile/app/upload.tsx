import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ArrowLeft, ImagePlus, Sparkles } from 'lucide-react-native';
import { Palette, Radii, Spacing, Typography } from '@/constants/theme';
import { uploadSpiderImage } from '@/data/api/logic';

export default function UploadImageScreen() {
  const insets = useSafeAreaInsets();
  const [imageUri, setImageUri] = useState<string | null >(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const choosePhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.85,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Could not open photos', 'Please try again.');
    }
  };

  const identifyPhoto = async () => {
    if (!imageUri || isLoading) return;

    setIsLoading(true);
    try {
      const response = await uploadSpiderImage(imageUri, notes.trim() || undefined);
      router.push({
        pathname: '/results',
        params: {
          identificationData: JSON.stringify(response),
          imageUri,
        },
      });
    } catch (error: any) {
      const message = error.response?.data?.message ;
      Alert.alert('Could not identify this photo', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton} accessibilityLabel="Go back">
          <ArrowLeft size={21} color={Palette.ink} />
        </Pressable>
        <Text style={styles.title}>Identify a spider</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={choosePhoto} style={styles.photoBox} accessibilityRole="button">
          {imageUri ? (
            <>
              <Image source={{ uri: imageUri }} style={styles.photo} resizeMode="cover" />
              <View style={styles.changePhoto}>
                <Text style={styles.changePhotoText}>Change photo</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.photoIcon}>
                <ImagePlus size={26} color={Palette.coral} />
              </View>
              <Text style={styles.photoTitle}>Choose a photo</Text>
              <Text style={styles.hint}>Select a clear picture from your library</Text>
            </>
          )}
        </Pressable>

        <View style={styles.notesSection}>
          <Text style={styles.label}>Field note (optional)</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Where did you find it?"
            placeholderTextColor={Palette.muted}
            style={styles.input}
            multiline
            maxLength={300}
          />
        </View>

        <Pressable
          onPress={identifyPhoto}
          disabled={!imageUri || isLoading}
          style={({ pressed }) => [
            styles.submitButton,
            (!imageUri || isLoading) && styles.disabledButton,
            pressed && imageUri && !isLoading && styles.pressed,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Sparkles size={18} color="#FFFFFF" />
              <Text style={styles.submitText}>Identify photo</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Palette.canvas },
  header: {
    minHeight: 58,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: Radii.pill,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: { width: 40 },
  title: { fontFamily: Typography.display, fontSize: 18, fontWeight: '800', color: Palette.ink },
  content: { flexGrow: 1, padding: Spacing.lg, gap: Spacing.lg },
  photoBox: {
    height: 260,
    borderRadius: Radii.lg,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photo: { width: '100%', height: '100%' },
  photoIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  photoTitle: { fontFamily: Typography.display, fontSize: 17, fontWeight: '800', color: Palette.ink },
  hint: { marginTop: 5, fontFamily: Typography.body, fontSize: 13, color: Palette.muted },
  changePhoto: {
    position: 'absolute',
    right: Spacing.sm,
    bottom: Spacing.sm,
    backgroundColor: 'rgba(23, 33, 31, 0.85)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.pill,
  },
  changePhotoText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  notesSection: { gap: Spacing.sm },
  label: { fontFamily: Typography.display, fontSize: 14, fontWeight: '800', color: Palette.ink },
  input: {
    minHeight: 76,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: Spacing.md,
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.ink,
    textAlignVertical: 'top',
  },
  submitButton: {
    minHeight: 54,
    borderRadius: Radii.xl,
    backgroundColor: Palette.coral,
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  disabledButton: { opacity: 0.5 },
  pressed: { opacity: 0.88 },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
