import * as React from "react";
import { StyleSheet, Image } from "react-native";
import Button from "../components/Button";

import { Text, View } from "../components/Themed";
import NavalQuotes from "../constants/NavalQuotes";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function CongratsScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "Congrats"> & {
  route: { params: { duration: number } };
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        congrats on making {"\n"}time for yourself 💪
      </Text>

      {/* <Text style={styles.subtitle}>Day 5 of 60 days completed </Text> */}

      <View style={styles.box}>
        <Image
          style={styles.icon}
          source={require("../assets/images/quote.png")}
        />
        <Text style={styles.quote}>
          {NavalQuotes[randomIntFromInterval(0, NavalQuotes.length)]}
        </Text>
        <Text style={styles.author}>Naval</Text>
      </View>
      <Button
        onPress={() =>
          navigation.navigate("Journal", { duration: route.params.duration })
        }
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    color: "#C4C4C4",
    alignItems: "center",
  },
  col: {
    width: "30%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  icon: {
    height: 40,
    width: 55,
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    color: "#4A4A4A",
    fontWeight: "bold",
    letterSpacing: 0,
    alignItems: "center",
    paddingHorizontal: 30,
    textAlign: "center",
    paddingTop: 90,
    paddingBottom: 20,
    fontFamily: "Calibre-Regular",
  },
  titletwo: {
    fontSize: 30,
    color: "#4A4A4A",
    fontWeight: "bold",
    letterSpacing: 1.5,
    alignItems: "flex-start",
    marginVertical: 20,
    left: -60,
    fontFamily: "Calibre-Regular",
  },

  quote: {
    paddingTop: 0,
    padding: 20,
    fontSize: 22,
    color: "#4A4A4A",
    fontWeight: "bold",
    fontFamily: "Calibre-Medium",
    textAlign: "center",
  },

  box: {
    height: 350,
    width: 300,
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

  author: {
    fontSize: 25,
    color: "#C4C4C4",
    fontWeight: "bold",
    fontFamily: "Calibre-Medium",
  },
});
