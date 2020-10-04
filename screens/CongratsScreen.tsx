import * as React from "react";
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Button from "../components/Button";
// @ts-ignore
import Slider from "react-native-slider";
import { Text, View } from "../components/Themed";
import { fetcher, useMe } from "../hooks/fetcher";
import { mutate } from "swr";
import NavalQuotes from "../constants/NavalQuotes";

import { Switch } from "react-native-switch";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { FontDisplay } from "expo-font";

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
      {/* <Button small invertColors onPress={() => navigation.goBack()}>
        back
      </Button> */}
      <Text style={styles.title}>Congrats! ✨</Text>
      <Text style={styles.subtitle}>Day 5 of 60 days completed </Text>

      <View style={styles.box}>
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
  rowtwo: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
    marginRight: 0,
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    alignItems: "stretch",
    marginVertical: 30,
    marginHorizontal: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FBFBFC",
    justifyContent: "space-around",
  },
  inputbox: {
    display: "flex",
    width: 300,
    height: 200,
    backgroundColor: "#Ffffff",
    marginHorizontal: 30,
    justifyContent: "space-around",
    shadowColor: "#8D8A8A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 35 / 5,
  },

  mood: {
    fontSize: 12,
    color: "#AEAEAE",
    fontWeight: "bold",
    letterSpacing: 1,
    paddingHorizontal: 37,
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    marginTop: 30,
    backgroundColor: "transparent",
    fontFamily: "Calibre-Regular",
  },
  title: {
    fontSize: 30,
    color: "#4A4A4A",
    fontWeight: "bold",
    letterSpacing: 1.5,
    alignItems: "flex-start",
    left: -40,
    marginTop: 30,
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
  titlethree: {
    fontSize: 30,
    color: "#4A4A4A",
    fontWeight: "bold",
    letterSpacing: 1.5,
    alignItems: "flex-start",
    paddingTop: 20,
    marginVertical: 20,
    left: -70,
    fontFamily: "Calibre-Regular",
  },
  subtitle: {
    fontSize: 20,
    color: "#4A4A4A",
    fontWeight: "bold",
    letterSpacing: 1.5,
    margin: 10,
    fontFamily: "Calibre-Medium",
  },
  quote: {
    paddingTop: 0,
    padding: 20,
    fontSize: 35,
    color: "#4A4A4A",
    fontWeight: "bold",
    fontFamily: "Calibre-Medium",
  },
  box: {
    height: 280,
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
  text: {
    fontSize: 20,
    color: "#B6999B",
  },

  input: {
    height: 48,
    flexWrap: "wrap",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0,
    backgroundColor: "#fff",
    marginTop: -120,
    marginBottom: 10,
    fontSize: 22,
    fontFamily: "Calibre-Regular",
    color: "#4A4A4A",
    marginLeft: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
