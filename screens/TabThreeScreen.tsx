import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useMe } from "../hooks/fetcher";
import { useMeditations } from "../hooks/useMeditations";
import { Meditation, User } from "../server/node_modules/@prisma/client";
export default function TabThreeScreen() {
  const meditations = useMeditations();
  const { me } = useMe();

  const Row = ({ children }: { children: any }) => (
    <View style={styles.box}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{me?.email} 60 day meditation journal 🗒</Text>
      {me?.meditation?.map((meditation, i) => (
        <View style={styles.row} key={i}>
          <Row>
            {new Date(meditation.createdAt).toDateString()} -{" "}
            {Math.floor(meditation.duration / 60)} min
          </Row>
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
    color: "#C4C4C4",
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
    color: "#B6999B",
    fontFamily: "Calibre-Regular",
    marginTop: 6,
    // fontWeight: "",
  },
  box: {
    height: 72,
    width: 320,
    shadowColor: "#BBB9B9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderRadius: 100 / 2,

    elevation: 9,
    backgroundColor: "#fff",
    color: "#B6999B",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
