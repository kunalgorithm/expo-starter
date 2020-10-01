import * as React from "react";
import { StyleSheet, Image } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useMeditations } from "../hooks/useMeditations";
import dayjs from "dayjs";
import { useMe } from "../hooks/fetcher";

export default function TabTwoScreen() {
  const { me } = useMe();

  const meditations = me ? me?.meditation : [];

  const day1 =
    meditations.length > 0
      ? meditations[0]
      : { createdAt: new Date(), duration: 0 };

  const Box = ({ index }: { index: number }) => {
    const boxDate = dayjs(day1.createdAt).add(index, "day");
    const meditationsThisDay = meditations.filter(
      (item) =>
        boxDate.format("ddd, MMM D, YYYY") ===
        dayjs(item.createdAt).format("ddd, MMM D, YYYY")
    );
    const isToday: boolean =
      boxDate.format("ddd, MMM D, YYYY") === dayjs().format("ddd, MMM D, YYYY");
    return (
      <View
        style={{
          ...styles.box,
          backgroundColor: isToday
            ? "#84B9C8"
            : meditationsThisDay.length > 0
            ? "#ccc"
            : "#fff",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: meditationsThisDay.length > 0 ? "#fff" : "#B6999B",
          }}
        >
          {index}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{me?.email}, you're on a 4 day streak</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Image
            style={styles.icon}
            source={require("../assets/images/total_sessions.jpg")}
          />
          <Text style={styles.subtitle}>MINDFUL TIME</Text>
          <Text style={styles.number}>
            {Math.ceil(
              meditations.map((a) => a.duration).reduce((a, b) => a + b) / 60
            )}
          </Text>
        </View>
        <View style={styles.col}>
          <Image
            style={styles.icon}
            source={require("../assets/images/clock_icon.jpg")}
          />
          <Text style={styles.subtitle}>TOTAL SESSIONS</Text>
          <Text style={styles.number}>{meditations.length}</Text>
        </View>
        <View style={styles.col}>
          <Image
            style={styles.icon}
            source={require("../assets/images/longest_streak.jpg")}
          />
          <Text style={styles.subtitle}>LONGEST STREAK</Text>
          <Text style={styles.number}>10</Text>
        </View>
      </View>
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
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Calibre-Regular",
    marginBottom: 4,

    textAlign: "center",
  },
  number: {
    fontSize: 25,
    color: "gray",
    fontFamily: "Calibre-Regular",

    textAlign: "center",
  },
  col: {
    width: "30%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "transparent",
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
  icon: {
    // width: 30,
    margin: 10,
    height: 50,
    width: 50,
  },
});
