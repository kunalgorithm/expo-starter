import * as React from "react";
import { StyleSheet } from "react-native";
import { mutate } from "swr";
import { Text, View } from "../components/Themed";
import { fetcher, useMe } from "../hooks/fetcher";
import { Bubble } from "./Bubble";

export default function TabThreeScreen() {
  const { me } = useMe();

  return (
    <View style={styles.container}>
      <Text
        onPress={async () => {
          const res = await fetcher(`/api/logout`);
          mutate("/api/me", {});
        }}
      >
        Log out{" "}
      </Text>

      {me?.meditations?.map((meditation, i) => (
        <View style={styles.row} key={i}>
          <Bubble
            title={`${new Date(meditation.createdAt).toDateString()} - 
            ${Math.floor(meditation.duration / 60)} min`}
          >
            {meditation.notes ? meditation.notes : ""}
          </Bubble>
        </View>
      ))}
    </View>
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
    flexDirection: "row",
    backgroundColor: "#FBFBFC",
  },

  text: {
    fontSize: 20,
    color: "#B6999B",
    fontFamily: "Calibre-Regular",
    marginTop: 6,
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
    shadowOpacity: 0.32,
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