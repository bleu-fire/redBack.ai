import { View, Text, StyleSheet } from 'react-native';
import { ImageBackground } from 'expo-image';
import Buttons from '@/components/ui/buttons';

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/spider-bg.png')}
      style={style.backgroundImage}
      contentFit="cover"
    >
      <View style={style.Overly}>
        <View style={style.headerContainer}>
          <Text style={style.textForUser}>
            Hello explorer, create to get great experience
          </Text>
        </View>
        <View style={style.button}>
          <Buttons name="register" path="/(auth)/register" />

          <Buttons name="login" path="/(auth)/login" />
        </View>
      </View>
    </ImageBackground>
  );
}

export const style = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

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
