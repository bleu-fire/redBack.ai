
import { style } from "@/app/(auth)/login";
import { Button } from "@react-navigation/elements";
import { View , Text, Pressable, StyleSheet } from "react-native";

type  BottonProp = {
    title:string,
    onPress: ()=> void
}

export default  function ({title , onPress}:BottonProp){
return(
       <View>
       <Pressable style={styles.ButtonStyleSheet} onPress={onPress}>
            <Text>
                {title}
            </Text>
       </Pressable>
    </View>
)
}


const styles = StyleSheet.create({
ButtonStyleSheet :{
    backgroundColor:"#A82020",
    paddingVertical:12,
    paddingHorizontal:20,
    borderRadius:8,
    alignItems:"center"
},
})