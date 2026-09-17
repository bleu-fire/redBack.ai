import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RooLayout (){
  return(
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown:false,  animation:'fade_from_bottom'}}>
        <Stack.Screen name="(auth)" options={{headerShown:false}} />

      </Stack>
    </SafeAreaProvider>
  );
}