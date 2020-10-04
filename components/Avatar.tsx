import * as React from "react";

import { StyleSheet, Image } from "react-native";
import { User } from "../server/node_modules/@prisma/client";

export const Avatar = ({ user, size = 70 }: { user: User; size?: number }) => (
  <Image
    style={{
      height: size,
      width: size,
      borderRadius: 50,
    }}
    source={
      user?.imageUrl
        ? { uri: user?.imageUrl }
        : require("../assets/images/Profile_Placeholder.png")
    }
  ></Image>
);
