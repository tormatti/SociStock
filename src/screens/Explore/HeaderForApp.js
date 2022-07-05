import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HeaderForApp = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>SociStock</Text>
      <View>
        <Image
          source={require("../../../assets/Logo.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default HeaderForApp;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
});
