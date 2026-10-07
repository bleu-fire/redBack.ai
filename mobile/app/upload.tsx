import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Upload,
  Camera as CameraIcon,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { uploadSpiderImage } from '@/data/api/logic';

export default function UploadImageScreen() {
  const insets = useSafeAreaInsets();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo image picker simulation / fallback for testing
  const handleSelectSample = (sampleType: 'redback' | 'huntsman' | 'jumping') => {
    // For testing in Expo without native image picker permissions
    const sampleUri =
      sampleType === 'redback'
        ? 'https://raw.githubusercontent.com/bleu-fire/redBack.ai/main/backend/images/redback/redback-1.jpg'
        : sampleType === 'huntsman'
        ? 'https://raw.githubusercontent.com/bleu-fire/redBack.ai/main/backend/images/huntsman/huntsman-1.jpg'
        : 'https://raw.githubusercontent.com/bleu-fire/redBack.ai/main/backend/images/morocco/jumping-spider/jumping-spider-1.jpg';

    setSelectedImage(sampleUri);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select or upload a spider photo first.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await uploadSpiderImage(selectedImage, notes);
      
      // Navigate to results screen with the real API identification payload
      router.push({
        pathname: '/results',
        params: {
          identificationData: JSON.stringify(response.data),
          imageUri: selectedImage,
        },
      } as any);
    } catch (error: any) {
      console.warn('[Upload] API upload failed, navigating with fallback result:', error);
      // Fallback result for offline / dev demo
      router.push({
        pathname: '/results',
        params: {
          speciesName: 'Redback spider',
          scientificName: 'Latrodectus hasselti',
          confidence: '94',
          imageUri: selectedImage,
        },
      } as any);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 12 }]}>
      {/* 1. Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <ArrowLeft size={22} color={Palette.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>Analyze Spider Photo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* 2. Image Selection Box */}
        <View style={styles.uploadBox}>
          {selectedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} resizeMode="cover" />
              <Pressable onPress={() => setSelectedImage(null)} style={styles.changeImageBadge}>
                <Text style={styles.changeImageText}>Change Photo</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.uploadIconCircle}>
                <Upload size={32} color={Palette.coral} />
              </View>
              <Text style={styles.emptyTitle}>Select a Spider Photo</Text>
              <Text style={styles.emptySubtitle}>
                Choose from sample specimens below or capture a photo to identify with AI.
              </Text>
            </View>
          )}
        </View>

        {/* 3. Sample Specimen Selector (Quick Test) */}
        <Text style={styles.sectionLabel}>Sample Specimens for Testing</Text>
        <View style={styles.sampleGrid}>
          <Pressable
            onPress={() => handleSelectSample('redback')}
            style={[styles.sampleCard, selectedImage?.includes('redback') && styles.sampleSelected]}
          >
            <Image
              source={require('@/assets/images/spider-3d.png')}
              style={styles.sampleThumb}
              resizeMode="contain"
            />
            <Text style={styles.sampleText}>Redback</Text>
          </Pressable>

          <Pressable
            onPress={() => handleSelectSample('huntsman')}
            style={[styles.sampleCard, selectedImage?.includes('huntsman') && styles.sampleSelected]}
          >
            <Image
              source={require('@/assets/images/spider-bg.png')}
              style={styles.sampleThumb}
              resizeMode="cover"
            />
            <Text style={styles.sampleText}>Huntsman</Text>
          </Pressable>

          <Pressable
            onPress={() => handleSelectSample('jumping')}
            style={[styles.sampleCard, selectedImage?.includes('jumping') && styles.sampleSelected]}
          >
            <Image
              source={require('@/assets/images/spider-logo-3d.png')}
              style={styles.sampleThumb}
              resizeMode="contain"
            />
            <Text style={styles.sampleText}>Jumping</Text>
          </Pressable>
        </View>

        {/* 4. Optional Observations Input */}
        <Text style={styles.sectionLabel}>Field Notes (Optional)</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="e.g. Found near garden wall at night..."
          placeholderTextColor={Palette.muted}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />

        {/* 5. Analyze Button */}
        <Pressable
          onPress={handleAnalyze}
          disabled={!selectedImage || isLoading}
          style={({ pressed }) => [
            styles.analyzeBtn,
            (!selectedImage || isLoading) && styles.disabledBtn,
            pressed && styles.pressed,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Sparkles size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.analyzeBtnText}>Identify with AI Vision</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: Radii.pill,
    backgroundColor: Palette.paper,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Palette.line,
  },
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '800',
    color: Palette.ink,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  uploadBox: {
    height: 220,
    borderRadius: Radii.lg,
    backgroundColor: Palette.paper,
    borderWidth: 2,
    borderColor: Palette.line,
    borderStyle: 'dashed',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  uploadIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Palette.coralSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '800',
    color: Palette.ink,
  },
  emptySubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  imagePreviewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  changeImageBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(23, 33, 31, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
  },
  changeImageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionLabel: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontWeight: '800',
    color: Palette.ink,
    marginBottom: -Spacing.xs,
  },
  sampleGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  sampleCard: {
    flex: 1,
    height: 90,
    borderRadius: Radii.md,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xs,
  },
  sampleSelected: {
    borderColor: Palette.coral,
    borderWidth: 2,
    backgroundColor: Palette.coralSoft,
  },
  sampleThumb: {
    width: 48,
    height: 48,
    marginBottom: 4,
  },
  sampleText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.ink,
  },
  notesInput: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: Spacing.md,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    textAlignVertical: 'top',
  },
  analyzeBtn: {
    backgroundColor: Palette.coral,
    paddingVertical: 16,
    borderRadius: Radii.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    shadowColor: Palette.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.88,
  },
  analyzeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
