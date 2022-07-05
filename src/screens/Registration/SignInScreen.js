import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Logo from "../../../assets/Logo.png";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { useForm } from "react-hook-form";
import { getLastReceivedMessage, useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../../contexts/AuthContext";
import { getStreamToken } from "../../graphql/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOWER_REGEX = /^[A-Z][a-z0-9_-]*$/;

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState();
  const { client } = useChatContext();
  const { setUserId, setPicture, picture } = useAuthContext();
  const [pic, setPic] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPress = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signIn(data.username, data.password);
    } catch (e) {
      Alert.alert("Oops", e.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    const userData = await Auth.currentAuthenticatedUser();
    const { sub } = userData.attributes;

    try {
      const value = await AsyncStorage.getItem(sub);
      if (value != null) {
        setPic(value);
        setPicture(value);
        console.log("value");
        console.log(value);
      } else console.log("null");
    } catch (error) {}

    const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
    const token = tokenResponse?.data?.getStreamToken;
    const name = userData.attributes.preferred_username.toLowerCase();

    await client.disconnectUser();

    console.log("pic");
    console.log(pic);

    await client.connectUser(
      {
        id: sub,
        name: name,
        image: pic,
      },
      token
    );
    setUserId(sub);
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");

    navigation.navigate("SignUp");
  };

  const onForgotPasswordPress = () => {
    navigation.navigate("ForgotPassword");
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <View style={{ height: 50 }} />

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{
            required: "Username is required",
            pattern: {
              value: LOWER_REGEX,
              message:
                "When signing up, username should start with an Uppercase letter and then only lowercase",
            },
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: "Password is required",
          }}
        />

        <TextInput placeholder={"password"} />

        <CustomButton
          text={loading ? "Loading..." : "Sign In"}
          onPress={handleSubmit(onSignInPress)}
        />

        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPress}
          type="TERTIARY"
        />

        <View style={{ height: 50 }} />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

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
});
