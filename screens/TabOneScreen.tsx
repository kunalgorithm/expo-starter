import * as React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useInterval } from "../hooks/useInterval";
// @ts-ignore
import logo from "../assets/images/logo.jpeg";
import CongratsScreen from "./CongratsScreen";
import { DropDown } from "./DropDown";

export default function TabOneScreen() {
  const [seconds, setSeconds] = React.useState(900);
  const [secondsMeditated, setSecondsMeditated] = React.useState(900);
  const [timerOn, setTimerOn] = React.useState(false);
  const [congratsScreen, setCongratsScreen] = React.useState(false);
  useInterval(async () => {
    if (timerOn && seconds > 0) setSeconds(seconds - 1);
    if (seconds === 0) {
      if (!(await AsyncStorage.getItem("day1")))
        await AsyncStorage.setItem("day1", new Date().toString());
      const meditationsRaw = await AsyncStorage.getItem("meditations");
      const meditations = meditationsRaw ? JSON.parse(meditationsRaw) : [];
      await AsyncStorage.setItem(
        "meditations",
        JSON.stringify([
          ...meditations,
          { date: new Date().toString(), duration: secondsMeditated },
        ])
      );
    }
  }, 1000);

  if (congratsScreen)
    return <CongratsScreen setCongratsScreen={setCongratsScreen} />;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/ocean_bg.jpg")}
      >
        <Text style={styles.title}>Day 1</Text>
        <DropDown setSeconds={setSeconds} />
        <View style={styles.circle}>
          {/* <Image source={logo} /> */}
          <Text style={styles.timer} onPress={(e) => setTimerOn(!timerOn)}>
            {Math.floor(seconds / 60)}:
            {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setTimerOn(!timerOn)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{timerOn ? "PAUSE" : "START"}</Text>
        </TouchableOpacity>
        {timerOn && (
          <TouchableOpacity
            onPress={() => setCongratsScreen(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{"End"}</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },

  title: {
    fontSize: 50,
    margin: 1,
    fontWeight: "bold",
    color: "#4A4A4A",
    opacity: 0.8,
    letterSpacing: 7,
    fontFamily: "Calibre-Regular",
  },
  circle: {
    marginTop: 10,
    backgroundColor: "#FBFBFC00",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 15,
    borderColor: "#EBECEF",
    borderRadius: 400,

    width: 330,
    height: 330,
  },
  timer: {
    // fontFamily: "Calibre",
    fontSize: 56,
    lineHeight: 90,
    marginTop: 30,
    marginLeft: 20,
    color: "#ffffff",
    alignItems: "center",
    fontFamily: "Calibre-Regular",
    letterSpacing: 15,
  },
  picker: {
    height: 0,
    width: 0,
  },
  subtitle: {
    fontSize: 20,

    fontWeight: "bold",
  },
  separator: {
    marginVertical: 0,
    height: 1,
    width: "80%",
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
