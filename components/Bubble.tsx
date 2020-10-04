import * as React from "react";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";

export const Bubble = ({
  title,
  children,
}: {
  title?: string;
  children?: string | JSX.Element | any;
}) => (
  <View style={styles.box}>
    {title && <Text style={styles.title}>{title}</Text>}
    {children}
  </View>
);

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#B6999B",
    fontFamily: "Calibre-Regular",
    marginTop: 6,
    // fontWeight: "",
  },
  text: {
    fontSize: 20,
    color: "gray",
    fontFamily: "Calibre-Regular",
    marginTop: 6,
    // fontWeight: "",
  },
  box: {
    // height: 72,
    width: 320,
    shadowColor: "#BBB9B9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderRadius: 20,

    elevation: 9,
    backgroundColor: "#fff",
    color: "#B6999B",
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
