import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isAuth = false;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
    </ThemeProvider>
  );
}
