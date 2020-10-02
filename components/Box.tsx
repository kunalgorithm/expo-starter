import * as React from "react";
import { View } from "./Themed";
import dayjs from "dayjs";
import { Meditation } from "../server/node_modules/@prisma/client";

import { Image, StyleSheet } from "react-native";

export const Box = ({
  index,
  day1,
  meditations,
}: {
  index: number;
  day1: Meditation | { duration: number; createdAt: Date };
  meditations: Meditation[];
}) => {
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
    ></View>
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
    borderRadius: 35 / 5,

    elevation: 9,
    backgroundColor: "#fff",
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});
