import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Meditation } from "../types";

export function Stats({
  meditations,
  longestStreak,
}: {
  meditations: Meditation[];
  longestStreak: number;
}) {
  const totalDuration = meditations
    .map((a) => a.duration)
    .reduce((a, b) => a + b, 0);
  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/meditate_main.png")}
        />
        <Text style={styles.subtitle}>MINDFUL TIME</Text>
        <Text style={styles.number}>
          {totalDuration > 60 * 60 &&
            Math.floor(totalDuration / (60 * 60)) + `h `}
          {Math.ceil(totalDuration / 60) % 60}m
        </Text>
      </View>
      <View style={styles.col}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/clock.png")}
        />
        <Text style={styles.subtitle}>TOTAL SESSIONS</Text>
        <Text style={styles.number}>{meditations.length}</Text>
      </View>
      <View style={styles.col}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/wavy_streaks.png")}
        />
        <Text style={styles.subtitle}>LONGEST STREAK</Text>
        <Text style={styles.number}>{longestStreak} d</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    paddingVertical: 20,
    flexDirection: "row",
    backgroundColor: "#fbfbfc",
  },

  subtitle: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Calibre-Regular",
    marginBottom: 4,
    textAlign: "center",
  },
  number: {
    fontSize: 25,
    color: "#B6999A",
    fontFamily: "Calibre-Regular",
    textAlign: "center",
    paddingBottom: 0,
  },
  col: {
    width: "30%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  icon: {
    margin: 12,
    height: 27,
    width: 30,
  },
});
