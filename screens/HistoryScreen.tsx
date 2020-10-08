import * as React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { mutate } from "swr";
import { Text, View } from "react-native";
import { fetcher, useMe } from "../hooks/fetcher";
import { Bubble } from "../components/Bubble";
import { Meditation } from "../types";
// @ts-ignore
import OptionsMenu from "react-native-options-menu";
import { useNavigation } from "@react-navigation/native";

export default function HistoryScreen() {
  const { me } = useMe();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.firsttitle}>past logs</Text>
      <ScrollView>
        {me?.meditations?.length! > 0 ? (
          me?.meditations
            ?.reverse()
            .map((meditation: Meditation, i: number) => (
              <Bubble key={meditation.id}>
                <View style={styles.row}>
                  <Text style={styles.sessiontext}>
                    Session {me?.meditations?.length - i}
                  </Text>
                  <Text style={styles.durationtext}>
                    {Math.ceil(meditation.duration / 60)} min
                  </Text>
                  <OptionsMenu
                    button={require("../assets/icons/editdots.png")}
                    buttonStyle={{
                      width: 32,
                      height: 8,
                      margin: 7.5,
                      resizeMode: "contain",
                    }}
                    destructiveIndex={1}
                    options={["Edit", "Delete", "Cancel"]}
                    actions={[
                      () => {
                        console.log("edit - TODO");
                        navigation.navigate("Journal", { meditation });
                      },
                      async () => {
                        await fetcher("/api/meditation/delete", {
                          id: meditation.id,
                        });
                        await mutate("/api/me", {
                          ...me,
                          meditations: me.meditations.filter(
                            (m) => m.id !== meditation.id
                          ),
                        });
                      },
                      () => {},
                    ]}
                  />
                </View>

                <Text style={styles.date}>
                  {new Date(meditation.createdAt).toDateString()}
                </Text>

                <Text style={styles.inputtext}>
                  {meditation.notes ? meditation.notes : ""}
                </Text>
              </Bubble>
            ))
        ) : (
          <View style={styles.row}>
            Your meditation sessions will appear here.
          </View>
        )}
      </ScrollView>
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
    paddingLeft: 150,
    color: "gray",
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
    fontSize: 16,
    textAlign: "left",
    color: "#B6999B",
    paddingRight: 162,
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
