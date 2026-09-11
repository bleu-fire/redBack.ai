import { TouchableOpacity, Text, View, StyleSheet, TouchableOpacityProps } from "react-native";
import { type Href, useRouter } from 'expo-router';

interface ButtonComponentProps extends Omit<TouchableOpacityProps, 'onPress'> {
  name: string;
  path: Href;
  onPress?: () => void;
}

export default function ButtonComponent({ name, path, onPress, ...rest }: ButtonComponentProps) {
  const router = useRouter();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.replace(path);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} {...rest}>
      <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0cc97b',
    height: 50,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
