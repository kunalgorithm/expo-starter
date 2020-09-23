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

  const DropDown = () => (
    <DropDownPicker
      items={[
        { label: "15 min", value: 15 * 60 },
        { label: "30 min", value: 30 * 60 },
        { label: "60 min", value: 60 * 60 },
      ]}
      defaultValue={15 * 60}
      containerStyle={{ 
        height: 40, 
        width: 146,
        borderRadius: 200,
        marginVertical: 15,
      
      }}
      style={{
        backgroundColor: "#FBFBFC",
        shadowColor: "#8D8A8A",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
       

        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)"
      }}
      itemStyle={{
        justifyContent: "flex-start",
      }}
      dropDownStyle={{ backgroundColor: "#FBFBFC" }}
      onChangeItem={(item: { value: number }) => setSeconds(item.value)}
    />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day 1</Text>
      <DropDown />
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
    backgroundColor: "#FBFBFC",
  },
  title: {
    fontSize: 40,
    margin: 20,
    fontWeight: "bold",
    color: "#4A4A4A",
    opacity: 0.8,
    letterSpacing: 7,
    fontFamily: "Calibre-Medium",
  },
  circle: {
    marginTop: 10,
    backgroundColor: "#FBFBFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 12,
    borderColor: "#EBECEF",
    borderRadius: 400,

    width: 330,
    height: 330,
  },
  timer: {
    // fontFamily: "Calibre",
    fontSize: 56,
    lineHeight: 67,
    color: "#B6999B",
    fontFamily: "Calibre-Medium",

    letterSpacing: 15,
  },
  picker: { 

    height: 0, 
    width: 0 },
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
    marginVertical: 50,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    letterSpacing: 4,
    fontFamily: "Calibre-Medium",
  },
});
