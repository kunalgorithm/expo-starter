import * as React from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";
import { Image, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fetcher, useMe } from "../hooks/fetcher";
import { mutate } from "swr";
import { useInterval } from "../hooks/useInterval";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [login, setLogin] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const navigation = useNavigation();

  const onSubmit = async () => {
    setLoading(true);
    setError(false);

    const res = await fetcher(`/api/${login ? "login" : "signup"}`, {
      username,
      name,
      password,
    });
    console.log("login res", res);
    if (res && res.id) {
      await mutate("/api/me", res.data);
      // navigation.navigate("Root");
      return;
    }
    setLoading(false);
    if (res && res.error) setError(res.error);
  };
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.logo}
        source={require("../assets/images/login_logo.png")}
      /> */}

      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {/* {!login && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setName(text)}
            value={name}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        )} */}
        {login && (
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setUsername(text)}
            value={username}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        )}
        {login && (
          <TextInput
            style={styles.input}
            placeholderTextColor="#ccc"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            // onSubmitEditing={onSubmit}
          />
        )}
        <View style={styles.container}>
          {error && <Text style={{ color: "red" }}>{error}</Text>}

          <Button onPress={onSubmit}>
            {loading ? "..." : login ? "Log in" : "Get Started"}
          </Button>
        </View>

        <View style={styles.footerView}>
          {login ? (
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={() => setLogin(false)} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          ) : (
            <Text style={styles.footerText}>
              Have an account?{" "}
              <Text onPress={() => setLogin(true)} style={styles.footerLink}>
                Log in
              </Text>
            </Text>
          )}
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
    paddingTop: 150,
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    marginTop: -90,
    width: 200,
    paddingBottom: 200,
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
  title: {
    fontSize: 22,
    marginTop: -230,
    fontWeight: "bold",
    color: "#4A4A4A",
    opacity: 0.8,
    fontFamily: "Calibre-Regular",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 1,
    backgroundColor: "#FBFBFC",
  },
  footerText: {
    fontSize: 22,
    fontFamily: "Calibre-Medium",
    color: "#2e2e2d",
  },
  headerText: {
    fontSize: 22,
    fontFamily: "Calibre-Medium",
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#B6999B",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 50,
  },

  footerLinktwo: {
    color: "#B6999B",
    fontFamily: "Calibre-Medium",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
  },
});
