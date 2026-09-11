
import {  StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <Text>
        hello
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

});
