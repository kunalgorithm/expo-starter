import * as React from "react";
import { Image, Text, View } from "react-native";
import { Bubble } from "../components/Bubble";
import { Avatar } from "../components/Avatar";
import dayjs from "dayjs";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LikeButton } from "../components/LikeButton";
import { FeedMeditation } from "../hooks/fetcher";

export const FeedItem = ({ meditation }: { meditation: FeedMeditation }) => {
  if (!meditation) return null;
  return (
    <Bubble key={meditation.id}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "25%" }}>
          <Avatar user={meditation.user} size={70}></Avatar>
        </View>
        <View style={{ width: "40%" }}>
          <Text style={{ fontSize: 17, color: "gray", paddingBottom: 4 }}>
            {meditation.user.name}
          </Text>
          <Text style={{ color: "gray" }}>
            {dayjs(meditation.createdAt).format("M.D.YY")}
          </Text>
          <Text style={{ color: "#B6999B", paddingTop: 5 }}>
            ⚡ 4 day streak
          </Text>
        </View>
        <View
          style={{
            width: "25%",
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

      <LikeButton meditation={meditation}></LikeButton>
    </Bubble>
  );
};
