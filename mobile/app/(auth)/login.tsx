import { View, Text, StyleSheet } from 'react-native';
import { Buttons } from '@/components/ui/buttons';

export default function LoginScreen() {
  return (
      <View style={style.Overly}>
        <View style={style.headerContainer}>
          <Text style={style.textForUser}>
           Welcome The Explorer .
          </Text>
        </View>
        <View style={style.button}>
          <Buttons name="register" path="/(auth)/register" />

          <Buttons name="login" path="/(auth)/login" />
        </View>
      </View>
  );
}

export const style = StyleSheet.create({

  Overly: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // dark overlay for readability
  },
  headerContainer: {
    marginBottom: 30,
  },
  button: {
    gap: 15,
  },
  textForUser: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 30,
  },
});
