import * as React from "react";
import { StyleSheet } from "react-native";
import { mutate } from "swr";
import { Text, View } from "../components/Themed";
import { fetcher, useMe, useUsers } from "../hooks/fetcher";
import { Bubble } from "./Bubble";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import Button from "../components/Button";
import { User } from "../server/node_modules/@prisma/client";
export default function FindFriendsScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "FindFriends">) {
  const { users } = useUsers();
  const { me } = useMe();

  return (
    <View style={styles.container}>
      <Button small invertColors onPress={() => navigation.goBack()}>
        Go Back
      </Button>

      {users
        ?.filter((u) => u.id !== me.id)
        .map((user, i) => (
          <View style={styles.row} key={i}>
            <Bubble title={user.name}>
              <FollowButton user={user} />
            </Bubble>
          </View>
        ))}
    </View>
  );
}

const FollowButton = ({ user }: { user: User }) => {
  const { me } = useMe();
  const isFollowing = me?.following.find((u) => u.user_id === user.id);
  return (
    <View>
      <Button
        small
        invertColors
        onPress={async () => {
          const res = await fetcher(`/api/follow`);
          mutate("/api/me", { id: user.id, unfollow: isFollowing });
        }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Text>{isFollowing ? "Unfollow" : "Follow"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    color: "#C4C4C4",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FBFBFC",
  },
});
