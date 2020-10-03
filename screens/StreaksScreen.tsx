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
        <View style={{ width: "20%", backgroundColor: "#B6999A00" }}>
          <TouchableOpacity onPress={() => openImagePickerAsync()}>
            <Avatar user={me!} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "40%", backgroundColor: "#B6999A00" }}>
          <View style={styles.follower_container}>
            <Text style={styles.titlename}>{me?.name}</Text>
            <Text style={styles.titlefollow}>
              {me?.followers?.length} followers
            </Text>
            <Text style={styles.titlefollow}>
              {me?.following?.length} following
            </Text>
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
    paddingTop: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    color: "#fbfbfc",
  },

  row: {
    display: "flex",
    width: 340,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B6999A00",
  },
  title: {
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10,
    color: "gray",
    fontWeight: "bold",
    letterSpacing: 0,
    margin: 5,
    backgroundColor: "#B6999A00",
    fontFamily: "Calibre-Regular",
  },
  titlename: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
    letterSpacing: 0,
    paddingLeft: 20,
    backgroundColor: "#B6999A00",
    fontFamily: "Calibre-Medium",
  },

  titlefollow: {
    fontSize: 16,
    color: "gray",
    letterSpacing: 0,
    paddingLeft: 20,
    backgroundColor: "#B6999A00",
    fontFamily: "Calibre-Regular",
  },
  text: {
    fontSize: 20,
    color: "#E7DDDE",
    marginTop: 0,
    backgroundColor: "#B6999A00",
    fontFamily: "Calibre-Regular",
  },
  profilePic: {
    height: 90,
    width: 90,
    backgroundColor: "#B6999A00",
  },
  friendbutton: {
    paddingTop: 50,
    height: 75,
    backgroundColor: "#B6999A00",
  },
  button_title: {
    fontSize: 12,
    letterSpacing: 1,
    color: "#B6999A",
    fontFamily: "Calibre-Regular",
    justifyContent: "center",
  },
  follower_container: {
    backgroundColor: "#B6999A00",
  },
});
