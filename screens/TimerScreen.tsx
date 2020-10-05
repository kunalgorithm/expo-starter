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
import { DropDown } from "../components/DropDown";
import { useMe } from "../hooks/fetcher";
import dayjs from "dayjs";
import { activateKeepAwake } from "expo-keep-awake";
import { Audio } from "expo-av";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import Button from "../components/Button";
const DEFAULT_TIMER = 15 * 60; // 15 minutes

export default function TimerScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Root">) {
  const [seconds, setSeconds] = React.useState(DEFAULT_TIMER);
  const [secondsMeditated, setSecondsMeditated] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);
  const { me } = useMe();

  const day =
    me && me.meditations?.length > 0
      ? dayjs().diff(
          dayjs(me.meditations[0] ? me.meditations[0].createdAt : new Date()),
          "d"
        )
      : 1;

  const endMeditation = async () => {
    const soundObject = new Audio.Sound();
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    try {
      await soundObject.loadAsync(
        require("../assets/sounds/gong_small_soft.mp3"),
        {
          shouldPlay: true,
        }
      );
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }

    setTimerOn(false);

    navigation.navigate("Congrats", { duration: secondsMeditated });
    // setSeconds(DEFAULT_TIMER);
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

  React.useEffect(() => {
    if (timerOn) activateKeepAwake();
  }, [timerOn]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/ocean_bg.jpg")}
      >
        <Text style={styles.title}>Session {day}</Text>
        <DropDown setSeconds={setSeconds} secondsMeditated={secondsMeditated} />
        <View style={styles.circle}>
          <Text style={styles.timer} onPress={(e) => setTimerOn(!timerOn)}>
            {Math.floor(seconds / 60)}:
            {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
          </Text>
          <TouchableOpacity onPress={() => setTimerOn(!timerOn)}>
            <Image
              style={{ height: 50, width: 50 }}
              source={
                timerOn
                  ? require("../assets/icons/meditation_pause_button.png")
                  : require("../assets/icons/meditation_start_button.png")
              }
            />
          </TouchableOpacity>
        </View>
        {timerOn && (
          <TouchableOpacity
            onPress={endMeditation}
            style={{ marginVertical: 0 }}
          >
            <Text style={{ ...styles.buttonText, color: "#ccc" }}>{"End"}</Text>
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
    marginTop: 70,
    paddingTop: 0,
    fontWeight: "bold",
    color: "#4A4A4A",
    opacity: 0.8,
    letterSpacing: 3,
    fontFamily: "Calibre-Regular",
  },
  circle: {
    marginTop: 30,
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
