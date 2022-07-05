import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Alert } from "react-native-web";
import { Auth } from "aws-amplify";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../../contexts/AuthContext";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LOWER_REGEX = /^[A-Z][a-z0-9_-]*$/;

const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();
  const { client } = useChatContext();
  const { setUserId } = useAuthContext();

  const onRegisterPress = async (data) => {
    const { username, password, email } = data;
    const name = username;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, name, preferred_username: username },
      });

      navigation.navigate("ConfirmEmail", { username });
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onTermsOfUsePress = () => {
    navigation.navigate("Terms");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <View style={{ height: 50 }} />

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: "Username is required",
            pattern: {
              value: LOWER_REGEX,
              message:
                "When signing up, username should start with an Uppercase letter and then only lowercase",
            },
            minLength: {
              value: 3,
              message: "Username should be at least 3 characters long",
            },
            maxLength: {
              value: 24,
              message: "Username should not be longer than 24 characters long",
            },
          }}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
          secureTextEntry={false}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be at least 6 characters long",
            },
            maxLength: {
              value: 24,
              message: "Password should not be longer than 24 characters long",
            },
          }}
          secureTextEntry={true}
        />
        <CustomInput
          name="confirmpassword"
          placeholder="Confirm Password"
          control={control}
          rules={{
            validate: (value) => value === pwd || "Password do not match",
          }}
          secureTextEntry={true}
        />

        <CustomButton text="Register" onPress={handleSubmit(onRegisterPress)} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePress}>
            Terms of Use
          </Text>{" "}
        </Text>

        <View style={{ height: 50 }} />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

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
