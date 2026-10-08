import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Modal,
  Alert,
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
  ChevronRight,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  PhoneCall,
  X,
  Compass,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { useStore, StoreState } from '@/store/stores';
import AsyncStorageManagement from '@/data/storage/asyncstorage';
import { SPECIES_CATALOG } from '@/data/speciesData';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progressText: string;
  icon: any;
  color: string;
  bgColor: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'morocco-pioneer',
    title: 'Morocco Pioneer',
    description: 'Documented 3 native Moroccan spider species in the field.',
    unlocked: true,
    progressText: 'Completed',
    icon: Bug,
    color: Palette.gold,
    bgColor: Palette.goldSoft,
  },
  {
    id: 'safety-certified',
    title: 'Safety Certified',
    description: 'Mastered the Emergency Bite Safety Protocol and distinction.',
    unlocked: true,
    progressText: 'Completed',
    icon: Shield,
    color: Palette.coral,
    bgColor: Palette.coralSoft,
  },
  {
    id: 'hawk-eye',
    title: 'Hawk Eye',
    description: 'Achieved >95% AI confidence match on a live camera scan.',
    unlocked: true,
    progressText: 'Completed (98% peak)',
    icon: Microscope,
    color: Palette.moss,
    bgColor: Palette.mossSoft,
  },
  {
    id: 'venom-scholar',
    title: 'Venom Scholar',
    description: 'Studied both Latrodectus and Funnel-Web species guides.',
    unlocked: true,
    progressText: 'Completed',
    icon: Award,
    color: Palette.moss,
    bgColor: Palette.mossSoft,
  },
  {
    id: 'night-prowler',
    title: 'Night Prowler',
    description: 'Identify 3 nocturnal wandering spiders after sunset.',
    unlocked: false,
    progressText: '2 of 3 identified',
    icon: Compass,
    color: Palette.muted,
    bgColor: Palette.surfaceSubtle,
  },
  {
    id: 'biodiversity-guardian',
    title: 'Biodiversity Guardian',
    description: 'Log 10 harmless beneficial garden spiders in the community.',
    unlocked: false,
    progressText: '6 of 10 logged',
    icon: Leaf,
    color: Palette.muted,
    bgColor: Palette.surfaceSubtle,
  },
];

