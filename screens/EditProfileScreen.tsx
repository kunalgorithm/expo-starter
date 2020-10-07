import * as React from "react";
import { Alert, AsyncStorage, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Button from "../components/Button";
import { Image, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fetcher, useMe } from "../hooks/fetcher";
import { mutate } from "swr";
import { User } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

export default function EditProfileScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "EditProfile"> & {
  route: { params: { user: User } };
}) {
  const { me } = route.params;
  const [name, setName] = React.useState(me.name);
  const [email, setEmail] = React.useState(me.email);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSubmit = async () => {
    setLoading(true);
    setError(false);
    const res = await fetcher(`/api/updateProfile`, {
      email,
      name,
    });
    console.log(res);

    await mutate("/api/me", { ...me, name, email });

    setLoading(false);
    if (res.error) Alert.alert(res.error);
    if (res.name) Alert.alert("Profile Updated!");
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <View style={styles.container}>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Button onPress={onSubmit}>{loading ? "..." : "Submit"}</Button>
          <Button
            small
            invertColors
            onPress={async () => {
              const res = await fetcher(`/api/logout`);
              mutate("/api/me", {});
            }}
          >
            Log out
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFBFC",
    paddingTop: 110,
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    marginTop: 0,
    width: 200,
    alignSelf: "center",
    resizeMode: "contain",
    margin: 30,
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
