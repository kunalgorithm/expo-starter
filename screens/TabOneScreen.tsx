import * as React from "react";
import {
  StyleSheet,
  Image,
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

const DEFAULT_TIMER = 15 * 60; // 15 minutes

export default function TabOneScreen() {
  const [seconds, setSeconds] = React.useState(DEFAULT_TIMER);
  const [secondsMeditated, setSecondsMeditated] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);
  const [congratsScreen, setCongratsScreen] = React.useState(false);

  const endMeditation = () => {
    setCongratsScreen(true);
    setTimerOn(false);
    setSeconds(DEFAULT_TIMER);
  };
  useInterval(async () => {
    if (timerOn && seconds > 0) {
      setSeconds(seconds - 1);
      setSecondsMeditated(secondsMeditated + 1);
    }
    if (seconds === 0) {
      endMeditation();
    }
  }, 1000);

  if (congratsScreen)
    return (
      <CongratsScreen
        setCongratsScreen={setCongratsScreen}
        duration={secondsMeditated}
      />
    );

  return (
    <View style={styles.container}>
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
        <TouchableOpacity onPress={endMeditation} style={{ marginVertical: 0 }}>
          <Text style={{ ...styles.buttonText, color: "#ccc" }}>{"End"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
  },
  title: {
    fontSize: 40,
    margin: 20,
    fontWeight: "bold",
    color: "#4A4A4A",
    opacity: 0.8,
    letterSpacing: 7,
    fontFamily: "Calibre-Regular",
  },
  circle: {
    marginTop: 10,
    backgroundColor: "#FBFBFC",
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
    color: "#B6999B",
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
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: "#B6999B",
    padding: 15,
    width: 146,
    borderRadius: 100,
    marginVertical: 30,
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
