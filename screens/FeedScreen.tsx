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
  console.log("feed", feed);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>the feed </Text>

      <ScrollView>
        {feed &&
          feed.length > 0 &&
          feed.map((item, i) => <FeedItem item={item} key={i} />)}
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
    letterSpacing: 1,
    paddingBottom: 10,
    fontFamily: "Calibre-Regular",
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
