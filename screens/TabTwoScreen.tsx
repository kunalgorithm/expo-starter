import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import dayjs from "dayjs";
import { useMe } from "../hooks/fetcher";

export default function TabTwoScreen() {
  const { me } = useMe();

  const meditations = me ? me?.meditation : [];

  const sorted = meditations
    ? meditations.sort((a, b) =>
        new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1
      )
    : [];
  const day1 =
    sorted.length > 0 ? sorted[0] : { createdAt: new Date(), duration: 0 };

  const Box = ({ index }: { index: number }) => {
    const sessions = sorted.filter((item) => {
      return (
        dayjs(day1.createdAt).add(index, "day").format("ddd, MMM D, YYYY") ===
        dayjs(item.createdAt).format("ddd, MMM D, YYYY")
      );
    });
    return (
      <View
        style={{
          ...styles.box,
          backgroundColor: sessions.length > 0 ? "#ccc" : "#fff",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: sessions.length > 0 ? "#fff" : "#B6999B",
          }}
        >
          {index}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're on a 5 day streak 💪</Text>
      {sorted.length > 0 && (
        <Text style={styles.title}>
          Your first meditation was on{" "}
          {dayjs(day1.createdAt).format("ddd, MMM D, YYYY")}
        </Text>
      )}
      {Array(9)
        .fill(0)
        .map((row, i) => (
          <View style={styles.row} key={i}>
            <Box index={i * 7} />
            <Box index={i * 7 + 1} />
            <Box index={i * 7 + 2} />
            <Box index={i * 7 + 3} />
            <Box index={i * 7 + 4} />
            <Box index={i * 7 + 5} />
            <Box index={i * 7 + 6} />
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
    // fontWeight: "bold",
  },
  box: {
    height: 35,
    width: 35,
    shadowColor: "#8D8A8A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 35 / 5,

    elevation: 9,
    backgroundColor: "#fff",
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
