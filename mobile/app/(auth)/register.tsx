
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
                        <Link href="/login" style={styles.LinkDircting}> go to the register</Link> 
                    </View>

        </View>

  );
}

export const styles = StyleSheet.create({


  headerContainer: {
    flex:1,
    paddingHorizontal:10,
    justifyContent:"center",
    backgroundColor:"#fefae0"
  },
  button: {
    gap: 15,
  },
  textForUser: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5c1605',
    lineHeight: 30,
    marginBottom:133
  },
  InputHolder:{
    backgroundColor:"#f5ebe2",
    borderRadius:10,
    paddingVertical:15,
    marginBottom:20,
    textAlignVertical:'auto'
  },
    LinkDircting:{
    borderRadius:10,
    paddingVertical:15,
    marginBottom:20,
    textAlignVertical:'auto',
    color:'#b13434',
    textAlign:'center'
  }


});
 