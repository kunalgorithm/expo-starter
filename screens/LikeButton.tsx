import * as React from "react";
import { mutate } from "swr";
import { Image, Text } from "react-native";

import { View } from "../components/Themed";
import { FeedMeditation, fetcher, useFeed, useMe } from "../hooks/fetcher";
import Button from "../components/Button";
import { Meditation, User, Like } from "../server/node_modules/@prisma/client";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

export const LikeButton = ({ meditation }: { meditation: FeedMeditation }) => {
  const { feed } = useFeed();
  const { me } = useMe();
  const [loading, setLoading] = React.useState(false);

  const isLiked = meditation.likes?.find((u) => u.user_id === me?.id);
  const onPress = async () => {
    if (loading) return null;
    setLoading(true);
    const res = await fetcher(`/api/like`, {
      id: meditation.id,
      unlike: isLiked,
    });
    console.log(res.error);
    await mutate(
      "/api/feed",
      feed?.map((m) =>
        m.id === meditation.id
          ? {
              ...m,
              likes: [...m.likes, { user_id: me?.id, meditation_id: m.id }],
            }
          : m
      )
    );
    mutate("/api/feed");
    setLoading(false);
  };
  return (
    <TouchableOpacity onPress={onPress}>
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
          style={{
            color: Colors.mauve,
            fontWeight: isLiked ? "bold" : "normal",
          }}
        >
          {isLiked ? " Liked" : " Like"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
