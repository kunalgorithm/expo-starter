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
      <Text style={styles.title}>the zen feed </Text>

      <ScrollView>
        {feed && feed.length > 0 ? (
          feed
            .filter((m) => m.isPublic)
            .map((meditation, i) => (
              <FeedItem meditation={meditation} key={i} />
            ))
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("FindFriends")}>
            <Text
              style={{
                color: "#B6999B",
                fontSize: 18,
                fontFamily: "Calibre-Regular",
              }}
            >
              Follow friends to see their meditations ▶️
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
