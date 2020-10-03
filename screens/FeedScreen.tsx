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

export default function FeedScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Feed">) {
  const { feed } = useFeed();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Root")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Meditate Now!</Text>
      </TouchableOpacity>
      <ScrollView>
        {feed?.map((meditation) => (
          <Bubble
            key={meditation.id}
            title={`${meditation.user.email} meditated for
          ${Math.ceil(meditation.duration / 60)} minutes.`}
          >
            <Text>Notes: {meditation.notes}</Text>
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
