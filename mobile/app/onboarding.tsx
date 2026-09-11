import ButtonComponent from '@/components/ui/button';
import { Text, View } from 'react-native';

export default function OnboardingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Onboarding Screen</Text>
<ButtonComponent name='start' path={"/(auth)/login"} />
    </View>
  );
}
