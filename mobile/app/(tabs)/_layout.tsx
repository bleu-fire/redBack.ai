import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette } from '@/constants/theme';
import { Home, Compass, BookOpen, User, Camera } from 'lucide-react-native';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Palette.coral,
        tabBarInactiveTintColor: Palette.muted,
        tabBarStyle: {
          backgroundColor: Palette.paper,
          borderTopColor: Palette.line,
          borderTopWidth: 1,
          elevation: 0,
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size ?? 22} color={color} />
          ),
        }}
      />
      {/* 2. Spider Search & Explorer */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Compass size={size ?? 22} color={color} />
          ),
        }}
      />

      {/* 3. Camera Scanner (in the center) */}
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ size, focused }) => (
            <View style={[styles.circle, focused && styles.activeCircle]}>
              <Camera size={size ?? 22} color={focused ? Palette.paper : Palette.coral} />
            </View>
          ),
        }}
      />

      {/* 4. Learning Center */}
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size ?? 22} color={color} />
          ),
        }}
      />

      {/* 5. Explorer Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size ?? 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.coralSoft,
  },
  activeCircle: {
    backgroundColor: Palette.coral,
  },
});