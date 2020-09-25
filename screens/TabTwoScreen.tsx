import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useMeditations } from "../hooks/useMeditations";
import dayjs from "dayjs";

export default function TabTwoScreen() {
  const meditations = useMeditations();

  const sorted = meditations.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  );
  const day1 =
    sorted.length > 0 ? sorted[0] : { date: new Date(), duration: 0 };

  const Box = ({ index }: { index: number }) => {
    const sessions = sorted.filter(
      (item) =>
        dayjs(day1.date).add(index, "day").format("ddd, MMM D, YYYY") ===
        dayjs(item.date).format("ddd, MMM D, YYYY")
    );
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
          You're first meditation was on{" "}
          {dayjs(day1.date).format("ddd, MMM D, YYYY")} - {day1.date}
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
    backgroundColor: "#fff",
    color: "#C4C4C4",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#C4C4C4",
    fontWeight: "bold",
    margin: 25,
    fontFamily: "Calibre-Medium",
  },
  text: {
    fontSize: 20,
    color: "#C4C4C4",
    fontWeight: "bold",
  },
  box: {
    height: 35,
    width: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderRadius: 5.46,

    elevation: 9,
    backgroundColor: "#fff",
    color: "#B6999B",
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
