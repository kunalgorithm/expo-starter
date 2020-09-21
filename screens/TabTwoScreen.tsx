import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  const Box = ({ children }: { children: any }) => (
    <View style={styles.box}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're on a 5 day streak 💪</Text>
      {Array(9)
        .fill(0)
        .map((row, i) => (
          <View style={styles.row}>
            <Box>{i * 7}</Box>
            <Box>{i * 7 + 1}</Box>
            <Box>{i * 7 + 2}</Box>
            <Box>{i * 7 + 3}</Box>
            <Box>{i * 7 + 4}</Box>
            <Box>{i * 7 + 5}</Box>
            <Box>{i * 7 + 6}</Box>
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
