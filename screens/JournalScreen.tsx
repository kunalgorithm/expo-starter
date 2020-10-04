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
import { Meditation } from "../server/node_modules/@prisma/client";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function CongratsScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "Journal"> & {
  route: { params: { meditation?: Meditation; duration: number } };
}) {
  const [notes, setNotes] = React.useState("");
  const [zenScore, setZenScore] = React.useState(50);
  const [isPublic, setIsPublic] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const { me } = useMe();
  const { meditation, duration } = route.params;

  const submitForm = async () => {
    if (loading) return;
    setLoading(true);
    const res = await fetcher(`/api/meditation/create`, {
      duration,
      notes,
      isPublic,
      zenScore,
    });
    await mutate("/api/me", {
      ...me,
      meditation: [
        {
          duration,
          notes,
          isPublic,
          zenScore: Math.ceil(zenScore),
          createdAt: new Date(),
        },
        ...me?.meditations!,
      ],
    });
    console.log(res, duration);

    navigation.replace("Root");
  };

  return (
    <View style={styles.container}>
      {/* <Button small invertColors onPress={() => navigation.goBack()}>
        back
      </Button> */}
      <Text style={styles.title}>
        {Math.ceil(duration / 60)} minute meditation{" "}
      </Text>
      <Text style={styles.title}>How did you feel? </Text>
      <View style={styles.rowtwo}>
        {" "}
        <Text style={styles.subtitle}>Day 5 of 60 days completed </Text>
        <Text style={styles.mood}>restless</Text>
        <Text style={styles.mood}>nuetral</Text>
        <Text style={styles.mood}>nirvana</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={zenScore}
            onValueChange={(value: number) => setZenScore(Math.round(value))}
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
      <Text style={styles.titletwo}>How did it go? </Text>

      <View style={styles.inputbox}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#ccc"
          placeholder="your reflections and thoughts.."
          onChangeText={(text) => setNotes(text)}
          value={notes}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          // onSubmitEditing={submitForm}
        />
      </View>

      <Text style={styles.titlethree}>Who can see:</Text>
      <View style={styles.toggleposition}>
        <Switch
          onValueChange={() => setIsPublic(!isPublic)}
          value={isPublic}
          activeText="Followers"
          inActiveText="Just you"
          activeTextStyle={{
            fontFamily: "Calibre-Medium",
            fontSize: 16,
            paddingTop: 9,
          }}
          inactiveTextStyle={{
            fontFamily: "Calibre-Medium",
            fontSize: 16,
            paddingTop: 9,
          }}
          circleSize={29}
          barHeight={40}
          // circleBorderWidth={6}
          backgroundActive={"#7EBFC7"}
          backgroundInactive={"gray"}
          circleActiveColor={"#ffffff"}
          circleInActiveColor={"#ffffff"}
          // outerCircleStyle={"#7EBFC7"}
          // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
          // changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
          innerCircleStyle={{
            alignItems: "center",
            justifyContent: "center",
            borderColor: "transparent",
          }} // style for inner animated circle for what you (may) be rendering inside the circle
          outerCircleStyle={{}} // style for outer animated circle
          switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          switchWidthMultiplier={4.2} // multipled by the `circleSize` prop to calculate total width of the Switch
        ></Switch>
      </View>
      <Button onPress={submitForm}>{loading ? "..." : "Submit"}</Button>
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
  toggleposition: {
    marginLeft: 180,
    marginTop: -55,
    justifyContent: "flex-end",
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
});
