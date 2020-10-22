import * as React from "react";
import { StyleSheet, Image, TextInput } from "react-native";
import Button from "../../components/Button";

import { Text, View } from "../../components/Themed";
import NavalQuotes from "../../constants/NavalQuotes";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { fetcher } from "../../hooks/fetcher";
import { mutate } from "swr";

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
      <Text style={styles.title}>Welcome to Mindstreaks! ✨</Text>
      <Text style={styles.title}>Use The timer to track your meditations</Text>
      <Button onPress={() => navigation.navigate("Onboarding_2")}>Next</Button>
    </View>
  );
}
export function Onboarding2({
  navigation,
}: StackScreenProps<RootStackParamList, "Onboarding_2">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track your streaks on your profile</Text>
      <Button onPress={() => navigation.navigate("Onboarding_3")}>Next</Button>
    </View>
  );
}
export function Onboarding3({
  navigation,
}: StackScreenProps<RootStackParamList, "Onboarding_3">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share with firneds </Text>
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
      <Text style={styles.title}>What's your name?</Text>
      <TextInput
        placeholder="Enter your name... "
        placeholderTextColor="#ccc"
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
    console.log(res);
    if (res.data && res.data.user) {
      await mutate("/api/me", { ...res.data.user, meditations: [] });
      navigation.navigate("Root", { screen: "Feed" });
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {route.params.name}, what's your email? ✨
      </Text>
      <TextInput
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#FBFBFC",
    color: "#C4C4C4",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
});
