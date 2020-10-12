import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text, View } from "react-native";
const Button = ({
  onPress,
  children,
  small,
  invertColors,
  style,
}: {
  children: string | any;
  onPress: (e: any) => any;
  small?: boolean;
  invertColors?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const white = "#fff";
  const primary = "#B6999B";
  return (
    <TouchableOpacity
      style={Object.assign(
        {
          backgroundColor: invertColors ? white : primary,
          padding: small ? 5 : 15,
          width: small ? 100 : 146,
          borderRadius: 100,
          marginVertical: small ? 10 : 50,
          alignItems: "center",
          borderWidth: invertColors ? 1.3 : 0,
          borderColor: "#B6999B",
        },
        style
      )}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: small ? 12 : 20,
          color: invertColors ? primary : white,

          letterSpacing: 1,
          textTransform: "uppercase",
          fontFamily: "Calibre-Medium",
          marginTop: 5,
          marginLeft: 4,
          alignItems: "center",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
