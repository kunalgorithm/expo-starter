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
          <View style={styles.row} key={i}>
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
    backgroundColor: "#FBFBFC",
    color: "#FBFBFC",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FBFBFC",
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
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    borderRadius: 35/5,

    elevation: 2,
    backgroundColor: "#FFF",
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
