import * as React from "react";
import { Image, Text, View } from "react-native";
import { Bubble } from "../components/Bubble";
import { Avatar } from "../components/Avatar";
import dayjs from "dayjs";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LikeButton } from "../components/LikeButton";
import { FeedMeditation, useMe } from "../hooks/fetcher";

import { useNavigation } from "@react-navigation/native";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export const FeedItem = ({ meditation }: { meditation: FeedMeditation }) => {
  if (!meditation) return null;
  const { me } = useMe();
  const navigation = useNavigation();
  return (
    <Bubble key={meditation.id}>
      <TouchableOpacity
        onPress={() =>
          meditation.user.id === me?.id
            ? navigation.navigate("Profile")
            : navigation.navigate("UserProfile", { userId: meditation.user.id })
        }
      >
        <View style={{ display: "flex", flexDirection: "row", paddingTop: 10 }}>
          <View style={{ width: "27%" }}>
            <Avatar user={meditation.user} size={70}></Avatar>
          </View>
          <View style={{ width: "40%", marginLeft: 0 }}>
            <Text style={{ fontSize: 17, color: "gray", paddingBottom: 4 }}>
              {meditation.user.name}
            </Text>
            <Text style={{ color: "gray" }}>
              {/* @ts-ignore */}
              {dayjs(meditation.createdAt).from(dayjs())}
            </Text>
            {/* <Text style={{ color: "#B6999B", paddingTop: 5 }}>
              ⚡ 4 day streak
            </Text> */}
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
            <Text style={{ color: Colors.mauve, fontSize: 14 }}>
              {Math.ceil(meditation.duration / 60)} min
            </Text>
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
        <Text style={{ fontSize: 15, color: "#4A4A4A", marginLeft: -15 }}>
          {meditation.notes}
        </Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", paddingBottom: 10 }}
      >
        <LikeButton meditation={meditation}></LikeButton>
      </View>
    </Bubble>
  );
};
