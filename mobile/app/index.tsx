import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import AsyncStorageManagement from '@/data/storage/asyncstorage';
import { useStore } from '@/store/stores';
import { Palette } from '@/constants/theme';

export default function Index() {
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        const storeToken = useStore.getState().token;
        const storedToken = storeToken || (await AsyncStorageManagement.getToken());

        if (!isMounted) return;

        if (storedToken) {
          if (!storeToken) {
            const userData = await AsyncStorageManagement.getUserdata();
            useStore.getState().login(storedToken, userData);
          }
          console.log("User already logged in, redirecting to tabs...");
          setTargetRoute('/(tabs)');
        } else {
          console.log("No token, redirecting to onboarding...");
          setTargetRoute('/onboarding');
        }
      } catch (err) {
        console.error("Auth check error:", err);
        if (isMounted) {
          setTargetRoute('/onboarding');
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (targetRoute) {
    return <Redirect href={targetRoute as any} />;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Palette.coralDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.canvas,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
