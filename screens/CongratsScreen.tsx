import * as React from "react";
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Button from "../components/Button";
import Slider from "react-native-slider";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { fetcher, useMe } from "../hooks/fetcher";
import { mutate } from "swr";

export default function CongratsScreen({
  duration,
  completeSubmission,
}: {
  completeSubmission: () => void;
  duration: number;
}) {
  const [screen, setScreen] = React.useState(0);
  const [notes, setNotes] = React.useState("");
  const [zenScore, setZenScore] = React.useState(50);
  const { me } = useMe();
  if (screen === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Congrats! ✨</Text>
        <Text style={styles.subtitle}>Day 5 of 60 days completed </Text>

        <View style={styles.box}>
          <Text style={styles.quote}>
            Life is really a single player game. It's all going on in your head
          </Text>
          <Text style={styles.author}>Naval</Text>
        </View>

        <TouchableOpacity onPress={() => setScreen(1)} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How did you feel? </Text>
      <View style={styles.row}>
        {/* <Text style={styles.title}>Zen Score: {zenScore}</Text> */}
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={zenScore}
            onValueChange={(value: number) => setZenScore(value)}
            thumbStyle={{ height: 50, width: 50 }}
            thumbTintColor={"#ffffff00"}
            thumbTouchSize={{ width: 50, height: 50 }}
            animationType={"spring"}
            thumbImage={require("../assets/images/official_logo_medium.png")}
            minimumTrackTintColor={"#ccc"}
            maximumTrackTintColor={"#ccc"}
          />
        </View>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor="#ccc"
          placeholder="How did it go?"
          onChangeText={(text) => setNotes(text)}
          value={notes}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <Button
        onPress={async () => {
          const res = await fetcher(`/api/meditation/create`, {
            duration,
            notes,
          });
          await mutate("/api/me", {
            ...me,
            meditation: [
              ...me?.meditations!,
              { duration, notes, createdAt: new Date() },
            ],
          });
          console.log(res, duration);
          completeSubmission();
        }}
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    color: "#C4C4C4",
    alignItems: "center",
  },
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "stretch",
    marginVertical: 30,
    marginHorizontal: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
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
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    paddingTop: 10,
    fontFamily: "Calibre-Medium",
    color: "#4A4A4A",
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
});
