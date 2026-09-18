
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type BottonProp = {
  title: string;
  onPress: () => void;
};

export default function ButtonForLoginAndRegister({ title, onPress }: BottonProp) {
  return (
    <View>
      <Pressable style={styles.ButtonStyleSheet} onPress={onPress}>
        <Text style={styles.TextOFButton}>{title}</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
ButtonStyleSheet :{
    backgroundColor:"#E84B3C",
    paddingVertical:12,
    paddingHorizontal:20,
    borderRadius:8,
    alignItems:"center"
},
TextOFButton:{
 fontSize:17
}
})