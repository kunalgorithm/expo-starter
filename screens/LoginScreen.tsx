import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Button from "../components/Button";
import { Image, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fetcher } from "../hooks/fetcher";

export default function TabOneScreen() {
  const [login, setLogin] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{login ? "Log in" : "Sign up"}</Text>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/Logo_name.png")}
        />
        {!login && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setName(text)}
            value={name}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#ccc"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.container}>
          <Button
            onPress={async () => {
              setLoading(true);
              setError(false);
              console.log("logging in");
              const { data, error } = await fetcher(
                `/api/${login ? "login" : "signup"}`,
                {
                  email,
                  name,
                  password,
                }
              );
              console.log({ data, error });
              setLoading(false);
              if (error) setError(error);
            }}
          >
            {login ? "Log in" : "Signup"}
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
                Login
              </Text>
            </Text>
          )}
          {loading && <Text>loading...</Text>}
          {error && <Text>Error: {error}</Text>}
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
  },
  logo: {
    flex: 1,
    height: 120,
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
  title: {
    fontSize: 40,
    marginTop: 100,
    fontWeight: "bold",
    color: "#4A4A4A",
    opacity: 0.8,
    fontFamily: "Calibre-Medium",
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
  footerLink: {
    color: "#B6999B",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 50,
  },
});
