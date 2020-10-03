import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFeed } from "../hooks/fetcher";

import { RootStackParamList } from "../types";
import { Bubble } from "../components/Bubble";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "../components/Avatar";
import dayjs from "dayjs";

export default function FeedScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Feed">) {
  const { feed } = useFeed();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Feed</Text>

      <ScrollView>
        {feed?.map((meditation) => (
          <Bubble
            key={meditation.id}
            title={`${meditation.user.name} meditated for
          ${Math.ceil(meditation.duration / 60)} minutes.`}
          >
            <Avatar user={meditation.user}></Avatar>
            <Text>Notes: {meditation.notes}</Text>
            <Text> {dayjs(meditation.createdAt).format("M.D.YY")}</Text>
            <Text>⚡ on a 4 day streak</Text>
          </Bubble>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 5,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
