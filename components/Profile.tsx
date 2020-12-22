import * as React from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

import { Text, View } from "../components/Themed";

import { useMe } from "../hooks/fetcher";

import { Box } from "../components/Box";
import Button from "../components/Button";

import { openImagePickerAsync } from "../hooks/uploadImage";
import { Avatar } from "../components/Avatar";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { FollowButton } from "../screens/FollowButton";
import dayjs from "dayjs";
import { Meditation } from "../types";

export const Profile = ({
  user,
}: {
  user: { username: string; id: number };
}) => {
  if (!user) return null;
  const navigation = useNavigation();

  const { me } = useMe();

  return (
    <View style={styles.container}>
      <Text style={styles.titlename}>{user.username}</Text>
      <View style={styles.row}>
        <View style={{ width: "25%", backgroundColor: Colors.grayBg }}>
          <TouchableOpacity
            onPress={() => user.id === me?.id && openImagePickerAsync()}
          >
            <Avatar user={user!} />
          </TouchableOpacity>
        </View>

        <View style={styles.friendbutton}>
          {user.id === me?.id ? (
            <Button
              onPress={() => navigation.navigate("EditProfile", { me })}
              small
              invertColors
              style={{ marginTop: 2 }}
            >
              <Text style={styles.button_title}>Edit Profile</Text>
            </Button>
          ) : (
            <FollowButton user={user} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    color: "#fbfbfc",
  },

  row: {
    display: "flex",
    width: 340,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grayBg,
  },
  title: {
    fontSize: 22,
    paddingTop: 20,
    marginBottom: -5,
    color: "gray",
    fontWeight: "bold",
    letterSpacing: 0,
    margin: 5,
    backgroundColor: Colors.grayBg,
    fontFamily: "Calibre-Regular",
  },

  streaktext: {
    fontSize: 22,
    paddingTop: 20,
    marginBottom: -5,
    color: "#B6999B",
    fontWeight: "bold",
    letterSpacing: 0,
    margin: 5,
    backgroundColor: Colors.grayBg,
    fontFamily: "Calibre-Regular",
  },
  titlename: {
    fontSize: 30,
    color: "gray",
    fontWeight: "bold",
    width: "100%",
    letterSpacing: 1,
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingBottom: 10,
    paddingTop: 35,
    paddingLeft: 32,
    backgroundColor: Colors.grayBg,
    fontFamily: "Calibre-Regular",
  },

  titlefollow: {
    fontSize: 14,
    color: "gray",
    letterSpacing: 0,
    paddingLeft: 20,
    textTransform: "uppercase",
    backgroundColor: Colors.grayBg,
    fontFamily: "Calibre-Regular",
  },
  titlefollownum: {
    fontSize: 20,
    color: "#B6999B",
    letterSpacing: 0,
    paddingLeft: 0,
    textTransform: "uppercase",
    backgroundColor: Colors.grayBg,
    fontFamily: "Calibre-Regular",
  },
  text: {
    fontSize: 20,
    color: "#E7DDDE",
    marginTop: 0,
    backgroundColor: Colors.grayBg,
    fontFamily: "Calibre-Regular",
  },
  profilePic: {
    height: 90,
    width: 90,
    backgroundColor: Colors.grayBg,
  },
  friendbutton: {
    paddingTop: 0,
    paddingRight: 15,
    height: 75,
    backgroundColor: Colors.grayBg,
  },
  button_title: {
    fontSize: 12,
    letterSpacing: 1,
    color: "#B6999A",
    fontFamily: "Calibre-Regular",
    justifyContent: "center",
  },
  follower_container: {
    backgroundColor: Colors.grayBg,
  },
});
