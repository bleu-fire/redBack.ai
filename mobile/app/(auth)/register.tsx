
import { View, Text, StyleSheet, TextInput } from 'react-native';
import ButtonForLoginAndRegister from '@/components/ui/ButtonForLoginAndRegister';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

export default function RegisterScreen() {
  const [email ,setemail] = useState('');
  const [Password ,setPassord] = useState('');
  useEffect(
    ()=>{
      alert('enter info  in now  to start fixin the app ')
    },[]
  )
  const  handleInfo = ()=>{
    alert(`${Password} and ${email}`)
  }
  return (

        <View style={styles.headerContainer}>
          <Text style={styles.textForUser}>
           Welcome The Explorer .
          </Text>
          <View>
          <TextInput placeholder='Enter the Name'  style={styles.InputHolder}  value={email} onChangeText={setemail} />
          
          </View>

          <View>
          <TextInput placeholder='Enter the Email'  style={styles.InputHolder} value={Password} onChangeText={setPassord} />
          </View>
                    <View>
          <TextInput placeholder='Enter the password'  style={styles.InputHolder}  value={email} onChangeText={setemail} />
          
          </View>

          <View>
          <TextInput placeholder='Enter the passowrd to verfy '  style={styles.InputHolder} value={Password} onChangeText={setPassord} />
          </View>
          <View>
          <ButtonForLoginAndRegister title='login' onPress={handleInfo}/>
          </View>
                    <View >
                        <Link href="/login" style={styles.LinkDircting}> go to the login </Link> 
                    </View>

        </View>

  );
}

export const styles = StyleSheet.create({
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
    color: "#17211F", // Dark Ink
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
 