// Sample past observations history for the user
const RECENT_OBSERVATIONS = [
  {
    id: 'obs-1',
    speciesId: 'latrodectus-tredecimguttatus',
    name: 'Mediterranean Black Widow',
    scientificName: 'Latrodectus tredecimguttatus',
    confidence: 96,
    region: 'Settat, Morocco',
    date: 'Yesterday, 18:42',
    image: require('@/assets/images/spider-3d.png'),
    badgeType: 'danger' as const,
  },
  {
    id: 'obs-2',
    speciesId: 'menemerus-semilimbatus',
    name: 'Moroccan Wall Jumping Spider',
    scientificName: 'Menemerus semilimbatus',
    confidence: 98,
    region: 'Marrakech, Morocco',
    date: '3 days ago',
    image: require('@/assets/images/spider-logo-3d.png'),
    badgeType: 'moss' as const,
  },
  {
    id: 'obs-3',
    speciesId: 'heteropoda-venatoria',
    name: 'Huntsman Spider',
    scientificName: 'Heteropoda venatoria',
    confidence: 91,
    region: 'Sydney, Australia',
    date: 'Last week',
    image: require('@/assets/images/spider-bg.png'),
    badgeType: 'moss' as const,
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const user = useStore((state: StoreState) => state.user);
  const logout = useStore((state: StoreState) => state.logout);

  const [activeTab, setActiveTab] = useState<'observations' | 'saved' | 'hotlines'>('observations');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

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
        {/* 1. Header with Title and Settings/Saved shortcut */}
        <View style={styles.topActions}>
          <Text style={styles.screenHeading}>Naturalist Profile</Text>
          <Pressable
            onPress={() => setActiveTab('saved')}
            style={styles.bookmarkButton}
          >
            <Bookmark size={20} color={Palette.ink} />
          </Pressable>
        </View>

        {/* 2. User Info Card */}
        <View style={styles.userHeader}>
          <Image
            source={require('@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>{user?.name || 'Explorer'}</Text>
              <View style={styles.verifiedPill}>
                <CheckCircle2 size={12} color={Palette.moss} />
                <Text style={styles.verifiedText}>Field Researcher</Text>
              </View>
            </View>
            <Text style={styles.userBio}>
              {user?.email || 'explorer@redback.ai'}
            </Text>
            <Text style={styles.userLocation}>📍 Morocco & Australia Region</Text>
          </View>
        </View>

        {/* 3. Field Metrics 3-Column Card */}
        <View style={styles.metricsCard}>
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>14</Text>
            <Text style={styles.metricLabel}>Scans Logged</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>8</Text>
            <Text style={styles.metricLabel}>Species Found</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <View style={styles.streakNumberRow}>
              <Flame size={18} color={Palette.gold} />
              <Text style={[styles.metricNumber, { color: Palette.gold }]}>5</Text>
            </View>
            <Text style={styles.metricLabel}>Day Streak</Text>
          </View>
        </View>

        {/* 4. Level & XP Progress Card */}
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
                <View style={[styles.progressBarFill, { width: '64%' }]} />
              </View>
              <Text style={styles.xpText}>320 / 500 XP</Text>
            </View>
            <Text style={styles.nextLevelHint}>
              180 XP to Level 5 Arachnologist
            </Text>
          </View>
        </View>

        {/* 5. Achievements Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Field Achievements</Text>
          <Text style={styles.sectionSubtitle}>4 of 6 Unlocked</Text>
        </View>

        {/* Horizontal Scroll of Badges */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achievementsScroll}
        >
          {ACHIEVEMENTS.map((ach) => {
            const IconComponent = ach.icon;
            return (
              <Pressable
                key={ach.id}
                onPress={() => setSelectedAchievement(ach)}
                style={styles.achievementItem}
              >
                <View style={[styles.badgeCircle, { backgroundColor: ach.bgColor }]}>
                  <IconComponent size={22} color={ach.color} />
                </View>
                <Text style={styles.badgeName} numberOfLines={1}>
                  {ach.title.split(' ')[0]}
                </Text>
                <Text style={styles.badgeStatus}>
                  {ach.unlocked ? 'Unlocked' : 'In Progress'}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* 6. Segmented Switcher for Profile Data */}
        <View style={styles.tabSwitcher}>
          <Pressable
            onPress={() => setActiveTab('observations')}
            style={[
              styles.tabSwitchBtn,
              activeTab === 'observations' && styles.tabSwitchBtnActive,
            ]}
          >
            <Text
              style={[
                styles.tabSwitchText,
                activeTab === 'observations' && styles.tabSwitchTextActive,
              ]}
            >
              My Sightings ({RECENT_OBSERVATIONS.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('saved')}
            style={[
              styles.tabSwitchBtn,
              activeTab === 'saved' && styles.tabSwitchBtnActive,
            ]}
          >
            <Text
              style={[
                styles.tabSwitchText,
                activeTab === 'saved' && styles.tabSwitchTextActive,
              ]}
            >
              Saved Spiders (3)
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('hotlines')}
            style={[
              styles.tabSwitchBtn,
              activeTab === 'hotlines' && styles.tabSwitchBtnActive,
            ]}
          >
            <Text
              style={[
                styles.tabSwitchText,
                activeTab === 'hotlines' && styles.tabSwitchTextActive,
              ]}
            >
              Emergency
            </Text>
          </Pressable>
        </View>

        {/* Tab 1: Sightings List */}
        {activeTab === 'observations' && (
          <View style={styles.tabContentList}>
            {RECENT_OBSERVATIONS.map((obs) => (
              <Pressable
                key={obs.id}
                onPress={() => router.push(`/species/${obs.speciesId}` as any)}
                style={({ pressed }) => [styles.obsCard, pressed && styles.cardPressed]}
              >
                <Image source={obs.image} style={styles.obsThumb} resizeMode="cover" />
                <View style={styles.obsInfo}>
                  <View style={styles.obsTitleRow}>
                    <Text style={styles.obsName} numberOfLines={1}>
                      {obs.name}
                    </Text>
                    <View style={styles.matchPill}>
                      <Text style={styles.matchPillText}>{obs.confidence}% Match</Text>
                    </View>
                  </View>
                  <Text style={styles.obsScientific} numberOfLines={1}>
                    {obs.scientificName}
                  </Text>
                  <View style={styles.obsMetaRow}>
                    <Text style={styles.obsRegion}>{obs.region}</Text>
                    <Text style={styles.obsDate}>• {obs.date}</Text>
                  </View>
                </View>
                <ChevronRight size={18} color={Palette.muted} style={{ marginLeft: 4 }} />
              </Pressable>
            ))}
          </View>
        )}

        {/* Tab 2: Saved Species List */}
        {activeTab === 'saved' && (
          <View style={styles.tabContentList}>
            {SPECIES_CATALOG.slice(0, 3).map((sp) => (
              <Pressable
                key={sp.id}
                onPress={() => router.push(`/species/${sp.id}` as any)}
                style={({ pressed }) => [styles.obsCard, pressed && styles.cardPressed]}
              >
                <Image source={sp.localImageFallback} style={styles.obsThumb} resizeMode="cover" />
                <View style={styles.obsInfo}>
                  <Text style={styles.obsName} numberOfLines={1}>
                    {sp.name}
                  </Text>
                  <Text style={styles.obsScientific} numberOfLines={1}>
                    {sp.scientificName}
                  </Text>
                  <View style={styles.obsMetaRow}>
                    <Text style={styles.obsRegion}>
                      {sp.region === 'Morocco' ? 'Morocco' : 'Australia'}
                    </Text>
                    <Text style={[styles.savedBadge, sp.badgeType === 'danger' && styles.savedDanger]}>
                      • {sp.badgeText}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={Palette.muted} />
              </Pressable>
            ))}
          </View>
        )}

        {/* Tab 3: Emergency Contacts */}
        {activeTab === 'hotlines' && (
          <View style={styles.hotlinesContainer}>
            <View style={styles.emergencyCard}>
              <View style={styles.emergencyHeader}>
                <PhoneCall size={20} color={Palette.danger} />
                <Text style={styles.emergencyCardTitle}>Morocco Poison Center (CAPM)</Text>
              </View>
              <Text style={styles.emergencyNumber}>0537-68-64-64</Text>
              <Text style={styles.emergencyDesc}>
                Centre Anti Poison et de Pharmacovigilance du Maroc (24/7 National Emergency Hotline).
              </Text>
            </View>

            <View style={styles.emergencyCard}>
              <View style={styles.emergencyHeader}>
                <PhoneCall size={20} color={Palette.danger} />
                <Text style={styles.emergencyCardTitle}>Australia Poisons Information</Text>
              </View>
              <Text style={styles.emergencyNumber}>13 11 26</Text>
              <Text style={styles.emergencyDesc}>
                Available 24 hours a day, 7 days a week from anywhere in Australia.
              </Text>
            </View>
          </View>
        )}

        {/* 7. Sign Out Action Button */}
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.signOutBtn, pressed && styles.signOutBtnPressed]}
        >
          <LogOut size={18} color={Palette.danger} />
          <Text style={styles.signOutBtnText}>Sign Out of redBack.ai</Text>
        </Pressable>
      </ScrollView>

      {/* --- Achievement Details Modal Sheet --- */}
      <Modal
        visible={Boolean(selectedAchievement)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedAchievement(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.achievementModalBox}>
            {selectedAchievement && (
              <>
                <View style={styles.achievementModalTop}>
                  <View
                    style={[
                      styles.modalBadgeCircle,
                      { backgroundColor: selectedAchievement.bgColor },
                    ]}
                  >
                    {React.createElement(selectedAchievement.icon, {
                      size: 32,
                      color: selectedAchievement.color,
                    })}
                  </View>
                  <Pressable
                    onPress={() => setSelectedAchievement(null)}
                    style={styles.modalCloseBtn}
                  >
                    <X size={18} color={Palette.muted} />
                  </Pressable>
                </View>

                <Text style={styles.achievementModalTitle}>
                  {selectedAchievement.title}
                </Text>
                <Text style={styles.achievementModalDesc}>
                  {selectedAchievement.description}
                </Text>

                <View style={styles.achievementStatusPill}>
                  <Text style={styles.achievementStatusText}>
                    Status: {selectedAchievement.progressText}
                  </Text>
                </View>

                <Pressable
                  onPress={() => setSelectedAchievement(null)}
                  style={styles.modalDismissBtn}
                >
                  <Text style={styles.modalDismissText}>Got it</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
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
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  verifiedText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '700',
    color: Palette.moss,
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
    borderWidth: 1,
    borderColor: Palette.line,
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
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.moss,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  levelIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelInfo: {
    flex: 1,
    gap: 4,
  },
  levelHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  levelTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  levelSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: Palette.goldSoft,
  },
  levelProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: Radii.pill,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Palette.gold,
    borderRadius: Radii.pill,
  },
  xpText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  nextLevelHint: {
    fontFamily: Typography.body,
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
  },
  sectionSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
  },
  achievementsScroll: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingVertical: 2,
  },
  achievementItem: {
    alignItems: 'center',
    width: 76,
  },
  badgeCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  badgeName: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.ink,
    textAlign: 'center',
  },
  badgeStatus: {
    fontFamily: Typography.body,
    fontSize: 9,
    color: Palette.muted,
    marginTop: 1,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: Radii.pill,
    padding: 3,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  tabSwitchBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Radii.pill,
  },
  tabSwitchBtnActive: {
    backgroundColor: Palette.paper,
  },
  tabSwitchText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: Palette.muted,
  },
  tabSwitchTextActive: {
    color: Palette.ink,
    fontWeight: '700',
  },
  tabContentList: {
    gap: Spacing.sm,
  },
  obsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  cardPressed: {
    opacity: 0.85,
    borderColor: Palette.moss,
  },
  obsThumb: {
    width: 54,
    height: 54,
    borderRadius: Radii.sm,
    backgroundColor: Palette.surfaceSubtle,
  },
  obsInfo: {
    flex: 1,
    gap: 2,
  },
  obsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  obsName: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.ink,
    flex: 1,
    paddingRight: 6,
  },
  matchPill: {
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  matchPillText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '700',
    color: Palette.moss,
  },
  obsScientific: {
    fontFamily: Typography.display,
    fontSize: 11,
    fontStyle: 'italic',
    color: Palette.muted,
  },
  obsMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  obsRegion: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.ink,
  },
  obsDate: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
  },
  savedBadge: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.moss,
    fontWeight: '600',
  },
  savedDanger: {
    color: Palette.danger,
  },
  hotlinesContainer: {
    gap: Spacing.sm,
  },
  emergencyCard: {
    backgroundColor: Palette.coralSoft,
    borderWidth: 1,
    borderColor: '#F7B5A8',
    borderRadius: Radii.lg,
    padding: Spacing.md,
    gap: 4,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  emergencyCardTitle: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.danger,
  },
  emergencyNumber: {
    fontFamily: Typography.body,
    fontSize: 18,
    fontWeight: '800',
    color: Palette.danger,
    letterSpacing: 0.5,
    marginVertical: 2,
  },
  emergencyDesc: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.ink,
    lineHeight: 17,
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

  // Achievement Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  achievementModalBox: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: Palette.paper,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Palette.line,
  },
  achievementModalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalBadgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  modalCloseBtn: {
    padding: 4,
  },
  achievementModalTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '800',
    color: Palette.ink,
  },
  achievementModalDesc: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 19,
  },
  achievementStatusPill: {
    backgroundColor: Palette.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  achievementStatusText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.muted,
  },
  modalDismissBtn: {
    backgroundColor: Palette.moss,
    paddingVertical: 10,
    borderRadius: Radii.pill,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  modalDismissText: {
    fontFamily: Typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
