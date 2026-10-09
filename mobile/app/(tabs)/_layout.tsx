import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette } from '@/constants/theme';
import { Home, Compass, BookOpen, User, Camera } from 'lucide-react-native';

interface TabIconProps {
  focused: boolean;
  IconComponent: any;
}

function TabIcon({ focused, IconComponent }: TabIconProps) {
  return (
    <IconComponent
      size={22}
      color={focused ? Palette.moss : Palette.muted}
      strokeWidth={focused ? 2.2 : 1.8}
    />
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Palette.moss,
        tabBarInactiveTintColor: Palette.muted,
        tabBarStyle: {
          backgroundColor: Palette.paper,
          borderTopColor: Palette.line,
          borderTopWidth: 1,
          elevation: 0,
          height: 60 + (insets.bottom > 0 ? insets.bottom : 8),
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      {/* 1. Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} IconComponent={Home} />
          ),
        }}
      />

      {/* 2. Spider Search & Explorer */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} IconComponent={Compass} />
          ),
        }}
      />

      {/* 3. Camera Scanner (elevated central action) */}
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Identify',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.scannerButton, focused && styles.scannerButtonActive]}>
              <Camera size={22} color="#FFFFFF" strokeWidth={2.2} />
            </View>
          ),
        }}
      />

      {/* 4. Learning Center */}
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} IconComponent={BookOpen} />
          ),
        }}
      />

      {/* 5. Field Journal / Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Journal',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} IconComponent={User} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scannerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Palette.moss,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: Palette.paper,
    shadowColor: Palette.moss,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  scannerButtonActive: {
    backgroundColor: Palette.mossDark,
    transform: [{ scale: 1.05 }],
  },
});