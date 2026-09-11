import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    // add to fix the layouts in this project  exectly in the  login and register
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}

