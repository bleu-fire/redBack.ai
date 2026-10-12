import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  X,
  BellOff,
  AlertTriangle,
  Bug,
  Sparkles,
  Award,
  CheckCheck,
  ChevronRight,
  Trash2,
  Compass,
  ShieldCheck,
  RotateCcw,
  Camera,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Palette } from '@/constants/theme';
import { styles } from '@/components/modal/modal.styles';

export type NotificationType = 'safety' | 'discovery' | 'milestone' | 'community' | 'achievement';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  category?: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  route?: string;
  actionLabel?: string;
}

const STORAGE_KEY = '@redback_field_notifications';

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'safety',
    category: 'CLINICAL ALERT',
    title: 'Active Redback Sighting in Region',
    message:
      'Multiple venomous Redbacks documented in dry sheltered perimeter. Review antivenom protocol.',
    time: '12m ago',
    read: false,
    route: '/species/latrodectus-hasselti',
    actionLabel: 'Review Antivenom Guide',
  },
  {
    id: 'notif-2',
    type: 'discovery',
    category: 'SPECIMEN RECORD',
    title: 'Moroccan Jumping Spider Identified',
    message:
      'Observation verified with 96% AI confidence. Added to SpiderDex (+25 XP).',
    time: '2h ago',
    read: false,
    route: '/(tabs)/explore',
    actionLabel: 'View in SpiderDex',
  },
  {
    id: 'notif-3',
    type: 'milestone',
    category: 'RANK ASCENSION',
    title: 'Milestone Unlocked: Observer Lv. 2',
    message:
      'Documented 3 spider families across Morocco & Australia. New field badges unlocked.',
    time: '5h ago',
    read: false,
    route: '/(tabs)/profile',
    actionLabel: 'Inspect Journal',
  },
  {
    id: 'notif-4',
    type: 'community',
    category: 'BIOSPHERE ADVISORY',
    title: 'Seasonal Funnel-Web Weather Trigger',
    message:
      'Recent rainfall triggers wandering behavior in male Funnel-Webs. Check boots and foliage.',
    time: 'Yesterday',
    read: true,
    route: '/species/latrodectus-hasselti',
    actionLabel: 'Habitat Warning',
  },
  {
    id: 'notif-5',
    type: 'milestone',
    category: 'DAILY CHALLENGE',
    title: 'Daily Morphometric Riddle Ready',
    message:
      'A new 15-second mystery spider riddle is live. Solve it to extend your 5-day streak.',
    time: 'Yesterday',
    read: true,
    route: '/(tabs)/learn',
    actionLabel: 'Start Riddle',
  },
];

const FILTER_TABS = [
  { id: 'All', label: 'All' },
  { id: 'Safety', label: 'Safety' },
  { id: 'Discoveries', label: 'Discoveries' },
  { id: 'Milestones', label: 'Milestones' },
  { id: 'Advisories', label: 'Advisories' },
];

