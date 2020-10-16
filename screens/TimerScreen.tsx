import * as React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useInterval } from "../hooks/useInterval";

import { DropDown } from "../components/DropDown";
import { useMe } from "../hooks/fetcher";
import dayjs from "dayjs";
import { activateKeepAwake } from "expo-keep-awake";
import { Audio } from "expo-av";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Colors from "../constants/Colors";
const DEFAULT_TIMER = 1 * 60; // 1 minutes

const UrgeWithPleasureComponent = ({
  timerOn,
  seconds,
  initialSeconds,
  setTimerOn,
}: {
  timerOn: boolean;
  seconds: number;
  initialSeconds: number;
  setTimerOn: any;
}) => (
  <CountdownCircleTimer
    isPlaying={timerOn}
    duration={initialSeconds}
    initialRemainingTime={seconds}
    key={initialSeconds}
    colors={"#E5CEC6"}
    size={300}
  >
    {(props) => (
      <View style={styles.timer}>
        <Animated.Text
          style={styles.timer}
          onPress={(e: any) => setTimerOn(!timerOn)}
        >
          {Math.floor(seconds / 60)}:
          {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
        </Animated.Text>
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
    )}
  </CountdownCircleTimer>
);

export default function TimerScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Root">) {
  const [initialSeconds, setInitialSeconds] = React.useState(DEFAULT_TIMER);
  const [seconds, setSeconds] = React.useState(DEFAULT_TIMER);
  const [secondsMeditated, setSecondsMeditated] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);
  const { me } = useMe();

  const endMeditation = async () => {
    const soundObject = new Audio.Sound();
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    try {
      await soundObject.loadAsync(require("../assets/sounds/singingbowl.mp3"), {
        shouldPlay: true,
      });
      await soundObject.playAsync();
    } catch (error) {
      console.log("error playing sound: ", error);
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
    if (seconds === 0 && timerOn) {
      setTimerOn(false);
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
        source={require("../assets/images/ocean_bg_small.jpg")}
      >
        <Text style={styles.title}>
          Session {(me?.meditations?.length || 0) + 1}
        </Text>
        <DropDown
          setSeconds={setSeconds}
          setInitialSeconds={setInitialSeconds}
          secondsMeditated={secondsMeditated}
        />
        <UrgeWithPleasureComponent
          timerOn={timerOn}
          initialSeconds={initialSeconds}
          seconds={seconds}
          setTimerOn={setTimerOn}
        />
        {/* <View style={styles.circle}>
          
        </View> */}
        {timerOn && (
          <TouchableOpacity
            onPress={endMeditation}
            style={{ marginBottom: -90, marginTop: 50 }}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: "#ffffff",
                fontSize: 24,
              }}
            >
              {"I'm done > "}
            </Text>
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
    opacity: 1.8,
  },

  title: {
    fontSize: 30,
    marginTop: 0,
    paddingTop: 0,
    fontWeight: "bold",
    color: "#4A4A4A",
    opacity: 0.8,
    letterSpacing: 3,
    fontFamily: "Calibre-Regular",
  },
  circle: {
    marginTop: 20,
    backgroundColor: "#FBFBFC00",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 15,
    borderColor: "#EBECEF",
    borderRadius: 400,
    zIndex: 0,
    width: 330,
    height: 330,
  },
  timer: {
    // fontFamily: "Calibre",
    fontSize: 56,
    zIndex: 0,
    lineHeight: 90,
    marginTop: 15,
    marginLeft: 10,
    color: "#ffffff",
    alignItems: "center",
    fontFamily: "Calibre-Regular",
    letterSpacing: 15,
    backgroundColor: "transparent",
  },

  buttonText: {
    fontSize: 20,
    color: "#fff",
    letterSpacing: 2,
    marginTop: 10,
    marginLeft: 5,
    alignItems: "center",
    fontFamily: "Calibre-Medium",
  },
});
