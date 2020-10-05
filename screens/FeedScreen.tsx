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
import { ScrollView } from "react-native-gesture-handler";
import { FeedItem } from "./FeedItem";
export default function FeedScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Feed">) {
  const { feed } = useFeed();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>The Zen Feed 🍃</Text>

      <ScrollView>
        {feed && feed.length > 0 ? (
          feed
            .filter((m) => m.isPublic)
            .map((meditation) => (
              <FeedItem meditation={meditation} key={meditation.id} />
            ))
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("FindFriends")}>
            <Text style={{ color: "blue" }}>
              Follow people to see their activity on your feed ▶️
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "gray",
    fontWeight: "bold",
    marginRight: "auto",
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: "Calibre-Light",
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
