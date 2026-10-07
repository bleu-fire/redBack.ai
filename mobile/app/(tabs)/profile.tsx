import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Bookmark,
  Award,
  FolderHeart,
  BookOpen,
  Shield,
  Leaf,
  Bug,
  Microscope,
  Medal,
  LogOut,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { StatCounter, MenuListItem } from '@/components/ui';
import { useStore, StoreState } from '@/store/stores';
import AsyncStorageManagement from '@/data/storage/asyncstorage';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const user = useStore((state: StoreState) => state.user);
  const logout = useStore((state: StoreState) => state.logout);

  const handleLogout = async () => {
    logout();
    await AsyncStorageManagement.remove_All_Logout();
    router.replace('/(auth)/login');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Top Header Actions */}
        <View style={styles.topActions}>
          <Text style={styles.screenHeading}>Profile</Text>
          <Pressable style={styles.bookmarkButton}>
            <Bookmark size={20} color={Palette.ink} />
          </Pressable>
        </View>

        {/* 2. User Info Section */}
        <View style={styles.userHeader}>
          <Image
            source={require('@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Explorer'}</Text>
            <Text style={styles.userBio}>
              {user?.email || 'Curious minds build a brighter planet.'}
            </Text>
          </View>
        </View>

        {/* 3. Level & XP Progress Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelIconBadge}>
            <Award size={22} color="#FFFFFF" />
          </View>

          <View style={styles.levelInfo}>
            <View style={styles.levelHeaderRow}>
              <Text style={styles.levelTitle}>Level 4</Text>
              <Text style={styles.levelSubtitle}>Spider Scholar</Text>
            </View>
            <View style={styles.levelProgressRow}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '55%' }]} />
              </View>
              <Text style={styles.xpText}>320 XP</Text>
            </View>
          </View>
        </View>

        {/* 5. Achievements Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My achievements</Text>
          <Pressable>
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>

        {/* Row of 5 circular badge medallions */}
        <View style={styles.achievementsRow}>
          <View style={[styles.badgeCircle, { backgroundColor: Palette.goldSoft }]}>
            <Bug size={20} color={Palette.gold} />
          </View>
          <View style={[styles.badgeCircle, { backgroundColor: Palette.mossSoft }]}>
            <Leaf size={20} color={Palette.moss} />
          </View>
          <View style={[styles.badgeCircle, { backgroundColor: Palette.coralSoft }]}>
            <Shield size={20} color={Palette.coral} />
          </View>
          <View style={[styles.badgeCircle, { backgroundColor: Palette.mossSoft }]}>
            <Microscope size={20} color={Palette.moss} />
          </View>
          <View style={[styles.badgeCircle, { backgroundColor: Palette.surfaceSubtle }]}>
            <Medal size={20} color={Palette.muted} />
          </View>
        </View>

        {/* 6. Profile Menu Options using reusable MenuListItem */}
        <View style={styles.menuGroup}>
          <MenuListItem
            icon={<FolderHeart size={20} color={Palette.moss} />}
            label="My observations"
            onPress={() => router.push('/modal' as any)}
          />

          <MenuListItem
            icon={<Bookmark size={20} color={Palette.moss} />}
            label="Saved species"
            onPress={() => router.push('/modal' as any)}
          />

          <MenuListItem
            icon={<BookOpen size={20} color={Palette.moss} />}
            label="Learning progress"
            onPress={() => router.push('/(tabs)/learn' as any)}
          />

          <MenuListItem
            icon={<LogOut size={20} color={Palette.danger} />}
            label="Sign out"
            isLast={true}
            onPress={handleLogout}
          />
        </View>
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
    fontSize: 24,
    fontWeight: '800',
    color: Palette.ink,
  },
  bookmarkButton: {
    padding: Spacing.xs,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: Radii.pill,
    borderWidth: 2,
    borderColor: Palette.line,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontFamily: Typography.display,
    fontSize: 20,
    fontWeight: '800',
    color: Palette.ink,
  },
  userBio: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    marginTop: 2,
  },
  levelCard: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIconBadge: {
    width: 44,
    height: 44,
    borderRadius: Radii.pill,
    backgroundColor: Palette.moss,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  levelInfo: {
    flex: 1,
  },
  levelHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  levelTitle: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '800',
    color: Palette.moss,
  },
  levelSubtitle: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Palette.ink,
  },
  levelProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: Palette.line,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Palette.moss,
    borderRadius: 3,
  },
  xpText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.muted,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
  },
  seeAllText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Palette.muted,
  },
  achievementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuGroup: {
    borderRadius: Radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Palette.line,
  },
});
