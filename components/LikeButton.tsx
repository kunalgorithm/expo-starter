import * as React from "react";
import { mutate } from "swr";
import { Image, Text, View } from "react-native";
import { FeedMeditation, fetcher, useFeed, useMe } from "../hooks/fetcher";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Avatar } from "../components/Avatar";

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
      unlike: isLiked ? true : false,
    });

    await mutate(
      "/api/feed",
      feed?.map((m) =>
        m.id === meditation.id
          ? {
              ...m,
              likes: isLiked
                ? m.likes.filter((l) => l.user_id !== me?.id)
                : [...m.likes, { user_id: me?.id, user: me }],
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
        {meditation.likes.length > 0 && (
          <View>
            <Text style={{ fontSize: 15, color: "#4A4A4A", marginLeft: -210 }}>
              {meditation.likes.length} kudos
              {meditation.likes.map((like, i) => (
                <Avatar
                  size={20}
                  user={like.user}
                  key={i}
                  style={{ marginLeft: 0 }}
                ></Avatar>
              ))}
            </Text>
          </View>
        )}

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
          Kudos
        </Text>
      </View>
    </TouchableOpacity>
  );
};
