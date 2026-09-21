import { Redirect } from 'expo-router';

export default function Index() {
  // Kaydina direct l login screen
  return <Redirect href="/(auth)/login" />;
}

