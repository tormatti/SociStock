import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const NewPasswordScreen = () => {
  const route = useRoute();

  const { control, handleSubmit } = useForm({
    defaultValues: { username: route?.params?.username },
  });

  const navigation = useNavigation();

  const onSendPress = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
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
          placeholder="Username"
          control={control}
          editable={false}
        />

        <CustomInput
          name="code"
          placeholder="Code"
          control={control}
          rules={{ required: "Code is required" }}
        />

        <CustomInput
          name="password"
          placeholder="Enter your new password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be at least 6 characters long",
            },
          }}
          secureTextEntry={true}
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

export default NewPasswordScreen;

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
