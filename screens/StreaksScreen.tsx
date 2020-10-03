import * as React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "../components/Themed";

import { useMe } from "../hooks/fetcher";
import { Stats } from "../components/Stats";
import { Box } from "../components/Box";
import Button from "../components/Button";
import { RootStackParamList } from "../types";
import * as ImagePicker from "expo-image-picker";
import { openImagePickerAsync } from "../hooks/uploadImage";
import { Avatar } from "../components/Avatar";

export default function StreaksScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
  const { me } = useMe();

  const meditations = me?.meditations;
  if (!meditations) return null;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ width: "20%" }}>
          <TouchableOpacity onPress={() => openImagePickerAsync()}>
            <Avatar user={me!} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "40%" }}>
          <View style={styles.follower_container}>
            <Text style={styles.title}>{me?.name}</Text>
            <Text style={styles.title}>{me?.followers?.length} followers</Text>
            <Text style={styles.title}>{me?.following?.length} following</Text>
          </View>
        </View>

        <View style={styles.friendbutton}>
          <Button
            onPress={() => navigation.push("FindFriends")}
            small
            invertColors
          >
            <Text style={styles.button_title}>Find Friends</Text>
          </Button>
        </View>
      </View>
      <Text style={styles.title}>
        {me?.name?.split(" ")[0]}, you're on a 4 day streak ✨
      </Text>
      {/* TODO swap with Follow on others' profiles */}
      <Stats meditations={meditations} />

      {Array(9)
        .fill(0)
        .map((row, i) => (
          <View style={styles.row} key={i}>
            <Box index={i * 7} meditations={meditations} />
            <Box index={i * 7 + 1} meditations={meditations} />
            <Box index={i * 7 + 2} meditations={meditations} />
            <Box index={i * 7 + 3} meditations={meditations} />
            <Box index={i * 7 + 4} meditations={meditations} />
            <Box index={i * 7 + 5} meditations={meditations} />
            <Box index={i * 7 + 6} meditations={meditations} />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    color: "#fbfbfc",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#B6999A00",
  },
  title: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
    letterSpacing: 1,
    margin: 5,
    backgroundColor: "#B6999A00",
    fontFamily: "Calibre-Medium",
  },
  text: {
    fontSize: 20,
    color: "#E7DDDE",
    marginTop: 0,
    backgroundColor: "#B6999A00",
    fontFamily: "Calibre-Regular",
  },
  profilePic: {
    height: 70,
    width: 70,
    backgroundColor: "#B6999A00",
  },
  friendbutton: {
    height: 60,
    backgroundColor: "#B6999A00",
  },
  button_title: {
    fontSize: 12,
    marginTop: -10,
    letterSpacing: 1,
    color: "#B6999A",
    fontFamily: "Calibre-Regular",
    justifyContent: "center",
  },
  follower_container: {
    backgroundColor: "#B6999A00",
  },
});
