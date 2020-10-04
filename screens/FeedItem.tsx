import * as React from "react";
import { Image, Text } from "react-native";
import { Bubble } from "../components/Bubble";
import { Avatar } from "../components/Avatar";
import { View } from "../components/Themed";
import dayjs from "dayjs";
import { Meditation, User } from "../server/node_modules/@prisma/client";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export const FeedItem = ({
  meditation,
}: {
  meditation: Meditation & { user: User };
}) => {
  if (!meditation) return null;
  return (
    <Bubble key={meditation.id}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "25%" }}>
          <Avatar user={meditation.user} size={50}></Avatar>
        </View>
        <View style={{ width: "40%" }}>
          <Text>{meditation.user.name}</Text>
          <Text style={{ color: Colors.mauve }}>
            {dayjs(meditation.createdAt).format("M.D.YY")}
          </Text>
          <Text>⚡ 4 day streak</Text>
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
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ color: Colors.mauve }}>
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
        <Text style={{ fontSize: 18 }}>{meditation.notes}</Text>
      </View>

      <LikeButton meditation={meditation}></LikeButton>
    </Bubble>
  );
};

const LikeButton = ({ meditation }: { meditation: Meditation }) => {
  const [liked, setLiked] = React.useState(false);
  return (
    <TouchableOpacity onPress={() => setLiked(!liked)}>
      <View
        style={{
          width: "95%",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Image
          source={require("../assets/icons/like.jpeg")}
          style={{ width: 20, height: 20 }}
        />
        <Text
          style={{ color: Colors.mauve, fontWeight: liked ? "bold" : "normal" }}
        >
          {liked ? "unlike" : "like"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
