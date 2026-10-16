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
import { LogOut } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { useStore, StoreState } from '@/store/stores';
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
