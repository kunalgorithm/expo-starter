import * as React from "react";

import {
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { User } from "../types";

export const Avatar = ({
  user,
  size = 70,
  style,
}: {
  user: User;
  size?: number;
  style?: StyleProp<any>;
}) => (
  <Image
    style={{
      height: size,
      width: size,
      borderRadius: 50,
      ...style,
    }}
    source={
      user?.imageUrl
        ? { uri: user?.imageUrl }
        : require("../assets/images/Profile_Placeholder.png")
    }
  ></Image>
);
