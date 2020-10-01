import * as React from "react";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Button from "../components/Button";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { fetcher, useMe } from "../hooks/fetcher";
import { mutate } from "swr";

export default function CongratsScreen({
  setCongratsScreen,
  duration,
}: {
  setCongratsScreen: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
}) {
  const [screen, setScreen] = React.useState(0);
  const [notes, setNotes] = React.useState("");
  const { me } = useMe();
  if (screen === 0)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎉 Congrats! </Text>
        <Text style={styles.title}>Day 5 of 60 days completed </Text>
        <View>
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
        <Button onPress={() => {}}>:(</Button>
        <Button onPress={() => {}}>:|</Button>
        <Button onPress={() => {}}>:)</Button>
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
          mutate("/api/me", {
            ...me,
            meditation: [
              ...me?.meditation!,
              { duration, notes, createdAt: new Date() },
            ],
          });
          console.log(res);
          setCongratsScreen(false);
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    color: "#C4C4C4",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    color: "#4A4A4A",
    fontWeight: "bold",
    margin: 25,
    fontFamily: "Calibre-Medium",
  },
  quote: {
    fontSize: 40,
    color: "#4A4A4A",
    fontWeight: "bold",
    fontFamily: "Calibre-Medium",
  },
  author: {
    fontSize: 20,
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
    marginVertical: 50,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    letterSpacing: 4,
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
