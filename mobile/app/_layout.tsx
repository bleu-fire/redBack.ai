import 'react-native-reanimated';
import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import CustomSplashScreen from '@/components/splash-screen';
import { Palette } from '@/constants/theme';

// Ignore harmless dev reload warning from expo-keep-awake before Android activity attaches
LogBox.ignoreLogs(['Unable to activate keep awake']);

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [isSplashDone, setIsSplashDone] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor={Palette.canvas} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Palette.canvas },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="species/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="results" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="chat" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="upload" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="settings" options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>

        {/* Brand Splash Screen Overlay */}
        {!isSplashDone && (
          <CustomSplashScreen
            duration={2000}
            logoVariant="white"
            onFinish={() => setIsSplashDone(true)}
          />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}