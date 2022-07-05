import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text, type = "PRIMARY" }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3B71F3",
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_TERTIARY: { backgroundColor: "transparent" },

  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  container_APPLE: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A8A8A8",
    borderWidth: 0.5,
    borderColor: "#fff",
    padding: 15,
    width: "100%",
    borderRadius: 5,
    margin: 5,
  },
  container_FACEBOOK: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#485a96",
    borderWidth: 0.5,
    borderColor: "#fff",
    padding: 15,
    width: "100%",
    borderRadius: 5,
    margin: 5,
  },
  container_GMAIL: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#fff",
    padding: 15,
    width: "100%",
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_TERTIARY: {
    color: "gray",
  },
  text_APPLE: {
    color: "#575757",
    marginLeft: 20,
    marginRight: 20,
  },
  text_FACEBOOK: {
    color: "#fff",
    marginLeft: 20,
    marginRight: 20,
  },
  text_GMAIL: {
    color: "#575757",
    marginLeft: 15,
    marginRight: 20,
  },
  text_SECONDARY: {
    color: "#3B71F3",
  },
});
