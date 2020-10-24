import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";
import { useMe, useUsers } from "../hooks/fetcher";
import { Bubble } from "../components/Bubble";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList, User } from "../types";
import Button from "../components/Button";
import { Avatar } from "../components/Avatar";

import { FollowButton } from "./FollowButton";
import { useNavigation } from "@react-navigation/native";
export default function FindFriendsScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "FindFriends">) {
  const { users } = useUsers();
  const { me } = useMe();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {users
          ?.filter(
            (u) => u.id !== me?.id && !u.name.toLowerCase().includes("test")
          )
          .map((user) => (
            <FollowBubble user={user} key={user.id} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

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
    backgroundColor: "#FFFFFF",
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
    marginTop: 50,
  },
});
export function FollowBubble({ user }: { user: User }): JSX.Element {
  const navigation = useNavigation();
  return (
    <Bubble>
      <View style={styles.row}>
        <View style={{ width: "40%" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfile", { userId: user.id })
            }
          >
            <Avatar user={user} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "40%" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfile", { userId: user.id })
            }
          >
            <Text style={styles.title}>{user.name}</Text>
          </TouchableOpacity>
          <FollowButton user={user} />
        </View>
      </View>
    </Bubble>
  );
}
