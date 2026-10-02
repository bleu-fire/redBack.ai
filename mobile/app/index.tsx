import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorageManagement from '@/data/storage/asyncstorage';
import { Palette } from '@/constants/theme';

export default function Index() {
  useEffect(() => {
    const verifyOnboarding = async () => {
      try {
        const token = await AsyncStorageManagement.getToken();
        if (token) {
          console.log("User already logged in, redirecting to tabs...");
          router.replace('/(tabs)');
        } else {
          console.log("No token, redirecting to onboarding...");
          router.replace('/onboarding');
        }                                         
      } catch (err) {
        console.error("Auth check error:", err);
        router.replace('/onboarding');
      }
    };

    // 1. You must call the function here!
    verifyOnboarding();
  }, []);

  // 2. Return a loading view while checking storage
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
