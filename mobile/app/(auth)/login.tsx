import { View, Text, StyleSheet, TextInput } from 'react-native';
import ButtonForLoginAndRegister from '@/components/ui/ButtonForLoginAndRegister';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { LoginUser } from '@/data/logic';



export default function LoginScreen() {
  const [email, setemail] = useState('');
  const [password, setpassord] = useState('');

  const handleInfo =  async () => {
    //check if user is correct 
     if(!email || !password){
      alert("plase enter the info to start")
      return
     }
    try{
      const data = await LoginUser(email,password);
      console.log(`login NJA7 ${data}`);
      alert(`ma7ba bik ${data.data.user.name}`)
      
      router.replace('/(tabs)')
    }
    catch(err){
         console.error(err)
    }
     
  }

  return (
    <View style={styless.headerContainer}>
      <Text style={styless.textForUser}>
        Welcome The Explorer .
      </Text>

      <View>
        <TextInput
          placeholder="Enter the Email"
          style={styless.InputHolder}
          value={email}
          onChangeText={setemail}
        />
      </View>

      <View>
        <TextInput
          placeholder="Enter the password"
          style={styless.InputHolder}
          secureTextEntry
          value={password}
          onChangeText={setpassord}
        />
      </View>

      <View>
        <ButtonForLoginAndRegister title="login" onPress={handleInfo} />
      </View>

      <View>
        <Link href="/register" style={styless.LinkDircting}>
          go to the register
        </Link>
      </View>
    </View>
  );
}

export const styless = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#F7F5F0", // Canvas naqi w calme
  },
  button: {
    gap: 15,
  },
  textForUser: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#17211F", // Dark Ink pro
    lineHeight: 34,
    marginBottom: 48,
  },
  InputHolder: {
    backgroundColor: "#FFFFFF", // Abyad naqi
    borderWidth: 1.5,
    borderColor: "#E7E5DF", // Border r9iqa m9ada
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    color: "#17211F",
  },
  LinkDircting: {
    paddingVertical: 14,
    color: "#E84B3C", // L-Hmar dial redBack.ai
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
});
