import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import dayjs from "dayjs";
import { useMe } from "../hooks/fetcher";
import { Stats } from "../components/Stats";
import { Box } from "../components/Box";

export default function TabTwoScreen() {
  const { me } = useMe();

  const meditations = me ? me?.meditation : [];

  const day1 =
    meditations.length > 0
      ? meditations[0]
      : { createdAt: new Date(), duration: 0 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{me?.email}, you're on a 4 day streak</Text>
      <Stats meditations={meditations} />
      {meditations.length > 0 && (
        <Text style={styles.title}>
          Your first meditation was on{" "}
          {dayjs(day1.createdAt).format("ddd, MMM D, YYYY")}
        </Text>
      )}
      {Array(9)
        .fill(0)
        .map((row, i) => (
          <View style={styles.row} key={i}>
            <Box index={i * 7} day1={day1} meditations={meditations} />
            <Box index={i * 7 + 1} day1={day1} meditations={meditations} />
            <Box index={i * 7 + 2} day1={day1} meditations={meditations} />
            <Box index={i * 7 + 3} day1={day1} meditations={meditations} />
            <Box index={i * 7 + 4} day1={day1} meditations={meditations} />
            <Box index={i * 7 + 5} day1={day1} meditations={meditations} />
            <Box index={i * 7 + 6} day1={day1} meditations={meditations} />
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
    margin: 25,
    fontFamily: "Calibre-Medium",
  },
  text: {
    fontSize: 20,
    color: "#E7DDDE",
    marginTop: 10,
    fontFamily: "Calibre-Regular",
  },
});
