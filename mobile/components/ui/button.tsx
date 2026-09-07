import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";



export default function ButtonComponent({ name, path }: { name: string; path: string }) {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => {router.replace(path)}}>

        <View style={styles.text}>
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#31612a',
    height:30,
    width: 200,
    borderRadius: 90
  },
  text: {
    color: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
      },
});
