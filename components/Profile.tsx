import * as React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";

import { useMe, UserProfile } from "../hooks/fetcher";
import { Stats } from "../components/Stats";
import { Box } from "../components/Box";
import Button from "../components/Button";

import { openImagePickerAsync } from "../hooks/uploadImage";
import { Avatar } from "../components/Avatar";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { FollowButton } from "../screens/FollowButton";
import dayjs from "dayjs";

function useStreak({ user }: { user: UserProfile }) {
  // const [streak, setStreak] = React.useState(1);
  let longestStreak = 0;
  let streak = 0;
  let currentStreak = 0;
  let currentStreakBroken = false;
  const today = dayjs();
  if (user.meditations.length === 0) return { streak, longestStreak };

  const firstDay = dayjs(user.meditations[0].createdAt);
  let day = today;

  // Iterate from today to the first meditation day
  for (let i = 0; i < today.diff(firstDay, "d"); i++) {
    // increment streaks if a meditation is found
    if (user.meditations.find((m) => dayjs(m.createdAt).isSame(day, "d"))) {
      currentStreak += 1;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
      if (!currentStreakBroken && currentStreak > streak)
        streak = currentStreak;
    } else {
      currentStreak = 0;
      currentStreakBroken = true;
    }
    day = day.subtract(1, "d");
  }

  return { streak, longestStreak };
}

export const Profile = ({ user }: { user: UserProfile | undefined }) => {
  if (!user || !user.meditations) return null;
  const navigation = useNavigation();
  const { me } = useMe();
  const { streak, longestStreak } = useStreak({ user });

  const meditations = me?.meditations.sort((a, b) =>
    a.createdAt < b.createdAt ? -1 : 1
  );
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ width: "20%", backgroundColor: Colors.grayBg }}>
          <TouchableOpacity onPress={() => openImagePickerAsync()}>
            <Avatar user={user!} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "40%", backgroundColor: Colors.grayBg }}>
          <View style={styles.follower_container}>
            <Text style={styles.titlename}>{user.name}</Text>
            <Text style={styles.titlefollow}>
              {user.followers?.length} followers
            </Text>
            <Text style={styles.titlefollow}>
              {user.following?.length} following
            </Text>
          </View>
        </View>

        <View style={styles.friendbutton}>
          {user.id === me?.id ? (
            <>
              <Button
                onPress={() => navigation.navigate("FindFriends")}
                small
                invertColors
                style={{ marginBottom: 0, marginTop: 0 }}
              >
                <Text style={styles.button_title}>Find Friends</Text>
              </Button>
              <Button
                onPress={() => navigation.navigate("EditProfile", { me })}
                small
                invertColors
                style={{ marginTop: 2 }}
              >
                <Text style={styles.button_title}>Edit Profile</Text>
              </Button>
            </>
          ) : (
            <FollowButton user={user} />
          )}
        </View>
      </View>
      <Stats meditations={user.meditations} longestStreak={longestStreak} />
      <Text style={styles.title}>
        {user.name?.split(" ")[0]}, you're on a {streak} day streak ✨
      </Text>

      {Array(9)
        .fill(0)
        .map((row, i) => (
          <View style={styles.row} key={i}>
            <Box index={i * 7} meditations={meditations!} />
            <Box index={i * 7 + 1} meditations={meditations!} />
            <Box index={i * 7 + 2} meditations={meditations!} />
            <Box index={i * 7 + 3} meditations={meditations!} />
            <Box index={i * 7 + 4} meditations={meditations!} />
            <Box index={i * 7 + 5} meditations={meditations!} />
            <Box index={i * 7 + 6} meditations={meditations!} />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
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
    backgroundColor: Colors.grayBg,
  },
  title: {
    fontSize: 20,
    paddingTop: 7,
    paddingBottom: 10,
    color: "gray",
    fontWeight: "bold",
    letterSpacing: 0,
    margin: 5,
    backgroundColor: Colors.grayBg,
    fontFamily: "Calibre-Regular",
  },
  titlename: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
    letterSpacing: 0,
    paddingLeft: 20,
    backgroundColor: Colors.grayBg,
    fontFamily: "Calibre-Medium",
  },

  titlefollow: {
    fontSize: 16,
    color: "gray",
    letterSpacing: 0,
    paddingLeft: 20,
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
