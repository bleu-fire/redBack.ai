import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  X,
  Bell,
  BellOff,
  AlertTriangle,
  Bug,
  Sparkles,
  CheckCheck,
  ChevronRight,
  Trash2,
  CheckCircle2,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';

export interface NotificationItem {
  id: string;
  type: 'safety' | 'discovery' | 'achievement' | 'community';
  title: string;
  message: string;
  time: string;
  read: boolean;
  route?: string;
}

const FILTERS = ['All', 'Safety', 'Discoveries', 'Activity'];

export default function ModalScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handlePressItem = (item: NotificationItem) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    // Navigate if route is available
    if (item.route) {
      router.push(item.route as any);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === 'Safety') return n.type === 'safety';
    if (selectedFilter === 'Discoveries') return n.type === 'discovery';
    if (selectedFilter === 'Activity') return n.type === 'achievement' || n.type === 'community';
    return true;
  });

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'safety':
        return <AlertTriangle size={18} color={Palette.danger} />;
      case 'discovery':
        return <Bug size={18} color={Palette.moss} />;
      case 'achievement':
        return <Sparkles size={18} color={Palette.gold} />;
      case 'community':
        return <CheckCircle2 size={18} color={Palette.moss} />;
      default:
        return <Bell size={18} color={Palette.muted} />;
    }
  };

  const getBadgeBg = (type: NotificationItem['type']) => {
    switch (type) {
      case 'safety':
        return Palette.coralSoft;
      case 'discovery':
        return Palette.mossSoft;
      case 'achievement':
        return Palette.goldSoft;
      case 'community':
        return Palette.mossSoft;
      default:
        return Palette.surfaceSubtle;
    }
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom + 12 }]}>
      {/* 1. Header with Close Button and Title */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount} new</Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Close notifications"
        >
          <X size={22} color={Palette.ink} />
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
              unreadCount === 0 && styles.actionDisabled,
              pressed && styles.pressed,
            ]}
          >
            <CheckCheck size={16} color={unreadCount > 0 ? Palette.moss : Palette.muted} />
            <Text style={[styles.actionText, unreadCount === 0 && styles.textDisabled]}>
              Mark all as read
            </Text>
          </Pressable>

          <Pressable
            onPress={handleClearAll}
            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
          >
            <Trash2 size={15} color={Palette.muted} />
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        </View>
      )}

      {/* 3. Filter Category Pills */}
      <View style={styles.filterScroll}>
        {FILTERS.map((filter) => {
          const isSelected = selectedFilter === filter;
          return (
            <Pressable
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterChip,
                isSelected ? styles.filterChipActive : styles.filterChipInactive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  isSelected ? styles.filterTextActive : styles.filterTextInactive,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* 4. Notifications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <BellOff size={32} color={Palette.muted} />
            </View>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySubtitle}>
              You have no {selectedFilter === 'All' ? '' : selectedFilter.toLowerCase()} notifications at this time.
            </Text>
          </View>
        ) : (
          filteredNotifications.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handlePressItem(item)}
              style={({ pressed }) => [
                styles.card,
                !item.read && styles.cardUnread,
                pressed && styles.pressed,
              ]}
            >
              {/* Left Icon Badge */}
              <View style={[styles.iconBadge, { backgroundColor: getBadgeBg(item.type) }]}>
                {getIconForType(item.type)}
              </View>

              {/* Center Content */}
              <View style={styles.contentContainer}>
                <View style={styles.rowTop}>
                  <Text style={[styles.itemTitle, !item.read && styles.itemTitleUnread]}>
                    {item.title}
                  </Text>
                  {!item.read && <View style={styles.dotIndicator} />}
                </View>

                <Text style={styles.itemMessage} numberOfLines={2}>
                  {item.message}
                </Text>

                <Text style={styles.itemTime}>{item.time}</Text>
              </View>

              {/* Right Arrow if Navigable */}
              {Boolean(item.route) && (
                <ChevronRight size={18} color={Palette.muted} style={styles.chevron} />
              )}
            </Pressable>
          ))
        )}
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
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontFamily: Typography.display,
    fontSize: 24,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.4,
  },
  unreadBadge: {
    backgroundColor: Palette.coralSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  unreadBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.danger,
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: Radii.pill,
    backgroundColor: Palette.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  actionDisabled: {
    opacity: 0.5,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.moss,
  },
  textDisabled: {
    color: Palette.muted,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '500',
    color: Palette.muted,
  },
  filterScroll: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radii.pill,
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: Palette.moss,
    borderColor: Palette.moss,
  },
  filterChipInactive: {
    backgroundColor: Palette.paper,
    borderColor: Palette.line,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterTextInactive: {
    color: Palette.inkSecondary,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xxl,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Palette.paper,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Palette.line,
    padding: Spacing.md,
    gap: 12,
  },
  cardUnread: {
    borderColor: Palette.coralSoft,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 3.5,
    borderLeftColor: Palette.coral,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  itemTitle: {
    fontFamily: Typography.body,
    fontSize: 14.5,
    fontWeight: '600',
    color: Palette.ink,
    flex: 1,
    paddingRight: 6,
  },
  itemTitleUnread: {
    fontWeight: '800',
  },
  dotIndicator: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Palette.coral,
  },
  itemMessage: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    lineHeight: 18,
    marginBottom: 6,
  },
  itemTime: {
    fontSize: 11,
    fontWeight: '500',
    color: Palette.mutedLight,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 10,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Palette.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  emptyTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
  },
  emptySubtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.9,
  },
});
