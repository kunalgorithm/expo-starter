import * as React from "react";
import { Image, Text, View } from "react-native";
import { Bubble } from "../components/Bubble";
import { Avatar } from "../components/Avatar";
import dayjs from "dayjs";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMe } from "../hooks/fetcher";

import { useNavigation } from "@react-navigation/native";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export const FeedItem = ({
  item,
}: {
  item: { text: string; id: number; author: { username: string; id: number } };
}) => {
  if (!item) return null;
  const { me } = useMe();
  const navigation = useNavigation();
  return (
    <Bubble key={item.id}>
      <TouchableOpacity
        onPress={() =>
          item.author.id === me?.id
            ? navigation.navigate("Profile")
            : navigation.navigate("UserProfile", { userId: item.author.id })
        }
      >
        <View style={{ display: "flex", flexDirection: "row", paddingTop: 10 }}>
          <View style={{ width: "27%" }}>
            <Avatar user={item.author} size={70}></Avatar>
          </View>
          <View style={{ width: "40%", marginLeft: 0 }}>
            <Text
              style={{
                fontFamily: "Calibre-Medium",
                fontSize: 17,
                color: "gray",
                paddingBottom: 4,
              }}
            >
              {item.author.username}
            </Text>
          </View>
          <View
            style={{
              width: "29%",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <Image
              source={require("../assets/icons/pray_icon.png")}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          margin: 15,
          width: "80%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Calibre-Regular",
            color: "#4A4A4A",
            marginLeft: -15,
          }}
        >
          {item.text}
        </Text>
      </View>
    </Bubble>
  );
};
