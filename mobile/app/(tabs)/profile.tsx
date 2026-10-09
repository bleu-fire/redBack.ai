import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  LogOut,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { useStore, StoreState } from '@/store/stores';
import AsyncStorageManagement from '@/data/storage/asyncstorage';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const user = useStore((state: StoreState) => state.user);
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

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Naturalist Journal Header */}
        <View style={styles.topActions}>
          <View>
            <Text style={styles.screenHeading}>Field Journal</Text>
          </View>
        </View>

        {/* 2. User Info Card with Tactile Border */}
        <View style={styles.userHeader}>
          <Image
            source={require('@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>{user?.name || 'Explorer'}</Text>
            </View>
            <Text style={styles.userBio}>
              {user?.email || 'explorer@redback.ai'}
            </Text>
            <Text style={styles.userLocation}>Morocco & Australia Expedition</Text>
          </View>
        </View>

        {/* 3. 3-Stat Summary Grid (Design Board Screen 11: 24 Species, 12 Locations, 8 Badges) */}
        <View style={styles.metricsCard}>
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>24</Text>
            <Text style={styles.metricLabel}>Species</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>12</Text>
            <Text style={styles.metricLabel}>Locations</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>8</Text>
            <Text style={styles.metricLabel}>Badges</Text>
          </View>
        </View>

        {/* 4. Sign Out Action Button */}
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.signOutBtn, pressed && styles.signOutBtnPressed]}
        >
          <LogOut size={18} color={Palette.danger} />
          <Text style={styles.signOutBtnText}>Sign Out of redBack.ai</Text>
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
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.lg,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  screenHeading: {
    fontFamily: Typography.display,
    fontSize: 26,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.paper,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    borderRadius: Radii.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: Palette.line,
  },
  userInfo: {
    flex: 1,
    gap: 3,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 4,
  },
  userName: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '800',
    color: Palette.ink,
  },

  userBio: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
  },
  userLocation: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.ink,
    marginTop: 2,
  },
  metricsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Palette.paper,
    borderWidth: 1.5,
    borderColor: Palette.line,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    borderRadius: Radii.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricNumber: {
    fontFamily: Typography.display,
    fontSize: 22,
    fontWeight: '800',
    color: Palette.ink,
  },
  streakNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  metricLabel: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
    marginTop: 2,
    fontWeight: '600',
  },
  metricDivider: {
    width: 1,
    height: 30,
    backgroundColor: Palette.line,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: '#F7B5A8',
    borderRadius: Radii.pill,
    paddingVertical: 12,
    marginTop: Spacing.sm,
  },
  signOutBtnPressed: {
    backgroundColor: Palette.coralSoft,
  },
  signOutBtnText: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.danger,
  },
});
