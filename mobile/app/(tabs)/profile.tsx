import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { LogOut, Camera, CheckCircle2 } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { useStore, StoreState } from '@/store/stores';
import { getFullImageUrl } from '@/data/api/api';
import AsyncStorageManagement from '@/data/storage/asyncstorage';
import { styles } from '@/components/profile/profile.styles';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const user = useStore((state: StoreState) => state.user);
  const identifications = useStore((state: StoreState) => state.identifications);
  const logout = useStore((state: StoreState) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of redBack.ai?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            logout();
            await AsyncStorageManagement.remove_All_Logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const spiderSightings = (identifications || []).filter(
    (obs: any) =>
      obs.topPrediction &&
      obs.topPrediction.scientificName !== 'Non-Arachnid'
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topActions}>
          <Text style={styles.screenHeading}>Field Journal</Text>
        </View>

        <View style={styles.userHeader}>
          <Image
            source={require('@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg')}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>{user?.name || 'Field Naturalist'}</Text>
            </View>
            <Text style={styles.userBio}>{user?.email || 'naturalist@redback.ai'}</Text>
            <Text style={styles.userLocation}>Atlas Mountain & Coastal Research</Text>
          </View>
        </View>

        <View style={styles.metricsCard}>
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>{spiderSightings.length || 0}</Text>
            <Text style={styles.metricLabel}>Discovered</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>94%</Text>
            <Text style={styles.metricLabel}>AI Accuracy</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>{Math.max(1, spiderSightings.length || 1)}</Text>
            <Text style={styles.metricLabel}>Day Streak</Text>
          </View>
        </View>

        {/* --- UGC Observations Gallery --- */}
        <View style={styles.gallerySection}>
          <View style={styles.galleryHeaderRow}>
            <Text style={styles.galleryTitle}>My Field Observations</Text>
            <View style={styles.galleryCountPill}>
              <Text style={styles.galleryCountText}>
                {spiderSightings.length} photos
              </Text>
            </View>
          </View>

          {spiderSightings.length > 0 ? (
            <View style={styles.galleryGrid}>
              {spiderSightings.map((item: any, idx: number) => {
                const imgUri = getFullImageUrl(item.imageUrl);
                const spName =
                  item.topPrediction?.commonName ||
                  item.topPrediction?.scientificName ||
                  'Spider Specimen';
                const conf = Math.round((item.topPrediction?.confidence || 0.85) * 100);
                const dateStr = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Oct 12';

                return (
                  <Pressable
                    key={item._id || idx}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      router.push({
                        pathname: '/results',
                        params: {
                          imageUri: imgUri,
                          speciesName: spName,
                          scientificName: item.topPrediction?.scientificName,
                          confidence: `${conf}%`,
                        },
                      } as any);
                    }}
                    style={styles.galleryCard}
                    accessibilityRole="button"
                    accessibilityLabel={`${spName}, logged on ${dateStr}`}
                  >
                    <Image
                      source={
                        imgUri
                          ? { uri: imgUri }
                          : require('@/assets/images/spider-3d.png')
                      }
                      style={styles.galleryPhoto}
                      resizeMode="cover"
                    />

                    <View style={styles.galleryCardBody}>
                      <Text style={styles.gallerySpeciesName} numberOfLines={1}>
                        {spName}
                      </Text>

                      <View style={styles.galleryConfidenceRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                          <CheckCircle2 size={10} color={Palette.forestGreen} strokeWidth={2.5} />
                          <Text style={styles.galleryConfidence}>{conf}%</Text>
                        </View>
                        <Text style={styles.galleryDate}>{dateStr}</Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyGallery}>
              <Camera size={28} color={Palette.muted} />
              <Text style={styles.emptyGalleryText}>
                No field observations yet. Scan a specimen in the field to log it here!
              </Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.signOutBtn,
            pressed && styles.signOutBtnPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Sign Out"
        >
          <LogOut size={16} color={Palette.danger} strokeWidth={2.2} />
          <Text style={styles.signOutBtnText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
