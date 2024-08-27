import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";

interface ButtonProps {
  onPress: () => void
  children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({onPress, children}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.gray[200],
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: "auto",
    marginBottom: 32
  }
})