import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onSendPress = async (data) => {
    try {
      const username = data.username;
      await Auth.forgotPassword(data.username);
      navigation.navigate("NewPassword", { username });
    } catch (e) {
      Alert.alert("Oops", e.message);
    }

    //console.warn(data);
    //navigation.navigate("NewPassword");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <View style={{ height: 50 }} />

        <CustomInput
          name="username"
          placeholder="Enter your username"
          control={control}
          rules={{ required: "Username is required" }}
        />

        <CustomButton text="Send" onPress={handleSubmit(onSendPress)} />

        <CustomButton
          text="Back to sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 500,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6543",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
