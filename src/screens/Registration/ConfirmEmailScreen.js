import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { username: route?.params?.username },
  });
  const username = watch("username");

  const navigation = useNavigation();

  const onConfirmPress = async (data) => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }

    //console.warn(data);
    //navigation.navigate("Tabs");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("Success", "Code was resent to your Email");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your Email</Text>

        <View style={{ height: 50 }} />

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{ required: "Username is required" }}
        />

        <CustomInput
          name="code"
          placeholder="Enter your confirmation code"
          control={control}
          rules={{ required: "Confirmation code is required" }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPress)} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmEmailScreen;

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
