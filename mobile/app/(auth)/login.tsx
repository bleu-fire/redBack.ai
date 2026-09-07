import { View, Text } from 'react-native';
import ButtonComponent from '@/components/ui/button';


export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ButtonComponent name="Login" path="/(tabs)" />
    </View>
  );
}
