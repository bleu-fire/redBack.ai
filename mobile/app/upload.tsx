import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ArrowLeft, ImagePlus, Sparkles } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { uploadSpiderImage } from '@/data/api/logic';
import { styles } from '@/components/upload/upload.styles';

export default function UploadImageScreen() {
  const insets = useSafeAreaInsets();
  const [imageUri, setImageUri] = useState<string | null>(null);
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
      const message = error.response?.data?.message || 'Please check your connection and try again.';
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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Specimen photo</Text>
        <Pressable
          onPress={choosePhoto}
          style={({ pressed }) => [styles.photoCard, pressed && styles.pressed]}
          accessibilityLabel="Select or replace photo"
        >
          {imageUri ? (
            <View style={styles.imagePreviewWrap}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.iconCircle}>
                <ImagePlus size={30} color={Palette.muted} strokeWidth={2} />
              </View>
              <Text style={styles.emptyTitle}>Choose from your photos</Text>
              <Text style={styles.emptySubtitle}>Tap here to select a spider picture from your camera roll</Text>
            </View>
          )}
        </Pressable>

        <View style={styles.helperCard}>
          <Text style={styles.sectionTitle}>Photo tip</Text>
          <Text style={styles.helperText}>
            For best results, use good lighting and keep the spider centered so the eyes and markings are clear.
          </Text>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.sectionTitle}>Observation notes (optional)</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add context (for example: found in garden shed, fast runner)"
            placeholderTextColor={Palette.mutedLight}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </View>

        <Pressable
          onPress={identifyPhoto}
          disabled={!imageUri || isLoading}
          style={({ pressed }) => [
            styles.actionButton,
            (!imageUri || isLoading) && styles.actionButtonDisabled,
            pressed && styles.pressed,
          ]}
          accessibilityLabel="Run identification"
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Sparkles size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Identify this spider</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}
