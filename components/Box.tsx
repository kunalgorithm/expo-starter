import * as React from "react";

import dayjs from "dayjs";
import { Meditation } from "../types";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

export const Box = ({
  index,

  meditations,
}: {
  index: number;

  meditations: Meditation[];
}) => {
  const boxDate = dayjs(
    meditations[0] ? meditations[0].createdAt : dayjs()
  ).add(index, "day");
  const meditationsThisDay = meditations.filter(
    (item) =>
      boxDate.format("ddd, MMM D, YYYY") ===
      dayjs(item.createdAt).format("ddd, MMM D, YYYY")
  );
  const timeMeditated = meditationsThisDay
    .map((a) => a.duration)
    .reduce((a, b) => a + b, 0);
  const isToday: boolean =
    boxDate.format("ddd, MMM D, YYYY") === dayjs().format("ddd, MMM D, YYYY");

  const durations = meditations.map((m) => m.duration);
  const longestMeditation = Math.max(...durations);

  return (
    <View style={{ backgroundColor: "transparent" }}>
      {index < 7 && (
        <Text style={{ textAlign: "center", color: "gray", paddingBottom: 10 }}>
          {boxDate.format("dd") === "Su"
            ? "Su"
            : boxDate.format("dd") == "Th"
            ? "Th"
            : boxDate.format("dd")[0]}
        </Text>
      )}
      <View
        style={{
          ...styles.box,
          borderColor: "#84B9C8",
          borderWidth: isToday ? 3 : 0,
          backgroundColor:
            timeMeditated > 10
              ? `rgba(182,153,154,${
                  timeMeditated / Math.max(longestMeditation, 600) + 0.25
                })`
              : timeMeditated > 0
              ? Colors.pink
              : "#fff",
        }}
      >
        {/* <Text>{boxDate.format("D")}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 35 / 7,

    elevation: 9,
    backgroundColor: "#fff",
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
  },
});
