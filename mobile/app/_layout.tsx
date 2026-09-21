import React, { useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomSplashScreen from "@/components/splash-screen";

export default function RootLayout() {
  const [isSplashDone, setIsSplashDone] = useState(false);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* L-Splash screen dialna f React */}
      {!isSplashDone && (
        <CustomSplashScreen
          duration={2000}
          logoVariant="white"
          onFinish={() => setIsSplashDone(true)}
        />
      )}
    </SafeAreaProvider>
  );
}