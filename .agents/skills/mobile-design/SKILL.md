---
name: mobile-design
description: >-
  Specialized mobile app design and UX engineering standards for React Native & Expo (iOS HIG & Android Material 3). Covers thumb zones, safe areas, gesture mechanics, native bottom sheets, haptic feedback, 60/120 FPS performance, and platform ergonomics.
---

# Mobile UX & Interface Engineering Skill

This skill provides the comprehensive runbook for designing and building ergonomic, responsive, high-performance mobile applications with React Native and Expo Router.

---

## 1. The Mobile Thumb Zone Architecture

Mobile devices are held primarily in one hand. Interfaces must prioritize the anatomical reach of the thumb:

```text
┌─────────────────────────────────────────┐
│              [ HARD ZONE ]              │ <- Secondary icons, status display
│                                         │
│                                         │
│             [ REACH ZONE ]              │ <- Informational content, cards, feeds
│                                         │
│                                         │
│             [ NATURAL ZONE ]            │ <- Primary CTAs, bottom navigation,
│                                         │    shutter buttons, search inputs
└─────────────────────────────────────────┘
```

### Thumb Zone Rules:
1. **Primary Action Placement**: Place key action triggers (e.g. Camera Shutter, "Talk to AI", "Add Observation", "Submit") within the bottom 30% of the screen.
2. **Bottom Navigation**: Keep core navigation in a 4–5 item bottom tab bar (`(tabs)`), easily reached by either left or right thumb.
3. **Destructive Actions Guard**: Never place destructive actions (e.g. Delete, Leave) in the easiest-to-hit thumb zones without confirmation modal sheets.

---

## 2. Safe Area & Device Geometry

Modern mobile screens feature notches, camera cutouts, dynamic islands, and rounded corners.

### Safe Area Standards:
1. **Root Screen Container**:
   - Always apply insets using `useSafeAreaInsets()` from `react-native-safe-area-context`:
     ```tsx
     const insets = useSafeAreaInsets();
     return (
       <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 8 }]}>
         {children}
       </View>
     );
     ```
2. **Bottom Insets**:
   - Fixed bottom bars must add `insets.bottom` to padding to ensure buttons do not collide with the iOS Home Indicator bar or Android navigation bar.
3. **Keyboard Handling**:
   - Wrap interactive forms and chat screens in `KeyboardAvoidingView` with `behavior={Platform.OS === 'ios' ? 'padding' : undefined}`.

---

## 3. Mobile Navigation & Presentation Patterns

### Modern Navigation Hierarchy (Expo Router):
- **Bottom Tabs (`/(tabs)`)**: High-frequency destinations (Home, Explore, Scanner, Learn, Profile).
- **Stack Push (`router.push('/...')`)**: Hierarchical drill-down detail screens (e.g. `/species/[id]`, `/results`, `/chat`).
- **Modal Sheets (`presentation: 'modal'`)**: Transient, focused tasks (e.g. `/modal` notifications, filter dialogs, photo pickers).
  - Use `animation: 'slide_from_bottom'` for native sheet feel.
  - Include an explicit close (`X`) button in the header in addition to drag-to-dismiss.

---

## 4. Tactile & Haptic Feedback (`expo-haptics`)

Haptic sensations bridge physical touch with digital reactions:
- **Selection / Tab Change**: `Haptics.selectionAsync()` — subtle click feel when switching tabs or filter chips.
- **Success / Completion**: `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)` — upon successful identification, quiz answer, or saving an observation.
- **Warning / Hazard**: `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)` — when viewing high-toxicity venom alert species.
- **Impact / Button Press**: `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)` — when pressing camera shutter or primary CTA.

---

## 5. Performance Engineering for 60/120 FPS

1. **List Virtualization**:
   - For lists with > 10 items, use `FlatList` with `keyExtractor`, `initialNumToRender={8}`, and `windowSize={5}` instead of unbounded `ScrollView`.
2. **Image Optimization**:
   - Always define explicit `width` and `height` dimensions on `<Image />`.
   - Use `resizeMode="cover"` for banners and thumbnails.
   - Support both local asset requires (`require(...)`) and remote `{ uri: ... }` strings gracefully.
3. **Transform over Position**:
   - Animate `transform: [{ translateY }, { scale }]` and `opacity` rather than animating `top`, `bottom`, `width`, or `height` to keep calculations on the UI thread.
4. **Touch Response State**:
   - Use `Pressable` with `style={({ pressed }) => [styles.btn, pressed && styles.pressed]}` where `styles.pressed` applies `opacity: 0.9` and `transform: [{ scale: 0.98 }]`.

---

## 6. Offline-First Mobile Experience

Naturalists frequently explore remote outdoor areas with weak or absent cellular connectivity:
1. **Persistent Local Cache**: Store credentials, recent identifications, and species metadata locally using Zustand `persist` with `@react-native-async-storage/async-storage`.
2. **Optimistic UI Updates**: Immediately update UI (e.g. toggling bookmarks, marking notifications as read) before or in parallel with network sync.
3. **Offline Indicators**: Provide subtle offline banners without blocking browsing of cached species field guides.
