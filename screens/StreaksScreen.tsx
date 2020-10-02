import * as React from "react";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "../components/Themed";
import dayjs from "dayjs";
import { useMe } from "../hooks/fetcher";
import { Stats } from "../components/Stats";
import { Box } from "../components/Box";
import Button from "../components/Button";
import { RootStackParamList } from "../types";

export default function StreaksScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
  const { me } = useMe();

  const meditations = me?.meditations;
  if (!meditations) return null;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ width: "60%" }}>
          <Text style={styles.title}>{me?.name}</Text>
          <Text style={styles.title}>{me?.followers?.length} followers</Text>
          <Text style={styles.title}>{me?.following?.length} following</Text>
        </View>

        <Button
          onPress={() => navigation.push("FindFriends")}
          small
          invertColors
        >
          Find Friends
        </Button>
      </View>
      <Text style={styles.title}>
        {me?.name?.split(" ")[0]}, you're on a 4 day streak
      </Text>
      {/* TODO swap with Follow on others' profiles */}
      <Stats meditations={meditations} />

      {Array(9)
        .fill(0)
        .map((row, i) => (
          <View style={styles.row} key={i}>
            <Box index={i * 7} meditations={meditations} />
            <Box index={i * 7 + 1} meditations={meditations} />
            <Box index={i * 7 + 2} meditations={meditations} />
            <Box index={i * 7 + 3} meditations={meditations} />
            <Box index={i * 7 + 4} meditations={meditations} />
            <Box index={i * 7 + 5} meditations={meditations} />
            <Box index={i * 7 + 6} meditations={meditations} />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    color: "#fbfbfc",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fbfbfc",
  },
  title: {
    fontSize: 20,
    color: "#4A4A4A",
    fontWeight: "bold",
    margin: 3,
    fontFamily: "Calibre-Medium",
  },
  text: {
    fontSize: 20,
    color: "#E7DDDE",
    marginTop: 10,
    fontFamily: "Calibre-Regular",
  },
});
