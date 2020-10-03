import * as React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { mutate } from "swr";
import { Text, View } from "../components/Themed";
import { fetcher, useMe, useUsers } from "../hooks/fetcher";
import { Bubble } from "../components/Bubble";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import Button from "../components/Button";
import { User } from "../server/node_modules/@prisma/client";
import { Avatar } from "../components/Avatar";
export default function FindFriendsScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "FindFriends">) {
  const { users } = useUsers();
  const { me } = useMe();

  return (
    <SafeAreaView style={styles.container}>
      <Button small invertColors onPress={() => navigation.goBack()}>
        Go Back
      </Button>

      <ScrollView style={styles.scrollView}>
        {users
          ?.filter((u) => u.id !== me?.id)
          .map((user) => (
            <Bubble key={user.id}>
              <View style={styles.row}>
                <View style={{ width: "40%" }}>
                  <Avatar user={user} />
                </View>
                <View style={{ width: "40%" }}>
                  <Text style={styles.title}>{user.name}</Text>
                  <FollowButton user={user} />
                </View>
              </View>
            </Bubble>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const FollowButton = ({ user }: { user: User }) => {
  const { me } = useMe();
  const isFollowing = me?.following.find((u) => u.user_id === user.id);
  return (
    <View>
      <Button
        small
        invertColors={!isFollowing}
        onPress={async () => {
          const res = await fetcher(`/api/follow`);
          mutate("/api/me", { id: user.id, unfollow: isFollowing });
        }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
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
  title: {
    fontSize: 20,
    color: "#B6999B",
    fontFamily: "Calibre-Regular",
    marginTop: 6,
    // fontWeight: "",
  },
  scrollView: {
    height: "60%",
  },
});
