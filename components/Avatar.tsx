import * as React from "react";

import { StyleSheet, Image } from "react-native";
import { User } from "../server/node_modules/@prisma/client";

export const Avatar = ({ user }: { user: User }) => (
  <Image
    style={{
      height: 70,
      width: 70,
      borderRadius: 50,
    }}
    source={
      user?.imageUrl
        ? { uri: user?.imageUrl }
        : require("../assets/images/Profile_Placeholder.png")
    }
  ></Image>
);
