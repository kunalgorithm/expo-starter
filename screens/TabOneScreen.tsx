import * as React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useInterval } from "../hooks/useInterval";
// @ts-ignore
import logo from "../assets/images/logo.jpeg";

export default function TabOneScreen() {
  const [seconds, setSeconds] = React.useState(900);
  const [timerOn, setTimerOn] = React.useState(false);
  useInterval(() => {
    if (timerOn && seconds > 0) setSeconds(seconds - 1);
  }, 1000);
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.title}>Day 1</Text>
        <DropDownPicker
          items={[
            { label: "15 min", value: 15 * 60 },
            { label: "30 min", value: 30 * 60 },
            { label: "60 min", value: 60 * 60 },
          ]}
          defaultValue={15 * 60}
          containerStyle={{ height: 40, width: 130 }}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item: { value: number }) => setSeconds(item.value)}
        />

        <Image source={logo} />
        <Text style={styles.timer} onPress={(e) => setTimerOn(!timerOn)}>
          {Math.floor(seconds / 60)}:
          {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setTimerOn(!timerOn)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{timerOn ? "Pause" : "Start"}</Text>
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
  },
  circle: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "gray",
    borderRadius: 400,
    padding: 60,
    width: "110%",
  },
  timer: {
    // fontFamily: "Calibre",
    fontSize: 56,
    lineHeight: 67,
    color: "gray",

    letterSpacing: 15,
  },
  picker: { height: 50, width: 150 },
  title: {
    fontSize: 40,
    fontWeight: "bold",
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
    padding: 20,
    borderRadius: 100,
    marginVertical: 50,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
