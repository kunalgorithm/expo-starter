import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { mutate } from "swr";
import { Text, View, Image } from "react-native";
import { fetcher, useMe } from "../hooks/fetcher";
import { Bubble } from "../components/Bubble";
import { Meditation } from "../types";
// @ts-ignore
import OptionsMenu from "react-native-options-menu";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

export default function HistoryScreen() {
  const { me } = useMe();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.firsttitle}>past logs</Text>
      {me?.meditations?.length && me?.meditations?.length > 0 ? (
        <ScrollView>
          {me?.meditations
            // .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
            .reverse()
            .map((meditation: Meditation, i: number) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Journal", { meditation })}
                key={meditation.id}
              >
                <Bubble>
                  <View style={styles.row}>
                    <Text style={styles.sessiontext}>
                      Session {me?.meditations?.length - i}
                    </Text>
                    <Text style={styles.durationtext}>
                      {Math.ceil(meditation.duration / 60)} min
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.date}>
                      {dayjs(meditation.createdAt).format("MM/DD/YY")}
                    </Text>
                  </View>

                  <Text style={styles.inputtext}>
                    {meditation.notes ? meditation.notes : ""}
                  </Text>
                </Bubble>
              </TouchableOpacity>
            ))}
        </ScrollView>
      ) : (
        <View style={styles.row}>
          <Text>Your meditation sessions will appear here.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    color: "#C4C4C4",
  },
  row: {
    display: "flex",
    flex: 3,
    width: "90%",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  sitting: {
    color: "#B6999B",
    marginBottom: 0,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  firsttitle: {
    fontSize: 32,
    color: "gray",
    fontWeight: "bold",
    marginRight: "auto",
    paddingLeft: 30,
    paddingTop: 20,
    letterSpacing: 1,
    paddingBottom: 10,
    fontFamily: "Calibre-Regular",
  },
  text: {
    fontSize: 20,
    color: "#B6999B",
    fontFamily: "Calibre-Regular",
    marginTop: 6,
    // fontWeight: "",
  },
  sessiontext: {
    fontSize: 22,
    color: "#B6999B",
    fontFamily: "Calibre-Regular",
    marginTop: 10,

    // fontWeight: "",
  },
  durationtext: {
    fontSize: 18,
    // paddingLeft: 150,
    color: "#B6999B",
    fontFamily: "Calibre-Regular",
    marginTop: 10,
    // fontWeight: "",
  },
  inputtext: {
    fontSize: 17,
    color: "gray",
    fontFamily: "Calibre-Regular",
    paddingHorizontal: 20,
    paddingVertical: 20,
    // textAlign: "center",
    // fontWeight: "",
  },
  date: {
    fontSize: 18,
    textAlign: "right",

    paddingTop: 0,
    color: "#B6999B",
    backgroundColor: "#ffffff",
    fontFamily: "Calibre-Regular",
    // fontWeight: "",
  },
  box: {
    height: 72,
    width: 320,
    shadowColor: "#BBB9B9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 5.46,
    borderRadius: 100 / 2,

    elevation: 9,
    backgroundColor: "#fff",
    color: "#B6999B",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
