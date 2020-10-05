import * as React from "react";
import { mutate } from "swr";
import { View } from "../components/Themed";
import { fetcher, useMe } from "../hooks/fetcher";
import Button from "../components/Button";
import { User } from "../types";

export const FollowButton = ({ user }: { user: User }) => {
  const { me } = useMe();
  const [loading, setLoading] = React.useState(false);

  const isFollowing = me?.following.find((u) => u.user_id === user.id);
  return (
    <View>
      <Button
        small
        invertColors={!isFollowing}
        onPress={async () => {
          setLoading(true);
          const res = await fetcher(`/api/follow`, {
            id: user.id,
            unfollow: isFollowing,
          });
          await mutate("/api/me", {
            ...me,
            following: isFollowing
              ? me?.following.filter((u) => u.user_id !== user.id)
              : [...me?.following!, user],
          });
          mutate("/api/feed");
          setLoading(false);
        }}
      >
        {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </View>
  );
};
