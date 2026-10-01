import { Redirect, router } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Palette } from '@/constants/theme';
import AsyncStorageManagement from '@/data/storage/asyncstorage';

export default function Index() {
  // useEffect(() => {
  //   async function ActivityToken() {
  //     try {
  //       const token = await AsyncStorageManagement.getToken();
  //       if (token) {
  //         console.log("token found");
  //         router.replace('/(tabs)');
  //       } else {
  //         router.replace('/(auth)/login');
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       router.replace('/(auth)/login');
  //     }
  //   }
  //   ActivityToken();
  // }, []);

  return (
    // <View style={styles.container}>
    //   <ActivityIndicator size="large" color={Palette.coral} />
    // </View>
    <Redirect href="/onboarding"/>
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