export default function ModalScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Load persisted dispatches or seed defaults
  useEffect(() => {
    const loadDispatches = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          setNotifications(JSON.parse(stored));
        } else {
          setNotifications(DEFAULT_NOTIFICATIONS);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
        }
      } catch {
        setNotifications(DEFAULT_NOTIFICATIONS);
      }
    };
    loadDispatches();
  }, []);

  const saveDispatches = async (newItems: NotificationItem[]) => {
    setNotifications(newItems);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (err) {
      console.warn('Failed to save notifications', err);
    }
  };

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const hasSafetyUnread = useMemo(
    () => notifications.some((n) => !n.read && n.type === 'safety'),
    [notifications]
  );

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: notifications.length,
      Safety: notifications.filter((n) => n.type === 'safety').length,
      Discoveries: notifications.filter((n) => n.type === 'discovery').length,
      Milestones: notifications.filter((n) => n.type === 'milestone' || n.type === 'achievement').length,
      Advisories: notifications.filter((n) => n.type === 'community').length,
    };
    return counts;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      if (selectedFilter === 'Safety') return n.type === 'safety';
      if (selectedFilter === 'Discoveries') return n.type === 'discovery';
      if (selectedFilter === 'Milestones') return n.type === 'milestone' || n.type === 'achievement';
      if (selectedFilter === 'Advisories') return n.type === 'community';
      return true;
    });
  }, [notifications, selectedFilter]);

  const handleMarkAllRead = () => {
    if (unreadCount === 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveDispatches(updated);
  };

  const handleClearAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    saveDispatches([]);
  };

  const handleResetDemo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    saveDispatches(DEFAULT_NOTIFICATIONS);
    setSelectedFilter('All');
  };

  const handleDeleteItem = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = notifications.filter((n) => n.id !== id);
    saveDispatches(updated);
  };

  const handlePressItem = (item: NotificationItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = notifications.map((n) =>
      n.id === item.id ? { ...n, read: true } : n
    );
    saveDispatches(updated);

    if (item.route) {
      router.push(item.route as any);
    }
  };

  const handleSelectFilter = (filterId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedFilter(filterId);
  };

  const renderBadgeIcon = (type: NotificationType) => {
    switch (type) {
      case 'safety':
        return <AlertTriangle size={15} color={Palette.danger} strokeWidth={2.2} />;
      case 'discovery':
        return <Bug size={15} color={Palette.moss} strokeWidth={2.2} />;
      case 'milestone':
      case 'achievement':
        return <Award size={15} color={Palette.gold} strokeWidth={2.2} />;
      case 'community':
        return <Compass size={15} color={Palette.amber} strokeWidth={2.2} />;
      default:
        return <Sparkles size={15} color={Palette.muted} strokeWidth={2.2} />;
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 12 }]}>
      {/* 1. Header with Clean Title, Plain Text Unread Count (No Badge Background), and Dismiss */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Notifications</Text>
            {unreadCount > 0 && (
              <Text
                style={[
                  styles.unreadCountText,
                  hasSafetyUnread && styles.unreadCountTextDanger,
                ]}
              >
                ({unreadCount})
              </Text>
            )}
          </View>
        </View>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
          accessibilityRole="button"
          accessibilityLabel="Close notifications"
          hitSlop={10}
        >
          <X size={18} color={Palette.ink} strokeWidth={2.2} />
        </Pressable>
      </View>

      {/* 2. Actions Bar (Mark all read & Clear) */}
      {notifications.length > 0 && (
        <View style={styles.actionsBar}>
          <Pressable
            onPress={handleMarkAllRead}
            disabled={unreadCount === 0}
            style={({ pressed }) => [
              styles.actionButton,
              unreadCount > 0 && styles.actionButtonActive,
              unreadCount === 0 && styles.actionButtonDisabled,
              pressed && styles.btnPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Mark all notifications as read"
          >
            <CheckCheck
              size={13}
              color={unreadCount > 0 ? Palette.moss : Palette.muted}
              strokeWidth={2.2}
            />
            <Text
              style={[
                styles.actionButtonText,
                unreadCount === 0 && { color: Palette.muted },
              ]}
            >
              Mark all read
            </Text>
          </Pressable>

          <Pressable
            onPress={handleClearAll}
            style={({ pressed }) => [styles.actionClearBtn, pressed && styles.btnPressed]}
            accessibilityRole="button"
            accessibilityLabel="Clear all notifications"
          >
            <Trash2 size={12} color={Palette.muted} strokeWidth={2} />
            <Text style={styles.actionClearText}>Clear</Text>
          </Pressable>
        </View>
      )}

      {/* 3. Filter Category Pills */}
      <View style={styles.filterScrollView}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {FILTER_TABS.map((tab) => {
            const isSelected = selectedFilter === tab.id;
            const count = filterCounts[tab.id] || 0;
            return (
              <Pressable
                key={tab.id}
                onPress={() => handleSelectFilter(tab.id)}
                style={({ pressed }) => [
                  styles.filterChip,
                  isSelected && styles.filterChipActive,
                  pressed && styles.filterChipPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${tab.label}`}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
                <Text
                  style={[
                    styles.filterCountText,
                    isSelected && styles.filterCountTextActive,
                  ]}
                >
                  {count}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. Compact & Simple Notifications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              {notifications.length === 0 ? (
                <ShieldCheck size={26} color={Palette.moss} strokeWidth={2} />
              ) : (
                <BellOff size={24} color={Palette.muted} strokeWidth={2} />
              )}
            </View>
            <Text style={styles.emptyTitle}>
              {notifications.length === 0 ? 'All caught up' : 'No notifications'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {notifications.length === 0
                ? 'All field advisories and specimen logs have been acknowledged.'
                : `No ${selectedFilter.toLowerCase()} notifications found.`}
            </Text>

            <View style={styles.emptyActionsRow}>
              {notifications.length === 0 ? (
                <Pressable
                  onPress={handleResetDemo}
                  style={({ pressed }) => [styles.emptyPrimaryBtn, pressed && styles.btnPressed]}
                  accessibilityRole="button"
                  accessibilityLabel="Restore notifications"
                >
                  <RotateCcw size={13} color="#FFFFFF" strokeWidth={2.2} />
                  <Text style={styles.emptyPrimaryBtnText}>Restore</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => handleSelectFilter('All')}
                  style={({ pressed }) => [styles.emptyPrimaryBtn, pressed && styles.btnPressed]}
                >
                  <Text style={styles.emptyPrimaryBtnText}>View All</Text>
                </Pressable>
              )}

              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push('/(tabs)/scanner' as any);
                }}
                style={({ pressed }) => [styles.emptySecondaryBtn, pressed && styles.btnPressed]}
                accessibilityRole="button"
                accessibilityLabel="Open camera scanner"
              >
                <Camera size={13} color={Palette.ink} strokeWidth={2} />
                <Text style={styles.emptySecondaryBtnText}>Scan</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          filteredNotifications.map((item) => {
            const isRead = item.read;

            return (
              <Pressable
                key={item.id}
                onPress={() => handlePressItem(item)}
                style={({ pressed }) => [
                  styles.card,
                  isRead && styles.cardRead,
                  pressed && styles.cardPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`${item.title}, ${item.message}`}
              >
                {/* Compact Icon */}
                <View style={styles.iconBadge}>
                  {renderBadgeIcon(item.type)}
                </View>

                {/* Content */}
                <View style={styles.cardContent}>
                  <View style={styles.cardTopRow}>
                    <Text
                      style={[
                        styles.cardTitle,
                        isRead && styles.cardTitleRead,
                      ]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>

                    <View style={styles.timeAndDot}>
                      {!isRead && (
                        <View
                          style={[
                            styles.unreadDot,
                            item.type === 'safety' && styles.unreadDotDanger,
                          ]}
                        />
                      )}
                      <Text style={styles.timeLabel}>{item.time}</Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.cardMessage,
                      isRead && styles.cardMessageRead,
                    ]}
                    numberOfLines={2}
                  >
                    {item.message}
                  </Text>

                  {Boolean(item.actionLabel || item.route) && (
                    <View style={styles.actionInline}>
                      <Text
                        style={[
                          styles.actionInlineText,
                          item.type === 'safety' && styles.actionInlineTextDanger,
                        ]}
                      >
                        {item.actionLabel || 'View details'}
                      </Text>
                      <ChevronRight
                        size={12}
                        color={item.type === 'safety' ? Palette.danger : Palette.moss}
                        strokeWidth={2.2}
                      />
                    </View>
                  )}
                </View>

                {/* Small Dismiss Button */}
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(item.id);
                  }}
                  style={({ pressed }) => [
                    styles.dismissBtn,
                    pressed && styles.btnPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Dismiss notification"
                  hitSlop={8}
                >
                  <X size={12} color={Palette.mutedLight} strokeWidth={2} />
                </Pressable>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
