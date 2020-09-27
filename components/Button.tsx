import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
const Button = ({
  onPress,
  children,
}: {
  children: any;
  onPress: (e: any) => any;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#B6999B",
    padding: 15,
    width: 146,
    borderRadius: 100,
    marginVertical: 50,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    letterSpacing: 4,
    fontFamily: "Calibre-Medium",
  },
});
