import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Meditation } from "../server/node_modules/@prisma/client";

export function Stats({ meditations }: { meditations: Meditation[] }) {
  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/total_sessions.png")}
        />
        <Text style={styles.subtitle}>MINDFUL TIME</Text>
        <Text style={styles.number}>
          {Math.ceil(
            meditations.map((a) => a.duration).reduce((a, b) => a + b, 0) / 60
          )}
        </Text>
      </View>
      <View style={styles.col}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/clock_icon.png")}
        />
        <Text style={styles.subtitle}>TOTAL SESSIONS</Text>
        <Text style={styles.number}>{meditations.length}</Text>
      </View>
      <View style={styles.col}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/longest_streak.png")}
        />
        <Text style={styles.subtitle}>LONGEST STREAK</Text>
        <Text style={styles.number}>10</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fbfbfc",
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

  icon: {
    margin: 10,
    height: 50,
    width: 50,
  },
});
