
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
  ButtonStyleSheet: {
    backgroundColor: '#E84B3C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E84B3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  TextOFButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});