import { useEffect, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import CustomSplashScreen from '@/components/splash-screen';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isAuth = false;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!isAuth}>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(auth)" />
          </Stack.Protected>

          <Stack.Protected guard={isAuth}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="scanner" />
            <Stack.Screen name="upload" />
            <Stack.Screen name="results" />
            <Stack.Screen name="species/[id]" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
        {showSplash && (
          <CustomSplashScreen onFinish={() => setShowSplash(false)} duration={1800} />
        )}
      </View>
    </ThemeProvider>
  );
}
