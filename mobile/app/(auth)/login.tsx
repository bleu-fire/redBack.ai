<<<<<<< Updated upstream
import { View, Text, StyleSheet } from 'react-native';
import { Buttons } from '@/components/ui/buttons';
=======
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ImageBackground } from 'expo-image';
import ButtonForLoginAndRegister from '@/components/ui/ButtonForLoginAndRegister';
import { useEffect,useState } from 'react';


>>>>>>> Stashed changes

export default function LoginScreen() {
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
      <View style={style.Overly}>
        <View style={style.headerContainer}>
          <Text style={style.textForUser}>
           Welcome The Explorer .
          </Text>
          <View>
          <TextInput placeholder='Enter the Email'  style={style.InputHolder}  value={email} onChangeText={setemail}/>
          
          </View>

          <View>
          <TextInput placeholder='Enter the passowrd'  style={style.InputHolder} value={Password} onChangeText={setPassord} />
          </View>
          <View>
          <ButtonForLoginAndRegister title='login' onPress={handleInfo}/>
          </View>
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
  InputHolder:{
    backgroundColor:"#FCECD8",
    borderRadius:10,
    paddingVertical:15,
    marginBottom:20,
    textAlignVertical:'auto'
    
    

  }
});
