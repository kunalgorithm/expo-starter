import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function CongratsScreen({
  setCongratsScreen,
}: {
  setCongratsScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [screen, setScreen] = React.useState(0);
  if (screen === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Congrats! ✨</Text>
        <Text style={styles.subtitle}>Day 5 of 60 days completed </Text>
        <View>
          <View style={styles.box}>
            <Text style={styles.quote}>
              Life is really a single player game. It's all going on in your
              head
            </Text>
            <Text style={styles.author}>Naval</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => setScreen(1)} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How did you feel? </Text>
      <View>
        <Text>:( :)</Text>
      </View>
      <View>
        <Text>How did it go?</Text>
      </View>

      <TouchableOpacity
        onPress={() => setCongratsScreen(false)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
    fontSize: 30,
    color: "#4A4A4A",
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginTop: -1,
    fontFamily: "Calibre-Medium",
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
    // fontWeight: "",
  },
  button: {
    backgroundColor: "#B6999B",
    padding: 15,
    width: 146,
    borderRadius: 100,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    letterSpacing: 4,
    textTransform: "uppercase",
    marginTop: 10,
    marginLeft: 5,
    alignItems: "center",
    fontFamily: "Calibre-Medium",
  },
});
