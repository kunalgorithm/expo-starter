import * as React from "react";
import { StyleSheet, Image, TextInput } from "react-native";
import Button from "../../components/Button";

import { Text, View } from "../../components/Themed";
import NavalQuotes from "../../constants/NavalQuotes";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { fetcher, useUser, UserProfile, useUsers } from "../../hooks/fetcher";
import { mutate } from "swr";
import { FollowBubble } from "../FindFriendsScreen";

/* 
Onboarding screens 
1. use the timer to track your meditations
1. track your streaks on your profile
1. share with friends and show them support 
4. Let's get you started... what's your name? 
5. email? 

*/

export function Onboarding1({
  navigation,
}: StackScreenProps<RootStackParamList, "Onboarding_1">) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Welcome to Mindstreaks! ✨</Text> */}
      <Text style={styles.subtitle}>
        Meditate in silence peacefully {"\n"}with a simple timer ⏱{" "}
      </Text>
      <Image
        style={styles.logo}
        source={require("../../assets/images/onboardingone.png")}
      />
      <Button onPress={() => navigation.navigate("Onboarding_2")}>Next</Button>
    </View>
  );
}
export function Onboarding2({
  navigation,
}: StackScreenProps<RootStackParamList, "Onboarding_2">) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Stick to your practice {"\n"}wtih streak tracking ✨
      </Text>
      <Image
        style={styles.logo}
        source={require("../../assets/images/onboardingtwo.png")}
      />
      <Button onPress={() => navigation.navigate("Onboarding_3")}>Next</Button>
    </View>
  );
}
export function Onboarding3({
  navigation,
}: StackScreenProps<RootStackParamList, "Onboarding_3">) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Reflect with friends and encourage one another 💪
      </Text>
      <Image
        style={styles.logo}
        source={require("../../assets/images/onboardingthree.png")}
      />
      <Button onPress={() => navigation.navigate("Onboarding_4")}>Next</Button>
    </View>
  );
}
export function Onboarding4({
  navigation,
}: StackScreenProps<RootStackParamList, "Onboarding_4">) {
  const [name, setName] = React.useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.titlename}>First off, what's you name? 👋</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#ccc"
        // onSubmitEditing={onSubmit}
        placeholder="Enter your name... "
        onChangeText={(text: string) => setName(text)}
        value={name}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <Button onPress={() => navigation.navigate("Onboarding_5", { name })}>
        Next
      </Button>
    </View>
  );
}
export function Onboarding5({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "Onboarding_5"> & {
  route: { params: { name: string } };
}) {
  const [email, setEmail] = React.useState("");
  const onSubmit = async () => {
    const res = await fetcher(`/api/signup`, {
      email,
      name: route.params.name,
    });

    if (res.data && res.data.user) {
      await mutate("/api/me", { ...res.data.user, meditations: [] });
      navigation.navigate("Onboarding_6");

      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlename}>
        {route.params.name}, {"\n"} what's your email? 💌
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email..."
        placeholderTextColor="#ccc"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <Button onPress={onSubmit}>Sign Up</Button>
    </View>
  );
}
export function Onboarding6({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "Onboarding_6"> & {
  route: { params: { name: string } };
}) {
  const [email, setEmail] = React.useState("");
  const { users } = useUsers();

  const onSubmit = async () => {
    navigation.navigate("Root", { screen: "Feed" });
    return;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlename}>
        Follow the co-creators 🙆🏽‍♂️👩🏻‍💻{"\n"}to see how the social feed works (you
        can unfollow later)
        {"\n"} {"\n"}
        Hit "follow" 👇
      </Text>
      {users
        ?.filter((u) => u.id === 9 || u.id === 12)
        .map((u) => (
          <FollowBubble user={u} key={u.id} />
        ))}

      <Button onPress={onSubmit}>Next</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#FBFBFC",
    color: "#C4C4C4",
    alignItems: "center",
  },
  logotwo: {
    alignItems: "center",
    height: 560,
    width: 300,
  },
  logo: {
    alignItems: "center",
    height: 490,
    width: 300,
  },
  input: {
    height: 48,
    width: 300,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: -150,
    fontSize: 25,
    paddingTop: 10,
    fontFamily: "Calibre-Medium",
    color: "#4A4A4A",
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  title: {
    fontSize: 25,
    color: "#4A4A4A",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Calibre-Medium",
  },
  titlename: {
    fontSize: 25,
    marginTop: 160,
    paddingHorizontal: 25,
    color: "#4A4A4A",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Calibre-Medium",
  },
  subtitle: {
    fontSize: 23,
    paddingBottom: 20,
    paddingTop: 80,
    paddingHorizontal: 30,
    justifyContent: "center",
    textAlign: "center",
    color: "#4A4A4A",
    fontFamily: "Calibre-Medium",
  },
});
